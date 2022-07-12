import createPage from 'presentation/pageBuilder/createPage';
import TestPage from 'presentation/component/page/test';

export default createPage(TestPage, {
    getInitialProps: async () => {
        console.log('getInitialProps start');
        for (let i = 0; i < 4e9; i++) {
            i++;
        }
        console.log('getInitialProps finish');
    },
});
