import {IReturnProject, IReturnUser} from "lbd-server"

interface CurrentProject extends IReturnProject {
    activeGraphs: string[],
    activeDocuments: string[]
}

interface IContext {
    user: IReturnUser | null,
    currentProject: CurrentProject | null,
    states: IPluginState[],
    plugin: string | null,
    selection: ISelection[]
}

interface IPluginState {
    [x: string]: any
}

interface ISelection {
    guid: string,
    [x: string]: any
}

//Added

interface Project {
    projectName: string,
    clientName: string,
    buildingType: string,
    spaceHeating: number,
    DHOW: number,
    Electricity: number,
    PrimaryEnergy: number
}

export {
    IContext
}