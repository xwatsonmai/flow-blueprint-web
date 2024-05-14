import {HtmlNode, HtmlNodeModel} from "@logicflow/core";
import business from "../vueNode/LogicNode.vue";
import {App, createApp, h, reactive} from "vue";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import useLogicNode from "../../composables/LogicNode.ts";
import {TNode} from "../../define/node.ts";
import {NodeConfig} from "@logicflow/core/types/type";
import GraphModel from "@logicflow/core/types/model/GraphModel";

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
        this.r = h(business, {
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

    setHtml(rootEl: HTMLElement) {
        if (!this.isMounted) {
            this.isMounted = true
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
        this.isMounted = true
        const properties = this.properties as TNode<TLogicNode<any>>;
        const {getLogicNode} = useLogicNode()
        this.width = getLogicNode(properties.config.logic_type).width;
        this.height = getLogicNode(properties.config.logic_type).height;
    }
}

const LogicNode = {
    type: 'logicNode',
    view: LogicNodeView,
    model: LogicNodeModel
}

export default LogicNode;