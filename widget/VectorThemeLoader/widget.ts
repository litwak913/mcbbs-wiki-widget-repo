/*
 * @Author: Salt
 * @Date: 2022-08-13 11:05:35
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 13:22:31
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\VectorThemeLoader\widget.ts
 */
// widget.ts 代码文件
import { loadWikiStyle } from 'Utils/resource'
import { readAndListen } from 'Utils/storage'

type Theme = { name: string; style: string; img?: string; script?: string }

interface ThemeMap {
  [style: string]: ThemeMapStyle
}
interface ThemeMapStyle {
  /** 当前皮肤的通用样式 */
  common: string
  /** 当前皮肤的默认主题样式 */
  default: Theme
  /** 当前皮肤的其他主题样式 */
  other: { [otherTheme: string]: Theme }
  /** 当前皮肤旧版的样式 */
  legacy?: ThemeMapStyle
}

const themeMap: ThemeMap = {
  // MCBBS-v2的书页风格
  book: {
    common: 'MediaWiki:Vector-Book.css',
    default: { name: '夏季主题', style: 'MediaWiki:Vector-Book-Summer.css' },
    other: {
      nether: { name: '下界主题', style: 'MediaWiki:Vector-Book-Nether.css' },
      winter: { name: '冬季主题', style: 'MediaWiki:Vector-Book-Winter.css' },
    },
    legacy: {
      common: 'MediaWiki:Vector-Legacy-Book.css',
      default: { name: '夏季主题', style: 'MediaWiki:Vector-Book-Summer.css' },
      other: {
        nether: { name: '下界主题', style: 'MediaWiki:Vector-Book-Nether.css' },
        winter: { name: '冬季主题', style: 'MediaWiki:Vector-Book-Winter.css' },
      },
    },
  },
}

const isLegacy = document.body.classList.contains('skin-vector-legacy')

const styleKey = 'skin-vector-style'
const themeKey = 'skin-vector-theme'
/** 加载主题样式 */
const loadTheme = (themeMap: ThemeMap, isLegacy = true) => {
  // 初始化
  const current = { style: 'book', theme: 'default' }
  const [style] = readAndListen({
    key: styleKey,
    defaultValue: 'book',
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
  const getCurrentStyleMap = () => {
    const styleMap = themeMap[current.style]
    return isLegacy ? styleMap.legacy || styleMap : styleMap
  }
  const getCurrentTheme = () => {
    const { theme } = current
    const styleMap = getCurrentStyleMap()
    return theme === 'default' || !styleMap.other[theme]
      ? styleMap.default
      : styleMap.other[theme]
  }
  const loadCurrentTheme = () => {
    // 加载当前皮肤的通用样式
    const currentCommonStyle = getCurrentStyleMap().common
    loadWikiStyle(currentCommonStyle, 'salt-wiki-style-common')
    // 加载当前主题
    const currentTheme = getCurrentTheme()
    loadWikiStyle(currentTheme.style, 'salt-wiki-style-theme')
  }
  loadCurrentTheme()
}

loadTheme(themeMap, isLegacy)
