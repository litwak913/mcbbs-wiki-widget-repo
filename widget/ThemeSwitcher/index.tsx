/*
 * @Author: litwak913 litwak913@qq.com
 * @Date: 2022-08-06 17:55:00
 * @LastEditors: litwak913 litwak913@qq.com
 * @LastEditTime: 2022-08-06 22:11:46
 * @FilePath: /mcbbs-wiki-widget-repo/widget/ThemeSwitcher/index.tsx
 * @Description: ThemeSwitcher 测试页面
 */

import React from 'react'
import './widget'
import './style.css'

export default () => {
  // 可能需要的一些逻辑
  return (
    <>
      <div id="current-theme"></div>
      <div id="theme-switcher">
        <div className="theme-switch-button"></div>
        <div className="theme-switch-button"></div>
        <div className="theme-switch-button"></div>
      </div>
    </>
  )
}
