import { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { HOME } from 'constant/route';
import HttpStatusCode from 'constant/HttpStatusCode';

type PropsT = {
    statusCode: HttpStatusCode;
};

const ErrorPage: FC<PropsT> = (props) => {
    const { statusCode } = props;
    const { back } = useRouter();
    let message = 'Что-то пошло не так';

    if (statusCode === HttpStatusCode.NotFound) {
        message = 'Страница не найдена или еще не создана';
    }

    if (statusCode === HttpStatusCode.InternalServerError) {
        message = 'Возникла ошибка, попробуйте зайти позже';
    }

    return (
        <div>
            <h1>{message}</h1>
            <br />
            <br />
            <button type="button" onClick={back}>
                Назад
            </button>
            <br />
            <br />
            <NextLink href={HOME} passHref>
                <a>На главную</a>
            </NextLink>
        </div>
    );
};

export default ErrorPage;
