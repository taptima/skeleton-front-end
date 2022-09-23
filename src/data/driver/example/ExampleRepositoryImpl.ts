import ExampleEntity from 'domain/entity/ExampleEntity';
import ExampleRepository from 'domain/repository/example/ExampleRepository';
import Store from 'data/driver/example/Store';

export default class ExampleRepositoryImpl extends ExampleRepository {
    private store = new Store();

    public getTitle(): string {
        return this.store.title;
    }

    public setTitle(title: string): void {
        this.store.setTitle(title);
    }

    public getEntity(): ExampleEntity {
        return this.store.entity;
    }

    public setEntity(e: ExampleEntity) {
        this.store.setEntity(e);
    }

    public serialize(): Record<string, unknown> {
        return {
            title: this.getTitle(),
            entity: JSON.parse(JSON.stringify(this.getEntity())),
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public hydrate(data: any): void {
        try {
            this.setTitle(data.title);
            this.setEntity(ExampleEntity.Hydrate(data.entity));
        } catch {}
    }
}
