/** 專案獨有的保險類型 (自動掃描測試) */
export const insuranceType = [
  { label: '人壽保險', value: 'LIFE' },
  { label: '財產保險', value: 'PROPERTY' },
  { label: '健康保險', value: 'HEALTH' },
  { label: '旅遊平安險', value: 'TRAVEL' }
]

/** 專案獨有的理賠狀態 */
export const claimStatus = [
  { label: '審核中', value: 'PENDING', color: 'orange' },
  { label: '已賠付', value: 'PAID', color: 'green' },
  { label: '拒賠', value: 'REJECTED', color: 'red' }
]
