import { inject, injectable } from 'inversify';
import ExampleRepository from 'domain/repository/example/ExampleRepository';

@injectable()
export default class Controller {
    @inject(ExampleRepository)
    private readonly exampleRepository!: ExampleRepository;

    public get title(): string {
        return this.exampleRepository.getTitle();
    }

    public initialAction = async (): Promise<void> => {
        this.exampleRepository.setTitle('Static page example');
    };
}
