<script setup lang="ts">
import {ref, watch} from "vue";
import {TNode} from "../businessNode/node.ts";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import useLogicNode from "../../composables/LogicNode.ts";

type Properties = {
  name:string
  config:any
}

type Config = {
  name:string
  value:string
}

const width = ref(200)
const height = ref(100)
let isInited = false
const properties = ref<Record<string, any> | null>(null)
const nodeConfig = ref<Properties>({
  name:"",
  config:null
})


const setProperties =(props:Record<string, any>)=>{
  properties.value = props
}

watch(properties,(newVal)=>{
  if (newVal == null) return
  const nodeProperties = newVal as TNode<TLogicNode<Config>>
  nodeConfig.value = {
    name:nodeProperties.name,
    config:nodeProperties.config.logic_config
  }

  if (!isInited){
    const {getLogicNode} = useLogicNode()
    width.value = getLogicNode(nodeProperties.config.logic_type).width
    height.value = getLogicNode(nodeProperties.config.logic_type).height
    isInited = true
  }

})

defineExpose({
  setProperties
})
</script>

<template>
  <div class="node" :style="{height:height + 'px',width: width + 'px'}">
    <div class="header">
      <h4>  {{nodeConfig.name}}</h4>
    </div>
    <div class="body">
      <!-- 节点主体内容 -->

      <template v-if="properties != null ">
        <slot name="config" v-bind="nodeConfig.config"></slot>
      </template>

<!--      <slot name="config" v-bind="properties"></slot>-->
    </div>
  </div>
</template>

<style scoped>
.node {
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 200px;
  border: 1px solid #B0BEC5; /* 更改边框颜色为淡灰色 */
  border-radius: 5px; /* 添加圆角 */
  background-color: #ECEFF1; /* 更改背景颜色为淡灰色 */
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #B0BEC5; /* 更改分割线颜色为淡灰色 */
  background-color: #CFD8DC; /* 更改背景颜色为淡灰色 */
}

.body {
  flex: 4;
  padding: 10px; /* 添加内边距 */
}

.header h4 {
  margin: 0;
  font-size: 16px; /* 更改字体大小 */
  color: #37474F; /* 更改字体颜色为深灰色 */
}
</style>