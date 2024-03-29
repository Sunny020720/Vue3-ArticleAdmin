<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from '@/components/ChannelSelect.vue'
import { artDelService, artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '@/components/ArticleEdit.vue'

//3.loading
const loading = ref(false)

//1.文章
//文章列表
const articleList = ref([])
const total = ref(0) //总条数
//请求参数对象
const params = ref({
  state: '',
  cate_id: '',
  pagenum: 1,
  pagesize: 5
})
//获取文章列表-基于params参数
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// 抽屉组件
// 添加逻辑
const articleEditRef = ref() //抽屉组件
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 添加&编辑 成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    //   如果添加，渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  // 如果编辑 直接回显
  getArticleList()
}
// 删除逻辑
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row._id)
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  await getArticleList()
}

//2.分页逻辑
const onSizeChange = (size) => {
  //每页条数修改
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  //当前页修改
  params.value.pagenum = page
  getArticleList()
}

//4.搜索和重置
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle"> 发布文章 </el-button>
    </template>
    <!--    表单区域-->
    <el-form inline>
      <!--  文章分类选择组件-->
      <!--
          Vue2 => :value  @input
          Vue3 => :modelValue  @update:modelValue
      -->
      <el-form-item label="文章分类: ">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态: ">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table v-loading="loading" :data="articleList">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link :underline="false" type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <!--  利用作用域插槽row 可以获取当前行的数据 => v-for 遍历 item -->
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          >
          </el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!--    分页-->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 5, 10]"
      :total="total"
      background
      layout="jumper, total, sizes, prev, pager, next"
      style="margin-top: 20px; justify-content: flex-start"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
    <!--    抽屉-->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
