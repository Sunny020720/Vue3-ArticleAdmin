<script setup>
import { useRoute, useRouter } from 'vue-router'
//1.获取路由对象
const router = useRouter()
//2.获取路由参数
const route = useRoute()
const goList = () => {
  router.push('/list')
  console.log(router, route)
}
</script>
<template>
  <div>
    我是App
    <el-button @click="$router.push('home')">跳首页</el-button>
    <el-button @click="goList">跳列表页</el-button>
  </div>
</template>
