import { useCallback, useState } from 'react';
import Breakpoint from 'presentation/mediaquery/Breakpoint';
import useWindowResize from 'presentation/hook/windowSize/useWindowResize';

type BreakpointKeyT = keyof typeof Breakpoint;

/**
 * TODO: Set biggest breakpoint on 11 and 16 lines and remove this annotation
 * */
export default function useBreakpoint(): Breakpoint {
    const [breakpoint, setBreakpoint] = useState(Breakpoint.Xl);

    const handleWindowResize = useCallback(() => {
        const breakpointKeys = Object.keys(Breakpoint) as BreakpointKeyT[];
        const currentBreakpointKey =
            breakpointKeys.find((bpKey) => window.innerWidth <= Breakpoint[bpKey]) || 'Xl';

        setBreakpoint(Breakpoint[currentBreakpointKey]);
    }, []);

    useWindowResize(handleWindowResize, []);

    return breakpoint;
}
