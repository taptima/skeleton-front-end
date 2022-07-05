import Container from 'framework/Container';
import ContainerFactory from 'framework/ContainerFactory';
import SerializableRepository from 'framework/SerializableRepository';
import AppRepository from 'domain/repository/app/AppRepository';
import AppRepositoryImpl from 'data/driver/app/AppRepositoryImpl';

class AppContainer extends Container {
    /**
     * Returns object to be serialized & hydrated
     * */
    // eslint-disable-next-line class-methods-use-this
    protected getData(): Record<string, SerializableRepository> {
        return {};
    }

    /**
     * Binds abstract classes to its implementation
     * */
    protected bindAll() {
        this.bind(AppRepository).to(AppRepositoryImpl);
    }
}

const appContainerFactory = new ContainerFactory(AppContainer);

export type ContainerT = ReturnType<typeof appContainerFactory.getInstance>

export default appContainerFactory;
