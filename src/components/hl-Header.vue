<template>
  <Header ref="header">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo">超市后台管理系统</div>
      <Icon
        @click.native="collapsedSider"
        :class="rotateIcon"
        style="margin: 0 20px; color: #fff"
        type="md-menu"
        size="24"
      ></Icon>
    </Menu>
    <Dropdown class="log_out" @on-click="downMenuClick">
      <Icon type="md-contact" size="30" />
      <DropdownMenu slot="list">
        <DropdownItem name="updatePs">修改密码</DropdownItem>
        <DropdownItem name="logOut">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Header>
</template>

<script>
export default {
  name: 'hl-Header',
  props: ['isCollapsed'],
  data() {
    return {
      barnerImagesData1: [
        {
          url: 'https://pic.imgdb.cn/item/64d89f131ddac507ccdb7db2.webp',
          transform: [1, 0, 0, 1, 0, 0],
          width: 1950,
          a: 0.01,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f821ddac507ccdc71e4.webp',
          transform: [1, 0, 0, 1, -240, -5],
          width: 357.5,
          deg: -Math.PI / 60000,
          a: 0.035,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc10d9.webp',
          transform: [1, 0, 0, 1, -300, 45],
          width: 57.5,
          deg: -Math.PI / 15000,
          a: 0.03,
          g: -0.02,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f811ddac507ccdc715c.webp',
          transform: [1, 0, 0, 1, -180, 0],
          width: 214.3,
          a: -0.035,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc64c2.webp',
          transform: [1, 0, 0, 1, -300, 20],
          width: 471.2,
          deg: Math.PI / 40000,
          a: 0.05,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc65e6.webp',
          transform: [1, 0, 0, 1, 100, 0],
          width: 1046,
          a: 0.01,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc655c.webp',
          transform: [1, 0, 0, 1, 220, 0],
          width: 58.25,
          deg: Math.PI / 10000,
          a: 0.06,
          g: 0.045,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc6536.webp',
          transform: [1, 0, 0, 1, -240, 0],
          width: 1621.3,
          a: 0.01,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f811ddac507ccdc7133.webp',
          transform: [1, 0, 0, 1, 320, 0],
          width: 542.96,
          a: 0.075,
          g: -0.025,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f7c1ddac507ccdc649b.webp',
          transform: [1, 0, 0, 1, 20, 0],
          blur: 1,
          width: 2031.5,
          a: 0.18,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f5c1ddac507ccdc1bbd.webp',
          transform: [1, 0, 0, 1, 400, 0],
          blur: 2.5,
          width: 199.52,
          deg: -Math.PI / 30000,
          a: 0.15,
          g: -0.02,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f571ddac507ccdc113d.webp',
          transform: [1, 0, 0, 1, 0, 10],
          width: 357.1,
          deg: Math.PI / 20000,
          f: 0.0001,
          a: 0.06,
          g: 0.01,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc10aa.webp',
          transform: [1, 0, 0, 1, -150, 0],
          width: 319.2,
          opacity: [0.1, 1],
          a: -0.02,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc1077.webp',
          transform: [1, 0, 0, 1, 40, -5],
          width: 716.9,
          blur: 1,
          a: 0.09,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f561ddac507ccdc102a.webp',
          transform: [1, 0, 0, 1, 20, 0],
          blur: 3,
          width: 1805.6,
          a: 0.3,
        },
        {
          url: 'https://pic.imgdb.cn/item/64d89f821ddac507ccdc71c6.webp',
          transform: [1, 0, 0, 1, 0, 0],
          width: 2400,
          a: 0.25,
        },
      ],
      compensate: 0,
      layers: [],
      allImagesData: null,
      barnersData: null,
      body: null,
      initX: 0,
      moveX: 0,
      startTime: 0,
      duration: 300,
    }
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
  },
  mounted() {
    this.body = document.querySelector('.ivu-menu')
    this.initHeader()
    this.initItems()
    this.body.addEventListener('mouseover', (e) => (this.initX = e.pageX))
    this.body.addEventListener('mousemove', (e) => {
      this.moveX = e.pageX - this.initX
      requestAnimationFrame(this.mouseMove)
    })
    // 鼠标已经离开了视窗或者切出浏览器，执行回正动画
    this.body.addEventListener('mouseleave', this.leave)
    // document.addEventListener("mouseleave", leave)
    window.onblur = this.leave
    // 添加窗口大小监听
    window.addEventListener('resize', this.initItems)
  },
  methods: {
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end
    },
    initHeader() {
      this.barnersData = [this.barnerImagesData1]
      this.allImagesData = this.barnerImagesData1
    },
    initItems() {
      this.compensate = window.innerWidth > 1650 ? window.innerWidth / 1650 : 1
      if (this.layers.length <= 0) {
        this.body.style.display = 'none'
        for (let i = 0; i < this.allImagesData.length; i++) {
          const item = this.allImagesData[i]
          const layer = document.createElement('div')
          layer.classList.add('layer')
          layer.style = 'transform:' + new DOMMatrix(item.transform)
          item.opacity && (layer.style.opacity = item.opacity[0])
          const img = document.createElement('img')
          img.src = item.url
          img.style.filter = `blur(${item.blur}px)`
          img.style.width = `${item.width * this.compensate}px`
          layer.appendChild(img)
          this.body.appendChild(layer)
        }
        this.body.style.display = ''
        this.layers = document.querySelectorAll('.layer')
      } else {
        for (let i = 0; i < this.layers.length; i++) {
          this.layers[i].firstElementChild.style.width = `${
            this.allImagesData[i].width * this.compensate
          }px`
        }
      }
    },
    mouseMove() {
      this.animate()
    },
    leave() {
      this.startTime = 0
      requestAnimationFrame(this.homing) // 开始动画
    },
    homing(timestamp) {
      !this.startTime && (this.startTime = timestamp)
      const elapsed = timestamp - this.startTime
      const progress = Math.min(elapsed / this.duration, 1)
      this.animate(progress) // 传递动画进度
      progress < 1 && requestAnimationFrame(this.homing) // 继续下一帧
    },
    animate(progress) {
      if (this.layers.length <= 0) return
      const isHoming = typeof progress === 'number'
      for (let i = 0; i < this.layers.length; i++) {
        const layer = this.layers[i]
        const item = this.allImagesData[i]
        let m = new DOMMatrix(item.transform)
        let move = this.moveX * item.a // 移动X translateX
        let s = item.f ? item.f * this.moveX + 1 : 1 // 放大比例 Scale
        let g = this.moveX * (item.g || 0) // 移动Y translateY
        if (isHoming) {
          // 回正时处理
          m.e = this.lerp(
            this.moveX * item.a + item.transform[4],
            item.transform[4],
            progress,
          )
          move = 0
          s = this.lerp(item.f ? item.f * this.moveX + 1 : 1, 1, progress)
          g = this.lerp(item.g ? item.g * this.moveX : 0, 0, progress)
        }
        m = m.multiply(new DOMMatrix([m.a * s, m.b, m.c, m.d * s, move, g]))
        if (item.deg) {
          // 有旋转角度
          const deg = isHoming
            ? this.lerp(item.deg * this.moveX, 0, progress)
            : item.deg * this.moveX
          m = m.multiply(
            new DOMMatrix([
              Math.cos(deg),
              Math.sin(deg),
              -Math.sin(deg),
              Math.cos(deg),
              0,
              0,
            ]),
          )
        }
        if (item.opacity) {
          // 有透明度变化
          layer.style.opacity =
            isHoming && this.moveX > 0
              ? this.lerp(item.opacity[1], item.opacity[0], progress)
              : this.lerp(
                  item.opacity[0],
                  item.opacity[1],
                  (this.moveX / window.innerWidth) * 2,
                )
        }
        layer.style.transform = m // 应用所有变换效果
      }
    },
    collapsedSider() {
      this.$emit('collapsedSider')
    },
    downMenuClick(val) {
      this.$emit('downMenuClick', val)
    },
  },
}
</script>

<style lang="less" scoped>
.ivu-menu {
  position: relative;
  overflow: hidden;
  height: 100%;
  max-height: 240px;
}
</style>
