import { createSSGPage, createSSGAction } from 'presentation/pageBuilder/createSSGPage';
import StaticPage from 'presentation/component/page/static';
import Controller from 'presentation/component/page/static/Controller';

export default createSSGPage(StaticPage);

export const getStaticProps = createSSGAction(async (container) => {
    await container.get(Controller).staticInitialAction();
});

// export const getStaticPaths = createPathListGenerator<{a: string}>(
//     async (container, pathsContext) => {
//         const pathList = await container.get(Controller).requestPathList();
//
//         return pathList
//     }
// )
