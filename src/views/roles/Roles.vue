<template>
  <Content class="goodsBox">
    <el-button
      type="primary"
      style="margin-bottom: 24px"
      @click="show()"
      size="mini"
    >
      添加
    </el-button>
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <el-form-item label="角色名称">
        <el-input
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
          size="mini"
        />
      </el-form-item>
      <el-form-item :label-width="20">
        <el-button type="primary" @click="search" size="mini">查询</el-button>
        <el-button style="margin-left: 8px" @click="clear" size="mini">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border>
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="show(scope.row)" type="primary">
            编辑
          </el-button>
          <el-popconfirm
            title="您确认删除这条内容吗？"
            @confirm="remove(scope.row._id)"
            style="margin-left: 8px"
          >
            <el-button slot="reference" size="mini" type="danger">
              删除
            </el-button>
          </el-popconfirm>

          <el-button
            style="margin-left: 8px"
            size="mini"
            @click="getPermit(scope.row)"
            type="warning"
          >
            分配权限
          </el-button>
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
    <RolesPermits @reload="getList" ref="RolesPermits"></RolesPermits>
  </Content>
</template>
<script>
import { rolesPage, rolesDel } from '@/api/role'
import AddUpdate from './RolesAddUpdate'
import RolesPermits from './RolesPermits'
export default {
  name: 'Roles',
  components: {
    AddUpdate,
    RolesPermits,
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
      rolesPage(this.searchInfo)
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
    show(params) {
      if (params) {
        this.$refs.AddUpdate.init(params)
      } else {
        this.$refs.AddUpdate.init()
      }
    },
    getPermit(roleId) {
      this.$refs.RolesPermits.init(roleId)
    },
    remove(_id) {
      rolesDel({ _id: _id })
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
