import useLogicFlow from "./logicFlow.ts";
import {TNode, TOutput} from "../define/node.ts";
import {EDataType} from "../define/define.ts";




export default function useOutputFlow() {
    const {lf} = useLogicFlow()

    const getOutput = (nodeKey:string) => {
        const node = lf.graphModel.getNode(nodeKey)
        const properties = node.properties as TNode<any>
    }

}