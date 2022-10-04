/*
 * @Author: Salt
 * @Date: 2022-10-04 14:17:22
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-04 16:16:40
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\SaltTimeDiff\index.tsx
 */
// index.tsx 测试页面
import React from 'react'
import './widget'
import './index.scss'

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
      <br />
      <span className="salt-time-diff real-time complex">
        1949/10/1 15:00 SPLIT SPLIT d小时分钟秒
      </span>
      <hr />
      2050年10月1日 距 今天：
      <br />
      <span className="salt-time-diff real-time complex">
        2050年10月1日 SPLIT SPLIT d小时分钟秒M
      </span>
      <hr />
      2050年10月1日 距 2022年10月1日：
      <br />
      <span className="salt-time-diff complex">
        2050年10月1日 SPLIT 2022年10月1日 SPLIT d小时分钟秒M
      </span>
      <br />
      2022年10月1日 距 2050年10月1日：
      <br />
      <span className="salt-time-diff complex">
        2022年10月1日 SPLIT 2050年10月1日 SPLIT d小时分钟秒M
      </span>
    </>
  )
}
