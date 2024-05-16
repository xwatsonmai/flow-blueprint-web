<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {
  Button as TButton,
  Dialog as TDialog,
  Form as TForm,
  FormItem as TFormItem,
  Input as TInput,
  Link as TLink,
    Divider as TDivider,
  Switch as TSwitch,
  Select as TSelect,
  Option as TOption,
  MessagePlugin
} from "tdesign-vue-next";
import {TStartNode, TStartNodeInput} from "../../define/startNode.ts";
import {EDataType} from "../../define/define.ts";
import {TNode} from "../../define/node.ts";

const width = ref(550);

const rootConfig = defineModel("properties", {
  type: Object as () => TNode<TStartNode>,
  required: true,
  default: {
    name: "开始节点",
    type: "startNode",
    config: {
      input: []
    }
  }
})
onMounted(() => {
  console.log(rootConfig.value)
})


const visible = ref(false);

const emit = defineEmits(["sizeChange","change"]);

const addInput = () => {
  rootConfig.value.config.input.push({default: undefined, desc: "", type: EDataType.String, key:'',required:false})
  emit("sizeChange", {width:width.value});
}

const editItem = ref<TStartNodeInput>({
  key: '',
  required: false, default: undefined, desc: "", type: EDataType.String
})

const openEditInputItem = (index:number) => {
  if ( rootConfig.value.config.input[index].key == "") {
    MessagePlugin.warning("请先填写入参名");
    return
  }
  editItem.value = rootConfig.value.config.input[index]
  visible.value = true
}

const deleteItem = (index:number) => {
  rootConfig.value.config.input.splice(index, 1)
  emit("sizeChange", {width:width.value});
}

watch(rootConfig.value, () => {
  emit('change', rootConfig.value)
})
</script>

<template>
  <div class="node" style="min-height: 200px;height: 100%" :style="{width:width + 'px'}">
    <div class="header">
      <h4 class="node-name"> 开始节点</h4>
    </div>
    <div class="body">
      <t-form>
        <template v-for="(item,index) in  rootConfig.config.input">
          <t-form-item label="入参名" label-width="50">
            <t-input v-model.trim="item.key"  style="width: 80%;margin-right: 5px"></t-input>
            <t-link hover="color" theme="primary" @click="openEditInputItem(index)">详情</t-link>
            <t-divider layout="vertical" />
            <t-link hover="color" theme="danger" @click="deleteItem(index)">删除</t-link>
          </t-form-item>
        </template>
        <t-form-item label-width="0">
          <t-button style="width: 100%" @click="addInput">新增</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>

  <t-dialog attach="body" v-model:visible="visible" :header="`字段编辑：${editItem.key}`" width="50%" :cancel-btn="null" @confirm="visible = false">
    <t-form>
      <t-form-item label="是否必填">
        <t-switch v-model="editItem.required"></t-switch>
      </t-form-item>
      <t-form-item label="默认值">
        <t-input v-model.trim="editItem.default" :disabled="editItem.required"></t-input>
      </t-form-item>
      <t-form-item label="描述">
        <t-input v-model.trim="editItem.desc"></t-input>
      </t-form-item>
      <t-form-item label="数据类型">
        <t-select>
          <t-option label="字符串" :value="EDataType.String"></t-option>
          <t-option label="数字" :value="EDataType.Number"></t-option>
          <t-option label="布尔值" :value="EDataType.Boolean"></t-option>
        </t-select>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<style scoped>
.node {
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid #adddf6;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0 0 10px rgba(173, 216, 230, 0.5);
  transition: all 0.3s ease;
}

.node:hover {
  box-shadow: 0 0 20px rgba(173, 216, 230, 0.7); /* 鼠标悬停时增加阴影 */
}

.header {
  height: 40px; /* 固定 header 的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #B0BEC5;
  background-color: #f6685d;
  padding: 0 10px;
}

.body {
  min-height: 150px; /* 设置 body 的最小高度 */
  height: auto; /* 让 body 的高度自适应内容 */
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