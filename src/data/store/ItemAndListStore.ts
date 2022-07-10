import { action, makeObservable, observable } from 'mobx';
import KeyableEntity from 'domain/entity/KeyableEntity';
import ListStore from 'data/store/ListStore';

export default class ItemAndListStore<T extends KeyableEntity> extends ListStore<T> {
    public item: T | undefined;

    constructor() {
        super();

        makeObservable(this, {
            item: observable,
            setItem: action.bound,
        });
    }

    public setItem(item: T): void {
        this.item = item;
    }
}
