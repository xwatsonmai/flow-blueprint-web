import {TLogicNodeDefine} from "../define/TLogicNodeDefine.ts";

const LogicNode:Record<string, TLogicNodeDefine> = {}

export default function useLogicNode() {
    const setLogicNodes = (node:TLogicNodeDefine[]) => {
        node.forEach((item) => {
            LogicNode[item.node_type] = item
        })
    }

    const getLogicNodes = () => {
        return LogicNode
    }

    const getLogicNode = (nodeType:string) => {
        console.log(nodeType)
        return LogicNode[nodeType]
    }

    return {
        setLogicNodes,
        getLogicNodes,
        getLogicNode,
    }


}