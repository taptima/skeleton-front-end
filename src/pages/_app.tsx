import 'reflect-metadata';
import { ReactElement, useRef } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { enableStaticRendering } from 'mobx-react-lite';
import appContainerFactory from 'container/AppContainer';
import isServer from 'helper/common/isServer';
import Logger from 'util/Logger';
import Layout from 'presentation/component/layout';
import { ThemeProvider } from 'presentation/context/Theme';
import { AppContextProvider } from 'presentation/context/Container';
import ContextComposer from 'presentation/context/ContextComposer';
import AppGlobalController from 'presentation/controller/AppGlobalController';
import Seo from 'presentation/component/layout/Seo';

enableStaticRendering(isServer());

const APP_PROVIDERS = [ThemeProvider, AppContextProvider];

function App(props: AppProps): ReactElement {
    const { Component, pageProps } = props;
    const container = appContainerFactory.getInstance();
    const { clientSideInitialAction, appInitialAction } = container.get(AppGlobalController);
    const isInitialActionDone = useRef<boolean>(false);

    if (!isInitialActionDone.current) {
        if (isServer()) {
            appInitialAction()
                .then(() => {})
                .catch((e) => {
                    Logger.handleError('Unhandled error in appInitialAction', e);
                });
        } else {
            clientSideInitialAction()
                .then(() => {})
                .catch((e) => {
                    Logger.handleError('Unhandled error in clientSideInitialAction', e);
                });
        }

        isInitialActionDone.current = true;
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5"
                />
            </Head>
            <ContextComposer components={APP_PROVIDERS}>
                <Seo />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ContextComposer>
        </>
    );
}

export default App;
