<script setup lang="ts">
import { Input as TInput,Form as TForm,FormItem as TFormItem } from 'tdesign-vue-next';
const config = defineModel("config")
import {onMounted, reactive, ref, toRef, toRefs, toValue, unref} from "vue";

const varConfig = ref({
  name:"",
  value:""
})

// const varName = ref<string>('')
onMounted(() => {
  // nextTick(() => {
  //   console.log(config.value)
  //   varName.value = config.value.name
  // })

  console.log(config.value)
  varConfig.value = unref(config)
})

</script>

<template>
  <t-form >
    <t-form-item label="变量名称">
      <t-input v-model="varConfig.name" placeholder="请输入变量名称" />
    </t-form-item>
    <t-form-item label="变量值">
      <t-input v-model="varConfig.value" placeholder="请输入变量名称" />
    </t-form-item>
  </t-form>
</template>

<style scoped>

</style>