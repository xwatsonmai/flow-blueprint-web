import LogicFlow from "@logicflow/core";
import startNode from "../nodes/startNode/startNode.ts";
import logicNode from "../nodes/businessNode/logicNode.ts";


let lf: LogicFlow;



export default function useLogicFlow () {
    const initLogicFlow = () => {
        const container = document.querySelector('#container') as HTMLElement;
        lf = new LogicFlow({
            container: container,
            stopScrollGraph: true,
            stopZoomGraph: true,
            grid: {
                type: 'dot',
                size: 20,
            },
            textEdit: false,
        });
        lf.register(startNode)
        lf.register(logicNode)
    }
    const render = (graphData?: {} | undefined) => {
        lf.render(graphData)
    }
    const getLogicFlow = () => {
        return lf;
    }



    return {
        initLogicFlow,
        getLogicFlow,
        render,
        lf
    }
}