<script setup lang="ts">
import { Input as TInput,Form as TForm,FormItem as TFormItem } from 'tdesign-vue-next';
import {TOutput} from "../../define/node.ts";
import useDescribeJsonStructure from "../../tools/describeJsonToOutput.ts";
import useNodeOutput from "../../tools/Output.ts";
// import useLogicNodeConfig from "../../composables/logicNodeConfig.ts";
import {defineEmits} from "vue";


const config = defineModel("config",{
  type:Object as () => {
    name:string,
    value:string
  },
  required:true,
  default:{
    name:"",
    value:""
  }
})

// 获取更新输出数据结构的方法
const emit =  defineEmits<{
  updateOutput: [val: TOutput[]]
}>()

// const varName = ref<string>('')
// onMounted(() => {
//   console.log(config.value)
// })
const output = ():TOutput[] => {
  // 先尝试反序列化value，如果成功，则是一个对象，否则是一个字符串
  try {
    const value = JSON.parse(config.value.value)
    console.log(11,value)
    console.log(22,useDescribeJsonStructure(config.value.value))
    return useDescribeJsonStructure(config.value.value)
  } catch (e) {
    console.log(33,e)
    const {NewEmptyOutput,convertToApiConfDataTypeEnum} = useNodeOutput()
    return [NewEmptyOutput(config.value.name,convertToApiConfDataTypeEnum(typeof config.value.value))]
  }
}

const updateOutputHandler = () => {
  emit("updateOutput",output())
}

</script>

<template>
  <t-form >
    <t-form-item label="变量名称">
      <t-input v-model="config.name" placeholder="请输入变量名称" @blur="updateOutputHandler"/>
    </t-form-item>
    <t-form-item label="变量值">
      <t-input v-model="config.value" placeholder="请输入变量名称" @blur="updateOutputHandler"/>
    </t-form-item>
  </t-form>
</template>

<style scoped>

</style>