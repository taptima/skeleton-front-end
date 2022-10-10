import { injectable } from 'inversify';
import { AxiosInstance } from 'axios';
import HttpStatusCode from 'constant/HttpStatusCode';
import type { Mutex } from 'async-mutex';
import CredentialsResponseDTO from 'data/DTO/auth/CredentialsResponseDTO';
import Credentials from 'data/AbstractApiClient/Credentials';
import AbstractApiClient from 'data/AbstractApiClient';
import REST from './REST';
import GraphQL from './GraphQL';
import {
    API_BASE_URL,
    CREDENTIALS_LOCAL_STORAGE_NAME,
    GRAPHQL_ENDPOINT,
    REFRESH_TOKENS_ENDPOINT,
    REST_ENDPOINT,
} from './constant';

@injectable()
export default class ApiClient implements AbstractApiClient {
    public graphql: GraphQL;

    public graphqlWithAuthorization: GraphQL;

    public rest: REST;

    public restWithAuthorization: REST;

    private credentials?: Credentials;

    private mutex: Mutex | null = null;

    constructor() {
        const restApiUrl = `${API_BASE_URL}/${REST_ENDPOINT}`;
        const graphqlApiUrl = `${API_BASE_URL}/${GRAPHQL_ENDPOINT}`;

        this.rest = new REST(restApiUrl);
        this.restWithAuthorization = new REST(restApiUrl);
        this.graphql = new GraphQL(graphqlApiUrl);
        this.graphqlWithAuthorization = new GraphQL(graphqlApiUrl);

        this.useCredentialsInterceptor(this.restWithAuthorization.client);
        this.useCredentialsInterceptor(this.graphqlWithAuthorization.client);

        this.useRefreshCredentialsInterceptor(this.restWithAuthorization.client);
        this.useRefreshCredentialsInterceptor(this.graphqlWithAuthorization.client);

        this.initCredentials();
    }

    public initCredentials(): void {
        const credentials = ApiClient.getCredentialsFromLocalStorage();

        if (credentials) {
            this.setCredentials(credentials);
        }
    }

    public setCredentials(credentials: Credentials, isRemember = false): void {
        this.credentials = credentials;

        if (isRemember) {
            localStorage.setItem(CREDENTIALS_LOCAL_STORAGE_NAME, JSON.stringify(credentials));
        }
    }

    public resetCredentials(): void {
        this.credentials = undefined;
        localStorage.removeItem(CREDENTIALS_LOCAL_STORAGE_NAME);
    }

    private static getCredentialsFromLocalStorage(): Credentials | undefined {
        try {
            const localStorageContent = localStorage.getItem(CREDENTIALS_LOCAL_STORAGE_NAME);
            const { access, refresh } = JSON.parse(localStorageContent || '');

            return new Credentials(access, refresh);
        } catch {}
    }

    public isCredentialsPresent(): boolean {
        return typeof this.credentials !== 'undefined';
    }

    public async refreshCredentials(): Promise<void> {
        if (this.mutex === null) {
            const { Mutex } = await import('async-mutex');

            this.mutex = new Mutex();
        }

        if (this.mutex.isLocked()) {
            return this.mutex.waitForUnlock();
        }

        await this.mutex.runExclusive(() => this._refreshCredentials());
    }

    private async _refreshCredentials(): Promise<void> {
        if (!this.credentials?.refresh) {
            return Promise.reject(new Error('Refresh token is not defined'));
        }

        try {
            const { data } = await this.rest.post<CredentialsResponseDTO>(REFRESH_TOKENS_ENDPOINT, {
                refresh_token: this.credentials.refresh,
            });
            const credentials = AbstractApiClient.decode(
                CredentialsResponseDTO,
                undefined,
                ({ token, refresh_token }) => new Credentials(token, refresh_token),
                data,
            );

            if (credentials === undefined) {
                throw new Error('Cannot decode API response');
            }

            this.setCredentials(credentials, !!ApiClient.getCredentialsFromLocalStorage());
        } catch (e) {
            this.resetCredentials();

            return Promise.reject(e);
        }
    }

    private useCredentialsInterceptor(client: AxiosInstance) {
        client.interceptors.request.use((request) => {
            if (this.credentials?.access && request.headers) {
                request.headers.Authorization = `Bearer ${this.credentials.access}`;
            }

            return request;
        }, Promise.reject);
    }

    private useRefreshCredentialsInterceptor(client: AxiosInstance) {
        client.interceptors.response.use(undefined, async (error) => {
            try {
                if (error.response.status === HttpStatusCode.Unauthorized) {
                    await this.refreshCredentials();

                    return await client.request(error.config);
                }

                throw error;
            } catch (e) {
                return Promise.reject(error);
            }
        });
    }
}
