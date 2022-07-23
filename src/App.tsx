/*
 * @Author: Salt
 * @Date: 2022-07-23 15:09:40
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-23 15:51:02
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\App.tsx
 */
import React from 'react'
import widget from './widget'

export default () => (
  <div className="mcbbs-wiki-widget-list">
    {widget.map(({ title, Component }) => (
      <div key={title} className="mcbbs-wiki-widget-item">
        <h2>{title}</h2>
        <Component />
      </div>
    ))}
  </div>
)
