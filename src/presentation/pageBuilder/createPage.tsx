import { ParsedUrlQuery } from 'querystring';
import { ComponentType, useEffect } from 'react';
import { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import appContainerFactory from 'container/AppContainer';
import User from 'domain/entity/app/User';
import isServer from 'helper/common/isServer';
import Logger from 'util/Logger';
import { useService } from 'presentation/context/Container';
import AppGlobalController from 'presentation/controller/AppGlobalController';
import UiGlobalController from 'presentation/controller/UiGlobalController';
import { PageContextT } from 'presentation/type/Page';
import LayoutConfig from 'presentation/type/LayoutConfig';

type PageInitialPropsT = {
    appData?: Record<string, unknown>;
};

type OptionsT<Q> = {
    effectCallback?: (
        container: ReturnType<typeof appContainerFactory.getInstance>,
    ) => Promise<void>;
    getInitialProps?: (
        container: ReturnType<typeof appContainerFactory.getInstance>,
        nextPageContext: PageContextT<Q>,
    ) => Promise<void>;
    withInitialProps?: boolean;
    roles?: User['role'][];
    layoutConfig?: LayoutConfig;
};

export default function createPage<Q extends ParsedUrlQuery = ParsedUrlQuery>(
    PageComponent: ComponentType,
    options: OptionsT<Q> = {},
) {
    const { effectCallback, getInitialProps, withInitialProps, roles, layoutConfig } = options;
    let container = appContainerFactory.getInstance();
    container.get(UiGlobalController).handleLayoutUpdateOnRouteChange(layoutConfig);

    const Page: NextPage<PageInitialPropsT> = (props) => {
        const { appData } = props;
        const { user, clientSideInitialAction } = useService(AppGlobalController);
        const { setIsPagePrivacyLocked } = useService(UiGlobalController);
        const isPageAllowedForUser = !roles || roles.includes(user.role);

        useEffect(() => {
            if (appData) {
                container.hydrateData(appData);
            }

            clientSideInitialAction()
                .then(() => {})
                .catch((e) => {
                    Logger.handleError(
                        'Unhandled error in "createPage" clientSideInitialAction',
                        e,
                    );
                });

            if (!isPageAllowedForUser) {
                return;
            }

            if (effectCallback) {
                effectCallback(container)
                    .then(() => {})
                    .catch((e) => {
                        Logger.handleError('Unhandled error in "createPage" effect callback', e);
                    });
            }
        }, []);

        useEffect(() => {
            setIsPagePrivacyLocked(!isPageAllowedForUser);
        }, [isPageAllowedForUser]);

        return <PageComponent />;
    };

    if (getInitialProps || withInitialProps) {
        Page.getInitialProps = async (ctx: PageContextT<Q>) => {
            container = appContainerFactory.getInstance(true);

            if (getInitialProps) await getInitialProps(container, ctx);

            if (!isServer()) {
                // Repositories already initialized above.
                // No need to pass props on client.
                return {};
            }

            return {
                appData: container.serializeData(),
            };
        };
    }

    return observer(Page);
}
