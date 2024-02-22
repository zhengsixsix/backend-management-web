<template>
  <el-card class="goodsBox">
    <el-button
      type="primary"
      style="margin-bottom: 24px; margin-right: 10px"
      @click="show()"
      size="small"
    >
      添加
    </el-button>
    <el-button
      type="warning"
      style="margin-bottom: 24px; margin-right: 10px"
      @click="showChildren(true)"
      size="small"
    >
      全部展开
    </el-button>
    <el-button
      style="margin-bottom: 24px"
      size="small"
      @click="showChildren(false)"
    >
      全部折叠
    </el-button>
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <el-form-item label="权限名称">
        <el-input
          v-model="formItem.key"
          size="small"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item :label-width="20">
        <el-button type="primary" size="small" @click="search">查询</el-button>
        <el-button style="margin-left: 8px" size="small" @click="clear">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      row-key="id"
      :tree-props="{ children: 'children' }"
      ref="table"
    >
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="权限名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="mark"
        label="权限描述"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="show(scope.row)" type="primary">
            编辑
          </el-button>
          <el-popconfirm
            title="您确认删除这条内容吗？"
            @confirm="remove(scope.row.id)"
            style="margin-left: 8px"
          >
            <el-button slot="reference" size="small" type="danger">
              删除
            </el-button>
          </el-popconfirm>

          <el-button
            style="margin-left: 8px"
            size="small"
            @click="show(scope.row, 1)"
            type="warning"
          >
            添加子权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddUpdate @reload="getList" ref="AddUpdate"></AddUpdate>
  </el-card>
</template>
<script>
import { permitsList, permitsDel } from '@/api/permit'
import AddUpdate from './PermitsAddUpdate'
export default {
  name: 'Permits',
  components: {
    AddUpdate,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      searchInfo: {
        // pageNo: 1,
        // pageSize: 10,
      },
      pageSizeOpts: [1, 2, 5, 10],
      formItem: {
        key: '',
      },
      tablesHeight: 0,
    }
  },
  methods: {
    setTablesHeight() {
      let aH = 0
      let oA = document.getElementById('app')
      let oH = oA.clientHeight || oA.offsetHeight
      let sA = document.getElementById('searchForm')
      let sH = sA.clientHeight || sA.offsetHeight
      aH = oH - sH - 265
      this.tablesHeight = aH
    },
    getList() {
      permitsList(this.searchInfo)
        .then((res) => {
          if (res.data.code === 200) {
            const data = res.data
            this.tableData = data.data
            // this.total = data.total
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
        pageNo: 1,
        pageSize: this.searchInfo.pageSize,
      }
      this.getList()
    },
    clear() {
      this.formItem = {
        key: '',
      }
      this.searchInfo = {
        pageNo: 1,
        pageSize: 5,
      }
      this.getList()
    },
    show(params, level) {
      if (params) {
        this.$refs.AddUpdate.init(params, level)
      } else {
        this.$refs.AddUpdate.init()
      }
    },
    remove(_id) {
      permitsDel({ _id: _id })
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
    showChildren(isShow) {
      this.tableData.forEach((item) => {
        this.$refs['table'].toggleRowExpansion(item, isShow)
      })
    },
  },
  mounted() {
    this.getList()
    setTimeout(() => {
      this.setTablesHeight()
    }, 50)
    window.onresize = () => {
      this.setTablesHeight()
    }
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
