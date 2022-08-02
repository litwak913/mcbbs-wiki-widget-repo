/*
 * @Author: Salt
 * @Date: 2022-07-30 21:31:44
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-31 14:52:37
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\TopSign\index.tsx
 */
// index.tsx 测试页面
import React from 'react'
import { setStyle } from 'Utils/resource'
import './widget'
import style from './index.t.scss'

export default () => {
  // 可能需要的一些逻辑
  setStyle(style, 'topsign')
  return (
    <div className="topsign" style={{ height: 65 }}>
      <p>
        这是第一条测试内容<b>加粗内容</b>
      </p>
      <p>
        这是第2条测试内容<i>斜体内容</i>
      </p>
      <p>
        这是第叁条测试内容<del>删除线</del>
      </p>
      <p>
        <u>
          这是第④条测试内容，
          <span style={{ color: 'black' }}>附带下划线</span>
        </u>
      </p>
      <p>
        这是第Ⅴ条测试内容
        <a href="//mcbbs.wiki/wiki/" target="_blank" rel="noopener noreferrer">
          <span style={{ color: 'black' }}>超链接测试</span>
        </a>
      </p>
    </div>
  )
}
