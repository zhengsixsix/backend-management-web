<template>
  <div class="classification">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>未分类商品</span>
          </div>
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
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="$refs.UsersRole.init(scope.row)"
                  type="primary"
                >
                  分类
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>商品类型</span>
            <div>
              <el-button
                type="primary"
                size="small"
                @click="addCommodityClass('add')"
              >
                添加分类
              </el-button>
              <el-button type="primary" size="small">编辑分类</el-button>
              <el-button type="primary" size="small">删除分类</el-button>
            </div>
          </div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="2">
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>已分类商品</span>
          </div>
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
            <el-table-column label="商品类型" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="$refs.UsersRole.init(scope.row)"
                  type="primary"
                >
                  重新分类
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <Modal1 :type="modalType" :Modal1Bol="Modal1Bol" @close="modalClose" />
  </div>
</template>
<script>
import Modal1 from './components/modal1.vue'
export default {
  name: 'Classification',
  components: { Modal1 },
  data() {
    return {
      modalType: '',
      Modal1Bol: false,
    }
  },
  methods: {
    addCommodityClass() {
      this.Modal1Bol = true
    },
    modalClose() {
      this.Modal1Bol = false
    },
  },
}
</script>
<style lang="less" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
