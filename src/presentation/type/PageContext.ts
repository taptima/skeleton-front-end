import { NextPageContext } from 'next';

export type PageContextT<Q = unknown> = Omit<NextPageContext, 'query'> & {
    query: Q;
};
