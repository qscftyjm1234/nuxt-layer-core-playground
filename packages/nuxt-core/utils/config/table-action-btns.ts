/**
 * 表格操作按鈕通用配置
 */
export const tableActionBtnsConfig = [
  {
    type: 'edit',
    desc: '編輯',
    icon: 'mdi-pencil',
    color: 'primary',
    path: '',
    handle: (item: any) => console.log('Edit', item)
  },
  {
    type: 'del',
    desc: '刪除',
    icon: 'mdi-delete',
    color: 'error',
    path: '',
    handle: (item: any) => console.log('Delete', item),
    updateStatus: true
  },
  {
    type: 'status',
    desc: '狀態',
    icon: 'mdi-toggle-switch',
    color: 'success',
    path: '',
    handle: (item: any) => console.log('Status', item),
    updateStatus: true
  },
  {
    type: 'view',
    desc: '檢視',
    icon: 'mdi-eye',
    color: 'info',
    path: '',
    handle: (item: any) => console.log('View', item)
  },
  {
    type: 'customize',
    desc: '自定義',
    icon: 'mdi-cog',
    color: 'secondary',
    path: '',
    handle: (item: any) => console.log('Customize', item)
  }
]
