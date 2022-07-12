import { injectable } from 'inversify';
import ReactiveState from 'util/ReactiveState';
import LayoutConfig, { MainBlockConfigT } from 'presentation/type/LayoutConfig';

const MAIN_INITIAL: MainBlockConfigT = {
    css: undefined,
};

@injectable()
export default class UiGlobalController {
    private readonly _mainContentConfig = new ReactiveState<MainBlockConfigT>(MAIN_INITIAL);

    public get mainBlockConfig(): MainBlockConfigT {
        return this._mainContentConfig.state;
    }

    public setMainBlockConfig = (config?: MainBlockConfigT): void => {
        this._mainContentConfig.state = config || MAIN_INITIAL;
    };

    public handleLayoutUpdateOnRouteChange = (config?: LayoutConfig): void => {
        this.setMainBlockConfig(config?.mainBlockConfig);
    };
}
