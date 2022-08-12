/*
 * @Author: Salt
 * @Date: 2022-08-11 21:45:33
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 00:05:49
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\mediaWiki\Vector\index.tsx
 */
import React from 'react'
import { copy } from 'Utils/utils'

import commonStyle from './common.t.scss'
import newStyle from './new.t.scss'
import oldStyle from './old.t.scss'

const ClickCopy = (props: { txt: string }) => (
  <small
    style={{ cursor: 'pointer', padding: '1px 2px', border: '1px dashed #eee' }}
    onClick={() => copy(props.txt)}
  >
    复制
  </small>
)

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
        <ClickCopy txt={commonS} />
      </h3>
      <pre style={{ columnCount: 3 }}>{commonS}</pre>
      <h3>
        旧版
        <ClickCopy txt={oldS} />
      </h3>
      <pre style={{ columnCount: 3 }}>{oldS}</pre>
      <h3>
        新版
        <ClickCopy txt={newS} />
      </h3>
      <pre style={{ columnCount: 3 }}>{newS}</pre>
    </>
  )
}
