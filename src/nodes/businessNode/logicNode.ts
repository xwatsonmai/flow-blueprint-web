import {HtmlNode, HtmlNodeModel} from "@logicflow/core";
import business from "../vueNode/LogicNode.vue";
import {App, createApp, h, isProxy, reactive} from "vue";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import useLogicNode from "../../composables/LogicNode.ts";
import {TNode} from "../../define/node.ts";

class LogicNodeView extends HtmlNode{
    app: App<Element>;
    isMounted
    r
    constructor(props: any) {
        super(props);
        console.log(2)
        this.isMounted = false // 用个属性来避免重复挂载
        // const appRef = ref(null);
        const properties = props.model.getProperties() as TNode<TLogicNode<any>>
        const refProperties = reactive(properties)
        this.r =  h(business, {
            properties: refProperties,
            ["change"]:(value: TLogicNode<any>) => {
                console.log(value)
                console.log(refProperties)
            }
        })
        this.app = createApp({
            render: () =>this.r,
            mounted: () => {
                // @ts-ignore
                // appRef.value?.setProperties(props.model.getProperties());
            },
        });


    }
    setHtml(rootEl: HTMLElement) {
        if (!this.isMounted){
            const node = document.createElement("div");
            rootEl.appendChild(node);
            this.app.mount(node);
        }else {
            console.log(1212312)
            // this.r.component.props.properties = this.props.model.getProperties() // properties发生变化后，将properties作为props传给vue组件

        }


    }
}

class LogicNodeModel extends HtmlNodeModel {
    setAttributes() {
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