<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {
    this.setFont()
    window.addEventListener('resize', () => this.setFont(), false)
    this.$nextTick().then(
      Object.defineProperty(Event.prototype, 'path', {
        get() {
          return this.composedPath()
        },
      }),
    )
  },
  methods: {
    setFont(data) {
      if (data) {
        var cliWidth = data - 10
      } else {
        var html = document.documentElement
        var cliWidth = html.clientWidth - 10
      }
      this.$nextTick(() => {
        document.documentElement.style.fontSize = 10 * (cliWidth / 1920) + 'px'
      })
    },
  },
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
</style>
