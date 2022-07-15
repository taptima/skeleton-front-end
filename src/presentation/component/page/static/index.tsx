import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useService } from 'presentation/context/Container';
import Controller from './Controller';
import Link from "presentation/component/common/typography/Link";

const StaticPage: FC = observer(() => {
    const { title } = useService(Controller);

    return (
        <div>
            {title}
            <br />
            <br />
            <Link href="/">
                back home
            </Link>
            <br />
            <br />
            <Link href="/long-sync" >
                to long action page
            </Link>
        </div>
    );
});

export default StaticPage;
