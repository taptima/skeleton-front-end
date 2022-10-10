const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_DOMAIN],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack(config) {
        const originalEntry = config.entry;

        config.entry = async () => {
            const entries = await originalEntry();

            if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
                entries['main.js'].unshift('./polyfills.js');
            }

            return entries;
        };

        config.module.rules.push({
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
        });

        config.module.rules.push({
            test: /\.graphql$/,
            loader: 'graphql-tag/loader',
            exclude: /node_modules/,
        });

        config.module.rules = config.module.rules.map((rule) => {
            const { use } = rule;

            if (!use || use.loader !== 'next-babel-loader') {
                return rule;
            }

            const originalExcludeFunc = rule.exclude;
            rule.exclude = (path) => {
                if (/(swiper|dom7|slack)\/\.*/.test(path)) {
                    return false;
                }

                return originalExcludeFunc(path);
            };

            return rule;
        });

        return config;
    },
};

/**
 * @type {import('@sentry/nextjs').SentryWebpackPluginOptions}
 **/
const SentryWebpackPluginOptions = {
    include: '.next',
    ignore: ['node_modules'],
    urlPrefix: '~/_next',
    configFile: 'sentry.properties',
};

if (process.env.NODE_ENV === 'production' && Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN)) {
    module.exports = withSentryConfig(
        {
            ...nextConfig,
            sentry: {
                hideSourceMaps: true,
            },
        },
        SentryWebpackPluginOptions,
    );
} else {
    module.exports = nextConfig;
}
