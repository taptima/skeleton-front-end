import {ParsedUrlQuery} from "querystring";
import { ComponentType, PropsWithChildren } from "react";
import {observer} from "mobx-react-lite";
import appContainerFactory, { ContainerT } from "container/AppContainer";
import User from "domain/entity/app/User";
import type {
    NextPage,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    GetStaticPathsContext,
    Redirect,
    GetStaticPathsResult
} from 'next';
import Logger from "util/Logger";
import {useService} from "presentation/context/Container";
import AppGlobalController from "presentation/controller/AppGlobalController";
import UiGlobalController from "presentation/controller/UiGlobalController";
import LayoutConfig from "presentation/type/LayoutConfig";
import useBrowserLayoutEffect from "presentation/hook/useBrowserLayoutEffect";
import PrivatePage from "presentation/component/page/private";

type PagePropsWithAppDataT<P> = PropsWithChildren<P> & {
    appData: Record<string, unknown>
}

type OptionsT<P> = {
    onPropsReceive: (props: P, container: ContainerT) => void;
    effectCallback?: (container: ContainerT) => Promise<void>;
    roles?: User['role'][];
    layoutConfig?: LayoutConfig;
};

export function createSSGPage<P extends Record<string, unknown>>(
    PageComponent: ComponentType<P>,
    options: OptionsT<P>
): NextPage<P> {
    const {effectCallback, roles, layoutConfig, onPropsReceive} = options;
    const container = appContainerFactory.getInstance();

    const Page: NextPage<P> = (props) => {
        const { appData,  ...restProps } = props as PagePropsWithAppDataT<P>;
        const componentProps = restProps as PropsWithChildren<P>;
        const {user} = useService(AppGlobalController);
        const {handleLayoutUpdateOnRouteChange} = useService(UiGlobalController);
        const isPageAllowedForUser = !roles || roles.includes(user.role);

        useBrowserLayoutEffect(() => {
            container.hydrateData(appData);
            onPropsReceive(componentProps, container);

            handleLayoutUpdateOnRouteChange(layoutConfig);

            if (effectCallback && isPageAllowedForUser) {
                effectCallback(container)
                    .then(() => {})
                    .catch((e) => {
                        Logger.handleError('Unhandled error in "createSSGPage" effect callback', e);
                    });
            }
        }, [])

        return isPageAllowedForUser ? <PageComponent {...componentProps} /> : <PrivatePage/>
    }

    return observer(Page)
}

export const createSSGAction = <
    P extends Record<string, unknown>,
    Q extends ParsedUrlQuery = ParsedUrlQuery
>(
    onRequest: (
        container: ContainerT,
        nextPageContext: GetStaticPropsContext<Q>
    ) => Promise<P>,
    revalidate?: number | boolean,
    redirect?: Redirect,
    notFound?: true
):GetStaticProps<PagePropsWithAppDataT<P>, Q> => {
    return async function getStaticProps(context) {
        const container = appContainerFactory.getInstance(true);
        const data = await onRequest(container, context);

        if (redirect) {
            return {redirect, revalidate};
        }

        if (notFound) {
            return {notFound: true, revalidate};
        }

        return {
            props: {
                ...data,
                appData: container.serializeData(),
            },
            revalidate
        }
    }
}

export type PathListT<
    Q extends ParsedUrlQuery = ParsedUrlQuery
    > = GetStaticPathsResult<Q>['paths']

export const createPathListGenerator = <Q extends ParsedUrlQuery = ParsedUrlQuery>(
    onRequest: (
        container: ContainerT,
        pathsContext: GetStaticPathsContext
    ) => Promise<PathListT<Q>>,
    fallback: boolean | 'blocking' = false
): GetStaticPaths<Q> => {
    return async function getStaticPaths(context) {
        const container = appContainerFactory.getInstance();
        const paths = await onRequest(container, context)

        return {paths, fallback};
    }
}
