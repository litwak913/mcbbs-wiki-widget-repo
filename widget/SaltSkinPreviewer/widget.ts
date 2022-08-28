/*
 * @Author: Salt
 * @Date: 2022-08-20 12:10:33
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-20 22:11:50
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltSkinPreviewer\widget.ts
 */
// widget.ts 代码文件
import { docReady, waitTill } from 'Utils/utils'
import type {
  SkinViewerOptions,
  SkinViewer,
  IdleAnimation,
  WalkingAnimation,
} from 'skinview3d'
import { addScript } from 'Utils/resource'

const filterWebsite = [
  'https://mcbbs.wiki/',
  'https://attachment.mcbbs.net/',
  'https://minotar.net/',
]

//! addScript('https://cdn.jsdelivr.net/gh/Salt-lovely/skinview3d@0.0.2/bundles/skinview3d.bundle.js', true, 'SaltSkinPreviewer')
addScript('https://mcbbs.wiki/salt/skinview.js', true, 'SaltSkinPreviewer')

// 你可能需要一些工具函数，比如这个DOM加载完毕后执行代码的方法
docReady(async () => {
  // 代码逻辑
  await waitTill(() => window.skinview3d?.SkinViewer)
  const skinList = Array.from(
    document.querySelectorAll('.salt.salt-skin-view-3d')
  ) as HTMLElement[]
  skinList.forEach((skin) => {
    // 预处理工作，确保能拿到可用的皮肤链接
    skin.classList.remove('salt') // 防止复读
    let src: string | null | undefined
    if (skin.querySelector('img')) {
      src = skin.querySelector('img')?.src
    } else src = skin.textContent
    if (!src || src.length < 10) return
    if (!filterWebsite.some((site) => src!.startsWith(site))) return
    // 准备工作，生成必要内容
    skin.innerHTML = '' // 清空内容
    const canvas = document.createElement('canvas')
    const option: SkinViewerOptions = {
      canvas,
      width: skin.offsetWidth,
      height: skin.offsetHeight,
      skin: src!,
      fov: 50,
      zoom: 0.9,
    }
    const viewer: SkinViewer = new window.skinview3d.SkinViewer(option)
    viewer.globalLight.intensity = 0.5
    viewer.cameraLight.intensity = 0.5
    skin.appendChild(canvas)
    // 左键点击切换动作功能，右键点击重置镜头
    const animation = {
      idle: new window.skinview3d.IdleAnimation() as IdleAnimation,
      walk: new window.skinview3d.WalkingAnimation() as WalkingAnimation,
    }
    const action = (() => {
      let curr = 0
      const actions = [
        (v: SkinViewer) => {
          v.animation = animation.walk
          v.animation.speed = 0.5
        },
        (v: SkinViewer) => {
          v.animation = animation.walk
          v.animation.speed = 1
        },
        (v: SkinViewer) => {
          v.animation = animation.idle
          v.animation.speed = 1
        },
      ]
      return (v: SkinViewer) => {
        actions[curr++](v)
        if (curr >= actions.length) curr = 0
      }
    })()
    let pos = { x: 0, y: 0 }
    skin.addEventListener('mousedown', (ev) => {
      const { x, y } = ev
      pos = { x, y }
      ev.preventDefault()
    })
    skin.addEventListener('mouseup', (ev) => {
      const { x, y } = ev
      if (Math.abs(pos.x - x) > 2 || Math.abs(pos.y - y) > 2) return
      if (ev.button === 0) action(viewer)
      else if (ev.button === 2) viewer.resetCameraPose()
      ev.preventDefault()
    })
    action(viewer)
    // 双击重置镜头
    skin.addEventListener('dblclick', () => {
      viewer.resetCameraPose()
    })
  })
})
