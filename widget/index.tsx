/*
 * @Author: Salt
 * @Date: 2022-07-23 15:48:30
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-24 15:48:42
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\index.tsx
 */
import SaltOutsideMusicLoader from './SaltOutsideMusicLoader'
import SaltFirework from './SaltFirework'
import getMCBBSCredit from './getMCBBSCredit'

export default [
  { title: 'SaltOutsideMusicLoader', Component: SaltOutsideMusicLoader },
  // { title: 'SaltFirework', Component: SaltFirework },
  { title: 'getMCBBSCredit', Component: getMCBBSCredit },
] as { title: string; Component: () => JSX.Element }[]
