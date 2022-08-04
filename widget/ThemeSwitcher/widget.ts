/*
 * @Author: litwak913
 * @Date: 2022-07-30 16:41:58
 * @LastEditors: litwak913 litwak913@qq.com
 * @LastEditTime: 2022-07-30 17:47:24
 * @FilePath: /mcbbs-wiki-widget-repo/widget/ThemeSwitcher/widget.ts
 * @Description: 切换主题
 */
import { docReady } from 'Utils/utils'
// 你可能需要一些工具函数，比如这个DOM加载完毕后执行代码的方法

docReady(() => {
  function switchTheme(theme: string) {
    localStorage.setItem('theme', theme)
    location.reload()
  }
  function switchSummer() {
    switchTheme('summer')
  }
  function switchWinter() {
    switchTheme('winter')
  }
  function switchNether() {
    switchTheme('nether')
  }
  const current = document.getElementById('current-theme')
  const theme = localStorage.getItem('theme')
  if (theme) {
    current!.innerHTML = `Current:${theme}`
  }
  const switcher = document.getElementById('theme-switcher')
  const winter = document.createElement('div')
  winter.onclick = switchWinter
  winter.style.backgroundColor = '#4d82ff'
  winter.className = 'theme-switch-button'
  const summer = document.createElement('div')
  summer.className = 'theme-switch-button'
  summer.style.backgroundColor = '#70ba5e'
  summer.onclick = switchSummer
  const nether = document.createElement('div')
  nether.style.backgroundColor = '#ae210f'
  nether.className = 'theme-switch-button'
  nether.onclick = switchNether
  switcher?.appendChild(winter)
  switcher?.appendChild(summer)
  switcher?.appendChild(nether)
})
