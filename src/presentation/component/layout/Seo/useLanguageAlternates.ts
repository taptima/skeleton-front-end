import { DefaultSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
import { SITE_URL } from 'constant/seo';

export default function useLanguageAlternates(): DefaultSeoProps['languageAlternates'] {
    const router = useRouter();
    const { asPath, locale: currentLocale, defaultLocale, locales } = router;

    if (typeof currentLocale === 'undefined' || typeof defaultLocale === 'undefined') {
        return [];
    }

    return locales
        ?.filter((locale) => locale !== currentLocale)
        .map((locale) => ({
            hrefLang: locale,
            href: `${SITE_URL}/${locale}${asPath}`,
        }));
}
