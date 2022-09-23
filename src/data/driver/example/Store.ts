import { makeAutoObservable } from 'mobx';
import ExampleEntity from 'domain/entity/ExampleEntity';

export default class Store {
    public title = '';

    public entity: ExampleEntity = new ExampleEntity('');

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setEntity(e: ExampleEntity): void {
        this.entity = e;
    }
}
