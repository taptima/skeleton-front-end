import { DependencyList, EffectCallback, useEffect, useLayoutEffect } from 'react';
import isServer from 'helper/common/isServer';

export default function useBrowserLayoutEffect(effect: EffectCallback, deps?: DependencyList) {
    if (isServer()) {
        useEffect(effect, deps);
    } else {
        useLayoutEffect(effect, deps);
    }
}
