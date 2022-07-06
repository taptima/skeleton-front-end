import { makeAutoObservable } from 'mobx';

export default class ExampleStore {
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
