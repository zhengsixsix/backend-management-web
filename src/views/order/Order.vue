<template>
  <el-card class="order">
    <div style="margin-bottom: 8px">
      <el-button size="small" type="primary" @click="addOrder">添加</el-button>
    </div>
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <!-- <el-form-item label="开始日">
        <el-input
          size="small"
          v-model="formItem.startDate"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="截止日">
        <el-input
          size="small"
          value-format="yyyy-MM-dd hh:mm:ss"
          v-model="formItem.endDate"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item> -->
      <el-form-item label="订单状态">
        <el-select
          size="small"
          v-model="formItem.productType"
          placeholder="请选择"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item of productTypeList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input
          size="small"
          v-model="formItem.orderNo"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select
          size="small"
          v-model="formItem.PaymentMethod"
          placeholder="请选择"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item of PaymentMethodList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label-width="20">
        <el-button size="small" type="primary" @click="getDataList">
          查询
        </el-button>
        <el-button size="small" style="margin-left: 8px" @click="clear">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border>
      <el-table-column
        label="序号"
        type="index"
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
              @on-change="changeProductType(scope.row, $event)"
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
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handlerEdit(scope.row)"
            type="primary"
          >
            编辑信息
          </el-button>
          <el-popconfirm
            title="您确认删除这条内容吗？"
            @confirm="OrderDelete(scope.row._id)"
            style="margin-left: 8px"
          >
            <el-button slot="reference" size="small" type="danger">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin: 3px 0"
      layout="prev, pager, next"
      :total="total"
      @current-change="ChangePage"
    />
    <ModalVue
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      :title="modalTitle"
      :info="ModalInfo"
    />
  </el-card>
</template>
<script>
import ModalVue from './modal.vue'
import { orderPage, changeOrderType, OrderDelete } from '@/api/order'
export default {
  name: 'order',
  components: {
    ModalVue,
  },
  data() {
    return {
      total: 0,
      ModalInfo: null,
      dialogVisible: false,
      productTypeList: [
        { label: '未付款', value: false },
        { label: '已付款', value: true },
      ],
      PaymentMethodList: [
        { value: '微信', label: '微信' },
        { value: '支付宝', label: '支付宝' },
        { value: '银联', label: '银联' },
        { value: '信用卡', label: '信用卡' },
      ],
      modalTitle: '',
      tableData: [],
      formItem: {
        pageNo: 1,
        pageSize: 10,
        orderNo: '',
        PaymentMethod: '',
        productType: '',
        startDate: '',
        endDate: '',
      },
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    async OrderDelete(id) {
      let { data } = await OrderDelete({ _id: id })
      if (data.code == 200) {
        this.getDataList()
        this.$message.success('删除成功')
      } else {
        this.$message.error(res.msg)
      }
    },
    ChangePage(v) {
      this.formItem.pageNo = v
      this.getDataList()
    },
    clear() {
      this.formItem.orderNo = ''
      this.formItem.pageNo = 1
      this.formItem.pageSize = 10
      this.formItem.PaymentMethod = ''
      this.formItem.productType = ''
      this.formItem.startDate = ''
      this.formItem.endDate = ''
      this.getDataList()
    },
    handlerEdit(v) {
      this.modalTitle = '编辑订单'
      this.dialogVisible = true
      this.ModalInfo = v
    },
    async changeProductType(v, bol) {
      let { data } = await changeOrderType({ _id: v._id, productType: bol })
      if (data.code == 200) {
        this.$message.success(data.msg)
        this.getDataList()
      }
    },
    getDataList() {
      orderPage(this.formItem).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
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
