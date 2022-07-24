/*
 * @Author: Salt
 * @Date: 2022-07-23 17:00:34
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-23 19:36:09
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\widget\SaltFirework\index.tsx
 */
import React, { useState } from 'react'
import './widget'

export default () => {
  const [showInfo, setShowInfo] = useState(false)
  const saltFireworkHueRange = [120]
  const saltFireworkHueDiff = 45
  const saltFireworkCount = 120
  return (
    <>
      <div id="saltFireworkHueRange">{saltFireworkHueRange.join(',')}</div>
      <div id="saltFireworkHueDiff">{saltFireworkHueDiff}</div>
      <div id="saltFireworkCount">{saltFireworkCount}</div>
      <div>
        颜色范围: {saltFireworkHueRange.join(',')}
        <br />
        颜色变化区间: {saltFireworkHueDiff}
        <br />
        粒子效果数量: {saltFireworkCount}
      </div>
      <div>
        <button onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? '收起详细信息' : '展示详细信息'}
        </button>
      </div>
      {showInfo && <div id="saltFWInfo" />}
    </>
  )
}
