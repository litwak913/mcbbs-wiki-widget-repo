/*
 * @Author: litwak913
 * @Date: 2022-07-30 16:41:58
 * @LastEditors: litwak913 litwak913@qq.com
 * @LastEditTime: 2022-07-30 17:47:24
 * @FilePath: /mcbbs-wiki-widget-repo/widget/RandomMemesImg/widget.ts
 * @Description: RandomMemesImg 显示梗图
 */
import { docReady } from 'Utils/utils'
import { MemeImg } from './memeImg'
// 你可能需要一些工具函数，比如这个DOM加载完毕后执行代码的方法
docReady(async () => {
  const memeRes = await fetch('https://mcbbs.wiki/913-api/imgs?type=json&size=normal')
  const meme: MemeImg = await memeRes.json()
  console.log(meme)
  const message = document.getElementById('memesimg')
  const loading = document.getElementById('memes-loading')
  if (message) {
    const link = document.createElement('a')
    const image = document.createElement('img')
    image.src = `https://mcbbs.wiki${meme.path}`
    link.href = `https://mcbbs.wiki/wiki/${meme.page}`
    loading?.remove()
    link.appendChild(image)
    message.appendChild(link)
  }
})
