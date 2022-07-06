import ExampleRepository from 'domain/repository/example/ExampleRepository';
import ExampleStore from 'data/store/ExampleStore';

export default class ExampleRepositoryImpl extends ExampleRepository {
    private store = new ExampleStore();

    public getTitle(): string {
        return this.store.title;
    }

    public setTitle(title: string): void {
        this.store.setTitle(title);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public hydrate(data: any): void {
        try {
            this.setTitle(data.title);
        } catch {}
    }

    public serialize(): Record<string, unknown> {
        return {
            title: this.getTitle(),
        };
    }
}
