import {injectable} from "inversify";
import type { HomePagePropsT } from "./index";
import ReactiveState from "util/ReactiveState";

@injectable()
export default class Controller {
    private readonly _title = new ReactiveState<HomePagePropsT['title']>('');

    public get title():HomePagePropsT['title'] {
        return this._title.state
    }

    public onPropsReceive = (data: HomePagePropsT): void => {
        this._title.state = data.title
    }

    public initialAction = async (): Promise<HomePagePropsT> => {
        return {
            title: 'Home page'
        }
    }
}