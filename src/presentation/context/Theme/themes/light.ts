import { ThemeT, ThemeVariant } from 'presentation/context/Theme/types';
import themeBase from './themeBase';

const light: ThemeT = {
    ...themeBase,
    type: ThemeVariant.Light,
    colors: {
        base: '#FFFFFF',
        text: '#000000',
    },
};

export default light;
