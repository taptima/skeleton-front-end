import { injectable } from 'inversify';
import ReactiveState from 'util/ReactiveState';
import LayoutConfig from 'presentation/type/LayoutConfig';

const DEFAULT_UI_CONFIG: LayoutConfig = {
    variant: 'standard',
};

@injectable()
export default class UiGlobalController {
    private readonly _config = new ReactiveState<LayoutConfig>(DEFAULT_UI_CONFIG);

    public get uiConfig(): LayoutConfig {
        return this._config.state;
    }

    public setLayoutConfig = (config: LayoutConfig): void => {
        this._config.state = config;
    };

    public handleLayoutUpdateOnRouteChange = (config?: LayoutConfig): void => {
        this.setLayoutConfig(config || DEFAULT_UI_CONFIG);
    };
}
