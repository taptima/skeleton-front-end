import { FC } from 'react';
import { DefaultSeo } from 'next-seo';
import { observer } from 'mobx-react-lite';
import { DESCRIPTION, MAIN_IMAGE, TITLE } from 'constant/seo';
import useCanonicalUrl from './useCanonicalUrl';
import useLocaleRegion from './useLocaleRegion';
import useLanguageAlternates from './useLanguageAlternates';
import getAdditionalMetaTags from './getAdditionalMetaTags';

const Seo: FC = observer(() => {
    const languageAlternates = useLanguageAlternates();
    const canonicalPageUrl = useCanonicalUrl();
    const localeWithRegion = useLocaleRegion();

    return (
        <DefaultSeo
            defaultTitle={TITLE}
            titleTemplate={`${TITLE} | %s`}
            description={DESCRIPTION}
            canonical={canonicalPageUrl}
            languageAlternates={languageAlternates}
            openGraph={{
                type: 'website',
                locale: localeWithRegion,
                url: canonicalPageUrl,
                site_name: TITLE,
                title: TITLE,
                description: DESCRIPTION,
                images: [
                    {
                        url: MAIN_IMAGE,
                        type: 'image/png',
                    },
                ],
            }}
            twitter={{
                cardType: 'summary_large_image',
            }}
            additionalMetaTags={getAdditionalMetaTags({})}
        />
    );
});

export default Seo;
