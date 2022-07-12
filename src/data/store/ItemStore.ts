import { makeObservable, observable, action } from 'mobx';

export default class ItemStore<T> {
    public item: T | undefined;

    constructor() {
        makeObservable(this, {
            item: observable,
            setItem: action.bound,
        });
    }

    public setItem(item: T): void {
        this.item = item;
    }
}
