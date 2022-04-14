import Breakpoint from 'presentation/mediaquery/Breakpoint';
import useBreakpoint from 'presentation/hook/windowSize/useBreakpoint';

export default function useBreakpointIsLower(breakpointKey: keyof typeof Breakpoint): boolean {
    return useBreakpoint() <= Breakpoint[breakpointKey];
}
