<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false) // 表单是否显示
// 打开弹窗
// open({}) => 表单无需渲染,说明是添加
// open({id,cate_name,...}) => 说明是编辑
const open = async (row) => {
  dialogVisible.value = true
  console.log(row)
}
// 组件对外暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <div>我是内容部分</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
