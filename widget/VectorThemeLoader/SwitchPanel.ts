import { clickOutside } from 'Utils/utils'

/*
 * @Author: Salt
 * @Date: 2022-08-13 13:50:42
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 16:25:17
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\VectorThemeLoader\SwitchPanel.ts
 */
export function createPanel(
  props: { className?: string; position: { x: number; y: number } },
  ...innerElements: Element[]
): HTMLDivElement {
  const {
    className,
    position: { x, y },
  } = props
  const panel = document.createElement('div')
  panel.className = `salt-panel ${className || ''}`
  panel.style.position = 'absolute'
  for (const el of innerElements) panel.appendChild(el)
  document.body.appendChild(panel)
  const { offsetWidth, offsetHeight } = panel
  // const { innerWidth, innerHeight } = window
  panel.style.left = `${Math.max(x - offsetWidth / 2, 0)}px`
  panel.style.top = `${y + 2}px`
  const cancel = clickOutside(panel, () => {
    console.log('awa')
    panel.remove()
    cancel()
  })
  return panel
}
