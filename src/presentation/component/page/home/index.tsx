import { FC } from 'react';
import Link from "presentation/component/common/typography/Link";

const HomePage: FC = () => {
    return (
        <div>
            <h1>Home page</h1>
            <br />
            <br />
            <Link href="/long-sync" >
                to long action page
            </Link>
            <br />
            <br />
            <Link href="/static">
                to static
            </Link>
        </div>
    );
};

export default HomePage;
