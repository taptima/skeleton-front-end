import 'reflect-metadata';
import { ReactElement, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { enableStaticRendering } from 'mobx-react-lite';
import appContainerFactory from 'container/AppContainer';
import isServer from 'helper/common/isServer';
import Logger from 'util/Logger';
import Layout from 'presentation/component/layout';
import { ThemeProvider } from 'presentation/context/Theme';
import { AppContextProvider } from 'presentation/context/Container';
import AppGlobalController from 'presentation/controller/AppGlobalController';

enableStaticRendering(isServer());

const TITLE = 'Title';
const DESCRIPTION = 'Description';

function App(props: AppProps): ReactElement {
    const { Component, pageProps } = props;
    const container = appContainerFactory.getInstance();
    const { clientSideInitialAction, appInitialAction } = container.get(AppGlobalController);
    const [isInitialActionDone, setIsInitialActionDone] = useState(false);

    if (!isInitialActionDone) {
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

        setIsInitialActionDone(true);
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5"
                />
                <meta name="description" key="description" content={DESCRIPTION} />
                <title>{TITLE}</title>
            </Head>
            <ThemeProvider>
                <AppContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AppContextProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
