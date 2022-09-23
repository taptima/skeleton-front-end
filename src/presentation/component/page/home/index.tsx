import { FC } from 'react';
import NextLink from 'next/link';
import { observer } from 'mobx-react-lite';
import { useService } from 'presentation/context/Container';
import Controller from './Controller';

const HomePage: FC = observer(() => {
    const { entity } = useService(Controller);

    return (
        <div>
            Home page
            <br />
            entity: {entity.doubleTitle}
            <br />
            NextLink:{' '}
            <NextLink href="/static" passHref>
                <a>static</a>
            </NextLink>
        </div>
    );
});

export default HomePage;
