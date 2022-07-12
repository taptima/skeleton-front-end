import { FC, HTMLAttributes } from 'react';
import { Wrapper, WrapperPropsT, Spinner, LoaderCssPropsT } from './styles';

export type LoadSpinnerPropsT = HTMLAttributes<HTMLDivElement> &
    Partial<LoaderCssPropsT> &
    WrapperPropsT;

const LoadSpinner: FC<LoadSpinnerPropsT> = (props) => {
    const { size = 160, sizeXl, sizeMd, sizeSm, color, ...restProps } = props;

    return (
        <Wrapper {...restProps}>
            <Spinner size={size} sizeXl={sizeXl} sizeMd={sizeMd} sizeSm={sizeSm} color={color}>
                <span />
                <span />
                <span />
            </Spinner>
        </Wrapper>
    );
};

export default LoadSpinner;
