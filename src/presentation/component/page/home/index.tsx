import { FC } from 'react';
import NextLink from 'next/link';

const HomePage: FC = () => {
    return (
        <div>
            <h1>Home page</h1>
            <br />
            <br />
            <NextLink href="/long-sync" passHref>
                <a>to long action page</a>
            </NextLink>
        </div>
    );
};

export default HomePage;
