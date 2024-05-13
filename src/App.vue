<script setup lang="ts">
import Blueprint from "./components/blueprint.vue";
import CreateVar from "./nodes/business/createVar.vue";
import LogicNode from "./nodes/vueNode/LogicNode.vue";
import {ref} from "vue";
import {TLogicNodeDefine} from "./define/TLogicNodeDefine.ts";
import useLogicNode from "./composables/LogicNode.ts";

const businessNode:TLogicNodeDefine[] = [
  {
    node_type:"createVar",
    node_name:"创建变量",
    node_config:CreateVar,
    width:300,
    height:200
  }
]

const {setLogicNodes} = useLogicNode()
setLogicNodes(businessNode)

// const config = ref({
//   name:"",
//   value:""
// })

</script>

<template>
<!--  <logic-node>-->
<!--    <template #config="config">-->
<!--      <createVar :config="config"></createVar>-->
<!--    </template>-->
<!--  </logic-node>-->
<!--  <t-button>asd</t-button>-->
  <blueprint ></blueprint>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
