/*
 * @Author: Salt
 * @Date: 2022-08-20 12:10:33
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-20 19:34:16
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltSkinPreviewer\index.tsx
 */
// index.tsx 测试页面
import React from 'react'
import './widget'

export default () => {
  // 可能需要的一些逻辑
  return (
    <>
      <div
        className="salt salt-skin-view-3d"
        style={{ width: 250, height: 350, border: '1px dashed #ccc' }}
      >
        <img
          alt="MHF_Steve"
          src="https://minotar.net/skin/MHF_Steve"
          decoding="async"
          width="64"
          height="64"
          data-file-width="64"
          data-file-height="64"
        />
      </div>
      <div
        className="salt salt-skin-view-3d"
        style={{ width: 400, height: 400, border: '1px dashed #ccc' }}
      >
        https://minotar.net/skin/MHF_Steve
      </div>
    </>
  )
}
