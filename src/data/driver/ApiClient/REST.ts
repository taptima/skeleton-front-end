import AbstractAxiosClient from './AbstractAxiosClient';

export default class REST extends AbstractAxiosClient {
    public post = this.client.post;

    public get = this.client.get;
}
