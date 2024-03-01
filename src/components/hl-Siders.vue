<template>
  <Sider
    hide-trigger
    ref="siderRef"
    collapsible
    :collapsed-width="78"
    :style="{ background: '#fff' }"
    v-model="isCollapsed"
  >
    <el-menu
      :default-active="activeName"
      class="el-menu-vertical-demo"
      v-for="item in menuList"
      :key="item.id"
      @select="onSelectMenu"
      :collapse="isCollapsed"
    >
      <el-submenu v-if="item.children.length" :index="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          {{ isCollapsed ? '' : item.name }}
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.id"
          :index="child.path"
        >
          {{ child.name }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <i class="el-icon-menu"></i>
        {{ isCollapsed ? '' : item.name }}
      </el-menu-item>
    </el-menu>
  </Sider>
</template>

<script>
export default {
  name: 'hl-Siders',
  props: ['activeName', 'openNames', 'menuList'],
  data() {
    return {
      isCollapsed: false,
    }
  },
  computed: {
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
  },
  methods: {
    onSelectMenu(val) {
      this.$emit('onSelectMenu', val)
    },
    toggleCollapse() {
      this.$refs.siderRef.toggleCollapse()
    },
  },
}
</script>

<style lang="less" scoped></style>
