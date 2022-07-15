import createPage from 'presentation/pageBuilder/createPage';
import TestPage from 'presentation/component/page/test';

export default createPage(TestPage, {
    getInitialProps: async () => {
        console.log('getInitialProps start');
        await new Promise((resolve) => {
            setTimeout(resolve, 3500)
        })
        console.log('getInitialProps finish');
    },
});
