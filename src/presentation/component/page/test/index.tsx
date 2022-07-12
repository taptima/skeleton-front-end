import { FC } from 'react';
import NextLink from 'next/link';
import { Wrapper } from './styles';

const TestPage: FC = () => {
    return (
        <Wrapper>
            test
            <br />
            <br />
            <NextLink href="/" passHref>
                <a>back home</a>
            </NextLink>
        </Wrapper>
    );
};

export default TestPage;
