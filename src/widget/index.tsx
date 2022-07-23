/*
 * @Author: Salt
 * @Date: 2022-07-23 15:48:30
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-23 17:15:26
 * @Description: 这个文件的功能
 * @FilePath: \mcbbs-wiki-widget-repo\src\widget\index.tsx
 */
import SaltOutsideMusicLoader from './SaltOutsideMusicLoader'
import SaltFirework from './SaltFirework'

export default [
  { title: 'SaltOutsideMusicLoader', Component: SaltOutsideMusicLoader },
  { title: 'SaltFirework', Component: SaltFirework },
] as { title: string; Component: () => JSX.Element }[]
