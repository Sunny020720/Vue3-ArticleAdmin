<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { artDelChannelService, artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from '@/components/ChannelEdit.vue'

//2.loading效果 见1.
const loading = ref(false)

//1.获取频道列表
const channelList = ref([])
const getChannelList = async () => {
  loading.value = true // 3.发请求前开启
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false // 3.请求结束关闭
}
getChannelList()

//3.弹窗
const dialog = ref()
//添加
const onAddChannel = () => {
  dialog.value.open({})
}
//编辑
const onEditChannel = (row) => {
  dialog.value.open(row)
}
//提交后回显
const onSuccess = () => {
  getChannelList()
}

//4.删除
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('确认删除该分类信息吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" type="index" width="100"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!--    弹窗-->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
