<template>
  <div class="modal">
    <Modal
      v-model="dialogVisible"
      :title="title"
      @on-cancel="handleClose"
      width="800px"
    >
      <el-form :model="formData">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="订单号">
              <el-input size="small" v-model="formData.orderNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称">
              <el-select
                size="small"
                v-model="formData.name"
                placeholder="请选择"
                style="width: 100%"
                remote
                filterable
                :remote-method="remoteMethod"
              >
                <el-option
                  v-for="item of foodsNameList"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商品个数">
              <el-input size="small" v-model="formData.productNum" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货客户">
              <el-input size="small" v-model="formData.customer" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="订单金额">
              <el-input size="small" v-model="formData.productAmount" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单状态">
              <el-select
                size="small"
                v-model="formData.productType"
                placeholder="请选择"
                style="width: 100%"
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
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="支付方式">
              <el-select
                size="small"
                v-model="formData.PaymentMethod"
                placeholder="请选择"
                style="width: 100%"
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
          </el-col>
          <el-col :span="12">
            <el-form-item label="配送方式">
              <el-select
                size="small"
                v-model="formData.DistributionMode"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item of DistributionModeList"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="下单时间">
              <el-date-picker
                style="width: 100%"
                size="small"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="formData.PlaceOrder"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit">确 定</el-button>
      </span>
    </Modal>
  </div>
</template>

<script>
import { addOrder, getAllFoods, update } from '@/api/order'
export default {
  props: ['dialogVisible', 'title', 'info'],
  data() {
    return {
      formData: {
        orderNo: '',
        name: '',
        productNum: '',
        customer: '',
        productAmount: '',
        productType: '',
        PaymentMethod: '',
        DistributionMode: '',
        PlaceOrder: '',
      },
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
      DistributionModeList: [
        { value: '自提', label: '自提' },
        { value: '快递', label: '快递' },
      ],
      foodsNameList: [],
      searchName: '',
    }
  },
  created() {
    this.getFoodsList()
    this.eachData()
  },
  methods: {
    remoteMethod(v) {
      this.searchName = v
      this.getFoodsList()
    },
    eachData() {
      if (this.title == '编辑订单') {
        this.formData = JSON.parse(JSON.stringify(this.info))
      }
    },
    async getFoodsList() {
      let { data } = await getAllFoods({ name: this.searchName })
      if (data.code == 200) {
        this.foodsNameList = data.data
      } else {
        this.$message.error(data.message)
      }
    },
    async handlerSubmit() {
      if (this.title == '编辑订单') {
        let { data } = await update(this.formData)
        if (data.code == 200) {
          this.$message.success(data.msg)
          this.$parent.$parent.getDataList()
          this.$parent.$parent.handleClose()
        }
      } else {
        let { data } = await addOrder(this.formData)
        if (data.code == 200) {
          this.$message.success('添加成功')
          this.$parent.$parent.getDataList()
          this.$parent.$parent.handleClose()
        }
      }
    },
    handleClose() {
      this.$parent.$parent.handleClose()
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item {
  margin-bottom: 0 !important;
}
</style>
