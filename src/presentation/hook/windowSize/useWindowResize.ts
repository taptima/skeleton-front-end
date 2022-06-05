import { DependencyList, useEffect } from 'react';

export default function useWindowResize(callback: () => void, deps?: DependencyList): void {
    useEffect(() => {
        window.addEventListener('resize', callback, { passive: true });
        callback();

        return () => {
            window.removeEventListener('resize', callback);
        };
    }, deps);
}
