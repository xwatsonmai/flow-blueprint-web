import {AnchorConfig} from "@logicflow/core/types/type";

export enum EAnchorType {
    Output = "output",
    Input = "input",
}

export type TAnchorData  = {
    type: EAnchorType
}

export type TAnchor = AnchorConfig & TAnchorData