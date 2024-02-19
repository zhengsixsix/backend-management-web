<template>
  <div class="login-container">
    <div id="login-three-container"></div>
    <div class="login-plane">
      <div class="login-plane-container">
        <img
          class="login-plane-human"
          src="@/assets/images/login_human.png"
          alt=""
        />
        <div class="login-plane-title">
          超市后台管理系统
          <img
            class="login-plane-title-line"
            src="@/assets/images/login_horizontal_line.png"
            alt=""
          />
        </div>
        <div class="login-plane-form">
          <el-form :model="formField" :rules="formRules" ref="dataForm">
            <el-form-item prop="us">
              <el-input
                placeholder="用户名 / 账号"
                type="text"
                v-model="formField.us"
              >
                <template slot="prepend">账号</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="ps">
              <el-input
                placeholder="密码"
                type="password"
                v-model="formField.ps"
              >
                <template slot="prepend">密码</template>
              </el-input>
            </el-form-item>
            <div class="login-code-container" v-if="isReg">
              <el-form-item style="width: 50%" prop="code">
                <el-input
                  placeholder="验证码"
                  type="text"
                  v-model="formField.code"
                ></el-input>
              </el-form-item>
              <div @click="getValidateCodeHandle" class="login-code">
                <img :src="codeSrc" />
              </div>
            </div>
            <el-form-item prop="autoLogin">
              <el-checkbox
                v-model="formField.whetherAutoLogin"
                label="自动登陆"
              ></el-checkbox>
            </el-form-item>
          </el-form>
          <el-button
            @click="handleSubmit('dataForm')"
            style="width: 100%"
            type="primary"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
    <div class="login-ground"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import _ from 'lodash'
