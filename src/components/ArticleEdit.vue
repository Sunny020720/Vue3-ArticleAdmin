<script setup>
import { ref } from 'vue'
import ChannelSelect from '@/components/ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artEditService,
  artGetDetailService,
  artPublishService
} from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'

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
const formModel = ref({ ...defaultFrom })

//1.上传封面
const imgUrl = ref('') //预览图
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //预览图片
  formModel.value.cover_img = uploadFile.raw
}
// 2.提交文章
const emit = defineEmits(['success']) // 提交成功回显
const onPublish = async (state) => {
  // 将已发布还是草稿状态，存入 state
  formModel.value.state = state
  //转换成 formData
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // 编辑或者添加
  if (formModel.value._id) {
    await artEditService(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

// 打开组件
// open({}) => 添加：表单无需渲染
// open({ id, ...}) => 编辑：表单需要渲染
const editorRef = ref()
const open = async (row) => {
  visibleDrawer.value = true
  if (row._id) {
    console.log('编辑')
    const res = await artGetDetailService(row._id)
    formModel.value = res.data.data
    //   图片回显
    imgUrl.value = baseURL + formModel.value.cover_img
    // 提交时,后台需要数据格式是file => 需要将网络图片转成file格式
    formModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    // 成功添加后重置表单的数据
    // => 富文本编辑器 需要手动重置
    formModel.value = { ...defaultFrom }
    imgUrl.value = ''
    editorRef.value.setHTML('')
    console.log('添加')
  }
}
defineExpose({
  open
})

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    return new File([blob], fileName, { type: blob.type })
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel._id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="70%"
  >
    <!--  发布文章表单  -->
    <el-form :model="formModel" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          :auto-upload="false"
          :on-change="onUploadFile"
          :show-file-list="false"
          class="avatar-uploader"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 300px;
  }
}
</style>
