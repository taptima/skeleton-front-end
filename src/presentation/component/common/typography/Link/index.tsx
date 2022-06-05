import { FC } from 'react';
import NextLink, { LinkProps } from 'next/link';
import { TextPropsT } from 'presentation/component/common/typography/Text';
import { BaseLink } from './styles';

type NextLinkPropsT = Omit<LinkProps, 'passHref' | 'as' | 'href'>;

type PropsT = TextPropsT &
    NextLinkPropsT & {
        href: string;
        isExternalLink?: boolean;
    };

const Link: FC<PropsT> = (props) => {
    const {
        children,
        href,
        isExternalLink,
        replace,
        scroll,
        shallow,
        prefetch = false,
        locale,
        ...restProps
    } = props;

    if (isExternalLink) {
        return (
            <BaseLink href={href} rel="noopener noreferrer" target="_blank" {...restProps}>
                {children}
            </BaseLink>
        );
    }

    return (
        <NextLink
            href={href}
            passHref
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            prefetch={prefetch}
            locale={locale}
        >
            <BaseLink {...restProps}>{children}</BaseLink>
        </NextLink>
    );
};

export default Link;
