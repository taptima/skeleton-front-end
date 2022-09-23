import createPage from 'presentation/pageBuilder/createPage';
import HomePage from 'presentation/component/page/home';
import Controller from 'presentation/component/page/home/Controller';

export default createPage(HomePage, {
    getInitialProps: async (container) => {
        await container.get(Controller).initialAction();
    },
});
