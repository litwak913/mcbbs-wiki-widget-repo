import { randomChoice } from 'Utils/utils'

/*
 * @Author: Salt
 * @Date: 2022-07-23 17:00:54
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-23 21:47:51
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\widget\SaltFirework\widget.ts
 */
interface particle {
  rad: number
  x: number
  y: number
  speed: number
  radius: number
  size: number
  hue: number
  bright: number
  alpha: number
}

// 阻止重复调用
if (document.getElementById('saltFireWorkCanvas'))
  throw new Error('同一页面中只能有一个烟花')
// 参数
//! 颜色范围
const hueRange = (function () {
  let defaultValue = (function () {
    var x = []
    for (let i = 1; i < 361; i++) x.push(i)
    return x
  })()
  let e = document.getElementById('saltFireworkHueRange')
  if (!e) return defaultValue
  let c = (e.textContent || '')
    .replace(/[\s\n_]+/g, '')
    .replace(/[\;\/\|\/\\，；、\-]+/g, ',')
    .split(',')
    .map((v) => parseInt(v))
    .filter(Boolean)
    .filter((v) => v > 0 && v < 361)
  if (!c || c.length < 1 || c.length > 360) return defaultValue
  return c
})() // [0, 360]
//! 颜色变化区间
const hueDiff = (function () {
  let e = document.getElementById('saltFireworkHueDiff')
  if (!e) return 30
  let c = parseInt(e.textContent || '')
  if (isNaN(c) || c < 0 || c > 180) return 30
  return c
})()
//! 粒子效果数量
const count = (function () {
  let e = document.getElementById('saltFireworkCount')
  if (!e) return 110
  let c = parseInt(e.textContent || '')
  if (isNaN(c) || c < 1 || c > 500) return 110
  return c
})()
const baseRange = [1, 4] // 粒子大小
const speedMultiply = 6 // 粒子速度范围
const radius = 1.7 // 粒子扩散半径比粒子速度
const baseSpeed = 0.2 // 粒子最低速度
const fallSpeed = 1.1 // 粒子下坠速度
const tail = 15 // 尾迹
/**创建canvas */
let canvas = document.createElement('canvas')
/**获取canvas绘图区域 */
let context = canvas.getContext('2d')!
/**烟花粒子数组 */
let particles: (particle | null)[] = []
/**记录剩余粒子数量，在合适的时机清理画布 */
let lastLength = 0
let zeroFrame = 0
init()
/** 初始化 */
function init() {
  canvas.id = 'saltFireWorkCanvas'
  canvas.style.left = '0'
  canvas.style.top = '0'
  canvas.style.position = 'fixed'
  canvas.style.pointerEvents = 'none' // 不干扰鼠标
  canvas.style.zIndex = '99999' // 置于顶层
  document.body.appendChild(canvas)
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, false)
  clearCanvas()
  tick() // 开始tick
  document.addEventListener('mousedown', function (e) {
    createFireworks(e.clientX, e.clientY)
  }) // 监听事件
}
/**清理绘图区 */
function clearCanvas() {
  context.fillStyle = 'rgba(255,255,255,0)'
  context.fillRect(0, 0, canvas.width, canvas.height)
}
/**重设绘图区大小*/
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
/**创建烟花*/
function createFireworks(x: number, y: number) {
  /**这个烟花的颜色 */
  let hue = randomChoice(hueRange)
  for (let i = 0; i < count; i++) {
    let spd = Math.random() * speedMultiply + baseSpeed
    let p = {
      rad: Math.random() * 2 * Math.PI, // 弧度
      x: x,
      y: y,
      speed: spd,
      radius: spd * radius,
      size:
        Math.floor(Math.random() * (baseRange[1] - baseRange[0])) +
        baseRange[0],
      hue: hueRandom(),
      bright: Math.floor(Math.random() * 16) + 65,
      alpha: Math.floor(Math.random() * 51) + 50,
    }
    particles.push(p)
  }
  function hueRandom() {
    let h = Math.floor(Math.random() * hueDiff + hue - hueDiff)
    if (h > 360) h -= 360
    else if (h < 0) h += 360
    return h
  }
}
/**主过程*/
function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i]
    if (!p) continue
    p.x += Math.cos(p.rad) * p.radius
    p.y += Math.sin(p.rad) * p.radius + fallSpeed
    p.radius *= 1 - p.speed / 100
    p.alpha -= 0.75
    context.beginPath()
    context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false)
    context.closePath()
    context.fillStyle = `hsla(${p.hue},100%,${p.bright}%,${p.alpha / 100})`
    context.fill()
    if (p.alpha < 0.75)
      //! 标记已经透明到看不见的粒子
      particles[i] = null
  }
  if (lastLength === 0 && particles.length === 0) {
    zeroFrame += 1
    if (zeroFrame === 30)
      //! 连续30帧没有粒子
      //! 利用画布重设大小清除内容的特性来清理里面的东西
      canvas.height = window.innerHeight
  } else {
    zeroFrame = 0
  }
  lastLength = particles.length
}
/**画出尾迹 */
function drawTail() {
  //! 保留前一刻的图案作为尾迹
  context.globalCompositeOperation = 'destination-out'
  context.fillStyle = `rgba(255,255,255,${1 / tail})`
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.globalCompositeOperation = 'lighter'
}
/**清理已经消失的粒子*/
function clearParticles() {
  let cp = []
  for (let p of particles) if (p) cp.push(p)
  particles = cp
}
/** 使用requestAnimationFrame绘制 */
function tick() {
  //! 画尾迹 -> 画这一帧的粒子 -> 删除运算完毕的粒子
  drawTail()
  drawParticles()
  clearParticles()
  if (process.env.NODE_ENV === 'development') {
    const el = document.getElementById('saltFWInfo')
    if (el) {
      el.innerHTML = particles.map((p) => JSON.stringify(p)).join('<br/>')
    }
  }
  requestAnimationFrame(tick)
}
