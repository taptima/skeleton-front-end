import { MutableRefObject, useEffect } from 'react';

const useClickAwayListener = (
    ref: MutableRefObject<null> | MutableRefObject<HTMLElement>,
    handler: () => void,
    isCapture?: boolean,
): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref?.current && !ref?.current.contains(event.target as Node) && handler) {
                handler();
            }
        };
        document.addEventListener('mousedown', handleClickOutside, { capture: isCapture });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, { capture: isCapture });
        };
    }, [ref, handler]);
};

export default useClickAwayListener;