import { login, getMailCode, reg } from '@/api/user'
import { getMenusList } from '@/api/permit'
export default {
  data() {
    return {
      formField: {
        us: 'ceshi@ceshi.com',
        ps: 'ceshi',
      },
      formRules: {
        us: [
          {
            validator: (rule, value, callback) => {
              if (!value || value === ' ') {
                callback(new Error('请输入邮箱'))
              } else {
                const exp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
                if (!exp.test(value)) {
                  callback(new Error('请输入正确的邮箱'))
                } else {
                  callback()
                }
              }
            },
            trigger: 'blur',
          },
        ],
        ps: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      },
      isReg: false,
      scene: null,
      width: null,
      height: null,
      particles_init_position: 0,
      zprogress: '',
      zprogress_second: '',
      particles_first: '',
      particles_second: '',
      cloudParameter_first: null,
      cloudParameter_second: null,
      zAxisNumber: 0,
      camera: null,
      sphereGeometry: null,
      sphere: null,
      Sphere_Group: null,
      container: null,
      depth: 1400,
      parameters: null,
      materials: [],
      cameraTarget: new THREE.Vector3(0, 0, 0),
      renderer: null,
      renderCloudMove_first: null,
      renderCloudMove_second: null,
      stats: new Stats(),
    }
  },
  mounted() {
    this.container = document.getElementById('login-three-container')
    this.width = this.container.clientWidth
    this.height = this.container.clientHeight
    this.initScene()
    this.initSceneBg()
    this.initCamera()
    this.initLight()
    this.initSphereModal()
    this.initSphereGroup()
    this.particles_init_position = -this.zAxisNumber - this.depth / 2
    this.zprogress = this.particles_init_position
    this.zprogress_second = this.particles_init_position * 2
    this.particles_first = this.initSceneStar(this.particles_init_position)
    this.particles_second = this.initSceneStar(this.zprogress_second)
    this.cloudParameter_first = this.initTubeRoute(
      [
        new THREE.Vector3(-this.width / 10, 0, -this.depth / 2),
        new THREE.Vector3(-this.width / 4, this.height / 8, 0),
        new THREE.Vector3(-this.width / 4, 0, this.zAxisNumber),
      ],
      400,
      200,
    )
    this.cloudParameter_second = this.initTubeRoute(
      [
        new THREE.Vector3(this.width / 8, this.height / 8, -this.depth / 2),
        new THREE.Vector3(this.width / 8, this.height / 8, this.zAxisNumber),
      ],
      200,
      100,
    )
    this.initRenderer()
    // 控制器必须放在renderer函数后面
    this.initOrbitControls()
    this.animate()
  },
  methods: {
    handleSubmit(name) {
      if (this.isReg) {
        return (this.isReg = false)
      }
      this.$refs[name].validate((valid) => {
        if (!valid) return
        let isok = false
        login(this.formField)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '登录成功',
                type: 'success',
              })
              this.$store.commit('setToken', res.data.token)
              return getMenusList()
            } else {
              isok = true
              this.$message({
                message: res.data.msg,
                type: 'error',
              })
            }
          })
          .then((res) => {
            if (res.data.code === 200) {
              const data = res.data
              this.$router.push('/welcome')
              this.$store.commit('setMenus', JSON.stringify(data.data))
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error',
              })
            }
          })
          .catch((err) => {
            if (isok) return
            this.$message({
              message: err,
              type: 'error',
            })
          })
      })
    },
    initScene() {
      this.scene = new THREE.Scene()
      // 在场景中添加雾的效果，Fog参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
      this.scene.fog = new THREE.Fog(0x000000, 0, 10000)
    },
    initSceneBg() {
      new THREE.TextureLoader().load(
        require('@/assets/images/sky.png'),
        (texture) => {
          const geometry = new THREE.BoxGeometry(
            this.width,
            this.height,
            this.depth,
          ) // 创建一个球形几何体 SphereGeometry
          const material = new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.BackSide,
          }) // 创建基础为网格基础材料
          const mesh = new THREE.Mesh(geometry, material)
          mesh.castShadow = true // cast投射，方块投射阴影
          mesh.receiveShadow = true // 物体接收阴影
          this.scene.add(mesh)
        },
      )
    },
    initCamera() {
      /**
       * 方式1：固定视野的距离，求满足完整的视野画面需要多大的视域角度
       * tan正切值（直角边除以临边）
       * const mathTan_value = width / 2 / depth
       * 视域角度
       * const fov_angle = (Math.atan(mathTan_value) * 180) / Math.PI
       * 创建透视相机
       * new THREE.PerspectiveCamera(fov_angle, width / height, 1, depth)
       * 场景是一个矩形容器（坐标(0, 0, 0)是矩形容器的中心），相机能看到的距离是depth，
       * camera.position.set(0, 0, depth / 2)
       */

      /**
       * 使用透视相机
       * 参数值分别是：
       * fov（field of view） — 摄像机视锥体垂直视野角度
       * aspect — 摄像机视锥体长宽比
       * near — 摄像机视锥体近端面
       * far — 摄像机视锥体远端面
       * 这里需要注意：透视相机是鱼眼效果，如果视域越大，边缘变形越大。
       * 为了避免边缘变形，可以将fov角度设置小一些，距离拉远一些
       */

      /**
       * 方式2:固定视域角度，求需要多少距离才能满足完整的视野画面
       * 15度等于(Math.PI / 12)
       */
      const fov = 15
      const distance = this.width / 2 / Math.tan(Math.PI / 12)
      this.zAxisNumber = Math.floor(distance - this.depth / 2)
      this.camera = new THREE.PerspectiveCamera(
        fov,
        this.width / this.height,
        1,
        30000,
      )
      /**
       * 这里给z轴的距离加了100，原因是做调整，使得视域更完整
       * 这么做并不代表前面计算错误了，根据前面的计算值并不能很完整的看到
       * 至于原因，我想大概就类似于0.1+0.2不等于0.3吧
       * 所以我自作主张地加了100的值做调整（但是不建议，因为当屏幕足够宽时候会看到边缘）
       */
      // camera.position.set(0, 0, zAxisNumber + 100)
      this.camera.position.set(0, 0, this.zAxisNumber)
      this.camera.lookAt(this.cameraTarget)
      // const helper = new THREE.CameraHelper(camera)
      // helper.update()
      // scene.add(helper)
    },
    initLight() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      // 右下角点光源
      const light_rightBottom = new THREE.PointLight(0x0655fd, 5, 0)
      light_rightBottom.position.set(0, 100, -200)
      this.scene.add(ambientLight)
      this.scene.add(light_rightBottom)
    },
    initSphereModal() {
      //材质
      let material = new THREE.MeshPhongMaterial()
      material.map = new THREE.TextureLoader().load(
        require('@/assets/images/earth_bg.png'),
      )
      material.blendDstAlpha = 1
      //几何体
      this.sphereGeometry = new THREE.SphereGeometry(50, 64, 32)
      //模型
      this.sphere = new THREE.Mesh(this.sphereGeometry, material)
    },
    initSphereGroup() {
      this.Sphere_Group = new THREE.Group()
      this.Sphere_Group.add(this.sphere)
      this.Sphere_Group.position.x = -400
      this.Sphere_Group.position.y = 200
      this.Sphere_Group.position.z = -200
      this.scene.add(this.Sphere_Group)
    },
    initSceneStar(initZposition) {
      const geometry = new THREE.BufferGeometry()
      const vertices = []
      const pointsGeometry = []
      const textureLoader = new THREE.TextureLoader()
      const sprite1 = textureLoader.load(
        require('@/assets/images/starflake1.png'),
      )
      const sprite2 = textureLoader.load(
        require('@/assets/images/starflake2.png'),
      )
      this.parameters = [
        [[0.6, 100, 0.75], sprite1, 50],
        [[0, 0, 1], sprite2, 20],
      ]
      // 初始化500个节点
      for (let i = 0; i < 500; i++) {
        /**
         * const x: number = Math.random() * 2 * width - width
         * 等价
         * THREE.MathUtils.randFloatSpread(width)
         */
        const x = THREE.MathUtils.randFloatSpread(this.width)
        const y = _.random(0, this.height / 2)
        const z = _.random(-this.depth / 2, this.zAxisNumber)
        vertices.push(x, y, z)
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3),
      )

      // 创建2种不同的材质的节点（500 * 2）
      for (let i = 0; i < this.parameters.length; i++) {
        const color = this.parameters[i][0]
        const sprite = this.parameters[i][1]
        const size = this.parameters[i][2]

        this.materials[i] = new THREE.PointsMaterial({
          size,
          map: sprite,
          blending: THREE.AdditiveBlending,
          depthTest: true,
          transparent: true,
        })
        this.materials[i].color.setHSL(color[0], color[1], color[2])
        const particles = new THREE.Points(geometry, this.materials[i])
        particles.rotation.x = Math.random() * 0.2 - 0.15
        particles.rotation.z = Math.random() * 0.2 - 0.15
        particles.rotation.y = Math.random() * 0.2 - 0.15
        particles.position.setZ(initZposition)
        pointsGeometry.push(particles)
        this.scene.add(particles)
      }
      return pointsGeometry
    },
    initTubeRoute(route, geometryWidth, geometryHeigh) {
      const curve = new THREE.CatmullRomCurve3(route, false)
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false)
      const tubeMaterial = new THREE.MeshBasicMaterial({
        // color: '0x4488ff',
        opacity: 0,
        transparent: true,
      })
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial)
      this.scene.add(tube)

      const clondGeometry = new THREE.PlaneGeometry(
        geometryWidth,
        geometryHeigh,
      )
      const textureLoader = new THREE.TextureLoader()
      const cloudTexture = textureLoader.load(
        require('@/assets/images/cloud.png'),
      )
      const clondMaterial = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      })
      const cloud = new THREE.Mesh(clondGeometry, clondMaterial)
      this.scene.add(cloud)
      return {
        cloud,
        curve,
      }
    },
    initTubeRoute(route, geometryWidth, geometryHeigh) {
      const curve = new THREE.CatmullRomCurve3(route, false)
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false)
      const tubeMaterial = new THREE.MeshBasicMaterial({
        // color: '0x4488ff',
        opacity: 0,
        transparent: true,
      })
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial)
      this.scene.add(tube)

      const clondGeometry = new THREE.PlaneGeometry(
        geometryWidth,
        geometryHeigh,
      )
      const textureLoader = new THREE.TextureLoader()
      const cloudTexture = textureLoader.load(
        require('@/assets/images/cloud.png'),
      )
      const clondMaterial = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      })
      const cloud = new THREE.Mesh(clondGeometry, clondMaterial)
      this.scene.add(cloud)
      return {
        cloud,
        curve,
      }
    },
    initRenderer() {
      // 开启抗锯齿
      // 在 css 中设置背景色透明显示渐变色
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      // 定义渲染器的尺寸；在这里它会填满整个屏幕
      this.renderer.setSize(this.width, this.height)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.container.appendChild(this.renderer.domElement)
      this.container.appendChild(this.stats.dom)
      this.renderCloudMove_first = this.initCloudMove(
        this.cloudParameter_first,
        0.0002,
      )
      this.renderCloudMove_second = this.initCloudMove(
        this.cloudParameter_second,
        0.0008,
        0.001,
      )
    },
    initOrbitControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      // enabled设置为true是可以使用鼠标控制视角
      controls.enabled = false
      controls.update()
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.renderSphereRotate()
      this.renderStarMove()
      this.renderCloudMove_first()
      this.renderCloudMove_second()
      this.renderer.render(this.scene, this.camera)
    },
    renderSphereRotate() {
      if (this.sphere) {
        this.Sphere_Group.rotateY(0.001)
      }
    },
    renderStarMove() {
      const time = Date.now() * 0.00005
      this.zprogress += 1
      this.zprogress_second += 1

      if (this.zprogress >= this.zAxisNumber + this.depth / 2) {
        this.zprogress = this.particles_init_position
      } else {
        this.particles_first.forEach((item) => {
          item.position.setZ(this.zprogress)
        })
      }
      if (this.zprogress_second >= this.zAxisNumber + this.depth / 2) {
        this.zprogress_second = this.particles_init_position
      } else {
        this.particles_second.forEach((item) => {
          item.position.setZ(this.zprogress_second)
        })
      }

      for (let i = 0; i < this.materials.length; i++) {
        const color = this.parameters[i][0]

        const h = ((360 * (color[0] + time)) % 360) / 360
        this.materials[i].color.setHSL(
          color[0],
          color[1],
          parseFloat(h.toFixed(2)),
        )
      }
    },
    // 初始化云的运动函数
    initCloudMove(
      cloudParameter,
      speed,
      scaleSpeed = 0.0006,
      maxScale = 1,
      startScale = 0,
    ) {
      let cloudProgress = 0
      return () => {
        if (startScale < maxScale) {
          startScale += scaleSpeed
          cloudParameter.cloud.scale.setScalar(startScale)
        }
        if (cloudProgress > 1) {
          cloudProgress = 0
          startScale = 0
        } else {
          cloudProgress += speed
          if (cloudParameter.curve) {
            const point = cloudParameter.curve.getPoint(cloudProgress)
            if (point && point.x) {
              cloudParameter.cloud.position.set(point.x, point.y, point.z)
            }
          }
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  position: relative;
  #login-three-container {
    width: 100%;
    height: 100%;
  }
  .login-plane {
    position: absolute;
    z-index: 9999;
    width: 600px;
    height: 500px;
    background-image: url('~@/assets/images/login_border.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-plane-container {
      width: 100%;
      height: 100%;
      border-radius: 18px;
      background-color: #007eff2e;
      position: relative;
      @keyframes humanMove {
        0% {
          top: -100px;
        }
        25% {
          top: -120px;
        }
        50% {
          top: -100px;
        }
        75% {
          top: -80px;
        }
        100% {
          background: -100px;
        }
      }
      .login-plane-human {
        position: absolute;
        width: 260px;
        right: -120px;
        top: -100px;
        animation: humanMove 8s linear 0s infinite normal;
      }
      .login-plane-title {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 35px;
        color: #fff;
        font-weight: 700;
        img {
          width: 50%;
        }
        .login-plane-title-line {
          width: 80%;
          position: absolute;
          bottom: 0;
        }
      }
      .login-plane-form {
        padding: 45px 55px;
        box-sizing: border-box;
        .login-code-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          .login-code {
            cursor: pointer;
            width: 45%;
            height: 40px;
            background-color: #c8c8c8;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .login-ground {
    position: absolute;
    z-index: 9998;
    width: 100%;
    height: 400px;
    background-image: url('~@/assets/images/ground.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
