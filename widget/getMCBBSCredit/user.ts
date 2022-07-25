export interface BBSActivities {
  post: number
  thread: number
  digiest: number
  currentGroup: string | null
  currentGroupText: string | null
  userGroups: string[] | null
  userGroupsText: string[] | null
}
export interface BBSCredit {
  nugget: number
  gem: number
  heart: number
  ingot: number
  contribute: number
  popularity: number
  diamond: number
  star: number
  credit: number
}
/** Litwak.913的论坛用户信息API响应值 */
export interface BBSUser {
  uid: number
  nickname: string | null
  credits: BBSCredit
  activites: BBSActivities
  locked: boolean
}
