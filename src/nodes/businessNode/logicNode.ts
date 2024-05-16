import { HtmlNode, HtmlNodeModel} from "@logicflow/core";
import business from "../vueNode/LogicNode.vue";
import {App, createApp, h as vueRender, reactive} from "vue";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import useLogicNode from "../../composables/LogicNode.ts";
import {TNode} from "../../define/node.ts";
import {NodeConfig} from "@logicflow/core/types/type";
import GraphModel from "@logicflow/core/types/model/GraphModel";
import BaseNodeModel from "@logicflow/core/types/model/node/BaseNodeModel";
import {EAnchorType, TAnchor} from "../../define/Anchor.ts";
import {TStartNode} from "../../define/startNode.ts";
import {ENodeType} from "../../define/define.ts";

class LogicNodeView extends HtmlNode {
    app: App<Element>;
    isMounted
    r

    constructor(props: any) {
        super(props);
        this.isMounted = false // 用个属性来避免重复挂载
        // const appRef = ref(null);
        const properties = props.model.getProperties() as TNode<TLogicNode<any>>
        const refProperties = reactive(properties)

        props.model.setProperties(refProperties)
        this.r = vueRender(business, {
            properties: refProperties,
            onChange: (value: TLogicNode<any>) => {
                // console.log(value)
                props.model.setProperties(value)
            }
        })
        this.app = createApp({
            render: () => this.r,
            mounted: () => {
                // @ts-ignore
                // appRef.value?.setProperties(props.model.getProperties());
            },
        });


    }

    // getAnchorShape(anchorData: any) {
    //     console.log("qweqwe")
    //     const { x, y, id } = anchorData;
    //     const type = id.includes("left") ? "left" : "right";
    //     return h("rect", {
    //         x: x - 5 - ( id.includes('root') ? 9 : 0),
    //         y: y - 5,
    //         width: 10,
    //         height: 10,
    //         className: `custom-anchor ${id} ${
    //             type === "left" ? "incomming-anchor" : "outgoing-anchor"
    //         }`,
    //     });
    // }

    setHtml(rootEl: HTMLElement) {
        if (!this.isMounted) {
            this.isMounted = true
            // this.props.model.anchors = anchors
            const node = document.createElement("div");
            rootEl.appendChild(node);
            this.app.mount(node);
        } else {
            // console.log(1212312)
            // const p = this.props.model.getProperties() as TNode<TLogicNode<any>>
            // p.config.logic_config.name = "asdasdasd"

            // this.r.component.props.properties = this.props.model.getProperties() // properties发生变化后，将properties作为props传给vue组件

        }


    }
}

class LogicNodeModel extends HtmlNodeModel {
    isMounted
    constructor(data: NodeConfig, graphModel: GraphModel) {
        super(data,graphModel);
        this.isMounted = false
    }
    setAttributes() {
        // super.setAttributes();
        if (this.isMounted){
            return
        }

        const inputOnlyAsTarget = {
            message: "输出锚点只能连接输入锚点",
            validate: (_: BaseNodeModel, __: BaseNodeModel,sourceAnchor:TAnchor,targetAnchor:TAnchor) => {
                if (sourceAnchor.type == EAnchorType.Output){
                    return targetAnchor.type == EAnchorType.Input
                }
                if (sourceAnchor.type == EAnchorType.Input){
                    return targetAnchor.type == EAnchorType.Output
                }
                // return target.type === "circle";
            },
        };

        this.isMounted = true
        const properties = this.properties as TNode<ENodeType.LogicNode>;
        const {getLogicNode} = useLogicNode()
        this.width = getLogicNode(properties.config.logic_type).width;
        this.height = getLogicNode(properties.config.logic_type).height;
        // const size = this.width;
        // this.anchorsOffset = [
        //     [size / 2, 0], // x 轴上偏移 size / 2
        //     [-size / 2, 0], // x 轴上偏移 -size / 2
        // ];
        // @ts-ignore
        this.sourceRules.push(inputOnlyAsTarget)
        // @ts-ignore
        this.targetRules.push(inputOnlyAsTarget)

    }

    getDefaultAnchor(): {
        x: number;
        y: number;
        id: string;
    }[]{
        // debugger
        const {
            id,
            x,
            y,
            width,
        } = this;
        return [{
            x:x - width / 2,
            y: y ,
            id: `${id}_${1}_left`,
            type: EAnchorType.Input
        },{
            x: x + width / 2 ,
            y: y ,
            id: `${id}_${1}_right`,
            type: EAnchorType.Output
        }]
    }


}

const LogicNode = {
    type: 'logicNode',
    view: LogicNodeView,
    model: LogicNodeModel
}

export default LogicNode;