<template>
  <div class="modal">
    <Modal
      :title="type == 'edit' ? '切换分类' : '绑定分类'"
      v-model="Modal2Bol"
      @on-cancel="handleClose"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="className"
          label="分类名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="classDesc"
          label="分类描述"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popconfirm
              title="是否绑定该分类？"
              @confirm="bindClass(scope.row)"
            >
              <el-button slot="reference" size="small" type="primary">
                绑定
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </Modal>
  </div>
</template>

<script>
import { classPage, bindClass } from '@/api/class'
export default {
  props: ['Modal2Bol', 'type', 'listInfo'],
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    async bindClass(v) {
      let { data } = await bindClass({
        typeid: v._id,
        _id: this.listInfo._id,
        className: v.className,
      })
      if (data.code == 200) {
        this.handleClose()
        this.$parent.getNoClassType()
        this.$parent.getYesClassType()
      }
    },
    handleClose() {
      this.$emit('close')
    },
    async getTable() {
      let { data } = await classPage({ _id: '' })
      if (data.code == 200) {
        this.tableData = data.data
      }
    },
  },
}
</script>

<style></style>
