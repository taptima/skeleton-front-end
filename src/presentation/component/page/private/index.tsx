import React, { FC } from 'react';
import { HOME } from 'constant/route';
import { Wrapper, Title, Link } from './styles';

const PrivatePage: FC = () => {
    return (
        <Wrapper>
            <Title>Доступ закрыт</Title>
            <Link href={HOME}>На главную</Link>
        </Wrapper>
    );
};

export default PrivatePage;
