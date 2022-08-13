/*
 * @Author: Salt
 * @Date: 2022-08-13 11:05:35
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 13:47:12
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\VectorThemeLoader\index.tsx
 */
// index.tsx 测试页面
import React from 'react'
import { docReady } from 'Utils/utils'

docReady(() => import('./widget'))

export default () => {
  // 可能需要的一些逻辑
  return (
    <div>
      <ul className="vector-menu-content-list">
        <li id="pt-logout">
          <a>这里是个测试用的退出按钮</a>
        </li>
      </ul>
    </div>
  )
}
