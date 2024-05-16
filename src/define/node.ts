import {EDataType, ENodeType} from "./define.ts";
import {TStartNode} from "./startNode.ts";
import {TLogicNode} from "./TLogicNodeDefine.ts";

type NodeConfigTypes = {
    [ENodeType.LogicNode]: TLogicNode<any>;
    [ENodeType.StartNode]: TStartNode;
    [ENodeType.EndNode]: {};
    [ENodeType.SwitchNode]: {};
};
export type TNode<T extends ENodeType> = {
    name: string
    type:T,
    config:NodeConfigTypes[T];
    source_nodes: string[]
    target_nodes: string[]
}

export type TOutput = {
    key: string,
    type: EDataType,
    // 描述本节点的输出
    desc: string
    children?: TOutput[]
    row_key: string
}