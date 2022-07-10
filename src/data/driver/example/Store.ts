import { makeAutoObservable } from 'mobx';

export default class Store {
    public title = '';

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public setTitle(title: string): void {
        this.title = title;
    }
}
