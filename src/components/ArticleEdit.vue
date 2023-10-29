<script setup>
import { ref } from 'vue'
import ChannelSelect from '@/components/ChannelSelect.vue'

// 控制抽屉显示
const visibleDrawer = ref(false)
// 默认数据
const defaultFrom = {
  title: '',
  cate_id: '', //分类id
  cover_img: '', //封面图片
  content: '',
  state: ''
}
// 表单数据
const formModel = ref({
  ...defaultFrom
})

// 打开组件
// open({}) => 添加：表单无需渲染
// open({ id, ...}) => 编辑：表单需要渲染
const open = (row) => {
  visibleDrawer.value = true
  if (row.id) {
    console.log('编辑')
  } else {
    formModel.value = {
      ...defaultFrom
    }
    console.log('添加')
  }
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="70%"
  >
    <!--  发布文章表单  -->
    <el-form :model="formModel" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">文件上传</el-form-item>
      <el-form-item label="文章内容" prop="content">富文本编辑器</el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
