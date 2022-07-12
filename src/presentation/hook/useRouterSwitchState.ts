import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import isServer from 'helper/common/isServer';

export default function useRouterSwitchState() {
    const router = useRouter();
    const [isPageLoading, setIsPageLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => setIsPageLoading(true);
        const handleRouteChangeComplete = () => setIsPageLoading(false);

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeComplete);
        };
    }, []);

    if (isServer()) {
        return false;
    }

    return isPageLoading;
}
