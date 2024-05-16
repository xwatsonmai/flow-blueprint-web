import {EDataType} from "./define.ts";

export type TStartNode = {
    input:TStartNodeInput[]
}

export type TStartNodeInput = {
    key: string,
    type: EDataType,
    // 描述本节点的输出
    desc: string
    required: boolean
    default: any
}