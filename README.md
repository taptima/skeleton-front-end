## Set up new project
1. Clone this repo. Run:
   ```shell
   git clone git@github.com:taptima/skeleton-front-end.git <my-app-name>
   ```
2. Make sure you have [Node.js](https://nodejs.org/) (^16.13.0) and [Yarn](https://yarnpkg.com/) (^1.22.0) installed.
4. Install the dependencies. Run:
    ```shell
    yarn
    ```
5. Set up your new project using CLI. Run and follow the instructions:
    ```shell
    yarn plop
    ```

## Develop
1. Install the dependencies. Run:
    ```shell
    yarn
    ```
2. Set up environment variables. See list of pre-configured environment 
variables bellow. Run:
    ```shell
    yarn configure
    ```
   Note: `.env.local` overwrite `.env`
3. Start the development server ([see](https://nextjs.org/docs/api-reference/cli#development) additional info about this feature). Run:
    ```shell
    yarn dev
    ```
4. Open `http://localhost:3000` in your browser.

## Publish
1. Install the dependencies. Run:
    ```shell
    yarn
    ```
2. Make the production build. Run:
    ```shell
    yarn build
    ```
3. Start server ([see](https://nextjs.org/docs/api-reference/cli#production) additional info about this feature). Run:
    ```shell
    yarn start
    ```

## Pre-configured environment variables
1. `NEXT_PUBLIC_API_BASE_URL` — configure base URL for any API calls.
2. `LOCAL_API_BASE_URL` - URL for API calls on server side that used to avoid request roundtrip and DNS resolving (optional).
3. `NEXT_PUBLIC_ASSETS_VERSION` — version of public assets. Can be used
to reset browser cache of any assets (optional).
4. `NEXT_PUBLIC_SENTRY_DSN` — used to log errors to Sentry (optional).

**Sentry**
1. Add NEXT_PUBLIC_SENTRY_DSN to `.env` file
2. Run `sentry-cli login` — to login through browser or enter auth token
3. Fill `defaults.project` field in `sentry.properties` file
