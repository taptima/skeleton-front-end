import { Container as BaseContainer } from 'inversify';
import SerializableRepository from 'framework/SerializableRepository';
import isServer from 'helper/common/isServer';

export default abstract class Container<
    DataT extends Record<string, SerializableRepository> = Record<string, SerializableRepository>,
> extends BaseContainer {
    public parent: Container | null = null;

    constructor() {
        super({
            autoBindInjectable: true,
            defaultScope: 'Singleton',
            skipBaseClassChecks: true,
        });

        this.bindAll();
    }

    protected abstract getData(): DataT;

    protected abstract bindAll(): void;

    public setParent(container: Container): void {
        this.parent = container;
    }

    public getParent(): Container | null {
        return this.parent;
    }

    public serializeData(): Record<keyof DataT, unknown> {
        const data = this.getData();

        return (Object.keys(data) as (keyof DataT)[]).reduce(
            (acc, key) => ({
                ...acc,
                [key]: data[key].serialize(),
            }),
            {} as Record<keyof DataT, unknown>,
        );
    }

    public hydrateData(dataSerialized: Record<keyof DataT, unknown>): void {
        if (isServer()) {
            return;
        }

        const data = this.getData();

        (Object.keys(data) as (keyof DataT)[]).forEach((key) => {
            data[key].hydrate(dataSerialized[key]);
        });
    }
}
