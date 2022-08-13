/*
 * @Author: Salt
 * @Date: 2022-07-23 15:48:30
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-13 13:14:08
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\widget\index.tsx
 */
import SaltOutsideMusicLoader from './SaltOutsideMusicLoader'
import SaltFirework from './SaltFirework'
import getMCBBSCredit from './getMCBBSCredit'
import RandomMemesImg from './RandomMemesImg'
import ThemeSwitcher from './ThemeSwitcher'
import TopSign from './TopSign'
import ThemeLoader from './ThemeLoader'
import VectorThemeLoader from './VectorThemeLoader'

export default [
  { title: 'SaltOutsideMusicLoader', Component: SaltOutsideMusicLoader },
  { title: 'SaltFirework', Component: SaltFirework },
  { title: 'getMCBBSCredit', Component: getMCBBSCredit },
  { title: 'RandomMemesImg', Component: RandomMemesImg },
  { title: 'ThemeSwitcher', Component: ThemeSwitcher },
  { title: 'TopSign', Component: TopSign },
  { title: 'ThemeLoader', Component: ThemeLoader },
  { title: 'VectorThemeLoader', Component: VectorThemeLoader },
] as { title: string; Component: () => JSX.Element }[]
