<script setup lang="ts">
import {TNode} from "../../define/node.ts";
import {TLogicNode} from "../../define/TLogicNodeDefine.ts";
import {Component, ref} from "vue";
import {
  Form as TForm,
  FormItem as TFormItem,
  Input as TInput,
  Button as TButton,
  Link as TLink,
  Dialog as TDialog, MessagePlugin
} from "tdesign-vue-next";
// const properties = defineModel("properties", {
//   type: Object as () => TNode<TLogicNode<any>>,
//   required: true,
// })

const width = ref(550);
const inputForm = ref<{
  key: string;
  required: boolean;
}[]>([])

const visible = ref(false);

const emit = defineEmits(["sizeChange"]);

const addInput = () => {
  inputForm.value.push({key:'',required:false})
  emit("sizeChange", {width:width.value});
}


const editItem = ref({
  key: '',
  required: false
})

const openEditInputItem = (index:number) => {
  if ( inputForm.value[index].key == "") {
    MessagePlugin.warning("请先填写入参名");
    return
  }
  editItem.value = inputForm.value[index]
  visible.value = true
}
</script>

<template>
  <div class="node" style="min-height: 200px;height: 100%" :style="{width:width + 'px'}">
    <div class="header">
      <h4 class="node-name"> 开始节点</h4>
    </div>
    <div class="body">
      <t-form>
        <template v-for="(item,index) in inputForm">
          <t-form-item label="入参名" label-width="50">
            <t-input v-model="item.key"  style="width: 90%;margin-right: 5px"></t-input>
            <t-link hover="color" theme="primary" @click="openEditInputItem(index)">详情</t-link>
          </t-form-item>
        </template>
        <t-form-item label-width="0">
          <t-button style="width: 100%" @click="addInput">新增</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>

  <t-dialog attach="body" v-model:visible="visible" :header="`字段编辑：${editItem.key}`">

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
  background-color: #FFFFFF; /* 更改背景颜色为淡蓝色 */
  box-shadow: 0 0 10px rgba(173, 216, 230, 0.5); /* 添加阴影 */
  transition: all 0.3s ease; /* 添加过渡动画 */
}

.node:hover {
  box-shadow: 0 0 20px rgba(173, 216, 230, 0.7); /* 鼠标悬停时增加阴影 */
}

.header {
  display: flex;
  justify-content: center; /* 使得节点名称和按钮在水平方向上分散对齐 */
  flex: 1;
  align-items: center;
  border-bottom: 1px solid #B0BEC5;
  background-color: #f6685d;/* 更改背景颜色为天蓝色 */
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
</style>