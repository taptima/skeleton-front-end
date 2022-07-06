import { injectable } from 'inversify';
import SerializableRepository from 'framework/SerializableRepository';

@injectable()
export default abstract class ExampleRepository extends SerializableRepository {
    public abstract getTitle(): string;

    public abstract setTitle(title: string): void;
}
