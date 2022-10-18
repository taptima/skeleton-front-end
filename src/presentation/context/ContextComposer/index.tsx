import { FC, JSXElementConstructor, PropsWithChildren, ReactNode } from 'react';

type PropsT = {
    components: JSXElementConstructor<PropsWithChildren<unknown>>[];
    children: ReactNode;
};

const ContextComposer: FC<PropsT> = (props) => {
    const { components = [], children } = props;

    return (
        <>
            {components.reduceRight(
                (AccumulatedComponents, CurrentComponent) => (
                    <CurrentComponent>{AccumulatedComponents}</CurrentComponent>
                ),
                children,
            )}
        </>
    );
};

export default ContextComposer;
