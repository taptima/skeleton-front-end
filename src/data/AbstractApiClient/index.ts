import { fold as baseFold } from 'fp-ts/Either';
import { Type } from 'io-ts';
import type GraphQL from 'data/driver/ApiClient/GraphQL';
import type REST from 'data/driver/ApiClient/REST';
import Logger from 'util/Logger';
import Credentials from './Credentials';

export default abstract class AbstractApi {
    public abstract graphql: GraphQL;

    public abstract graphqlWithAuthorization: GraphQL;

    public abstract rest: REST;

    public abstract restWithAuthorization: REST;

    public abstract setCredentials(credentials: Credentials, isRemember?: boolean): void;

    public abstract initCredentials(): void;

    public abstract resetCredentials(): void;

    public static decode<Out, A, O>(
        DTO: Type<A, O>,
        left: Out,
        onRight: (i: A) => Out,
        value: unknown,
    ): Out {
        const decoded = DTO.decode(value);

        Logger.handleDTOError(decoded);

        return baseFold<unknown, A, Out>(() => left, onRight)(decoded);
    }
}
