/*
 * @Author: Salt
 * @Date: 2022-10-04 14:17:22
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-04 18:52:03
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltTimeDiff\index.tsx
 */
// index.tsx 测试页面
import React from 'react'
import './widget'
import './index.scss'

const ToNow = (props: { time: string; time2?: string; cmd?: string }) => (
  <>
    <hr />
    {props.time} 距 {props.time2 || '今天'}：
    <br />
    <span className={`salt-time-diff ${props.time2 ? '' : 'real-time'}`}>
      {props.time}SPLIT{props.time2 || ''}SPLIT{props.cmd || '年月d小时分钟秒M'}
    </span>
    {' | '}
    <span
      className={`salt-time-diff ${props.time2 ? '' : 'real-time'} complex`}
    >
      {props.time}SPLIT{props.time2 || ''}SPLIT{props.cmd || '年月d小时分钟秒M'}
    </span>
  </>
)

export default () => {
  // 可能需要的一些逻辑
  return (
    <>
      1949/10/1 15:00 距 今天：
      <br />
      普通：
      <br />
      <span className="salt-time-diff">
        1949/10/1 15:00 SPLIT SPLIT 小时 分钟 秒 天
      </span>
      <br />
      复杂DOM（有CSS）：
      <br />
      <span className="salt-time-diff complex">
        1949/10/1 15:00 SPLIT SPLIT d小时分钟秒
      </span>
      <br />
      实时：
      <br />
      <span className="salt-time-diff real-time">
        1949/10/1 15:00 SPLIT SPLIT 小时 分钟 秒 天 M
      </span>
      <br />
      实时+复杂DOM（有CSS）：
      <br />
      <span className="salt-time-diff real-time complex">
        1949/10/1 15:00 SPLIT SPLIT d小时分钟秒M
      </span>
      <ToNow time="2022年9月1日" />
      <ToNow time="2022年9月30日" />
      <ToNow time="2021年10月30日 14:15:16" />
      <ToNow time="2050年10月1日" />
      <ToNow time="2050年10月1日" time2="2022年10月2日 14:15:16" />
      <ToNow
        time="2050年10月1日"
        time2="2022年10月2日 14:15:16"
        cmd="天时分秒"
      />
      <hr />
      使用 UTC 时间戳 1589552138000：
      <br />
      <span className="salt-time-diff real-time utc complex simple">
        1589552138000 SPLIT SPLIT d小时分钟秒M
      </span>
      <hr />
      2022年10月4日 simple 模式：
      <br />
      <span className="salt-time-diff real-time utc complex simple">
        2022年10月4日 SPLIT SPLIT 年月日小时分钟秒毫秒
      </span>
    </>
  )
}
