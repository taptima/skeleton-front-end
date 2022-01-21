import { ParsedUrlQuery } from 'querystring';
import React, { Component, ComponentType, useEffect } from 'react';
import { observer } from 'mobx-react';
import appContainerFactory from 'container/AppContainer';
import User from 'domain/entity/app/User';
import Logger from 'util/Logger';
import { withContainerContext } from 'presentation/context/Container';
import AppGlobalController from 'presentation/controller/AppGlobalController';
import UiGlobalController from 'presentation/controller/UiGlobalController';
import { PageContextT } from 'presentation/type/Page';
import LayoutConfig from 'presentation/type/LayoutConfig';

type PageInitialPropsT = {
    appData: Record<string, unknown>;
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
    const withAppContainerContext = withContainerContext(appContainerFactory);

    const OriginalPage = withAppContainerContext(() => {
        useEffect(() => {
            const container = appContainerFactory.getInstance();
            container.get(UiGlobalController).handleLayoutUpdateOnRouteChange(layoutConfig);

            if (effectCallback) {
                effectCallback(container)
                    .then(() => {})
                    .catch((e) => {
                        Logger.handleError('Unhandled error in "createPage" effect callback', e);
                    });
            }
        }, []);

        return <PageComponent />;
    });

    class Page extends Component<PageInitialPropsT> {
        static getInitialProps: (ctx: PageContextT<Q>) => Promise<PageInitialPropsT>;

        constructor(props: PageInitialPropsT) {
            super(props);

            const { appData } = props;
            const container = appContainerFactory.getInstance();

            container.hydrateData(appData);
        }

        public componentDidMount(): void {
            const container = appContainerFactory.getInstance();
            container
                .get(AppGlobalController)
                .clientSideInitialAction()
                .then(() => {})
                .catch((e) => {
                    Logger.handleError(
                        'Unhandled error in "createPage" clientSideInitialAction',
                        e,
                    );
                });
        }

        render() {
            const container = appContainerFactory.getInstance();
            const { user } = container.get(AppGlobalController);
            const { setLayoutConfig } = container.get(UiGlobalController);

            if (!roles || roles.includes(user.role)) {
                setLayoutConfig({ variant: 'private' });
            }

            return <OriginalPage />;
        }
    }

    if (getInitialProps || withInitialProps) {
        Page.getInitialProps = async (ctx) => {
            const container = appContainerFactory.getInstance(true);
            await container.get(AppGlobalController).appInitialAction();

            if (getInitialProps) await getInitialProps(container, ctx);

            return {
                appData: container.serializeData(),
            };
        };
    }

    return observer(Page);
}
