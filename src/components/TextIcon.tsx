/*
 * @Author: Salt
 * @Date: 2022-07-31 13:19:48
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-31 13:41:02
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\components\TextIcon.tsx
 */
import React from 'react'
import style from './TextIcon.m.scss'

export const TextIcon: React.FC<{ txt: string; color?: string }> = (props) => {
  const { txt, color = '#999' } = props
  return (
    <div className={style['text-icon']} style={{ color }}>
      {txt}
    </div>
  )
}
