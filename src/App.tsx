/*
 * @Author: Salt
 * @Date: 2022-07-23 15:09:40
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-31 13:41:10
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\App.tsx
 */
import React from 'react'
import widget from 'Widget/index'
import { addScript } from 'Utils/resource'
import { TextIcon } from './components/TextIcon'

addScript('https://cdn.bootcss.com/jquery/2.2.2/jquery.js', false, 'jquery')

export default () => (
  <div className="mcbbs-wiki-widget-list">
    {widget.map(({ title, Component }) => (
      <div key={title} className="mcbbs-wiki-widget-item">
        <h2>
          <a
            href={`//mcbbs.wiki/wiki/Widget:${title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TextIcon txt="微件" />
            {title}
          </a>
        </h2>
        <Component />
      </div>
    ))}
  </div>
)
