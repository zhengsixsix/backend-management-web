<template>
  <Modal v-model="open" :title="title">
    <el-form
      ref="formItem"
      :model="formItem"
      label-width="80px"
      :rules="ruleValidate"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input
          size="small"
          v-model="formItem.name"
          placeholder="请输入商品名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input
          size="small"
          v-model="formItem.price"
          placeholder="请输入价格"
          clearable
        />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input
          size="small"
          v-model="formItem.desc"
          placeholder="请输入描述"
          clearable
        />
      </el-form-item>
      <el-form-item label="规格" prop="Specifications">
        <el-input
          size="small"
          v-model="formItem.Specifications"
          placeholder="请输入规格"
          clearable
        />
      </el-form-item>
      <el-form-item label="货位">
        <el-input
          size="small"
          v-model="formItem.CargoSpace"
          placeholder="请输入货位"
          clearable
        />
      </el-form-item>
      <el-form-item label="上传图片" prop="img">
        <Upload ref="addUpload" :before-upload="handleUpload" action>
          <Button v-show="!imgUrl" icon="md-cloud-upload">上传图片</Button>
          <img v-show="imgUrl" :src="imgUrl" class="uploadImgUrl" />
        </Upload>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <Button @click="cancel('formItem')">关闭</Button>
      <Button type="primary" :loading="loading" @click="ok('formItem')">
        提交
      </Button>
    </div>
  </Modal>
</template>
<script>
import { goodsUpdate, goodsAdd, goodsTypePage } from '@/api/goods'
import { imgUpload } from '@/api/upload'
export default {
  name: 'Goods',
  data() {
    return {
      formItem: {
        name: '',
        price: '',
        desc: '',
        Specifications: '',
        CargoSpace: '',
      },
      ruleValidate: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        Specifications: [
          {
            required: true,
            message: '请输入规格',
            trigger: 'blur',
          },
        ],
      },
      typeList: [{ typeid: 2, name: '凉菜1' }],
      open: false,
      title: '商品修改',
      loading: false,
      imgUrl: '',
    }
  },
  methods: {
    init(params) {
      this.getTypeList()
      if (params) {
        this.title = '商品修改'
        this.formItem = JSON.parse(JSON.stringify(params))
        this.imgUrl = process.env.VUE_APP_BASEURL + params.img
      } else {
        this.title = '商品添加'
      }
      this.open = true
    },
    getTypeList() {
      goodsTypePage()
        .then((res) => {
          if (res.data.code === 200) {
            this.typeList = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
        .catch((err) => {
          this.$Message.error(err)
        })
    },
    ok(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return
        if (this.formItem._id) {
          goodsUpdate(this.formItem)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('商品修改成功')
                this.cancel('formItem')
                this.$emit('reload')
              } else {
                this.$Message.error(res.data.msg)
              }
            })
            .catch((err) => {
              this.$Message.error(err)
            })
        } else {
          goodsAdd(this.formItem)
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success('商品添加成功')
                this.cancel('formItem')
                this.$emit('reload')
              } else {
                this.$Message.error(res.data.msg)
              }
            })
            .catch((err) => {
              this.$Message.error(err)
            })
        }
      })
    },
    cancel(name) {
      this.formItem = {
        name: '',
        price: '',
        desc: '',
        typeid: '',
      }
      this.$refs[name].resetFields()
      this.open = false
    },
    handleUpload(file) {
      if (file) {
        if (file.size > 500 * 1024) {
          this.$Message.error('图片尺寸太大')
          this.$refs['addUpload'].clearFiles()
        } else {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const _base64 = reader.result
            this.imgUrl = _base64 //将_base64赋值给图片的src，实现图片预览
          }
          let formData = new FormData()
          formData.append('avatar', file)
          imgUpload(formData)
            .then((res) => {
              if (res.data.code === 200) {
                this.formItem.img = res.data.imgUrl
              } else {
                this.$Message.error(err)
              }
            })
            .catch((err) => {
              this.$Message.error(err)
            })
          return false //阻止图片继续上传，使得form表单提交时统一上传
        }
      }
      return false
    },
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
.uploadImgUrl {
  width: 50px;
  height: 50px;
}
</style>
