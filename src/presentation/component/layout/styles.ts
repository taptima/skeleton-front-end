import styled from '@emotion/styled';
import { MainBlockConfigT } from 'presentation/type/LayoutConfig';

export const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Main = styled.main<MainBlockConfigT>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    ${({ theme, css: mainCss }) => mainCss && mainCss(theme)}
`;
