import {EDataType, NodeType} from "./define.ts";

export type TNode<T> = {
    name: string
    type:NodeType,
    config:T
    output:TOutput[]
}

export type TOutput = {
    key: string,
    type: EDataType,
    // 描述本节点的输出
    desc: string
    children?: TOutput[]
    row_key: string
}