<template>
  <div class="classification">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>未分类商品</span>
            <div>
              <el-form label-width="80px">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="商品名称">
                      <el-input
                        v-model="NoFormItem.name"
                        size="small"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="货位">
                      <el-input
                        v-model="NoFormItem.CargoSpace"
                        size="small"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      size="small"
                      type="primary"
                      style="margin-left: 5px; margin-top: 4px"
                      @click="getNoClassType"
                    >
                      搜索
                    </el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <el-table :data="NoClassTableData" border>
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
            <el-table-column
              label="货位"
              align="center"
              prop=""
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="BindClass(scope.row)"
                  type="primary"
                >
                  分类
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="float: right; margin: 3px 0"
            layout="prev, pager, next"
            :total="NoTotal"
            @current-change="NoChangePage"
          />
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
              <el-button
                type="primary"
                size="small"
                @click="editCommodityClass('edit')"
              >
                编辑分类
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click="removeCommodityClass"
              >
                删除分类
              </el-button>
            </div>
          </div>
          <el-menu
            :default-active="classMenuIndex"
            class="el-menu-vertical-demo"
            @select="classMenuSelect"
          >
            <el-menu-item
              :index="item._id"
              v-for="item of classList"
              :key="item._id"
            >
              <span slot="title">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.classDesc"
                  placement="top-start"
                >
                  <span>{{ item.className }}</span>
                </el-tooltip>
              </span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>已分类商品</span>
            <div>
              <el-form label-width="80px">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="商品名称">
                      <el-input
                        size="small"
                        v-model="YesFormItem.name"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="货位">
                      <el-input
                        size="small"
                        v-model="YesFormItem.CargoSpace"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      size="small"
                      type="primary"
                      style="margin-left: 5px; margin-top: 4px"
                      @click="getYesClassType"
                    >
                      搜索
                    </el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <el-table :data="ClassTableData" border>
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
            <el-table-column
              label="货位"
              align="center"
              prop=""
            ></el-table-column>
            <el-table-column
              label="商品类型"
              align="center"
              prop="typeName"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="handlerEditClass('edit', scope.row)"
                  type="primary"
                >
                  重新分类
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="float: right; margin: 3px 0"
            layout="prev, pager, next"
            :total="YesTotal"
            @current-change="YesChangePage"
          />
        </el-card>
      </el-col>
    </el-row>
    <Modal1
      v-if="Modal1Bol"
      :type="modal1Type"
      :Modal1Bol="Modal1Bol"
      :MenuIndex="MenuIndex"
      @close="modalClose"
    />
    <Modal2
      v-if="Modal2Bol"
      :type="modal2Type"
      :Modal2Bol="Modal2Bol"
      @close="Modal2Close"
      :listInfo="Modal2Info"
    />
  </div>
</template>
<script>
import Modal1 from './components/modal1.vue'
import Modal2 from './components/modal2.vue'
import { classPage, NoClassPage, classRemove, queryClass } from '@/api/class'
export default {
  name: 'Classification',
  components: { Modal1, Modal2 },
  data() {
    return {
      modal1Type: '',
      modal2Type: '',
      Modal1Bol: false,
      Modal2Bol: false,
      classList: [],
      classMenuIndex: '',
      NoClassTableData: [],
      Modal2Info: null,
      Modal1Info: null,
      ClassTableData: [],
      MenuIndex: '',
      NoFormItem: {
        name: '',
        CargoSpace: '',
        isType: false,
        pageNum: 1,
        pageSize: 5,
      },
      YesFormItem: {
        name: '',
        CargoSpace: '',
        isType: true,
        pageNum: 1,
        pageSize: 5,
      },
      NoTotal: 0,
      YesTotal: 0,
    }
  },
  created() {
    this.getClassData()
    this.getNoClassType()
    this.getYesClassType()
  },
  methods: {
    NoChangePage(v) {
      this.NoFormItem.pageNum = v
      this.getNoClassType()
    },
    YesChangePage() {
      this.YesFormItem.pageNum = v
      this.getYesClassType()
    },
    async removeCommodityClass() {
      this.$confirm('确认删除？').then(async () => {
        let { data } = await classRemove({ _id: this.MenuIndex })
        if (data.code == 200) {
          this.getClassData()
          this.$message.success('删除成功')
        } else {
          this.$message.info('删除失败')
        }
      })
    },
    handlerEditClass(type, v) {
      this.modal2Type = type
      this.Modal2Bol = true
      this.Modal2Info = v
    },
    BindClass(v) {
      this.modal2Type = 'add'
      this.Modal2Bol = true
      this.Modal2Info = v
    },
    Modal2Close() {
      this.Modal2Bol = false
    },
    async classMenuSelect(index, indexPath) {
      this.MenuIndex = index
      let { data } = await queryClass({ typeid: this.MenuIndex })
      if (data.code == 200) {
        this.ClassTableData = data.data
      }
    },
    async getNoClassType() {
      let { data } = await NoClassPage(this.NoFormItem)
      if (data.code == 200) {
        this.NoClassTableData = data.data
        this.NoTotal = data.total
      }
    },
    async getYesClassType() {
      let { data } = await NoClassPage(this.YesFormItem)
      if (data.code == 200) {
        this.ClassTableData = data.data
        this.YesTotal = data.total
      }
    },
    async getClassData() {
      let { data } = await classPage({ _id: '' })
      if (data.code == 200) {
        this.classList = data.data
      }
    },
    addCommodityClass(v) {
      this.Modal1Bol = true
      this.modal1Type = v
    },
    editCommodityClass(v) {
      this.Modal1Bol = true
      this.modal1Type = v
    },
    modalClose() {
      this.Modal1Bol = false
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .el-form-item {
  margin-bottom: 0;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
