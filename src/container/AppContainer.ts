import Container from 'framework/Container';
import ContainerFactory from 'framework/ContainerFactory';
// repository
import SerializableRepository from 'framework/SerializableRepository';
import AppRepository from 'domain/repository/app/AppRepository';
import ExampleRepository from 'domain/repository/example/ExampleRepository';
// implementation
import AppRepositoryImpl from 'data/driver/app/AppRepositoryImpl';
import ExampleRepositoryImpl from 'data/driver/example/ExampleRepositoryImpl';

class AppContainer extends Container {
    /**
     * Returns object to be serialized & hydrated
     * */
    protected getData(): Record<string, SerializableRepository> {
        return {
            exampleRepository: this.get(ExampleRepository),
        };
    }

    /**
     * Binds abstract classes to its implementation
     * */
    protected bindAll() {
        this.bind(AppRepository).to(AppRepositoryImpl);
        this.bind(ExampleRepository).to(ExampleRepositoryImpl);
    }
}

const appContainerFactory = new ContainerFactory(AppContainer);

export type ContainerT = ReturnType<typeof appContainerFactory.getInstance>;

export default appContainerFactory;
