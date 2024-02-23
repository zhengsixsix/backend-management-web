<template>
  <div class="modal">
    <Modal
      :title="type == 'edit' ? '编辑分类' : '新增分类'"
      v-model="Modal1Bol"
      @on-cancel="handleClose"
    >
      <el-form :model="formItem" :rules="rules" ref="formRef">
        <el-form-item label="分类名称" prop="className">
          <el-input
            size="small"
            v-model="formItem.className"
            placeholder="请输入分类名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="分类描述" prop="classDesc">
          <el-input
            size="small"
            v-model="formItem.classDesc"
            placeholder="请输入分类描述"
            clearable
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit('formRef')">
          确 定
        </el-button>
      </span>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ['Modal1Bol', 'type'],
  data() {
    return {
      rules: {
        className: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
        classDesc: [
          { required: true, message: '请输入分类描述', trigger: 'blur' },
        ],
      },
      formItem: {
        className: '',
        classDesc: '',
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handlerSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return
        this.$emit('close')
      })
    },
  },
}
</script>

<style></style>
