<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores'
import { userUpdatePassService } from '@/api/user'

const formRef = ref()
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
  username: '',
  password: ''
})
// // 检查原密码是否正确
// const checkOldPass = async () => {
//   pwdForm.value.username = useUserStore().user.username
//   pwdForm.value.password = pwdForm.value.old_pwd
//   // 利用登录校验
//   await userLoginService(pwdForm.value)
// }
// 检查新旧密码是否相同
const checkOldSame = (rule, value, cb) => {
  if (value === pwdForm.value.old_pwd) {
    cb(new Error('原密码和新密码不能一样！'))
  } else {
    cb()
  }
}
// 检查俩次输入密码是否相同
const checkNewSame = (rule, value, cb) => {
  if (value !== pwdForm.value.new_pwd) {
    cb(new Error('输入密码不一致'))
  } else {
    cb()
  }
}

// 校验规则
const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-15位的非空字符串',
      trigger: 'blur'
    }
    // { validator: checkOldPass, trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-15位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
}

// 提交新密码
const onSubmit = async () => {
  // await checkOldPass() // 校验原密码
  await formRef.value.validate() // 校验
  await userUpdatePassService(pwdForm.value)
  ElMessage({ type: 'success', message: '更换密码成功' })
  // 更新密码后，重新登录
  useUserStore().setToken('')
  useUserStore().setUser({})
  await router.push('/login')
}

// 重置
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <!--    表单区域-->
        <el-form
          ref="formRef"
          :model="pwdForm"
          :rules="rules"
          label-width="95px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>

<style scoped></style>
