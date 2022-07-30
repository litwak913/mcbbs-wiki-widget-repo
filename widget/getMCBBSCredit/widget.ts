/*
 * @Author: Salt
 * @Date: 2022-07-24 12:23:26
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-25 22:42:29
 * @Description: 绘制饼图
 * @FilePath: \mcbbs-wiki-widget-repo\widget\getMCBBSCredit\widget.ts
 */
// widget.ts 代码文件
import { addScript } from 'Utils/resource'
import { docReady, waitTill } from 'Utils/utils'
import type { Options } from 'highcharts'
import { defaultOption } from './constant'
import { BBSUser } from './user'

docReady(() => {
  const uid = getUID()
  if (!uid || isNaN(+uid)) {
    console.error('未获取到MCBBS用户ID')
  } else getPIE(uid)
})
//! 添加highcharts开源库
addScript(
  'https://cdn.staticfile.org/highcharts/10.2.0/highcharts.min.js',
  false,
  'highcharts'
)
// addScript(
//   'https://cdn.staticfile.org/highcharts/10.2.0/modules/exporting.min.js',
//   false,
//   'highcharts/modules/exporting'
// )
// addScript(
//   'https://cdn.staticfile.org/highcharts/10.2.0/modules/offline-exporting.min.js',
//   false,
//   'highcharts/modules/offline-exporting'
// )
function getUID() {
  const el = document.querySelector('.infolist')
  if (el) {
    const tr = el.querySelectorAll('tr')
    for (let i = 0; i < tr.length; i++) {
      const { childElementCount, textContent } = tr[i]
      if (childElementCount < 2 || !textContent) continue
      if (textContent.replace('\n', '').indexOf('UID') == 0) {
        return ((tr[i].lastChild!.textContent || '').match(/\d+/) || [])[0]
      }
    }
  }
  const div = document.getElementById('userpie')
  if (div) {
    return ((div.textContent || '').match(/\d+/) || [])[0]
  }
}

async function getPIE(uid: string) {
  const $url = 'https://mcbbs.wiki/913-api/users/' + uid
  // console.log('正在获取用户信息: ', $url)

  try {
    // 线上使用
    const res = await fetch($url)
    const {
      credits: creditsObj,
      activites,
      nickname,
    }: BBSUser = await res.json()
    const {
      /** 回帖 */
      post,
      /** 主题 */
      thread,
      /** 精华 */
      digiest,
      /** 用户组 */
      currentGroupText: group,
    } = activites
    const {
      credit,
      /** 人气 */
      popularity: popular,
      /** 贡献 */
      contribute: contrib,
      /** 爱心 */
      heart,
      /** 钻石 */
      diamond,
    } = creditsObj
    const json: Options = Object.assign({}, defaultOption, {
      title: { text: `${nickname} 积分构成` },
      subtitle: {
        text: `UID: ${uid}; 积分: ${credit}; 用户组: ${group}`,
      },
      series: [
        {
          type: 'pie',
          name: '积分占比',
          data: [
            { name: `发帖数/${post}帖`, y: Math.round(post / 3) },
            { name: `主题数/${thread}帖`, y: thread * 2 },
            { name: `精华帖/${digiest}帖`, y: digiest * 45 },
            { name: `人气/${popular}点`, y: popular * 3 },
            { name: `贡献/${contrib}点`, y: contrib * 10 },
            { name: `爱心/${heart}颗`, y: heart * 4 },
            { name: `钻石/${diamond}颗`, y: diamond * 2 },
          ],
        },
      ],
    })
    await waitTill(() => window.Highcharts)
    // window.Highcharts.setOptions({
    //   lang: {
    //     contextButtonTitle: '图表菜单',
    //     viewFullscreen: '全屏查看',
    //     exitFullscreen: '退出全屏',
    //     printChart: '打印图表',
    //     downloadJPEG: '导出 JPEG 图片',
    //     downloadPDF: '导出 PDF 文档',
    //     downloadPNG: '导出 PNG 图片',
    //     downloadSVG: '导出 SVG 矢量图',
    //   },
    // })
    window.Highcharts.chart('userpie', json)
  } catch (err) {
    console.error(err)
  }
}
