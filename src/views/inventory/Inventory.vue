<template>
  <el-card class="inventoryBox">
    <el-form id="searchForm" :model="formItem" :label-width="80" inline>
      <el-form-item label="商品名称">
        <el-input
          size="mini"
          v-model="formItem.key"
          placeholder="模糊搜索"
          clearable
        />
      </el-form-item>
      <el-form-item label="存放区">
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
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column label="商品名称" align="center"></el-table-column>
      <el-table-column label="规格" align="center"></el-table-column>
      <el-table-column label="货位" align="center"></el-table-column>
      <el-table-column label="库存数量" align="center"></el-table-column>
      <el-table-column label="实际盘点量" align="center"></el-table-column>
      <el-table-column label="盈亏量" align="center"></el-table-column>
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
  </el-card>
</template>
<script>
export default {
  name: 'Inventory',
  data() {
    return {
      formItem: {
        key: '',
      },
    }
  },
  methods: {
    search() {
      console.log('search')
    },
  },
}
</script>
