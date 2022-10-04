/*
 * @Author: Salt
 * @Date: 2022-10-04 14:17:22
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-04 18:15:53
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltTimeDiff\widget.ts
 */
// widget.ts 代码文件
import { docReady } from 'Utils/utils'
//! <span class="salt-time-diff
//! 实时更新则额外加上 real-time ——结束时间会强制改为当前时间
//! 更复杂的显示请额外加上 complex ——可以用CSS修改渲染样式
//! 如果时间是UTC请额外加上 utc
//! ">{起始时间}SPLIT{结束时间}SPLIT{指令（d-天，h-小时，m-分钟，s-秒，M-毫秒）}</span>

const UTCOffset = new Date().getTimezoneOffset() * 60 * 1000
const cmdAttr = 'data-salt-time-diff-command'
const startAttr = 'data-salt-time-diff-start'
const endAttr = 'data-salt-time-diff-end'
const i18n = {
  year: '年',
  month: '个月',
  day: '天',
  hour: '小时',
  minute: '分钟',
  second: '秒',
  ms: '毫秒',
}
/** 获取Date对象，如果输入非法则返回当前时间，如果输入为纯数字且为UTC时间则会自动处理时区 */
function getDate(time?: string | null, utc = false) {
  if (!time) return new Date()
  // 毫秒数
  if (/^\d+$/.test(time.trim())) {
    const d = new Date(+time)
    if (!isNaN(d.valueOf())) {
      if (utc) d.setTime(d.getTime() + UTCOffset)
      return d
    } else return new Date()
  }
  // 其他情况
  const d = new Date(time)
  if (!isNaN(d.valueOf())) return d
  else return new Date()
}
interface ReadableTimeObj {
  isBefore: boolean
  year?: number
  month?: number
  day?: number
  hour?: number
  minute?: number
  second?: number
  ms?: number
}
/** 生成输出内容 */
function timeDiff({
  t1,
  t2,
  cmd = 'd',
  cpx = false,
}: {
  t1: Date
  t2: Date
  cmd?: string
  cpx?: boolean
}) {
  const _ms = t1.valueOf() - t2.valueOf()
  const isBefore = t1.valueOf() - t2.valueOf() > 0
  const d1 = new Date(isBefore ? t2 : t1) // 小
  const d2 = new Date(isBefore ? t1 : t2) // 大
  // console.log(d1, d2);
  let ms = Math.abs(_ms)
  const diff = { isBefore } as ReadableTimeObj
  if (cmd.indexOf('y') != -1) {
    let years = d2.getFullYear() - d1.getFullYear()
    d1.setFullYear(d2.getFullYear())
    if (d1.getTime() > d2.getTime()) {
      years -= 1
      d1.setFullYear(d1.getFullYear() - 1)
    }
    ms = d2.getTime() - d1.getTime() // 抹平年份差异
    diff.year = years
  }
  if (cmd.indexOf('o') != -1) {
    let years = d2.getFullYear() - d1.getFullYear() // 抹平年份差异
    d1.setFullYear(d2.getFullYear())
    if (d1.getTime() > d2.getTime()) {
      years -= 1
      d1.setFullYear(d1.getFullYear() - 1)
    }
    // 计算月份
    let months = d2.getMonth() - d1.getMonth()
    if (d2.getFullYear() - d1.getFullYear()) months += 12
    d1.setFullYear(d2.getFullYear())
    d1.setMonth(d2.getMonth())
    if (d1.getTime() > d2.getTime()) {
      months -= 1
      d1.setMonth(d1.getMonth() - 1)
    }
    ms = d2.getTime() - d1.getTime() // 抹平月份差异
    diff.month = years * 12 + months
  }
  if (cmd.indexOf('d') != -1) {
    let days = Math.floor(ms / (24 * 3600 * 1000))
    ms = ms % (24 * 3600 * 1000) // 除去天数后剩余的毫秒数
    diff.day = days
  }
  if (cmd.indexOf('h') != -1) {
    let hours = Math.floor(ms / (3600 * 1000))
    ms = ms % (3600 * 1000) // 除去小时后剩余的毫秒数
    diff.hour = hours
  }
  if (cmd.indexOf('m') != -1) {
    let minutes = Math.floor(ms / (60 * 1000))
    ms = ms % (60 * 1000) // 除去分钟后剩余的毫秒数
    diff.minute = minutes
  }
  if (cmd.indexOf('s') != -1) {
    let seconds = Math.floor(ms / 1000)
    ms = ms % 1000 // 除去秒数后剩余的毫秒数
    diff.second = seconds
  }
  if (cmd.indexOf('M') != -1 || ms === Math.abs(_ms)) {
    // 保险：若指令输入为空，则输出毫秒数
    diff.ms = ms
  }
  return readableTimeTxt(diff, cpx)
}
function readableTimeTxt(timeObj: ReadableTimeObj, cpx = false): string {
  let res = cpx
    ? timeObj.isBefore
      ? '<span class="salt-time-diff-txt salt-time-diff-before">还有</span>'
      : '<span class="salt-time-diff-txt salt-time-diff-after">已过去</span>'
    : ''
  const loop = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'ms',
  ] as const
  for (let i = 0; i < loop.length; i++) {
    const t = loop[i]
    if (t in timeObj) {
      res += cpx
        ? `<span class="salt-time-diff-res salt-time-diff-res-${t}">${timeObj[t]}</span><span class="salt-time-diff-txt salt-time-diff-txt-${t}">${i18n[t]}</span>`
        : `${timeObj[t]}${i18n[t]}`
    }
  }
  return res
}
/** 处理页面元素 */
function timeDiffHandler() {
  let elems = document.querySelectorAll('.salt-time-diff')
  for (let i = 0; i < elems.length; i++) {
    let el = elems[i]
    // txt: [0]起始时间 [1]结束时间，默认为当前时间 [2]
    const utc = el.classList.contains('utc')
    let txt = (el.textContent || '').split('SPLIT')

    const t1 = getDate(
      txt[0].replace(/[年月日]/g, '/').replace(/[；：]/g, ':'),
      utc
    )
    const t2 = getDate(
      txt[1].replace(/[年月日]/g, '/').replace(/[；：]/g, ':'),
      utc
    )
    // 处理指令
    let cmd = 'd'
    if (txt.length > 2) {
      cmd = txt[2]
        .replace(/年份?/, 'y')
        .replace(/月份?/, 'o')
        .replace(/[天日]/, 'd')
        .replace(/小?时/, 'h')
        .replace(/分钟?/, 'm')
        .replace('毫秒', 'M')
        .replace('秒', 's')
    }
    const cpx = el.classList.contains('complex')
    // 送入timeDiff函数
    const t = timeDiff({ t1, t2, cmd, cpx })
    if (!cpx) el.textContent = t
    else el.innerHTML = t
    // 后续处理
    el.classList.remove('salt-time-diff')
    el.classList.add('salt-time-diff-done')
    el.setAttribute(cmdAttr, cmd)
    el.setAttribute(startAttr, t1.toString())
    el.setAttribute(endAttr, t2.toString())
  }
}

