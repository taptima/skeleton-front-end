import * as t from 'io-ts';

const CredentialsResponseDTO = t.type({
    token: t.string,
    refresh_token: t.string,
});

type CredentialsResponseDTO = t.TypeOf<typeof CredentialsResponseDTO>;

export default CredentialsResponseDTO;
