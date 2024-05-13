<script setup lang="ts">
import { Input as TInput,Form as TForm,FormItem as TFormItem } from 'tdesign-vue-next';
const config = defineModel("config")
import {nextTick, onMounted, ref} from "vue";
const varName = ref<string>('')
onMounted(() => {
  // nextTick(() => {
  //   console.log(config.value)
  //   varName.value = config.value.name
  // })

  console.log(config.value)
  varName.value = config.value.name
})

</script>

<template>
  <t-form >
    <t-form-item label="变量名称">
      <t-input v-model="varName" placeholder="请输入变量名称" />
    </t-form-item>
    <t-form-item label="变量值">
      <t-input v-model="varName" placeholder="请输入变量名称" />
    </t-form-item>
  </t-form>
</template>

<style scoped>

</style>