import React, { Component, createContext, useContext } from 'react';
import { interfaces } from 'inversify';
import appContainerFactory from 'container/AppContainer';
import Container from 'framework/Container';

const ContainerContext = createContext(undefined as unknown as Container);

export class AppContextProvider<P> extends Component<P> {
    public static contextType = ContainerContext;

    private container = appContainerFactory.getInstance();

    constructor(props: P, parentContainer?: Container) {
        super(props);

        if (parentContainer) {
            this.container.setParent(parentContainer);
        }
    }

    render() {
        const { children } = this.props;

        return (
            <ContainerContext.Provider value={this.container}>{children}</ContainerContext.Provider>
        );
    }
}

export function useService<T>(Service: interfaces.ServiceIdentifier<T>) {
    const container = useContext(ContainerContext);

    return container.get<T>(Service);
}
