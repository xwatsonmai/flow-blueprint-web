import {HtmlNode, HtmlNodeModel} from "@logicflow/core";
import {App, createApp, h as vueRender, reactive} from "vue";
import {TNode} from "../../define/node.ts";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import startNode from "../vueNode/startNode.vue";
import {NodeConfig} from "@logicflow/core/types/type";
import GraphModel from "@logicflow/core/types/model/GraphModel";
import BaseNodeModel from "@logicflow/core/types/model/node/BaseNodeModel";
import {EAnchorType, TAnchor} from "../../define/Anchor.ts";

class StartNodeView extends HtmlNode {
    app: App<Element>;
    isMounted
    r
    element:HTMLElement | null
    constructor(props: any) {
        super(props);
        this.element = null
        this.isMounted = false // 用个属性来避免重复挂载
        // const appRef = ref(null);
        const properties = props.model.getProperties() as TNode<TLogicNode<any>>
        const refProperties = reactive(properties)
        props.model.setProperties(refProperties)
        this.r = vueRender(startNode, {
            properties: refProperties,
            onSizeChange: (value: {width:number}) => {
                // console.log(value)
                // props.model.setProperties(value)
                // console.log(props.graphModel.rootEl.offsetWidth)
                // props.model.width = props.graphModel.rootEl.offsetWidth
                if (this.element){
                    console.log(this.element.clientHeight)
                    props.model.height = this.element.offsetHeight + 50
                }
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

    setHtml(rootEl: HTMLElement) {
        if (!this.isMounted) {
            this.isMounted = true
            const node = document.createElement("div");
            node.id = this.props.model.id;
            rootEl.appendChild(node);
            this.app.mount(node);
            this.element = document.getElementById(this.props.model.id)

        } else {}
    }
}
class StartNodeModel extends HtmlNodeModel {
    isMounted
    constructor(data: NodeConfig, graphModel: GraphModel) {
        super(data,graphModel);
        this.isMounted = false
    }
    setAttributes() {
        // console.log("123123123")
        // super.setAttributes();
        if (this.isMounted){
            // this.width = this.graphModel.rootEl.offsetWidth
            return
        }

        const inputOnlyAsTarget = {
            message: "输出锚点只能连接输入锚点",
            validate: (_: BaseNodeModel, __: BaseNodeModel,sourceAnchor:TAnchor,targetAnchor:TAnchor) => {
                console.log(targetAnchor)
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

        this.width = 550;
        this.height = 200;
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
            x: x + width / 2 ,
            y: y ,
            id: `${id}_${1}_right`,
            type: EAnchorType.Output
        }]
    }
}

export default   {
    type: 'startNode',
    view: StartNodeView,
    model: StartNodeModel
}