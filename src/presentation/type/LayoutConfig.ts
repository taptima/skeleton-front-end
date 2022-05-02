import SerializedCssT from 'presentation/type/SerializedCssT';

export type MainBlockConfigT = SerializedCssT & {
    isWithContainer: boolean;
};

interface LayoutConfig {
    mainBlockConfig?: MainBlockConfigT;
    isLocked?: boolean;
}

export default LayoutConfig;
