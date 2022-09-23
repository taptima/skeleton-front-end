import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useService } from 'presentation/context/Container';
import Controller from './Controller';

const StaticPage: FC = observer(() => {
    const { title, entity } = useService(Controller);

    return (
        <div>
            title: {title}
            <br />
            entity: {entity.doubleTitle}
        </div>
    );
});

export default StaticPage;
