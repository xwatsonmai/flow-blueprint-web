<script setup lang="ts">

import {onMounted} from "vue";

import useLogicFlow from "../composables/logicFlow.ts";

// const businessNode = defineModel("businessNode",{
//   type: Array as () => TBusinessNode[],
//   default: [],
//   // required: true
// })

const data = {
  // 节点
  nodes: [
    {
      id: 52,
      type: 'startNode',
      x: 300,
      y: 150,
      properties:{
        name:"开始节点",
        type:"startNode",
        config:{
          input:[]
        }
      }
    },
    {
      id: 21,
      type: 'logicNode',
      x: 1200,
      y: 150,
      properties:{
        name:"变量设置",
        type:"logic",
        config:{
          logic_type:"createVar",
          logic_config:{
            name:"变量名称",
            value:"变量值"
          },
          output:[],
        }
      }
    },
  ],
  // 边
  edges: [],
};

// let lf: LogicFlow | null = null;
const {lf,initLogicFlow,render} = useLogicFlow()
onMounted(() => {
  initLogicFlow()
  render(data)

});

const debug = () => {
  console.log(lf.getGraphData())
}

</script>

<template>
<!--  <start-node></start-node>-->

  <t-button @click="debug">测试</t-button>
  <div id="container"></div>
</template>

<style scoped>
#container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>