import styled from '@emotion/styled';
import Text from 'presentation/component/common/typography/Text';

// eslint-disable-next-line import/prefer-default-export
export const BaseLink = styled(Text)`
    width: fit-content;
    transition: opacity ${({ theme }) => theme.transition.fast},
        transform ${({ theme }) => theme.transition.fast};
    outline: none;

    &:hover {
        opacity: 0.8;
    }

    &:focus-visible {
        text-decoration: underline;
    }

    &:active {
        transform: scale(0.95);
    }
`.withComponent('a');
