/*
 * @Author: Salt
 * @Date: 2022-07-23 15:48:30
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-31 00:11:53
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\index.tsx
 */
import SaltOutsideMusicLoader from './SaltOutsideMusicLoader'
import SaltFirework from './SaltFirework'
import getMCBBSCredit from './getMCBBSCredit'
import RandomMemesImg from './RandomMemesImg'
import ThemeSwitcher from './ThemeSwitcher'
import TopSign from './TopSign'

export default [
  { title: 'SaltOutsideMusicLoader', Component: SaltOutsideMusicLoader },
  { title: 'SaltFirework', Component: SaltFirework },
  { title: 'getMCBBSCredit', Component: getMCBBSCredit },
  { title: 'RandomMemesImg', Component: RandomMemesImg },
  { title: 'ThemeSwitcher', Component: ThemeSwitcher },
  { title: 'TopSign', Component: TopSign },
] as { title: string; Component: () => JSX.Element }[]
