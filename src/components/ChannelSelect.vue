<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
//1.获取文章分类列表
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  // console.log(channelList.value)
}
getChannelList()
//2.父组件传值
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-form-item label="文章分类: ">
    <el-select
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <el-option
        v-for="channel in channelList"
        :key="channel.id"
        :label="channel.cate_name"
        :value="channel.id"
      ></el-option>
    </el-select>
  </el-form-item>
</template>
