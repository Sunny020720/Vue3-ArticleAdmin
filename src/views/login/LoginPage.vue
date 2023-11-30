<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userLoginService, userRegisterService } from '@/api/user'
import { useUserStore } from '@/stores'
import router from '@/router'

const isRegister = ref(true) // 切换注册和登录
const form = ref() // 获取表单组件

// 1.注册
// 整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
//整个表单的校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      // 自定义校验规则
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
// 注册请求
const register = async () => {
  // 预校验 注册前对整个表单进行校验
  await form.value.validate()
  const res = await userRegisterService(formModel.value)
  console.log(res)
  ElMessage.success('注册成功')
  //切换到登录
  isRegister.value = false
}
// 切换登录时重置表单数据
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

// 2.登录
const userStore = useUserStore()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  await router.push('/')
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <!--
    el-row 一行 24分
    el-col 一列
    :span= 占份数
    :offset 左侧margin份数
    el-form
    el-form-item 表单的一行
    el-input
    2. 校验相关
      (1) el-from => :model="ruleForm" 绑定的整个from的数据对象
      (2)            :rules:"rules"    绑定的整个rules规则对象
      (3) 表单元素 => v-model="ruleForm.xxx" 给表单元素,绑定form的子属性
      (4) el-form-item => prop配置生效的是哪个校验规则(和rules中的字段要对应)
    -->
    <el-col :offset="3" :span="6" class="form">
      <!--   注册相关表单-->
      <el-form
        v-if="isRegister"
        ref="form"
        :model="formModel"
        :rules="rules"
        autocomplete="off"
        size="large"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            auto-insert-space
            class="button"
            type="primary"
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link :underline="false" type="info" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!--     登录-->
      <el-form
        v-else
        ref="form"
        :model="formModel"
        :rules="rules"
        autocomplete="off"
        size="large"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            name="password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link :underline="false" type="primary">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            auto-insert-space
            class="button"
            type="primary"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link :underline="false" type="info" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo_rabbit.png') no-repeat 50% center / 260px auto,
      url('@/assets/rabbit_bg.jpg') no-repeat right / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
