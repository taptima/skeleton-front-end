import { ThemeT } from 'presentation/context/Theme/types';

const themeBase: Omit<ThemeT, 'type' | 'colors'> = {
    font: {
        weight: {
            regular: '400',
            bold: '700',
        },
        family: {
            base: 'Arial, sans-serif',
        },
    },
    transition: {
        fast: '200ms',
        normal: '400ms',
        slow: '700ms',
    },
};

export default themeBase;
