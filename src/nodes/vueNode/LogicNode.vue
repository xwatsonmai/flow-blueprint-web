<script setup lang="ts">
import {isProxy, onMounted, ref, shallowRef, watch} from "vue";
import {type Component} from "vue";
import {TNode, TOutput} from "../../define/node.ts";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import useLogicNode from "../../composables/LogicNode.ts";
import {
  Button as TButton,
  Link as TLink,
  Dialog as TDialog,
  Input as TInput,
  Form as TForm,
  FormItem as TFormItem,
  Tooltip as TTooltip
} from "tdesign-vue-next";

const properties = defineModel("properties", {
  type: Object as () => TNode<TLogicNode<any>>,
  required: true,
})
const emits = defineEmits(['change'])
onMounted(() => {
  const {getLogicNode} = useLogicNode()
  const nodeCfg = getLogicNode(properties.value.config.logic_type)
  width.value = nodeCfg.width
  height.value = nodeCfg.height
  formComponent.value = nodeCfg.node_config
})
const formComponent = shallowRef<Component>()
const width = ref(200)
const height = ref(100)

const debug = () => {
  console.log(properties)
}

// watch(properties.value.config.logic_config, ()=> {
//   // emits('change',properties.value)
// })

watch(properties.value, () => {
  emits('change', properties.value)
})

const updateOutputHandler = (val: TOutput[]) => {
  properties.value.config.output = val
  // emits('change',properties.value)
}

const visible = ref(false)
</script>

<template>
  <div class="node" :style="{height:height + 'px',width: width + 'px'}">
    <div class="header">
      <h4 class="node-name" @click="debug"> {{ properties.name }}</h4>
      <t-link hover="color" style="color: wheat" @click="visible = true">节点编辑</t-link>
    </div>
    <div class="body">
      <!-- 节点主体内容 -->
      <component :is="formComponent" v-model:config="properties.config.logic_config"
                 @update-output="updateOutputHandler"></component>
    </div>
  </div>

  <t-dialog v-model:visible="visible" attach="body" :draggable="true" :show-overlay="false" mode="modeless"
            :header="`节点设置：${properties.name} `">
    <t-form>
      <t-form-item label="节点名称">
        <t-input v-model="properties.name" placeholder="请输入节点名称"/>
      </t-form-item>
      <t-form-item label="数据集key">
        <template #status-icon>

        </template>
        <t-input placeholder="请输入数据集key"/>
      </t-form-item>
    </t-form>
  </t-dialog>

</template>

<style scoped>
.node {
  display: flex;
  flex-direction: column;
  height: 100px;
  width: 200px;
  border: 1px solid #adddf6;
  border-radius: 5px;
  background-color: rgb(255, 255, 255); /* 更改背景颜色为淡蓝色 */
  box-shadow: 0 0 10px rgba(173, 216, 230, 0.5); /* 添加阴影 */
  transition: all 0.3s ease; /* 添加过渡动画 */
}

.node:hover {
  box-shadow: 0 0 20px rgba(173, 216, 230, 0.7); /* 鼠标悬停时增加阴影 */
}

.header {
  display: flex;
  justify-content: space-between; /* 使得节点名称和按钮在水平方向上分散对齐 */
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #B0BEC5;
  background-color: #0052d9;/* 更改背景颜色为天蓝色 */
  padding: 0 10px; /* 添加内边距以避免内容贴边 */
}

.body {
  flex: 4;
  padding: 10px;
}

.header h4 {
  margin: 0;
  font-size: 16px;
  color: #FFFFFF; /* 更改字体颜色为白色 */
}

.node-name {
  margin: 0;
  font-size: 16px;
  color: #FFFFFF; /* 更改字体颜色为白色 */
}

.header-button {
  background-color: #FFFFFF; /* 设置按钮背景颜色为白色 */
  border: none; /* 移除边框 */
  padding: 5px 10px; /* 设置内边距 */
  border-radius: 5px; /* 设置边框圆角 */
  cursor: pointer; /* 设置鼠标悬停时的样式 */
}
</style>