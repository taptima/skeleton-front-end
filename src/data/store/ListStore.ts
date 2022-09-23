import { makeObservable, observable, action } from 'mobx';
import List from 'domain/entity/List';
import KeyableEntity from 'domain/entity/KeyableEntity';

export default class ListStore<T extends KeyableEntity> {
    public list = List.CreateEmpty<T>();

    constructor() {
        makeObservable(this, {
            list: observable,
            setList: action.bound,
        });
    }

    public setList(list: List<T>): void {
        this.list = list;
    }
}
