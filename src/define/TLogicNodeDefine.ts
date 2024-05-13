import {Component} from "vue";

export type TLogicNodeDefine = {
    node_type: string
    node_name: string
    width: number
    height: number
    node_config: Component
}

export type TLogicNode<T> = {
    logic_type: string
    logic_config: T
}