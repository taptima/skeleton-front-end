import { AxiosResponse } from 'axios';
import { print } from 'graphql/language/printer';
import type { DocumentNode } from 'graphql/language/ast';
import AbstractAxiosClient from './AbstractAxiosClient';

export type QueryVariables = {
    [key: string]: unknown;
};

export default class GraphQL extends AbstractAxiosClient {
    public async request<ResponseType = unknown, Variables = QueryVariables>(
        query: DocumentNode,
        variables?: Variables,
    ): Promise<AxiosResponse<ResponseType>> {
        return this.client.post<ResponseType>('', {
            query: print(query),
            variables,
        });
    }
}
