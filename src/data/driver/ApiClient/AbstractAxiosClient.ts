import axios from 'axios';
import type { AxiosInstance } from 'axios';
import Logger from 'util/Logger';

const TIMEOUT_ERROR_MESSAGE = 'TimeoutError';

export default abstract class AbstractAxiosClient {
    private readonly _client: AxiosInstance;

    public constructor(apiBaseURL: string) {
        this._client = axios.create({
            baseURL: apiBaseURL,
            timeout: 10000,
            timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
        });

        this.useTimeoutErrorInterceptor();
    }

    private useTimeoutErrorInterceptor(): void {
        this._client.interceptors.response.use(undefined, (error) => {
            if (error?.message === TIMEOUT_ERROR_MESSAGE) {
                Logger.handleError(TIMEOUT_ERROR_MESSAGE, error);
            }

            throw error;
        });
    }

    public get client(): AxiosInstance {
        return this._client;
    }
}
