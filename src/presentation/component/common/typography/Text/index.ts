import styled from '@emotion/styled';
import { ColorKeyT, FontWeightKeyT, FontFamilyKeyT } from 'presentation/context/Theme/keys';

export type TextPropsT = {
    size?: number;
    color?: ColorKeyT;
    weight?: FontWeightKeyT;
    family?: FontFamilyKeyT;
    opacity?: number;
};

const Text = styled.span<TextPropsT>`
    opacity: ${({ opacity = 1 }) => opacity};
    color: ${({ theme, color }) => (color ? theme.colors[color] : 'inherit')};
    font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
    font-weight: ${({ theme, weight }) => (weight ? theme.font.weight[weight] : 'inherit')};
    font-family: ${({ theme, family }) => (family ? theme.font.family[family] : 'inherit')};
`;

export default Text;
