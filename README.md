<!--
 * @Author: Salt
 * @Date: 2022-07-10 00:22:02
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 12:22:28
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

1. 在`widget`下找到对应的微件文件夹，里面有至少两个文件`index.tsx`和`widget.ts`
2. `index.tsx`是微件测试用的，`widget.ts`是微件本身的代码
3. 修改`widget.ts`，并在`index.tsx`中编写测试用的DOM
4. 控制台输入`yarn serve`指令打开测试页面，看看你的微件是否正常工作
5. 控制台输入`yarn build:微件名字`指令，编译微件代码，并在`dist`文件夹中找到编译后的代码
6. 在wiki的“Widget”命名空间找到对应页面，修改微件

## 开发新微件

1. 控制台输入`yarn widget <微件名>`指令，比如新微件名为“SaltWidget”，那么指令就是`yarn widget SaltWidget`
2. 在`widget/<微件名>`文件夹里出线`index.tsx`和`widget.ts`文件，前者为测试用的页面，后者为代码文件
3. 在`widget/index.tsx`中引入新微件的测试页面，格式大概这样：
```tsx
// 引入新微件的测试页面
import SaltWidget from './SaltWidget'
import 微件名 from './微件名'

export default [
  { title: 'SaltWidget', Component: SaltWidget },
  { title: '微件名', Component: 微件名 },
]
```
4. 控制台输入`yarn serve`指令打开测试页面，看看你的微件是否正常工作，与其他微件是否存在冲突
5. 开发完成后，使用指令`yarn build:<微件名>`（如`yarn build:SaltWidget`）打包代码，并在`dist`文件夹中找到编译后的代码
6. 在wiki的“Widget”命名空间新建页面，写入微件
```wikitext
<noinclude>简单说明</noinclude><includeonly><script>
// 编译后的代码
</script>
```

## 借物表

- 部分脚手架代码来源于其他[开源脚手架](https://gitee.com/moushu/ms-esbuild-react-scaffold)，以木兰宽松许可证引入。
- 部分工具函数来源于盐以前的个人作品。