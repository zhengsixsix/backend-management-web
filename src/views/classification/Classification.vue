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
                  size="mini"
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
          </div>
          <el-tree :data="TreeData"></el-tree>
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
                  size="mini"
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
  </div>
</template>
<script>
export default {
  name: 'Classification',
  data() {
    return {
      TreeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>
