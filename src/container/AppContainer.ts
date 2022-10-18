import Container from 'framework/Container';
import ContainerFactory from 'framework/ContainerFactory';
// repository
import SerializableRepository from 'framework/SerializableRepository';
import AppRepository from 'domain/repository/app/AppRepository';
// implementation
import AppRepositoryImpl from 'data/driver/app/AppRepositoryImpl';
// api client
import ApiClient from 'data/driver/ApiClient';
import AbstractApiClient from 'data/AbstractApiClient';

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
        this.bind(AbstractApiClient).to(ApiClient);
        this.bind(AppRepository).to(AppRepositoryImpl);
    }
}

const appContainerFactory = new ContainerFactory(AppContainer);

export type ContainerT = ReturnType<typeof appContainerFactory.getInstance>;

export default appContainerFactory;
