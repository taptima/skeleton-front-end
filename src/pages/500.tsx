import HttpStatusCode from 'constant/HttpStatusCode';
import createErrorPage from 'presentation/pageBuilder/createErrorPage';

export default createErrorPage(HttpStatusCode.InternalServerError);
