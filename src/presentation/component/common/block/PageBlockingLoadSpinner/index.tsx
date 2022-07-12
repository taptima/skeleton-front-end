import { FC } from 'react';
import LoadSpinner, { LoadSpinnerPropsT } from 'presentation/component/common/block/LoadSpinner';
import { Wrapper } from './styles';

type PropsT = LoadSpinnerPropsT;

const PageBlockingLoadSpinner: FC<PropsT> = (props) => {
    const { isVisible } = props;

    return (
        <Wrapper isVisible={isVisible}>
            <LoadSpinner {...props} />
        </Wrapper>
    );
};

export default PageBlockingLoadSpinner;
