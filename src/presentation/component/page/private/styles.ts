import styled from '@emotion/styled';
import BaseLink from 'presentation/component/common/typography/Link';

export const Wrapper = styled.div`
    display: grid;
    place-items: center;
    align-content: center;
    gap: 50px;
    height: 100vh;
`;

export const Title = styled.h1`
    max-width: 390px;
    text-align: center;
`;

export const Link = styled(BaseLink)`
    font-size: 20px;
    text-decoration: underline;
`;
