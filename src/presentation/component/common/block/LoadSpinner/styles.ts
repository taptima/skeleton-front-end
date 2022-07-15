import styled from '@emotion/styled';
import { ColorKeyT } from 'presentation/context/Theme/keys';
import { mq } from 'presentation/mediaquery';

export type WrapperPropsT = {
    isVisible: boolean;
};

export const Wrapper = styled('div', {
    shouldForwardProp(propName: PropertyKey): boolean {
        return propName !== 'isVisible';
    },
})<WrapperPropsT>`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity ${({ theme }) => theme.transition.fast};
`;

export type LoaderCssPropsT = {
    size: number;
    sizeXl?: number;
    sizeMd?: number;
    sizeSm?: number;
    color?: ColorKeyT;
};

export const Spinner = styled.div<LoaderCssPropsT>`
    --loader-size: ${({ size }) => size}px;
    --loader-width: 8px;

    position: relative;
    display: inline-block;
    width: var(--loader-size);
    height: var(--loader-size);

    ${mq.lowerLg} {
        --loader-size: ${({ size, sizeXl }) => sizeXl ?? size}px;
    }

    ${mq.lowerMd} {
        --loader-size: ${({ size, sizeXl, sizeMd }) => sizeMd ?? sizeXl ?? size}px;
        --loader-width: 6px;
    }

    ${mq.lowerSm} {
        --loader-size: ${({ size, sizeXl, sizeMd, sizeSm }) =>
            sizeSm ?? sizeMd ?? sizeXl ?? size}px;
    }

    & span {
        position: absolute;
        display: block;
        width: calc(var(--loader-size) * 0.9);
        height: calc(var(--loader-size) * 0.9);
        margin: 8px;
        border: var(--loader-width) solid transparent;
        border-radius: 50%;
        border-left-color: ${({ theme, color }) => theme.colors[color || 'text']};
        animation: round-wrap 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    }

    & span:nth-of-type(1) {
        animation-delay: -0.45s;
    }

    & span:nth-of-type(2) {
        animation-delay: -0.3s;
    }

    & span:nth-of-type(3) {
        animation-delay: -0.15s;
    }

    @keyframes round-wrap {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
