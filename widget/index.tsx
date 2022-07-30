/*
 * @Author: Salt
 * @Date: 2022-07-23 15:48:30
 * @LastEditors: litwak913 litwak913@qq.com
 * @LastEditTime: 2022-07-30 17:47:56
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\index.tsx
 */
import SaltOutsideMusicLoader from './SaltOutsideMusicLoader'
import SaltFirework from './SaltFirework'
import getMCBBSCredit from './getMCBBSCredit'
import RandomMemesImg from './RandomMemesImg'

export default [
  { title: 'SaltOutsideMusicLoader', Component: SaltOutsideMusicLoader },
  { title: 'SaltFirework', Component: SaltFirework },
  { title: 'getMCBBSCredit', Component: getMCBBSCredit },
  { title: 'RandomMemesImg', Component: RandomMemesImg },
] as { title: string; Component: () => JSX.Element }[]
