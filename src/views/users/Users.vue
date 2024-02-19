<template>
  <Content class="goodsBox">
    <el-button
      type="primary"
      style="margin-bottom: 24px"
      @click="show"
      size="mini"
    >
      添加
    </el-button>
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <el-form-item label="账号">
        <el-input
          size="mini"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item :label-width="20">
        <el-button size="mini" type="primary" @click="search">查询</el-button>
        <el-button size="mini" style="margin-left: 8px" @click="clear">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border>
      <el-table-column prop="us" label="账号" align="center"></el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex === 0 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            @change="updateState(scope.row.id, $event)"
            v-model="scope.row.state"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.UsersRole.init(scope.row)"
            type="primary"
          >
            分配角色
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
    <UsersRole @reload="getList" ref="UsersRole"></UsersRole>
  </Content>
</template>
<script>
import { usersPage, usersDel, usersUpdateState } from '@/api/user'
import AddUpdate from './UsersAddUpdate'
import UsersRole from './UsersRole'
export default {
  name: 'Users',
  components: {
    AddUpdate,
    UsersRole,
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
    getList() {
      usersPage(this.searchInfo)
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
      this.$refs.AddUpdate.init()
    },
    // 修改账号状态
    updateState(id, state) {
      usersUpdateState({ id, state })
        .then((res) => {
          if (res.data.code === 200) {
            this.$Message.success('状态修改成功')
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
    remove(_id) {
      usersDel({ _id: _id })
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
