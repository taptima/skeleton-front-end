import { DefaultSeoProps } from 'next-seo';
import {
    KEYWORDS,
    MAIN_IMAGE,
    SITE_URL,
    EMAIL,
    REGION,
    PHONE,
    COUNTRY_NAME,
    LATITUDE,
    LOCALITY,
    LONGITUDE,
    TITLE,
    POSTAL_CODE,
    STREET_ADDRESS,
} from 'constant/seo';

type ValuesT = {
    title: string;
    email: string;
    phone: string;
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    countryName: string;
    latitude: string;
    longitude: string;
};

const getAdditionalMetaTags: (
    values: Partial<ValuesT>,
) => DefaultSeoProps['additionalMetaTags'] = ({
    region = REGION,
    email = EMAIL,
    phone = PHONE,
    streetAddress = STREET_ADDRESS,
    locality = LOCALITY,
    countryName = COUNTRY_NAME,
    latitude = LATITUDE,
    longitude = LONGITUDE,
    title = TITLE,
    postalCode = POSTAL_CODE,
}) => [
    {
        property: 'business:contact_data:street_address',
        content: streetAddress,
    },
    {
        property: 'business:contact_data:locality',
        content: locality,
    },
    {
        property: 'business:contact_data:region',
        content: region,
    },
    {
        property: 'business:contact_data:postal_code',
        content: postalCode,
    },
    {
        property: 'business:contact_data:country_name',
        content: countryName,
    },
    {
        property: 'business:contact_data:email',
        content: email,
    },
    {
        property: 'business:contact_data:phone_number',
        content: phone,
    },
    {
        property: 'business:contact_data:website',
        content: SITE_URL,
    },
    {
        property: 'place:location:latitude',
        content: latitude,
    },
    {
        property: 'place:location:longitude',
        content: longitude,
    },
    {
        property: 'image_src',
        content: MAIN_IMAGE,
    },
    {
        property: 'keywords',
        content: KEYWORDS,
    },
    {
        property: 'copyright',
        content: title,
    },
];

export default getAdditionalMetaTags;
