import { makeAutoObservable } from 'mobx';
import uniqBy from 'helper/array/uniqBy';
import KeyableEntity from './KeyableEntity';

export default class List<T extends KeyableEntity = KeyableEntity> {
    public static CreateEmpty<K extends KeyableEntity = KeyableEntity>() {
        return new List<K>();
    }

    public static Hydrate<K extends KeyableEntity = KeyableEntity>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any,
        hydrateListData: (data: unknown) => K,
    ): List<K> {
        try {
            return new List<K>(
                data.listData.map((item: unknown) => hydrateListData(item)),
                data.currentPage,
                data.listLastPage,
                data.listItemsPerPage,
                data.listTotalCount,
            );
        } catch {
            return this.CreateEmpty<K>();
        }
    }

    private isListLoading = false;

    constructor(
        private listData: T[] = [],
        private currentPage = 1,
        private listLastPage = 1,
        private listItemsPerPage = 1,
        private listTotalCount = 1,
    ) {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public get page() {
        return this.currentPage;
    }

    public get data(): T[] {
        return this.listData;
    }

    public get isEmpty(): boolean {
        return this.listData.length === 0;
    }

    public get isLoading(): boolean {
        return this.isListLoading;
    }

    public get itemsPerPage(): number {
        return this.listItemsPerPage;
    }

    public get lastPage(): number {
        return this.listLastPage;
    }

    public get totalCount(): number {
        return this.listTotalCount;
    }

    public get hasMore(): boolean {
        return this.page < this.lastPage;
    }

    public increasePage(): void {
        this.currentPage++;
    }

    public setPage(page: number): void {
        this.currentPage = page;
    }

    public append(data: T[]): void {
        this.listData = uniqBy([...this.listData, ...data], 'id');
    }

    public prepend(data: T[]): void {
        this.listData = uniqBy([...data, ...this.listData], 'id');
    }

    public remove(id: T['id']): void {
        this.listData = this.listData.filter((item) => item.id !== id);
    }

    public setData(data: T[]): void {
        this.listData = data;
        this.isListLoading = false;
    }

    public clear(): void {
        this.currentPage = 0;
        this.listData = [];
        this.isListLoading = false;
    }

    public replaceWithNew(list: List<T>): void {
        this.currentPage = list.page;
        this.listData = list.data;
        this.listLastPage = list.lastPage;
        this.isListLoading = list.isListLoading;
        this.listItemsPerPage = list.itemsPerPage;
    }

    public replaceItemData(item: T): void {
        this.listData = this.listData.map((mapItem) => (mapItem.id === item.id ? item : mapItem));
    }

    public setIsLoading(isLoading: boolean): void {
        this.isListLoading = isLoading;
    }

    public setLastPage(lastPage: number): void {
        this.listLastPage = lastPage;
    }

    public setItemPerPage(amount: number): void {
        this.listItemsPerPage = amount;
    }

    public setTotalCount(count: number): void {
        this.listTotalCount = count;
    }
}
