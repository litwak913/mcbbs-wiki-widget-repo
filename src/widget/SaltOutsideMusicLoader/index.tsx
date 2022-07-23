/*
 * @Author: Salt
 * @Date: 2022-07-23 15:38:37
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-23 16:49:28
 * @Description: SaltOutsideMusicLoader 测试页面
 * @FilePath: \mcbbs-wiki-widget-repo\src\widget\SaltOutsideMusicLoader\index.tsx
 */
import React from 'react'
import './widget'

export default () => {
  const list = [
    {
      id: 552194857,
      width: 300,
      height: 66,
      auto: 0,
    },
    {
      id: 552194857,
      width: '50%',
      height: 32,
      auto: 0,
      // auto: 1,
    },
  ]
  return (
    <>
      {list.map(({ id, width, height, auto }, index) => (
        <div key={`${id}-${index}`} className="163outchain">
          {id}SPLIT{width}SPLIT{height}SPLIT{auto}
        </div>
      ))}
    </>
  )
}
