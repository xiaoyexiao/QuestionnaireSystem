<template>
  <div style="width: 100%;height: 100%">
    <NotFound ref="notFound"></NotFound>
  </div>
</template>

<script>
import NotFound from '../components/NotFound'
export default {
  name: 'SkipPage',
  components: {NotFound},
  data () {
    return {
      count: 2
    }
  },
  methods: {
    jump () {
      const timeJump = 2
      if (!this.timer) {
        this.count = timeJump
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= timeJump) {
            this.count--
            this.$refs.notFound.msg = `该问卷未发布，请联系创建人发布该问卷, ${this.count+1} s 后自动跳转 `
            // console.log(this.count)
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            if (this.$refs.notFound.skipImmediately === true) {
              return
            }
            this.$router.push('/')
          }
        }, 1000)
      }
    }
  },
  mounted () {
    this.$refs.notFound.skipImmediately = false
    this.$refs.notFound.content = ''
    this.$refs.notFound.msg = `该问卷未发布，请联系创建人发布该问卷, ${this.count+1} s 后自动跳转 `
    this.$refs.notFound.action = '立即跳转'
    this.jump()
  }
}
</script>

<style scoped>

</style>
