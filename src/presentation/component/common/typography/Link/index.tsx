import { FC } from 'react';
import NextLink from 'next/link';
import { TextPropsT } from 'presentation/component/common/typography/Text';
import { ALink } from './styles';

type PropsT = TextPropsT & {
    href: string;
    isExternalLink?: boolean;
    prefetch?: boolean;
};

const Link: FC<PropsT> = (props) => {
    const { children, prefetch = false, isExternalLink, href, ...restProps } = props;

    if (isExternalLink) {
        return (
            <ALink href={href} rel="noopener noreferrer" target="_blank" {...restProps}>
                {children}
            </ALink>
        );
    }

    return (
        <NextLink href={href} passHref prefetch={prefetch}>
            <ALink {...restProps}>{children}</ALink>
        </NextLink>
    );
};

export default Link;
