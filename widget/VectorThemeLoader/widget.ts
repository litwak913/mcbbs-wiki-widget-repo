/*
 * @Author: Salt
 * @Date: 2022-08-13 11:05:35
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-20 21:22:19
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\VectorThemeLoader\widget.ts
 */
//! https://github.com/mcbbs-wiki/mcbbs-wiki-widget-repo/tree/master/widget/VectorThemeLoader
import { constants } from 'buffer'
import { addStyle, loadWikiStyle } from 'Utils/resource'
import { readAndListen, write } from 'Utils/storage'
import { createPanel } from './SwitchPanel'

import style from './widget.t.scss'

addStyle(style)

type Theme = { name: string; css: string; img?: string; script?: string }

interface ThemeMap {
  /** 风格名称 */
  [style: string]: ThemeMapStyle
}
interface ThemeMapStyle {
  /** 皮肤的名称 */
  name: string
  /** 当前皮肤的通用样式 */
  common?: string
  /** 当前皮肤的默认主题样式 */
  default: Theme
  /** 当前皮肤的其他主题样式 */
  other: { [otherTheme: string]: Theme }
}

const isLegacy = document.body.classList.contains('skin-vector-legacy')

const themeMap: ThemeMap = isLegacy
  ? {
      // MCBBS-v2的书页风格
      book: {
        name: '仿MCBBS书页风格',
        // common: 'MediaWiki:Vector-Legacy-Book.css',
        default: {
          name: '夏季主题',
          css: 'MediaWiki:Vector-Book-Summer.css',
          img: 'https://mcbbs.wiki/images/2/2f/艺术家与认证用户回帖图标.png',
        },
        other: {
          nether: { name: '下界主题', css: 'MediaWiki:Vector-Book-Nether.css' },
          winter: { name: '冬季主题', css: 'MediaWiki:Vector-Book-Winter.css' },
        },
      },
    }
  : {
      v4: {
        name: '仿MCBBS v4风格',
        // common: 'MediaWiki:Vector-V4.css',
        default: { name: '默认风格', css: 'MediaWiki:Vector-V4.css' },
        other: {},
      },
    }

const defaultStyle = Object.keys(themeMap)[0]

const styleKey = isLegacy
  ? 'mcbbs-wiki-skin-vector-legacy-style'
  : 'mcbbs-wiki-skin-vector-style'
const themeKey = isLegacy
  ? 'mcbbs-wiki-skin-vector-legacy-theme'
  : 'mcbbs-wiki-skin-vector-theme'

/** 根据风格和主题名加载样式资源 */
const loadThemeStyle = (style: string, theme: string) => {
  const styleMap = themeMap[style] || themeMap[defaultStyle]
  // 加载当前皮肤的通用样式
  const currentCommonStyle = styleMap.common
  if(currentCommonStyle) loadWikiStyle(currentCommonStyle, 'salt-wiki-style-common')
  // 加载当前主题
  const currentTheme =
    theme === 'default' || !styleMap.other[theme]
      ? styleMap.default
      : styleMap.other[theme]
  loadWikiStyle(currentTheme.css, 'salt-wiki-style-theme')
}

/** 加载主题样式功能初始化 */
const initTheme = () => {
  // 初始化
  const current = { style: defaultStyle, theme: 'default' }
  const [style] = readAndListen({
    key: styleKey,
    defaultValue: defaultStyle,
    listener: (ev) => {
      if (ev.newValue) {
        current.style = ev.newValue
        loadCurrentTheme()
      }
    },
  })
  const [theme] = readAndListen({
    key: themeKey,
    defaultValue: 'default',
    listener: (ev) => {
      if (ev.newValue) {
        current.theme = ev.newValue
        loadCurrentTheme()
      }
    },
  })
  current.style = style
  current.theme = theme
  // 各种方法
  const loadCurrentTheme = () => {
    const { style, theme } = current
    loadThemeStyle(style, theme)
  }
  loadCurrentTheme()
}

initTheme()

const handleSwitchBtn = (ev: MouseEvent) => {
  const { top, left } = $(btn).offset()!
  console.log(ev)
  const innerElements: Element[] = []
  const createThemeSwitch = (
    style: string,
    themeCode: string,
    theme: Theme
  ) => {
    const { name, img: imgSrc } = theme
    const handleClick = () => {
      write(styleKey, style)
      write(themeKey, themeCode)
      loadThemeStyle(style, themeCode)
    }
    const li = document.createElement('li')
    li.className = 'theme-list-item'
    li.addEventListener('click', handleClick)
    if (imgSrc) {
      const img = document.createElement('img')
      img.src = imgSrc
      img.className = 'theme-list-item-img'
      li.appendChild(img)
    }
    const div = document.createElement('div')
    div.textContent = name
    div.className = 'theme-list-item-name'
    li.appendChild(div)
    return li
  }
  for (const style in themeMap) {
    // 风格
    const li = document.createElement('li')
    li.className = 'style-list-item'
    const title = document.createElement('div')
    title.className = 'style-list-item-title'
    title.textContent = themeMap[style].name
    const ul = document.createElement('ul')
    ul.className = 'theme-list'
    // 主题列表
    const themeList: Element[] = []
    // 默认主题
    const defaultTheme = themeMap[style].default
    themeList.push(createThemeSwitch(style, 'default', defaultTheme))
    // 其他主题
    for (const themeCode in themeMap[style].other) {
      themeList.push(
        createThemeSwitch(style, themeCode, themeMap[style].other[themeCode])
      )
    }
    for (const el of themeList) ul.appendChild(el)
    // 构建风格包
    li.appendChild(title)
    li.appendChild(ul)
    innerElements.push(li)
  }
  createPanel(
    {
      className: 'style-list',
      position: { x: left, y: top + btn.offsetHeight },
    },
    ...innerElements
  )
}

const headLogoutBtn = document.getElementById('pt-logout')!

const btn = document.createElement('a')
btn.textContent = '切换主题'
btn.title = '切换主题'
btn.onclick = handleSwitchBtn
const li = document.createElement('li')
li.className = 'mw-list-item'
li.appendChild(btn)

console.log('headLogoutBtn.parentElement', headLogoutBtn.parentElement)

headLogoutBtn.parentElement!.insertBefore(li, headLogoutBtn)
