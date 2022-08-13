/*
 * @Author: Salt
 * @Date: 2022-07-23 15:09:40
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 15:44:58
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\App.tsx
 */
import React, { useReducer } from 'react'
import widget from 'Widget/index'
import mediaWiki from 'MediaWiki/index'
import { addScript } from 'Utils/resource'
import { TextIcon } from './components/TextIcon'
import { read, write } from './utils'
import MediawikiItem from './components/MediawikiItem'
import WidgetItem from './components/WidgetItem'

addScript('https://cdn.bootcss.com/jquery/2.2.2/jquery.js', false, 'jquery')
export default () => {
  const collapseKey = 'mcbbs-wiki-widget-repo-salt-collapse'
  const initState = read(collapseKey, {} as { [key: string]: boolean })
  const reducer = (state: { [key: string]: boolean }, action: string) => {
    // console.log(state[action], !state[action])
    // console.trace()
    state[action] = !state[action]
    write(collapseKey, state)
    return { ...state }
  }
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <>
      <div className="mcbbs-wiki-widget-list">
        {widget.map(({ title, Component }) => (
          <WidgetItem
            key={title}
            title={title}
            Component={Component}
            dispatch={dispatch}
            state={!!state[`widget-${title}`]}
          />
        ))}
      </div>
      <div className="mcbbs-wiki-mediawiki-list">
        {mediaWiki.map(({ title, Component }) => (
          <MediawikiItem
            key={title}
            title={title}
            Component={Component}
            dispatch={dispatch}
            state={!!state[`mediawiki-${title}`]}
          />
        ))}
      </div>
    </>
  )
}
