<template>
  <el-card class="goodsBox">
    <el-button
      type="primary"
      style="margin-bottom: 24px"
      @click="show()"
      size="small"
    >
      添加
    </el-button>
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <el-form-item label="商品名称">
        <el-input
          size="small"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <!-- <el-form-item label="分类">
        <el-select size="small" v-model="formItem.typeid" clearable>
          <el-option v-for="item in typeList" :key="item.id" :value="item.id">
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item :label-width="20">
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" style="margin-left: 8px" @click="clear">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border>
      <el-table-column
        prop="name"
        label="名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        align="center"
      ></el-table-column>
      <!-- <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.foodtypes[0].name }}
        </template>
      </el-table-column> -->
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img
            :src="baseUrl + scope.row.img"
            alt=""
            style="width: 40px; height: 40px; margin: 10px 0; cursor: pointer"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="show(scope.row)" type="primary">
            编辑
          </el-button>
          <el-popconfirm
            title="您确认删除这条内容吗？"
            @confirm="remove(scope.row._id)"
            style="margin-left: 8px"
          >
            <el-button slot="reference" size="small" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Page
      class="table_page_css"
      v-show="total"
      :total="total"
      :current="searchInfo.pageNo"
      :page-size="searchInfo.pageSize"
      :page-size-opts="pageSizeOpts"
      @on-change="pageNoChange"
      @on-page-size-change="pageSizeChange"
      show-sizer
      show-elevator
      show-total
    />
    <AddUpdate @reload="getList" ref="AddUpdate"></AddUpdate>
  </el-card>
</template>
<script>
import { goodsPage, goodsDel } from '@/api/goods'
import AddUpdate from './GoodsAddUpdate'
export default {
  name: 'Goods',
  components: {
    AddUpdate,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      searchInfo: {
        pageNo: 1,
        pageSize: 5,
      },
      pageSizeOpts: [1, 2, 5, 10],
      formItem: {
        key: '',
        typeid: '',
      },
      typeList: [
        { id: 33, name: 'fenlei' },
        { id: 2, name: '热菜' },
      ],
      tablesHeight: 0,
      baseUrl: '',
    }
  },
  methods: {
    getList() {
      goodsPage(this.searchInfo)
        .then((res) => {
          if (res.data.code === 200) {
            const data = res.data
            this.tableData = data.data
            this.total = data.total
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
    search() {
      this.searchInfo = {
        key: this.formItem.key,
        typeid: this.formItem.typeid,
        pageNo: 1,
        pageSize: this.searchInfo.pageSize,
      }
      this.getList()
    },
    clear() {
      this.formItem = {
        key: '',
        typeid: '',
      }
      this.searchInfo = {
        pageNo: 1,
        pageSize: 5,
      }
      this.getList()
    },
    show(params) {
      if (params) {
        this.$refs.AddUpdate.init(params)
      } else {
        this.$refs.AddUpdate.init()
      }
    },
    remove(_id) {
      goodsDel({ _id: _id })
        .then((res) => {
          if (res.data.code === 200) {
            this.$Message.success('删除成功')
            this.getList()
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
    pageNoChange(current) {
      this.searchInfo.pageNo = current
      this.getList()
    },
    pageSizeChange(val) {
      this.searchInfo.pageNo = 1
      this.searchInfo.pageSize = val
      this.getList()
    },
  },
  mounted() {
    this.baseUrl = process.env.VUE_APP_BASEURL
    this.getList()
  },
}
</script>
<style lang="less" scoped>
.goodsBox {
  .ivu-form-inline .ivu-form-item {
    width: 267px;
  }
}
</style>
