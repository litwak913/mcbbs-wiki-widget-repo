/*
 * @Author: litwak913
 * @Date: 2022-07-30 16:41:58
 * @LastEditors: litwak913 litwak913@qq.com
 * @LastEditTime: 2022-07-30 17:47:24
 * @FilePath: /mcbbs-wiki-widget-repo/widget/ThemeSwitcher/widget.ts
 * @Description: 切换主题
 */
import { read, write } from 'Utils/storage'
import { docReady } from 'Utils/utils'
// 你可能需要一些工具函数，比如这个DOM加载完毕后执行代码的方法

docReady(() => {
  function switchSummer() {
    write('theme', 'summer')
    location.reload()
  }
  function switchWinter() {
    write('theme', 'winter')
    location.reload()
  }
  function switchNether() {
    write('theme', 'nether')
    location.reload()
  }
  const current = document.getElementById('current-theme')
  const theme = read('theme', 'summer')
  const buttons = document.getElementsByClassName(
    'theme-switch-button'
  ) as HTMLCollectionOf<HTMLDivElement>
  current!.innerHTML = `Current:${theme}`
  buttons[0].style.backgroundColor = '#4d82ff'
  buttons[0].onclick = switchWinter
  buttons[1].style.backgroundColor = '#70ba5e'
  buttons[1].onclick = switchSummer
  buttons[2].style.backgroundColor = '#ae210f'
  buttons[2].onclick = switchNether
})
