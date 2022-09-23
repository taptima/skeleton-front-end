import { injectable } from 'inversify';
import SerializableRepository from 'framework/SerializableRepository';
import ExampleEntity from 'domain/entity/ExampleEntity';

@injectable()
export default abstract class ExampleRepository extends SerializableRepository {
    public abstract getTitle(): string;

    public abstract setTitle(title: string): void;

    public abstract getEntity(): ExampleEntity;

    public abstract setEntity(e: ExampleEntity): void;
}
