import { css, SerializedStyles } from '@emotion/react';
import Breakpoint from './Breakpoint';

const lower = (bp: Breakpoint): string => `(max-width: ${bp - 1}px)`;
const greater = (bp: Breakpoint): string => `(min-width: ${bp}px)`;
const rules = {
    lowerXs: lower(Breakpoint.Xs),
    lowerSm: lower(Breakpoint.Sm),
    lowerMd: lower(Breakpoint.Md),
    lowerLg: lower(Breakpoint.Lg),
    lowerXl: lower(Breakpoint.Xl),
    greaterXs: greater(Breakpoint.Xs),
    greaterSm: greater(Breakpoint.Sm),
    greaterMd: greater(Breakpoint.Md),
    greaterLg: greater(Breakpoint.Lg),
    greaterXl: greater(Breakpoint.Xl),
};

type BreakpointKeyT = keyof typeof Breakpoint;
type RuleT = keyof typeof rules;

/**
 * @example
 *
 *  styled.div`
 *      ${mq.lowerSm} {
 *          color: red;
 *      }
 *  `;
 *
 * // same as above
 *  styled.div`
 *      @media (max-width: ${Breakpoint.Sm}) {
 *          color: red;
 *      }
 *  `;
 * */
export const mq = (Object.keys(rules) as RuleT[]).reduce(
    (acc, bp) => ({
        ...acc,
        [bp]: `@media ${rules[bp]}`,
    }),
    {} as Record<RuleT, string>,
);

/**
 * @example
 *
 * styled.div`${hidden.lowerSm}`;
 *
 * // same as above
 * styled.div`
 *     @media (max-width: ${Breakpoint.Sm}) {
 *         display: none;
 *     }
 * `;
 * */
export const hidden = (Object.keys(mq) as RuleT[]).reduce(
    (acc, bp) => ({
        ...acc,
        [bp]: css`
            ${mq[bp]} {
                display: none;
            }
        `,
    }),
    {} as Record<RuleT, SerializedStyles>,
);

/**
 * @example
 *
 * styled.div`
 *     ${mqBetween('Sm', 'Md')} {
 *         color: red;
 *     }
 * `
 *
 * // same as above
 * styled.div`
 *     @media (min-width: ${Breakpoint.Sm} and max-width: ${Breakpoint.Md}) {
 *         color: red;
 *     }
 * `
 * */
export const mqBetween = (bpFrom: BreakpointKeyT, bpTo: BreakpointKeyT): string => {
    return `@media ${greater(Breakpoint[bpFrom])} and ${lower(Breakpoint[bpTo])}`;
};
