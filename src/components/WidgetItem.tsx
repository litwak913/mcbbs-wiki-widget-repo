/*
 * @Author: Salt
 * @Date: 2022-08-13 15:21:37
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 15:44:01
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\components\WidgetItem.tsx
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
        className={`mcbbs-wiki-item mcbbs-wiki-widget-item mcbbs-wiki-widget-${title}`}
      >
        <h2>
          <a
            href={`//mcbbs.wiki/wiki/Widget:${title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TextIcon txt="微件" />
            {title}
          </a>
          <span
            className="mcbbs-wiki-item-collapse"
            onClick={() => {
              // console.log(`widget-${title}`)
              dispatch(`widget-${title}`)
            }}
          >
            {state ? '展开' : '收起'}
          </span>
        </h2>
        <div
          className={`mcbbs-wiki-content mcbbs-wiki-widget-content ${
            state ? 'hide' : ''
          }`}
        >
          <Component />
        </div>
      </div>
    </>
  )
}
