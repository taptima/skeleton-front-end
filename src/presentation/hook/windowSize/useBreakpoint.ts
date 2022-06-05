import { useCallback, useState } from 'react';
import Breakpoint from 'presentation/mediaquery/Breakpoint';
import useWindowResize from 'presentation/hook/windowSize/useWindowResize';

type BreakpointKeyT = keyof typeof Breakpoint;

const breakpointKeys = Object.keys(Breakpoint) as BreakpointKeyT[];
const lastBreakpointKey = breakpointKeys[breakpointKeys.length - 1] as BreakpointKeyT;

export default function useBreakpoint(): Breakpoint {
    const [breakpoint, setBreakpoint] = useState(Breakpoint[lastBreakpointKey]);

    const handleWindowResize = useCallback(() => {
        const currentBreakpointKey =
            breakpointKeys.find((bpKey) => window.innerWidth <= Breakpoint[bpKey] - 1) ||
            lastBreakpointKey;

        setBreakpoint(Breakpoint[currentBreakpointKey]);
    }, []);

    useWindowResize(handleWindowResize, []);

    return breakpoint;
}
