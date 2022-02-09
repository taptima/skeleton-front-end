export enum ThemeVariant {
    Light,
}

export type ColorT = {
    base: string;
    text: string;
};

export type FontWeightT = {
    regular: string;
    bold: string;
};

export type FontFamilyT = {
    base: string;
};

export type ThemeT = {
    type: ThemeVariant;
    colors: ColorT;
    font: {
        weight: FontWeightT;
        family: FontFamilyT;
    };
    transition: {
        fast: string;
        normal: string;
        slow: string;
    };
};
