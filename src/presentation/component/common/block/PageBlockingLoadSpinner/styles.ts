import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { rgba } from 'polished';

type WrapperPropsT = {
    isVisible: boolean;
};

const show = keyframes`
    0% {
	    opacity: 0;
    }
	1% {
		z-index: 1000000;
	}
    100% {
	    opacity: 1;
        z-index: 1000000;
    }
`;

const hide = keyframes`
    0% {
	    opacity: 1000000;
    }
	99% {
        z-index: 1000000;
	}
    100% {
        opacity: 0;
        z-index: -1;
    }
`;

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div<WrapperPropsT>`
    position: fixed;
    background-color: ${({ theme }) => rgba(theme.colors.text, 0.3)};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity ${({ theme }) => theme.transition.slow};

    animation-name: ${({ isVisible }) => (isVisible ? show : hide)};
    animation-duration: ${({ theme }) => theme.transition.normal};
    animation-timing-function: linear;
    animation-fill-mode: forwards;
`;
