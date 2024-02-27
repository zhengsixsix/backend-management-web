<template>
  <el-card class="inventoryBox">
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <el-form-item label="商品名称">
        <el-input
          size="small"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="存放区">
        <el-input
          size="small"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item :label-width="20">
        <el-button size="small" type="primary" @click="search">查询</el-button>
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
      <el-table-column label="商品图片" align="center">
        <template slot-scope="scope">
          <img
            :src="baseUrl + scope.row.img"
            alt=""
            style="width: 40px; height: 40px; cursor: pointer"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        align="center"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="规格"
        align="center"
        prop="Specifications"
      ></el-table-column>
      <el-table-column label="货位" align="center">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.CargoSpace" />
        </template>
      </el-table-column>
      <el-table-column label="库存数量" align="center">
        <template slot-scope="scope">
          <el-input size="small"  type="number" v-model="scope.row.Inventory" />
        </template>
      </el-table-column>
      <el-table-column label="实际盘点量" align="center">
        <template slot-scope="scope">
          <el-input
            size="small"
            type="number"
            v-model="scope.row.ActualStocktakingQuantity"
          />
        </template>
      </el-table-column>
      <el-table-column label="盈亏量" align="center">
        <template slot-scope="scope">
          {{ scope.row.Inventory - scope.row.ActualStocktakingQuantity || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="是否绑定该分类？"
            @confirm="handlerSubmit(scope.row)"
          >
            <el-button size="small" slot="reference" type="primary">
              保存信息
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { goodsPage, addInventory } from '@/api/goods'
export default {
  name: 'Inventory',
  data() {
    return {
      tableData: [],
      baseUrl: '',
      formItem: {
        name: '',
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  created() {
    this.getData()
    this.baseUrl = process.env.VUE_APP_BASEURL
  },
  methods: {
    async handlerSubmit(v) {
      let { data } = await addInventory(v)
      if (data.code == 200) {
        this.$message.success('保存成功')
        this.getData()
      } else {
        this.$message.info('保存失败')
      }
    },
    async getData() {
      let { data } = await goodsPage()
      if (data.code == 200) {
        this.tableData = data.data
      }
    },
    search() {
      console.log('search')
    },
  },
}
</script>
