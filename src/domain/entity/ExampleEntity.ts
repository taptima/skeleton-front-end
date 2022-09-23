export default class ExampleEntity {
    public static Hydrate(data: Record<string, never>): ExampleEntity {
        try {
            return new ExampleEntity(data.title ?? '');
        } catch (e) {
            return new ExampleEntity('');
        }
    }

    constructor(public readonly title: string) {}

    public get doubleTitle(): string {
        return `${this.title} ${this.title}`;
    }
}
