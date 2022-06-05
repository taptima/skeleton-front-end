import { SerializedStyles } from '@emotion/react';
import { ThemeT } from 'presentation/context/Theme';

export type MainBlockConfigT = {
    css?: (theme: ThemeT) => SerializedStyles;
};

interface LayoutConfig {
    mainBlockConfig?: MainBlockConfigT;
    isLocked?: boolean;
}

export default LayoutConfig;
