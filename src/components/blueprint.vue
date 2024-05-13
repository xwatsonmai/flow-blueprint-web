<script setup lang="ts">
import LogicFlow from '@logicflow/core';
import {onMounted} from "vue";
import BusinessNodeVue from "../nodes/businessNode/logicNode.ts";

// const businessNode = defineModel("businessNode",{
//   type: Array as () => TBusinessNode[],
//   default: [],
//   // required: true
// })

const data = {
  // 节点
  nodes: [
    {
      id: 50,
      type: 'rect',
      x: 100,
      y: 150,
      text: '你好',
    },
    {
      id: 21,
      type: 'logicNode',
      x: 300,
      y: 150,
      properties:{
        name:"变量设置",
        type:"logic",
        config:{
          logic_type:"createVar",
          logic_config:{
            name:"变量名称",
            value:"变量值"
          }
        }
      }
    },
    {
      id: 22,
      type: 'circle',
      x: 400,
      y: 250,
    },
  ],
  // 边
  edges: [
    {
      type: 'polyline',
      sourceNodeId: 50,
      targetNodeId: 22,
    },
  ],
};

let lf: LogicFlow | null = null;

onMounted(() => {
  const container = document.querySelector('#container') as HTMLElement;
  lf = new LogicFlow({
    container: container,
    stopScrollGraph: true,
    stopZoomGraph: true,
    grid: {
      type: 'dot',
      size: 20,
    },
  });
  lf.register(BusinessNodeVue)
  lf.on('node:mousemove', (node) => {
    // console.log('node:mousemove', node);
  });
  lf.render(data);

});

const debug = () => {
  console.log(lf?.getGraphData())
}

</script>

<template>
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