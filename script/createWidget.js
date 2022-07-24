/*
 * @Author: Salt
 * @Date: 2022-07-24 09:37:32
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 12:37:00
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\script\createWidget.js
 */
const fs = require('fs/promises')
const path = require('path')
const $P = require('./tools/format-print')
const $T = require('./tools/format-time')

async function isFileExist(path) {
  try {
    await fs.access(path)
  } catch (e) {
    return false
  }
  const file = await fs.stat(path)
  const res = file.isDirectory()
  return !res
}

async function isDirExist(path) {
  try {
    await fs.access(path)
  } catch (e) {
    return false
  }
  const file = await fs.stat(path)
  const res = file.isDirectory()
  return res
}
/** 检查文件夹是否存在，若不存在则创建新文件夹 */
async function createDir(path) {
  if (!(await isDirExist(path))) {
    await fs.mkdir(path)
  }
}

const info = (...args) =>
  console.log($P(' INFO ', 'b', 'white', 'bluebg'), ...args)
const subInfo = (...args) => console.log($P(' INFO ', 'blue'), ...args)
const error = (...args) =>
  console.log($P(' ERROR ', 'b', 'white', 'redbg'), ...args)

console.log($P('MCBSSWiki widget - create ' + $T(), 'grey'))
;(async (argus) => {
  // 检查输入
  const widget = argus[0]
  if (!widget) {
    error(`用法：yarn create ${$P('<微件名>', 'yellow')}`)
    return
  }
  if (/[\\/?*:"<>|]/.test(widget)) {
    error(`文件名中不能含有${$P('\\/?*:"<>|', 'yellow')}之类的字符`)
    return
  }
  // 创建文件夹
  info(`创建新微件${widget}...`)
  const folderPath = `widget/${widget}`
  const widgetFolder = path.resolve(folderPath)
  await createDir(widgetFolder)
  // 创建代码文件
  const indexPath = path.resolve(`${folderPath}/index.tsx`)
  const widgetPath = path.resolve(`${folderPath}/widget.ts`)
  const isIndexExist = await isFileExist(indexPath)
  const isWidgetExist = await isFileExist(widgetPath)
  if (isIndexExist) subInfo('已有', $P(`${widget}/index.tsx`, 'yellow'))
  else {
    fs.writeFile(
      indexPath,
      `// index.tsx 测试页面
import React from 'react'
import './widget'

export default () => {
  // 可能需要的一些逻辑
  return (
    <>测试用的DOM</>
  )
}
`
    )
  }
  if (isWidgetExist) subInfo('已有', $P(`${widget}/widget.ts`, 'yellow'))
  else {
    fs.writeFile(
      widgetPath,
      `// widget.ts 代码文件
import { docReady } from 'Utils/utils'
// 你可能需要一些工具函数，比如这个DOM加载完毕后执行代码的方法
docReady(() => {
  // 代码逻辑
})
`
    )
  }
  // 添加指令
  const packagePath = path.resolve('package.json')
  const json = require('../package.json')
  json.scripts[`build:${widget}`] = `node script/bundle.js --${widget}`
  fs.writeFile(packagePath, JSON.stringify(json, null, 2) + '\n')
  // 结束语
  info(`可以在 ${$P(`widget/${widget}`, 'yellow')} 中编写代码和测试页面`)
  info(`可以使用 ${$P(`yarn build:${widget}`, 'yellow')} 打包微件代码`)
  console.log(
    $P(' DONE ', 'b', 'white', 'greenbg'),
    `新微件${widget}创建完毕\n`
  )
})(process.argv.slice(2))
