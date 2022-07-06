import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useService } from 'presentation/context/Container';
import Controller from './Controller';

const StaticPage: FC = observer(() => {
    const { title } = useService(Controller);

    return <div>{title}</div>;
});

export default StaticPage;
