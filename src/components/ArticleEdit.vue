<script setup>
import { ref } from 'vue'
const visibleDrawer = ref(false) //控制抽屉显示
//打开组件
//open({}) => 添加：表单无需渲染
//open({ id, ...}) => 编辑：表单需要渲染
const open = (row) => {
  visibleDrawer.value = true
  console.log(row)
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visibleDrawer" direction="rtl" size="70%" title="大标题">
    el-drawer
  </el-drawer>
</template>
