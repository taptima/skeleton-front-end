import { inject, injectable } from 'inversify';
import AppRepository from 'domain/repository/app/AppRepository';

@injectable()
export default class AppGlobalController {
    @inject(AppRepository)
    private readonly appRepository!: AppRepository;

    public get user() {
        return this.appRepository.getUser();
    }

    /**
     * Calls on page initialization. It will work before
     * 'getInitialProps' action on server side.
     * */
    public appInitialAction = async (): Promise<void> => {};

    /**
     * Calls on client side once.
     * */
    public clientSideInitialAction = async (): Promise<void> => {};
}
