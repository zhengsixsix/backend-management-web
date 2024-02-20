<template>
  <el-card class="order">
    <div style="margin-bottom: 8px">
      <el-button size="mini" type="primary" @click="addOrder">添加</el-button>
      <el-button size="mini" type="danger" style="margin-left: 8px">
        批量删除
      </el-button>
    </div>
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <el-form-item label="开始日">
        <el-input
          size="mini"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="截止日">
        <el-input
          size="mini"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input
          size="mini"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="订单号">
        <el-input
          size="mini"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="支付方式">
        <el-input
          size="mini"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item :label-width="20">
        <el-button size="mini" type="primary" @click="getDataList">
          查询
        </el-button>
        <el-button size="mini" style="margin-left: 8px" @click="clear">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border>
      <el-table-column
        label="选择"
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        label="订单号"
        align="center"
        prop="orderNo"
      ></el-table-column>
      <el-table-column
        label="商品名称"
        align="center"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="商品个数"
        align="center"
        prop="productNum"
      ></el-table-column>
      <el-table-column
        label="收货客户"
        align="center"
        prop="customer"
      ></el-table-column>
      <el-table-column
        label="订单金额"
        align="center"
        prop="productAmount"
      ></el-table-column>
      <el-table-column label="订单状态" align="center" prop="productType">
        <template slot-scope="scope">
          <div style="padding: 6px 0">
            <i-Switch
              size="large"
              v-model="scope.row.productType"
              @on-change="changeProductType"
            >
              <template #open>
                <span>已付</span>
              </template>
              <template #close>
                <span>未付</span>
              </template>
            </i-Switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="支付方式"
        align="center"
        prop="PaymentMethod"
      ></el-table-column>
      <el-table-column
        label="配送方式"
        align="center"
        prop="DistributionMode"
      ></el-table-column>
      <el-table-column
        label="下单时间"
        align="center"
        prop="PlaceOrder"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.UsersRole.init(scope.row)"
            type="primary"
          >
            编辑信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <ModalVue
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      :title="modalTitle"
    />
  </el-card>
</template>
<script>
import ModalVue from './modal.vue'
import { orderPage } from '@/api/order'
export default {
  name: 'order',
  components: {
    ModalVue,
  },
  data() {
    return {
      dialogVisible: false,
      modalTitle: '',
      tableData: [],
      formItem: {
        pageNo: 1,
        pageSize: 10,
        orderNo: '',
      },
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    changeProductType(v) {
      console.log(v)
    },
    getDataList() {
      orderPage(this.formItem).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addOrder() {
      this.modalTitle = '新增订单'
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
  },
}
</script>
