/*
 * @Author: Salt
 * @Date: 2022-08-11 21:45:33
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-12 23:41:30
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\mediaWiki\Vector\index.tsx
 */
import React from 'react'
import { copy } from 'Utils/utils'

import commonStyle from './common.t.scss'
import newStyle from './new.t.scss'
import oldStyle from './old.t.scss'

export default function Vector() {
  const throwSourceMap = (str: string) =>
    str.replace(/\n?\/\*\# sourceMappingURL[^\n]+\*\//, '').replace(/^\n/, '')
  const [commonS, oldS, newS] = [
    throwSourceMap(commonStyle),
    throwSourceMap(oldStyle),
    throwSourceMap(newStyle),
  ]
  return (
    <>
      <h3>
        通用部分
        <small style={{ cursor: 'pointer' }} onClick={() => copy(commonS)}>
          复制
        </small>
      </h3>
      <pre style={{ columnCount: 3 }}>{commonS}</pre>
      <h3>
        旧版
        <small style={{ cursor: 'pointer' }} onClick={() => copy(oldS)}>
          复制
        </small>
      </h3>
      <pre style={{ columnCount: 3 }}>{oldS}</pre>
      <h3>
        新版
        <small style={{ cursor: 'pointer' }} onClick={() => copy(newS)}>
          复制
        </small>
      </h3>
      <pre style={{ columnCount: 3 }}>{newS}</pre>
    </>
  )
}
