<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUploadAvatarService } from '@/api/user'

const uploadRef = ref()
// 渲染的图片
const imgUrl = ref(useUserStore().user.user_pic)
// 选择图片
const onUploadFile = (file) => {
  // 预览图片
  // => 基于FileReader读取图片做预览，便于提交
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
  console.log(imgUrl)
}
// 上传头像
const onUpdateAvatar = async () => {
  await userUploadAvatarService(imgUrl.value)
  // 回调显示
  await useUserStore().getUser()
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>

<template>
  <page-container title="更换头像">
    <el-row>
      <el-col :span="12">
        <!--    表单区域-->
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
          class="avatar-uploader"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button
          :icon="Plus"
          size="large"
          type="primary"
          @click="uploadRef.$el.querySelector('input').click()"
          >选择图片</el-button
        >
        <el-button
          :icon="Upload"
          size="large"
          type="success"
          style="margin-left: 42px"
          @click="onUpdateAvatar"
          >上传头像</el-button
        >
      </el-col>
    </el-row>
  </page-container>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
