import { ParsedUrlQuery } from 'querystring';
import { ComponentType, FC } from 'react';
import { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import appContainerFactory, { ContainerT } from 'container/AppContainer';
import User from 'domain/entity/app/User';
import isServer from 'helper/common/isServer';
import Logger from 'util/Logger';
import { useService } from 'presentation/context/Container';
import AppGlobalController from 'presentation/controller/AppGlobalController';
import UiGlobalController from 'presentation/controller/UiGlobalController';
import { PageContextT } from 'presentation/type/PageContext';
import LayoutConfig from 'presentation/type/LayoutConfig';
import useBrowserLayoutEffect from 'presentation/hook/useBrowserLayoutEffect';
import PrivatePage from 'presentation/component/page/private';

type PageInitialPropsT = {
    appData?: Record<string, unknown>;
};

/**
 * If page has no special actions but requires appInitialAction or Router[query], use
 * @example: withInitialProps: true
 * */
type OptionsT<Q> = {
    effectCallback?: (container: ContainerT) => Promise<void>;
    getInitialProps?: (container: ContainerT, nextPageContext: PageContextT<Q>) => Promise<void>;
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

    const Page: NextPage<PageInitialPropsT> = (props) => {
        const { appData } = props;
        const { user } = useService(AppGlobalController);
        const { handleLayoutUpdateOnRouteChange } = useService(UiGlobalController);
        const isPageAllowedForUser = !roles || roles.includes(user.role);

        useBrowserLayoutEffect(() => {
            if (appData) {
                container.hydrateData(appData);
            }

            handleLayoutUpdateOnRouteChange(layoutConfig);

            if (effectCallback && isPageAllowedForUser) {
                effectCallback(container)
                    .then(() => {})
                    .catch((e) => {
                        Logger.handleError('Unhandled error in "createPage" effect callback', e);
                    });
            }
        }, []);

        return isPageAllowedForUser ? <PageComponent /> : <PrivatePage />;
    };

    if (getInitialProps || withInitialProps) {
        Page.getInitialProps = async (ctx: PageContextT<Q>) => {
            container = appContainerFactory.getInstance();

            if (getInitialProps) {
                await getInitialProps(container, ctx);
            }

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
