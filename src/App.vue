<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <!--  element切换中文-->
  <el-config-provider :locale="zh">
    <router-view></router-view>
  </el-config-provider>
</template>
