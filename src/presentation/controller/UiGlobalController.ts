import { injectable } from 'inversify';
import ReactiveState from 'util/ReactiveState';
import LayoutConfig, { MainBlockConfigT } from 'presentation/type/LayoutConfig';

const MAIN_BLOCK_INITIAL_CONFIG: MainBlockConfigT = {
    css: undefined,
};

@injectable()
export default class UiGlobalController {
    private readonly _privacyLock = new ReactiveState<LayoutConfig['isLocked']>(false);

    private readonly _mainContentConfig = new ReactiveState<MainBlockConfigT>(
        MAIN_BLOCK_INITIAL_CONFIG,
    );

    public get isPrivacyLocked() {
        return this._privacyLock.state;
    }

    public get mainBlockConfig(): MainBlockConfigT {
        return this._mainContentConfig.state;
    }

    public setIsPagePrivacyLocked = (isLocked: LayoutConfig['isLocked']): void => {
        this._privacyLock.state = isLocked;
    };

    public setMainBlockConfig = (config?: MainBlockConfigT): void => {
        this._mainContentConfig.state = config || MAIN_BLOCK_INITIAL_CONFIG;
    };

    public handleLayoutUpdateOnRouteChange = (config?: LayoutConfig): void => {
        const { mainBlockConfig } = config || {};

        if (mainBlockConfig) {
            this.setMainBlockConfig(mainBlockConfig);
        }
    };
}
