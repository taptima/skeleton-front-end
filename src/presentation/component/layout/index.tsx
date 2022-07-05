import React, { FC } from 'react';
import { Global } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useService } from 'presentation/context/Container';
import UiGlobalController from 'presentation/controller/UiGlobalController';
import globalCss from 'presentation/component/layout/common/globalCss';
import { LayoutWrapper, Main } from './styles';

const Layout: FC = observer((props) => {
    const { children } = props;
    const { mainBlockConfig } = useService(UiGlobalController);

    return (
        <>
            <LayoutWrapper>
                {/* Header */}
                <Main {...mainBlockConfig}>{children}</Main>
                {/* Footer */}
            </LayoutWrapper>
            <Global styles={globalCss} />
        </>
    );
});

export default Layout;
