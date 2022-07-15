import { FC } from 'react';
import Link from "presentation/component/common/typography/Link";
import { Wrapper } from './styles';

const TestPage: FC = () => {
    return (
        <Wrapper>
            test
            <br />
            <br />
            <Link href="/">
                back home
            </Link>
            <br />
            <br />
            <Link href="/static">
                to static
            </Link>
        </Wrapper>
    );
};

export default TestPage;
