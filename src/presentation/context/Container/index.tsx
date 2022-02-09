import React, { Component, ComponentType, createContext, useContext } from 'react';
import { interfaces } from 'inversify';
import Container from 'framework/Container';
import ContainerFactory from 'framework/ContainerFactory';

const ContainerContext = createContext(undefined as unknown as Container);

export function withContainerContext(containerFactory: ContainerFactory) {
    return function WithContainerContext<P>(WrappedComponent: ComponentType<P>): ComponentType<P> {
        class ComponentWithContainerContext extends Component<P> {
            public static contextType = ContainerContext;

            private container = containerFactory.getInstance();

            constructor(props: P, parentContainer?: Container) {
                super(props);

                if (parentContainer) {
                    this.container.setParent(parentContainer);
                }
            }

            render() {
                return (
                    <ContainerContext.Provider value={this.container}>
                        <WrappedComponent {...this.props} />
                    </ContainerContext.Provider>
                );
            }
        }

        return ComponentWithContainerContext;
    };
}

export function useService<T>(Service: interfaces.ServiceIdentifier<T>) {
    const container = useContext(ContainerContext);

    return container.get<T>(Service);
}
