<!--
 * @Author: Salt
 * @Date: 2022-07-10 00:22:02
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 00:41:08
 * @Description: 说明文档
 * @FilePath: \mcbbs-wiki-widget-repo\README.md
-->
# mcbbs-wiki-widget-repo

MCBBS微件统一仓库。

## 开发需要

1. 一台性能尚可的电脑，安装了nodejs、git、npm，最好安装了yarn
2. 推荐使用vscode之类的编程软件
3. 控制台输入`yarn`拉取依赖

## 修改微件

1. 在`src/widget`下找到对应的微件文件夹，里面有至少两个文件`index.tsx`和`widget.ts`
2. `index.tsx`是微件测试用的，`widget.ts`是微件本身的代码
3. 修改`widget.ts`，并在`index.tsx`中编写测试用的DOM
4. 控制台输入`yarn serve`指令打开测试页面，看看你的微件是否正常工作
5. 控制台输入`yarn build:微件名字`指令，编译微件代码，并在`dist`文件夹中找到编译后的代码
6. 在wiki的“Widget”命名空间找到对应页面，修改微件

## 开发新微件

1. 在`src/widget`下新建文件夹，名字是这个微件的名字，比如“SaltWidget”
2. 在文件夹里新建`index.tsx`和`widget.ts`文件，前者为测试页面，后者为代码文件
```tsx
// index.tsx 测试页面
import React from 'react'
import './widget'

export default () => {
  // 可能需要的一些逻辑
  return (
    <>测试用的DOM</>
  )
}
```
```ts
// widget.ts 代码文件
import { docReady } from 'Utils/utils'
// 你可能需要一些工具函数，比如这个DOM加载完毕后执行代码的方法
docReady(() => {
  // 代码逻辑
})
```
3. 在根目录下的`package.json`中添加指令，格式参考`"build:SaltWidget": "node script/bundle.js --SaltWidget"`
4. 在`src/widget/index.tsx`中引入新微件的测试页面
```tsx
// 引入新微件的测试页面
import SaltWidget from './SaltWidget'
import 微件名 from './微件名'

export default [
  { title: 'SaltWidget', Component: SaltWidget },
  { title: '微件名', Component: 微件名 },
]
```
5. 控制台输入`yarn serve`指令打开测试页面，看看你的微件是否正常工作，与其他微件是否存在冲突
6. 开发完成后，使用第三步添加的新指令（如`build:SaltWidget`），编译代码，并在`dist`文件夹中找到编译后的代码
7. 在wiki的“Widget”命名空间新建页面，写入微件
```wikitext
<noinclude>简单说明</noinclude><includeonly><script>
// 编译后的代码
</script>
```

## 借物表

- 部分脚手架代码来源于其他[开源脚手架](https://gitee.com/moushu/ms-esbuild-react-scaffold)，以木兰宽松许可证引入。
- 部分工具函数来源于盐以前的个人作品。