docReady(() => {
  // 代码逻辑
  // 如果一个页面中有多个此脚本，则不启用
  if ((window as any).saltTimeDiffNoConflictSign) return
  else (window as any).saltTimeDiffNoConflictSign = true
  // 初始化
  timeDiffHandler()

  let elems = document.querySelectorAll('.salt-time-diff-done.real-time')
  // 刷新实时更新元素：每秒20次
  const update = () => {
    for (let i = 0; i < elems.length; i++) {
      setTimeout(() => {
        // 异步, 避免卡顿
        const el = elems[i]
        const t1 = getDate(el.getAttribute(startAttr))
        const t2 = getDate()
        const cmd = el.getAttribute(cmdAttr) || 'd'
        const cpx = el.classList.contains('complex')
        // 送入timeDiff函数
        const t = timeDiff({ t1, t2, cmd, cpx })
        // 避免闪烁
        if (!cpx) {
          if (el.textContent != t) el.textContent = t
        } else {
          if (el.innerHTML != t) el.innerHTML = t
        }
      }, 0)
    }
  }
  setInterval(() => {
    // 优先使用requestAnimationFrame
    window.requestAnimationFrame
      ? window.requestAnimationFrame(update)
      : update()
  }, 50)
  // 检查是否有漏网之鱼: 每5秒更新一次
  setInterval(() => {
    if (document.querySelectorAll('.salt-time-diff').length) {
      timeDiffHandler()
    }
    elems = document.querySelectorAll('.salt-time-diff-done.real-time') // 更新列表
  }, 5000)
})
