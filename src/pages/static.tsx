import { createSSGPage, createSSGAction } from "presentation/pageBuilder/createSSGPage";
import HomePage, { HomePagePropsT } from "presentation/component/page/home";
import Controller from "presentation/component/page/home/Controller";

export default createSSGPage<HomePagePropsT>(HomePage, {
    onPropsReceive: (props, container) => {
        const { onPropsReceive } = container.get(Controller);
        console.log('received props: ', props)

        onPropsReceive(props);
    }
})


export const getStaticProps = createSSGAction<HomePagePropsT>(
    async (container, nextPageContext) => {
        const pageData = await container.get(Controller).initialAction();

        return pageData;
    }
)

// export const getStaticPaths = createPathListGenerator<{a: string}>(
//     async (container, pathsContext) => {
//         const pathList = await container.get(Controller).requestPathList();
//
//         return pathList
//     }
// )
