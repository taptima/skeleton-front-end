export default abstract class SerializableRepository {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract serialize(): Record<string, unknown>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract hydrate(data: any): void;
}
