import { useRef } from 'react';
import type Container from 'framework/Container';
import isServer from 'helper/common/isServer';

export default function useHydrateData(container: Container, appData?: Record<string, unknown>) {
    const isAppDataHydrated = useRef<boolean>(false);

    if (!isAppDataHydrated.current && appData && !isServer()) {
        container.hydrateData(appData);
        isAppDataHydrated.current = true;
    }
}
