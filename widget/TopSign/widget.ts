/*
 * @Author: Salt
 * @Date: 2022-07-30 21:31:44
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-02 23:59:03
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\TopSign\widget.ts
 */
// widget.ts 代码文件
// import { docReady } from 'Utils/utils'
// 你可能需要一些工具函数，比如这个DOM加载完毕后执行代码的方法
// docReady(() => {
// topsign({ query: '.topsign', interval: 1000, animationTime: 600 })
topsign({ query: '.topsign', interval: 6000, animationTime: 300 })
// console.log('topsign')
// })

function topsign(props: {
  query: string
  interval?: number
  animationTime?: number
}) {
  let index = 0
  const { query, interval = 5000, animationTime = 300 } = props
  /** 初始化滚动公告 */
  const initView = () => {
    const container = document.querySelector(query)
    if (!(container instanceof HTMLElement)) return
    const list = Array.from(container.children).filter(
      (el) => el instanceof HTMLElement
    ) as HTMLElement[]
    if (list.length < 2) return
    const { offsetHeight: height } = container
    const current = index
    index++
    if (index >= list.length) index = 0
    const next = index
    list.forEach((el, i) => {
      el.style.lineHeight = `${height}px`
      el.style.height = `${height}px`
      el.style.transform = `translateY(${i === current ? 0 : height}px)`
    })
    return { list, height, current: list[current], next: list[next] }
  }
  /** 绘制动画 */
  const animation = (props: {
    startTime: number
    height: number
    current: HTMLElement
    next: HTMLElement
  }) => {
    const { startTime, height, current, next } = props
    const now = Date.now()
    if (now >= startTime + animationTime) {
      current.style.transform = `translateY(${height}px)`
      next.style.transform = `translateY(0px)`
    } else {
      const percent = (now - startTime) / animationTime
      current.style.transform = `translateY(${-height * percent}px)`
      next.style.transform = `translateY(${height * (1 - percent)}px)`
      requestAnimationFrame(() =>
        animation({ startTime, height, current, next })
      )
    }
  }
  /** 主方法 */
  const setView = () => {
    const init = initView()
    if (!init) return
    const { height, current, next } = init
    requestAnimationFrame(() =>
      animation({ startTime: Date.now(), height, current, next })
    )
    setTimeout(() => setView(), interval)
  }
  setTimeout(() => setView(), interval)
  initView()
  index = 0
}
