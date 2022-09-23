import { inject, injectable } from 'inversify';
import ExampleEntity from 'domain/entity/ExampleEntity';
import ExampleRepository from 'domain/repository/example/ExampleRepository';

@injectable()
export default class Controller {
    @inject(ExampleRepository)
    private readonly exampleRepository!: ExampleRepository;

    public get title(): string {
        return this.exampleRepository.getTitle();
    }

    public get entity(): ExampleEntity {
        return this.exampleRepository.getEntity();
    }

    public initialAction = async (): Promise<void> => {
        this.exampleRepository.setTitle('Home page example');
        this.exampleRepository.setEntity(new ExampleEntity('Home entity page example'));
    };
}
