import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextErrorComponent, { ErrorProps } from 'next/error';
import HttpStatusCode from 'constant/HttpStatusCode';
import isServer from 'helper/common/isServer';
import Logger from 'util/Logger';
import ErrorPage from 'presentation/component/page/error';

export interface AppErrorProps extends ErrorProps {
    err?: Error;
}

/**
 * Status predefined on 404 and 500 pages
 * Other pages take error status from context
 * */
export default function createErrorPage(predefinedStatusCode?: HttpStatusCode) {
    const hasPredefinedStatus = !!predefinedStatusCode;

    const Page: NextPage<AppErrorProps> = (props) => {
        const { statusCode, err } = props;
        const { asPath } = useRouter();

        useEffect(() => {
            Logger.handleError(`On error page, client side ${asPath} page`, err);
        }, []);

        return <ErrorPage statusCode={predefinedStatusCode || statusCode} />;
    };

    if (!hasPredefinedStatus) {
        Page.getInitialProps = async (ctx) => {
            const errorProps: ErrorProps = await NextErrorComponent.getInitialProps(ctx);
            const errorInitialProps: AppErrorProps = {
                err: ctx.err || undefined,
                ...errorProps,
            };

            if (ctx.err) {
                Logger.handleError(
                    `On error page, ${isServer() ? 'server' : 'client'} side`,
                    ctx.err,
                );

                return errorInitialProps;
            }

            Logger.handleError(`_error.tsx getInitialProps missing data at path: ${ctx.asPath}`);

            return errorInitialProps;
        };
    }

    return Page;
}
