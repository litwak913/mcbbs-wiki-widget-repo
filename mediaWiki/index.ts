/*
 * @Author: Salt
 * @Date: 2022-08-11 21:45:23
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-11 21:49:11
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\mediaWiki\index.ts
 */
import Vector from './Vector'

export default [{ title: 'Vector.css', Component: Vector }] as {
  title: string
  Component: () => JSX.Element
}[]
