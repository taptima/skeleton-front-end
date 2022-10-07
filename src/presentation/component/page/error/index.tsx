import { FC } from 'react';
import { HOME } from 'constant/route';
import HttpStatusCode from 'constant/HttpStatusCode';
import { Wrapper, Title, Link } from './styles';

const MAP_ERROR_TO_MESSAGE: Record<HttpStatusCode, string> = {
    [HttpStatusCode.Unauthorized]: 'Доступ запрещен',
    [HttpStatusCode.InternalServerError]: 'Возникла ошибка, попробуйте зайти позже',
    [HttpStatusCode.NotFound]: 'Страница не найдена или еще не создана',
};

type PropsT = {
    statusCode: HttpStatusCode;
};

const ErrorPage: FC<PropsT> = (props) => {
    const { statusCode } = props;

    return (
        <Wrapper>
            <Title>{MAP_ERROR_TO_MESSAGE[statusCode] || 'Что-то пошло не так'}</Title>
            <Link href={HOME}>На главную</Link>
        </Wrapper>
    );
};

export default ErrorPage;
