import { ParsedUrlQuery } from 'querystring';
import { ComponentType, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import appContainerFactory, { ContainerT } from 'container/AppContainer';
import User from 'domain/entity/app/User';
import type {
    NextPage,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    GetStaticPathsContext,
    Redirect,
    GetStaticPathsResult,
} from 'next';
import Logger from 'util/Logger';
import { useService } from 'presentation/context/Container';
import AppGlobalController from 'presentation/controller/AppGlobalController';
import UiGlobalController from 'presentation/controller/UiGlobalController';
import LayoutConfig from 'presentation/type/LayoutConfig';
import useHydrateData from 'presentation/hook/useHydrateData';
import useBrowserLayoutEffect from 'presentation/hook/useBrowserLayoutEffect';
import PrivatePage from 'presentation/component/page/private';

type StaticPageInitialPropsT = {
    appData: Record<string, unknown>;
};

type OptionsT = {
    effectCallback?: (container: ContainerT) => Promise<void>;
    roles?: User['role'][];
    layoutConfig?: LayoutConfig;
};

export function createSSGPage(PageComponent: ComponentType, options: OptionsT = {}): NextPage {
    const { effectCallback, roles, layoutConfig } = options;
    const container = appContainerFactory.getInstance();

    const Page: NextPage = (props) => {
        const { appData } = props as StaticPageInitialPropsT;
        const { user } = useService(AppGlobalController);
        const { handleLayoutUpdateOnRouteChange } = useService(UiGlobalController);
        const isPageAllowedForUser = !roles || roles.includes(user.role);

        useHydrateData(container, appData);

        useBrowserLayoutEffect(() => {
            handleLayoutUpdateOnRouteChange(layoutConfig);
        }, []);

        useEffect(() => {
            if (effectCallback && isPageAllowedForUser) {
                effectCallback(container)
                    .then(() => {})
                    .catch((e) => {
                        Logger.handleError('Unhandled error in "createSSGPage" effect callback', e);
                    });
            }
        }, []);

        return isPageAllowedForUser ? <PageComponent /> : <PrivatePage />;
    };

    return observer(Page);
}

export const createSSGAction = <Q extends ParsedUrlQuery = ParsedUrlQuery>(
    onRequest: (container: ContainerT, nextPageContext: GetStaticPropsContext<Q>) => Promise<void>,
    config?: {
        revalidate?: number | boolean;
        redirect?: Redirect;
        notFound?: true;
    },
): GetStaticProps<StaticPageInitialPropsT, Q> => {
    return async function getStaticProps(context) {
        const { revalidate, notFound, redirect } = config || {};
        const container = appContainerFactory.getInstance();
        await onRequest(container, context);

        if (redirect) {
            return { redirect, revalidate };
        }

        if (notFound) {
            return { notFound: true, revalidate };
        }

        return {
            props: {
                appData: container.serializeData(),
            },
            revalidate,
        };
    };
};

export type PathListT<Q extends ParsedUrlQuery = ParsedUrlQuery> = GetStaticPathsResult<Q>['paths'];

export const createPathListGenerator = <Q extends ParsedUrlQuery = ParsedUrlQuery>(
    onRequest: (
        container: ContainerT,
        pathsContext: GetStaticPathsContext,
    ) => Promise<PathListT<Q>>,
    fallback: boolean | 'blocking' = false,
): GetStaticPaths<Q> => {
    return async function getStaticPaths(context) {
        const container = appContainerFactory.getInstance();
        const paths = await onRequest(container, context);

        return { paths, fallback };
    };
};
