/*
 * @Author: Salt
 * @Date: 2022-01-26 00:03:14
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 16:56:48
 * @Description: 杂项方法
 * @FilePath: \mcbbs-wiki-widget-repo\src\utils\utils.ts
 */
/** 当文档准备完毕时调用回调，若文档已经准备完毕，则马上调用回调 */
export function docReady(fn: () => unknown): void {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      if (document.readyState === 'interactive') fn()
    })
  } else {
    fn()
  }
}
/** 当文档准备完毕时异步调用回调 */
export async function docReadyAsync<T>(fn: () => T) {
  const cb = new Promise<void>((res) => {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => {
        if (document.readyState === 'interactive') res()
      })
    } else {
      res()
    }
  })
  await cb
  return fn()
}

export function extend<T extends object, K extends Partial<T>>(
  obj: T,
  ext: K
): T {
  for (const key in ext) {
    if (!(key in obj)) {
      Object.defineProperty(obj, key, {
        value: ext[key],
        enumerable: false,
      })
    }
  }
  return obj
}

export function offset(el: Element) {
  // 如果元素不存在或隐藏，默认返回0值
  if (!el || !el.getClientRects().length) return { top: 0, left: 0 }
  var rect = el.getBoundingClientRect() // 元素的大小及其相对于视口的位置
  var win = el.ownerDocument.defaultView! // 文档的默认窗口对象（只读）
  return { top: rect.top + win.pageYOffset, left: rect.left + win.pageXOffset }
}

export function scrollYToEl(el: Element, fix = -200) {
  const { top } = offset(el)
  window.scrollTo({
    behavior: 'smooth',
    top: top + fix,
  })
}
/** 批量处理容器中的子元素，处理过的容器会标记上salt-done类 */
export function handleChildren(props: {
  queryContainer: string
  queryElement: string
  callback: (el: HTMLElement) => Element
}) {
  const { queryContainer, queryElement, callback } = props
  const containers = Array.from(document.body.querySelectorAll(queryContainer))
  containers.forEach((container) => {
    container.classList.add('salt-done')
    const elems = Array.from(container.querySelectorAll(queryElement)).filter(
      (el) => el instanceof HTMLElement
    ) as HTMLElement[]
    const res = elems.map((elem) => callback(elem))
    container.innerHTML = ''
    res.forEach((item) => container.appendChild(item))
  })
}
/**随机选择 */
export function randomChoice<T>(arr: T[]): T {
  if (arr.length < 1) {
    return null as never
  }
  return arr[Math.floor(Math.random() * arr.length)]
}
/** 返回一个一定时间后完成的Promise，单位为毫秒 */
export function sleep(time = 500) {
  return new Promise<void>((res) => {
    setTimeout(() => res(), time)
  })
}
/** 等到方法返回的值为真值 */
export async function waitTill(what: () => unknown, interval = 500) {
  while (!what()) {
    await sleep(interval)
  }
}
