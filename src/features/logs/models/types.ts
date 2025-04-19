interface UserStats {
  id: number
  name: string
  email: string
  count: number
  packAddManualCount: number
  packAddByScanCount: number
  totalProducts: number
}

interface DayStats {
  date: string
  total: number

  [key: `user_${number}`]: UserStats
}

export { UserStats, DayStats }
