<template>
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo">后台管理系统</div>
      <Icon
        @click.native="collapsedSider"
        :class="rotateIcon"
        style="margin: 0 20px; color: #fff"
        type="md-menu"
        size="24"
      ></Icon>
      <Dropdown class="log_out" @on-click="downMenuClick">
        <Icon type="md-contact" size="30" />
        <DropdownMenu slot="list">
          <DropdownItem name="updatePs">修改密码</DropdownItem>
          <DropdownItem name="logOut">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Menu>
  </Header>
</template>

<script>
export default {
  name: 'hl-Header',
  props: ['isCollapsed'],
  data() {
    return {}
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
  },
  methods: {
    collapsedSider() {
      this.$emit('collapsedSider')
    },
    downMenuClick(val) {
      this.$emit('downMenuClick', val)
    },
  },
}
</script>

<style></style>
