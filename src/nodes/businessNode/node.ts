import {NodeType} from "./define.ts";

export type TNode<T> = {
    name: string
    type:NodeType,
    config:T
}