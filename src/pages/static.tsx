import { createSSGPage, createSSGAction } from 'presentation/pageBuilder/createSSGPage';
import StaticPage from 'presentation/component/page/static';
import Controller from 'presentation/component/page/static/Controller';

export default createSSGPage(StaticPage);

export const getStaticProps = createSSGAction(async (container) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 3500)
    })

    await container.get(Controller).initialAction();
});

// export const getStaticPaths = createPathListGenerator<{a: string}>(
//     async (container, pathsContext) => {
//         const pathList = await container.get(Controller).requestPathList();
//
//         return pathList
//     }
// )
