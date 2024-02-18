<template>
  <Sider
    hide-trigger
    ref="siderRef"
    collapsible
    :collapsed-width="78"
    :style="{ background: '#fff' }"
    v-model="isCollapsed"
  >
    <Menu
      :default-active="activeName"
      :active-name="activeName"
      theme="dark"
      width="auto"
      :open-names="openNames"
      v-for="item in menuList"
      :key="item.id"
      @on-select="onSelectMenu"
      :class="menuitemClasses"
    >
      <Submenu v-if="item.children.length" :name="item.path">
        <template slot="title">
          <Icon :type="item.icon" />
          {{ isCollapsed ? '' : item.name }}
        </template>
        <MenuItem
          v-for="child in item.children"
          :key="child.id"
          :name="child.path"
        >
          <Icon :type="child.icon" />
          {{ isCollapsed ? '' : child.name }}
        </MenuItem>
      </Submenu>
      <MenuItem v-else :name="item.path">
        <Icon :type="item.icon" />
        {{ isCollapsed ? '' : item.name }}
      </MenuItem>
    </Menu>
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

<style></style>
