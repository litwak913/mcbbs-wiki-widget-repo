/*
 * @Author: Salt
 * @Date: 2022-10-04 14:17:22
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-04 16:10:38
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltTimeDiff\widget.ts
 */
// widget.ts 代码文件
import { docReady } from 'Utils/utils'
//! <span class="salt-time-diff
//! 实时更新则额外加上 real-time ——结束时间会强制改为当前时间
//! 更复杂的显示请额外加上 complex ——可以用CSS修改渲染样式
//! ">{起始时间}SPLIT{结束时间}SPLIT{指令（d-天，h-小时，m-分钟，s-秒，M-毫秒）}</span>

const cmdAttr = 'data-salt-time-diff-command'
const startAttr = 'data-salt-time-diff-start'
const endAttr = 'data-salt-time-diff-end'

function getDate(time?: string | null) {
  if (!time) return new Date()
  // 毫秒数
  if (/^\d+$/.test(time.trim())) {
    const d = new Date(+time)
    if (!isNaN(d.valueOf())) return d
    else return new Date()
  }
  // 其他情况
  const d = new Date(time)
  if (!isNaN(d.valueOf())) return d
  else return new Date()
}
/** 生成输出内容 */
function timeDiff(_ms = 0, cmd = 'd', cpx = false) {
  let ms = Math.abs(_ms)
  const isBefore = _ms > 0
  let res = cpx
    ? isBefore
      ? '<span class="salt-time-diff-txt salt-time-diff-before">还有</span>'
      : '<span class="salt-time-diff-txt salt-time-diff-after">已过去</span>'
    : ''
  if (cmd.indexOf('d') != -1) {
    let days = Math.floor(ms / (24 * 3600 * 1000))
    ms = ms % (24 * 3600 * 1000) // 除去天数后剩余的毫秒数
    res += cpx
      ? `<span class="salt-time-diff-res salt-time-diff-res-day">${days}</span>天`
      : `${days}天`
  }
  if (cmd.indexOf('h') != -1) {
    let hours = Math.floor(ms / (3600 * 1000))
    ms = ms % (3600 * 1000) // 除去小时后剩余的毫秒数
    res += cpx
      ? `<span class="salt-time-diff-res salt-time-diff-res-hour">${hours}</span>小时`
      : `${hours}小时`
  }
  if (cmd.indexOf('m') != -1) {
    let minutes = Math.floor(ms / (60 * 1000))
    ms = ms % (60 * 1000) // 除去分钟后剩余的毫秒数
    res += cpx
      ? `<span class="salt-time-diff-res salt-time-diff-res-minute">${minutes}</span>分钟`
      : `${minutes}分钟`
  }
  if (cmd.indexOf('s') != -1) {
    let seconds = Math.floor(ms / 1000)
    ms = ms % 1000 // 除去秒数后剩余的毫秒数
    res += cpx
      ? `<span class="salt-time-diff-res salt-time-diff-res-second">${seconds}</span>秒`
      : `${seconds}秒`
  }
  if (cmd.indexOf('M') != -1 || res.length < 1) {
    // 保险：若指令输入为空，则输出毫秒数
    res += cpx
      ? `<span class="salt-time-diff-res salt-time-diff-res-ms">${ms}</span>毫秒`
      : `${ms}毫秒`
    // 剩余的毫秒数
  }
  return res
}
/** 处理页面元素 */
function timeDiffHandler() {
  let elems = document.querySelectorAll('.salt-time-diff')
  for (let i = 0; i < elems.length; i++) {
    let el = elems[i]
    // txt: [0]起始时间 [1]结束时间，默认为当前时间 [2]
    let txt = (el.textContent || '')
      .replace(/[年月日]/g, '/')
      .replace(/[；：]/g, ':')
      .split('SPLIT')
    let time1 = getDate(txt[0])
    let time2 = getDate(txt[1])
    // 处理指令
    let cmd = 'd'
    if (txt.length > 2) {
      cmd = txt[2]
        .replace(/[天日]/, 'd')
        .replace(/小?时/, 'h')
        .replace(/分钟?/, 'm')
        .replace('毫秒', 'M')
        .replace('秒', 's')
    }
    const cps = el.classList.contains('complex')
    // 送入timeDiff函数
    const t = timeDiff(time1.getTime() - time2.getTime(), cmd, cps)
    if (!cps) el.textContent = t
    else el.innerHTML = t
    // 后续处理
    el.classList.remove('salt-time-diff')
    el.classList.add('salt-time-diff-done')
    el.setAttribute(cmdAttr, cmd)
    el.setAttribute(startAttr, time1.toString())
    el.setAttribute(endAttr, time2.toString())
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
        const time1 = getDate(el.getAttribute(startAttr))
        const time2 = getDate()
        const cmd = el.getAttribute(cmdAttr) || 'd'
        const cps = el.classList.contains('complex')
        // 送入timeDiff函数
        const t = timeDiff(time1.getTime() - time2.getTime(), cmd, cps)
        // 避免闪烁
        if (!cps) {
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
