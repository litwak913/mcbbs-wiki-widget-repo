/*
 * @Author: Salt
 * @Date: 2022-08-13 15:21:37
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 15:44:04
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\components\MediawikiItem.tsx
 */
import React from 'react'
import { TextIcon } from './TextIcon'

export default (props: {
  title: string
  Component: () => JSX.Element
  state: boolean
  dispatch: (t: string) => unknown
}) => {
  const { title, Component, state, dispatch } = props
  return (
    <>
      <div
        key={title}
        className={`mcbbs-wiki-item mcbbs-wiki-mediawiki-item mcbbs-wiki-mediawiki-${title}`}
      >
        <h2>
          <a
            href={`//mcbbs.wiki/wiki/MediaWiki:${title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TextIcon txt="媒体" />
            {title}
          </a>
          <span
            className="mcbbs-wiki-item-collapse"
            onClick={() => {
              // console.log(`mediawiki-${title}`)
              dispatch(`mediawiki-${title}`)
            }}
          >
            {state ? '展开' : '收起'}
          </span>
        </h2>
        <div
          className={`mcbbs-wiki-content mcbbs-wiki-mediawiki-content ${
            state ? 'hide' : ''
          }`}
        >
          <Component />
        </div>
      </div>
    </>
  )
}
