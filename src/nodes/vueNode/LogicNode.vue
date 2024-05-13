<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {type Component} from "vue";
import {TNode} from "../../define/node.ts";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import useLogicNode from "../../composables/LogicNode.ts";


const properties = defineModel("properties",{
  type:Object as () => TNode<TLogicNode<any>>,
  required:true,
})
const emits = defineEmits(['change'])
onMounted(() =>{
  console.log(properties)
  const {getLogicNode} = useLogicNode()
  width.value = getLogicNode(properties.value.config.logic_type).width
  height.value = getLogicNode(properties.value.config.logic_type).height
  formComponent.value =  getLogicNode(properties.value.config.logic_type).node_config
})
const formComponent = ref<Component>()
const width = ref(200)
const height = ref(100)

const debug = () => {
  console.log(properties)
}

watch(properties, (val)=> {
  console.log(val)
  emits('change',val)
},{deep:true})


</script>

<template>
  <div class="node" :style="{height:height + 'px',width: width + 'px'}">
    <div class="header">
      <h4 @click="debug">  {{properties.name}}</h4>
    </div>
    <div class="body">
      <!-- 节点主体内容 -->
      <component :is="formComponent" v-model:config="properties.config.logic_config"></component>
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