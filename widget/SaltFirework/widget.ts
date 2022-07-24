import { randomChoice, docReady } from 'Utils/utils'

/*
 * @Author: Salt
 * @Date: 2022-07-23 17:00:54
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 20:13:07
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltFirework\widget.ts
 */
interface particle {
  x: number
  y: number
  /** 粒子横向速度 */
  spdX: number
  /** 粒子纵向速度 */
  spdY: number
  /** 粒子整体速度补正 */
  spdFall: number
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
let hueRange: number[] // [0, 360]
//! 颜色变化区间
let hueDiff: number
//! 粒子效果数量
let count: number
const baseRange = [1, 4] // 粒子大小
const baseSpeed = [0.3, 2, 3] // 粒子最低速度
const fallSpeed = 1.1 / 60 // 粒子下坠速度
const fadeSpeed = 0.65 // 粒子消失速度
const tail = 15 // 尾迹
/**创建canvas */
const canvas = document.createElement('canvas')
/**获取canvas绘图区域 */
const context = canvas.getContext('2d')!
/**烟花粒子数组 */
let particles: (particle | null)[] = []
/**记录剩余粒子数量，在合适的时机清理画布 */
let lastLength = 0
let zeroFrame = 0

docReady(init)
/** 初始化 */
function init() {
  /** 从页面中获取配置 */
  const getValue = (
    id: string,
    defaultValue: number,
    min: number,
    max: number
  ): number => {
    const e = document.getElementById(id)
    if (!e) return defaultValue
    const c = parseInt(e.textContent || '')
    if (isNaN(c) || c < min || c > max) return defaultValue
    return c
  }
  hueRange = (() => {
    const defaultValue = (() => {
      var x = []
      for (let i = 1; i < 361; i++) x.push(i)
      return x
    })()
    const e = document.getElementById('saltFireworkHueRange')
    if (!e) return defaultValue
    const c = (e.textContent || '')
      .replace(/[\s\n_]+/g, '')
      .replace(/[\;\/\|\/\\，；、\-]+/g, ',')
      .split(',')
      .map((v) => parseInt(v))
      .filter(Boolean)
      .filter((v) => v > 0 && v < 361)
    if (!c || c.length < 1 || c.length > 360) return defaultValue
    return c
  })()
  hueDiff = getValue('saltFireworkHueDiff', 30, 0, 180)
  count = getValue('saltFireworkCount', 110, 1, 500)
  canvas.id = 'saltFireWorkCanvas'
  canvas.style.left = '0'
  canvas.style.top = '0'
  canvas.style.position = 'fixed'
  canvas.style.pointerEvents = 'none' // 不干扰鼠标
  canvas.style.zIndex = '99999' // 置于顶层
  document.body.appendChild(canvas)
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, false)
  tick() // 开始tick
  document.addEventListener('mousedown', function (e) {
    createFireworks(e.clientX, e.clientY)
  }) // 监听事件
}
/**重设绘图区大小*/
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
/**
 * 返回一个base为中心，宽为size的邻域中的值，大概率靠近中心
 * @param base 基准值
 * @param size 区间
 */
function rightRandom(base: number, size: number) {
  return base + (Math.random() * size - Math.random() * size) / 2
}
/**创建烟花*/
function createFireworks(x: number, y: number) {
  /**这个烟花的颜色 */
  let hue = randomChoice(hueRange)
  for (let i = 0; i < count; i++) {
    const spd = rightRandom(
      (baseSpeed[1] + baseSpeed[0]) / 2,
      baseSpeed[1] - baseSpeed[0]
    )
    const rad = Math.random() * 2 * Math.PI
    particles.push({
      x: x,
      y: y,
      spdX: Math.cos(rad) * spd,
      spdY: Math.sin(rad) * spd,
      spdFall: baseSpeed[2],
      size: rightRandom(
        (baseRange[1] + baseRange[0]) / 2,
        baseRange[1] - baseRange[0]
      ),
      hue: hueRandom(),
      bright: rightRandom(72, 16),
      alpha: rightRandom(75, 30),
    })
  }
  function hueRandom() {
    let h = Math.floor(rightRandom(hue, hueDiff))
    if (h > 360) h -= 360
    else if (h < 0) h += 360
    return h
  }
}
/**主过程*/
function drawParticles() {
  if (!particles.length) return
  // 绘制粒子
  context.globalCompositeOperation = 'lighter'
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i]
    if (!p) continue
    p.x += p.spdX * p.spdFall
    p.y += p.spdY * p.spdFall
    p.spdY += fallSpeed // 粒子下坠加速度
    p.spdFall *= 0.978 // 粒子整体速度降低
    p.alpha -= fadeSpeed
    context.beginPath()
    context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false)
    context.closePath()
    context.fillStyle = `hsla(${p.hue},100%,${p.bright}%,${p.alpha / 100})`
    context.fill()
    //! 标记已经透明到看不见的粒子
    if (p.alpha < fadeSpeed) particles[i] = null
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
  if (zeroFrame >= 30) return
  //! 保留前一刻的图案作为尾迹
  context.globalCompositeOperation = 'destination-out'
  context.fillStyle = `rgba(0,0,0,${1 / tail})`
  context.fillRect(0, 0, canvas.width, canvas.height)
}
/**清理已经消失的粒子*/
function clearParticles() {
  if (!particles.length) return
  let cp = []
  for (let p of particles) if (p) cp.push(p)
  if (cp.length !== particles.length) particles = cp
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
