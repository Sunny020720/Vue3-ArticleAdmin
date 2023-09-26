<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore, useCountStore } from '@/stores'
//1.获取路由对象
const router = useRouter()
//2.获取路由参数
const route = useRoute()
const goList = () => {
  router.push('/list')
  console.log(router, route)
}

// user
const userStore = useUserStore()
</script>
<template>
  <div>
    <hr />
    <router-view></router-view>

    <hr />
    我是App
    <el-button @click="$router.push('home')">跳首页</el-button>
    <el-button @click="goList">跳列表页</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('wly123')"> 登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
    <hr />
    <div>{{ useCountStore().count }}</div>
  </div>
</template>
