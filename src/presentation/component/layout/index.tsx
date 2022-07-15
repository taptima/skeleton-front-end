import { FC } from 'react';
import { Global } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useService } from 'presentation/context/Container';
import UiGlobalController from 'presentation/controller/UiGlobalController';
import globalCss from 'presentation/component/layout/common/globalCss';
import PageBlockingLoadSpinner from 'presentation/component/common/block/PageBlockingLoadSpinner';
import useRouterSwitchState from "presentation/hook/useRouterSwitchState";
import { LayoutWrapper, Main } from './styles';

const Layout: FC = observer((props) => {
    const { children } = props;
    const { mainBlockConfig } = useService(UiGlobalController);
    const routerSwitchState = useRouterSwitchState();

    return (
        <>
            <LayoutWrapper>
                {/* Header */}
                <Main {...mainBlockConfig}>{children}</Main>
                {/* Footer */}
                <PageBlockingLoadSpinner isVisible={routerSwitchState}/>
            </LayoutWrapper>
            <Global styles={globalCss} />
        </>
    );
});

export default Layout;
