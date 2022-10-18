import { useRouter } from 'next/router';

const MAP_LOCALE_TO_REGION: Record<string, string> = {
    ru: 'ru_RU',
    en: 'en_US',
};

const DEFAULT_REGION = 'ru_RU';

export default function useLocaleRegion(): string {
    const { locale } = useRouter();

    if (typeof locale === 'undefined') {
        return DEFAULT_REGION;
    }

    return MAP_LOCALE_TO_REGION[locale] ?? DEFAULT_REGION;
}
