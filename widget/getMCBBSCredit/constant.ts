/*
 * @Author: Salt
 * @Date: 2022-07-24 16:33:17
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 17:26:16
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\getMCBBSCredit\constant.ts
 */
import type { Options } from 'highcharts'
/** 饼图的默认设置 */
export const defaultOption: Options = {
  //! 画板基本设置
  chart: { backgroundColor: '#fbf2da', plotShadow: false },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  //! 右下角显示的版权信息
  credits: {
    href: 'https://mcbbs.wiki/wiki/U:Salt_lovely',
    text: '小工具由Salt_lovely制作，Litwak.913修复，使用了highcharts开源库',
  },
  //! 绘图基本设置
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      colors: [
        '#7ccade',
        '#cae07b',
        '#e37bf9',
        '#fce37c',
        '#ff9800',
        '#fd957e',
        '#9ba8f3',
      ],
      dataLabels: {
        enabled: true,
        format: '{point.name}: {point.y}分, 占{point.percentage:.1f} %',
      },
      showInLegend: true,
    },
  },
  navigation: {
    buttonOptions: {
      enabled: true,
    },
  },
}
