import Breakpoint from 'presentation/mediaquery/Breakpoint';
import useBreakpoint from 'presentation/hook/windowSize/useBreakpoint';

export default function useBreakpointCondition(
    breakpointKey: keyof typeof Breakpoint,
    direction: 'isLower' | 'isGreater' = 'isLower',
): boolean {
    const isLowerBreakpoint = useBreakpoint() <= Breakpoint[breakpointKey];

    return direction === 'isLower' ? isLowerBreakpoint : !isLowerBreakpoint;
}
