import { useRouter } from 'next/router';
import { SITE_URL } from 'constant/seo';

export default function useCanonicalUrl(): string {
    const router = useRouter();
    const { asPath, locale: currentLocale, defaultLocale } = router;

    if (
        typeof currentLocale === 'undefined' ||
        typeof defaultLocale === 'undefined' ||
        currentLocale === defaultLocale
    ) {
        return SITE_URL + asPath;
    }

    return `${SITE_URL}/${currentLocale}${asPath}`;
}
