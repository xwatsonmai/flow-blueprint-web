import {HtmlNode, HtmlNodeModel} from "@logicflow/core";
import business from "../vueNode/LogicNode.vue";
import {App, createApp, h, ref} from "vue";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import useLogicNode from "../../composables/LogicNode.ts";
import {TNode} from "./node.ts";

class LogicNodeView extends HtmlNode{
    app: App<Element>;
    constructor(props: any) {
        super(props);
        const appRef = ref(null);
        const properties = props.model.getProperties() as TNode<TLogicNode<any>>
        const {getLogicNode} = useLogicNode()
        this.app = createApp({
            render: () => h(business, { ref: appRef },{
                config: (config:any) => h(getLogicNode(properties.config.logic_type).node_config, {config})
            }),
            mounted: () => {
                // @ts-ignore
                appRef.value?.setProperties(props.model.getProperties());
            },
        });


    }
    setHtml(rootEl: HTMLElement) {
        const node = document.createElement("div");
        rootEl.appendChild(node);
        this.app.mount(node);
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