export const getComponentExample = (name: string) => {
  switch (name) {
    case 'IButton':
      return `<div class="flex flex-col gap-6">
  <!-- Variants -->
  <div class="flex flex-wrap gap-4 items-center">
    <IButton variant="primary">Primary</IButton>
    <IButton variant="secondary">Secondary</IButton>
    <IButton variant="success">Success</IButton>
    <IButton variant="danger">Danger</IButton>
    <IButton variant="warning">Warning</IButton>
    <IButton variant="info">Info</IButton>
  </div>

  <!-- Styles -->
  <div class="flex flex-wrap gap-4 items-center">
    <IButton variant="primary" prepend-icon="mdi-rocket-launch">With Icon</IButton>
    <IButton variant="outlined" color="primary">Outlined</IButton>
    <IButton variant="text" color="primary">Text Button</IButton>
    <IButton variant="tonal" color="success">Tonal</IButton>
    <IButton variant="plain" color="error">Plain</IButton>
  </div>

  <!-- Sizes & States -->
  <div class="flex flex-wrap gap-4 items-center">
    <IButton size="small">Small</IButton>
    <IButton size="medium">Medium</IButton>
    <IButton size="large">Large</IButton>
    <IButton loading>Loading</IButton>
    <IButton disabled>Disabled</IButton>
  </div>
  
  <!-- Block -->
  <div class="w-full max-w-sm">
    <IButton block variant="primary">Block Button</IButton>
  </div>
</div>`
    case 'ICheckbox':
      return `<div class="flex flex-col gap-4">
  <div class="text-sm font-bold text-slate-500 uppercase">基本用法</div>
  <div class="flex gap-6">
    <ICheckbox label="接受條款" />
    <ICheckbox label="預設選取" :model-value="true" />
    <ICheckbox label="禁用狀態" disabled :model-value="true" />
  </div>

  <div class="text-sm font-bold text-slate-500 uppercase mt-4">狀態展示</div>
  <div class="flex gap-6">
    <ICheckbox label="Indeterminate (半選)" indeterminate />
    <ICheckbox label="錯誤狀態" error-messages="此欄位必填" />
  </div>

  <div class="text-sm font-bold text-slate-500 uppercase mt-4">顏色變化</div>
  <div class="flex gap-6">
    <ICheckbox label="Primary" color="primary" :model-value="true" />
    <ICheckbox label="Success" color="success" :model-value="true" />
    <ICheckbox label="Error" color="error" :model-value="true" />
  </div>
</div>`
    case 'IAlert':
      return `<IStack gap="4">
  <IAlert type="success" title="Success" text="Operation completed!" />
  <IAlert type="error" variant="outlined" title="Error" text="Something went wrong." />
</IStack>`
    case 'IInput':
      return `<IInput label="Username" placeholder="Enter your name" />`
    case 'ITextField':
      return `<ITextField label="Email" prepend-icon="mdi-email" placeholder="email@example.com" />`
    case 'ICard':
      return `<ICard title="Project Alpha" subtitle="In Progress" elevation="2">
  <p>This is a high-level overview of the current status.</p>
  <template #footer>
    <IButton size="small">Details</IButton>
  </template>
</ICard>`
    case 'IChip':
      return `<div class="flex gap-2">
  <IChip color="#3b82f6">Active</IChip>
  <IChip color="#ef4444" variant="outlined">Urgent</IChip>
  <IChip closable>Tag</IChip>
</div>`
    case 'ISwitch':
      return `<ISwitch label="Enable Notifications" :model-value="true" />`
    case 'SmartComplexWidget':
      return `<SmartComplexWidget />`
    case 'SmartTable':
      return `<SmartTable 
  title="Recent Users"
  :columns="[
    { label: 'Name', field: 'name' },
    { label: 'Role', field: 'role', type: 'tag' }
  ]"
  :data="[
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'User' }
  ]"
/>`
    case 'BDataTable':
      return `<BDataTable
  :headers="[
    { title: '姓名', key: 'name', sortable: true },
    { title: '職位', key: 'role', sortable: true },
    { title: '部門', key: 'dept', sortable: true },
    { title: '狀態', key: 'status' }
  ]"
  :items="[
    { name: 'John Doe', role: 'Dev', dept: 'IT', status: 'Active' },
    { name: 'Jane Smith', role: 'PM', dept: 'Product', status: 'Active' },
    { name: 'Bob Johnson', role: 'Designer', dept: 'Design', status: 'Inactive' }
  ]"
  :items-length="3"
  :server-side="false"
  :conditions="{}"
/>`
    case 'DateRangePicker':
      return `<DateRangePicker :model-value="{ start: null, end: null }" />`
    default:
      return `<${name} />`
  }
}

export const getComponentProps = (name: string) => {
  const commonProps = [
    { name: 'class', description: '自定義樣式類', type: 'string', default: '-' },
    { name: 'style', description: '內聯樣式', type: 'string | object', default: '-' }
  ]

  if (name === 'IButton') {
    return [
      { name: 'variant', description: '樣式變體', type: "'primary' | 'secondary' | 'outlined' | 'text' | ...", default: "'primary'" },
      { name: 'size', description: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
      { name: 'color', description: '顏色 (Hex/Theme/CSS Var)', type: 'string', default: "undefined" },
      { name: 'block', description: '是否為全寬按鈕', type: 'boolean', default: 'false' },
      { name: 'loading', description: '是否顯示載入中', type: 'boolean', default: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'prependIcon', description: '前置圖示', type: 'string', default: '-' },
      { name: 'appendIcon', description: '後置圖示', type: 'string', default: '-' },
      ...commonProps
    ]
  }

  if (name === 'ICheckbox') {
    return [
      { name: 'modelValue', description: '綁定值 (Boolean/Array)', type: 'boolean | any[]', default: "undefined" },
      { name: 'label', description: '標籤文字', type: 'string', default: "undefined" },
      { name: 'value', description: '多選時的值', type: 'any', default: "undefined" },
      { name: 'indeterminate', description: '半選狀態', type: 'boolean', default: 'false' },
      { name: 'errorMessages', description: '錯誤訊息', type: 'string | string[]', default: "undefined" },
      { name: 'color', description: '勾選顏色', type: 'string', default: "'primary'" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'ITextField') {
    return [
      { name: 'modelValue', description: '綁定值', type: 'string | number', default: "undefined" },
      { name: 'label', description: '標籤文字', type: 'string', default: "undefined" },
      { name: 'placeholder', description: '佔位符文字', type: 'string', default: "undefined" },
      { name: 'type', description: '輸入類型', type: "'text' | 'password' | 'email' | 'number' | ...", default: "'text'" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' },
      { name: 'clearable', description: '是否可清除', type: 'boolean', default: 'false' },
      { name: 'prependIcon', description: '前置圖示', type: 'string', default: '-' },
      { name: 'appendIcon', description: '後置圖示', type: 'string', default: '-' },
      { name: 'errorMessages', description: '錯誤訊息', type: 'string | string[]', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'IRadio') {
    return [
      { name: 'modelValue', description: '綁定值 (Radio Group)', type: 'any', default: "undefined" },
      { name: 'value', description: '此選項的值', type: 'any', default: "undefined" },
      { name: 'label', description: '標籤文字', type: 'string', default: "undefined" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'color', description: '選中顏色', type: 'string', default: "'primary'" },
      ...commonProps
    ]
  }

  if (name === 'ISwitch') {
    return [
      { name: 'modelValue', description: '綁定值', type: 'boolean | any', default: "undefined" },
      { name: 'trueValue', description: '開啟時的值', type: 'any', default: 'true' },
      { name: 'falseValue', description: '關閉時的值', type: 'any', default: 'false' },
      { name: 'label', description: '標籤文字', type: 'string', default: "undefined" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      { name: 'color', description: '顏色主題', type: 'string', default: "'primary'" },
      { name: 'inset', description: '內嵌樣式', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'ISelect') {
    return [
      { name: 'modelValue', description: '綁定值', type: 'any', default: "undefined" },
      { name: 'items', description: '選項列表', type: 'SelectOption[]', default: '[]' },
      { name: 'label', description: '標籤文字', type: 'string', default: "undefined" },
      { name: 'placeholder', description: '佔位符文字', type: 'string', default: "'請選擇'" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'clearable', description: '是否可清除', type: 'boolean', default: 'false' },
      { name: 'multiple', description: '是否多選', type: 'boolean', default: 'false' },
      { name: 'errorMessages', description: '錯誤訊息', type: 'string | string[]', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'ITextarea') {
    return [
      { name: 'modelValue', description: '綁定值', type: 'string', default: "''" },
      { name: 'label', description: '標籤文字', type: 'string', default: "undefined" },
      { name: 'placeholder', description: '佔位符文字', type: 'string', default: "undefined" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' },
      { name: 'rows', description: '行數', type: 'number', default: '3' },
      { name: 'autoGrow', description: '自動調整高度', type: 'boolean', default: 'false' },
      { name: 'counter', description: '字數統計', type: 'boolean | number', default: 'false' },
      { name: 'maxlength', description: '最大長度', type: 'number', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'IInput') {
    return [
      { name: 'modelValue', description: '綁定值', type: 'string | number', default: "undefined" },
      { name: 'type', description: '輸入類型', type: "'text' | 'password' | 'email' | ...", default: "'text'" },
      { name: 'placeholder', description: '佔位符文字', type: 'string', default: "undefined" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'readonly', description: '是否唯讀', type: 'boolean', default: 'false' },
      { name: 'clearable', description: '是否可清除', type: 'boolean', default: 'false' },
      { name: 'error', description: '錯誤狀態', type: 'boolean', default: 'false' },
      { name: 'errorMessage', description: '錯誤訊息', type: 'string', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'IDatePicker') {
    return [
      { name: 'modelValue', description: '綁定值', type: 'string | Date | null', default: 'null' },
      { name: 'type', description: '選擇器類型', type: "'date' | 'datetime' | 'time' | 'month' | 'year'", default: "'date'" },
      { name: 'placeholder', description: '佔位符文字', type: 'string', default: "'請選擇日期'" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'clearable', description: '是否可清除', type: 'boolean', default: 'true' },
      { name: 'minDate', description: '最小日期', type: 'string | Date', default: "undefined" },
      { name: 'maxDate', description: '最大日期', type: 'string | Date', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'IAlert') {
    return [
      { name: 'title', description: '標題', type: 'string', default: "''" },
      { name: 'text', description: '內容文字', type: 'string', default: "''" },
      { name: 'type', description: '類型', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'" },
      { name: 'variant', description: '樣式變體', type: "'tonal' | 'outlined' | 'flat'", default: "'tonal'" },
      { name: 'icon', description: '圖示', type: 'string', default: "''" },
      ...commonProps
    ]
  }

  if (name === 'ICard') {
    return [
      { name: 'title', description: '標題', type: 'string', default: "''" },
      { name: 'subtitle', description: '副標題', type: 'string', default: "''" },
      { name: 'elevation', description: '陰影層級', type: 'number', default: '1' },
      { name: 'variant', description: '樣式變體', type: "'elevated' | 'flat' | 'outlined'", default: "'elevated'" },
      ...commonProps
    ]
  }

  if (name === 'IModal') {
    return [
      { name: 'modelValue', description: '是否顯示', type: 'boolean', default: 'false' },
      { name: 'title', description: '標題', type: 'string', default: "undefined" },
      { name: 'persistent', description: '點擊外部不關閉', type: 'boolean', default: 'false' },
      { name: 'width', description: '寬度', type: 'string | number', default: "'600'" },
      ...commonProps
    ]
  }

  if (name === 'ISnackbar') {
    return [
      { name: 'modelValue', description: '是否顯示', type: 'boolean', default: 'false' },
      { name: 'text', description: '訊息內容', type: 'string', default: "''" },
      { name: 'color', description: '顏色', type: "'success' | 'error' | 'warning' | 'info'", default: "'success'" },
      { name: 'timeout', description: '顯示時長 (ms)', type: 'number', default: '3000' },
      ...commonProps
    ]
  }

  if (name === 'IChip') {
    return [
      { name: 'color', description: '顏色', type: 'string', default: "'primary'" },
      { name: 'variant', description: '樣式變體', type: "'flat' | 'elevated' | 'tonal' | 'outlined'", default: "'tonal'" },
      { name: 'size', description: '尺寸', type: "'x-small' | 'small' | 'default' | 'large'", default: "'default'" },
      { name: 'closable', description: '是否可關閉', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'IAvatar') {
    return [
      { name: 'size', description: '尺寸', type: "'x-small' | 'small' | 'default' | 'large' | 'x-large'", default: "'default'" },
      { name: 'color', description: '背景顏色', type: 'string', default: "'primary'" },
      { name: 'icon', description: '圖示', type: 'string', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'IIcon') {
    return [
      { name: 'icon', description: '圖示名稱 (Material Design Icons)', type: 'string', default: "undefined" },
      { name: 'size', description: '尺寸', type: "'x-small' | 'small' | 'default' | 'large' | 'x-large'", default: "'default'" },
      { name: 'color', description: '顏色', type: 'string', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'ILoadingSpinner') {
    return [
      { name: 'size', description: '尺寸', type: "'small' | 'medium' | 'large'", default: "'medium'" },
      { name: 'color', description: '顏色', type: 'string', default: "'primary'" },
      ...commonProps
    ]
  }

  if (name === 'ILoadingButton') {
    return [
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'color', description: '顏色', type: 'string', default: "'primary'" },
      ...commonProps
    ]
  }

  if (name === 'EmailInput') {
    return [
      { name: 'modelValue', description: 'Email 值', type: 'string', default: "''" },
      { name: 'label', description: '標籤文字', type: 'string', default: "'Email Address'" },
      { name: 'required', description: '是否必填', type: 'boolean', default: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'PasswordInput') {
    return [
      { name: 'modelValue', description: '密碼值', type: 'string', default: "''" },
      { name: 'label', description: '標籤文字', type: 'string', default: "'Password'" },
      { name: 'showStrength', description: '顯示密碼強度', type: 'boolean', default: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'PhoneInput') {
    return [
      { name: 'modelValue', description: '電話號碼', type: 'string', default: "''" },
      { name: 'label', description: '標籤文字', type: 'string', default: "'Phone Number'" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'GenderRadio') {
    return [
      { name: 'modelValue', description: '選中值', type: "'male' | 'female' | 'other'", default: "undefined" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'BDataTable') {
    return [
      { name: 'headers', description: '表頭配置', type: 'TableHeader[]', default: '[]' },
      { name: 'items', description: '資料項目', type: 'any[]', default: '[]' },
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      { name: 'search', description: '搜尋關鍵字', type: 'string', default: "''" },
      { name: 'itemsLength', description: '總資料數', type: 'number', default: '0' },
      ...commonProps
    ]
  }

  if (name === 'SmartCard') {
    return [
      { name: 'title', description: '卡片標題', type: 'string', default: "''" },
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'IBreadcrumbs') {
    return [
      { name: 'items', description: '麵包屑項目', type: 'BreadcrumbItem[]', default: '[]' },
      { name: 'divider', description: '分隔符', type: 'string', default: "'/'" },
      ...commonProps
    ]
  }

  if (name === 'ITabs') {
    return [
      { name: 'modelValue', description: '當前選中的標籤', type: 'string | number', default: "undefined" },
      { name: 'items', description: '標籤項目', type: 'TabItem[]', default: '[]' },
      { name: 'color', description: '顏色', type: 'string', default: "'primary'" },
      ...commonProps
    ]
  }

  if (name === 'IDivider') {
    return [
      { name: 'vertical', description: '是否垂直', type: 'boolean', default: 'false' },
      { name: 'thickness', description: '粗細', type: 'number | string', default: '1' },
      { name: 'color', description: '顏色', type: 'string', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'IStack') {
    return [
      { name: 'direction', description: '方向', type: "'row' | 'column'", default: "'column'" },
      { name: 'gap', description: '間距', type: 'string | number', default: "'4'" },
      { name: 'align', description: '對齊方式', type: "'start' | 'center' | 'end'", default: "'start'" },
      ...commonProps
    ]
  }

  if (name === 'ISheet') {
    return [
      { name: 'color', description: '背景顏色', type: 'string', default: "'white'" },
      { name: 'elevation', description: '陰影層級', type: 'number', default: '0' },
      { name: 'rounded', description: '圓角', type: 'boolean | string', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'IChipGroup') {
    return [
      { name: 'modelValue', description: '選中的值', type: 'any | any[]', default: "undefined" },
      { name: 'multiple', description: '是否多選', type: 'boolean', default: 'false' },
      { name: 'column', description: '垂直排列', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'IDataTable') {
    return [
      { name: 'headers', description: '表頭配置', type: 'DataTableHeader[]', default: '[]' },
      { name: 'items', description: '資料項目', type: 'any[]', default: '[]' },
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      { name: 'itemsPerPage', description: '每頁項目數', type: 'number', default: '10' },
      { name: 'sortBy', description: '排序欄位', type: 'string', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'ICodeBlock') {
    return [
      { name: 'code', description: '程式碼內容', type: 'string', default: "''" },
      { name: 'language', description: '語言', type: 'string', default: "'javascript'" },
      { name: 'showLineNumbers', description: '顯示行號', type: 'boolean', default: 'true' },
      ...commonProps
    ]
  }

  if (name === 'IApp') {
    return [
      { name: 'theme', description: '主題', type: "'light' | 'dark'", default: "'light'" },
      ...commonProps
    ]
  }

  if (name === 'CitySelect') {
    return [
      { name: 'modelValue', description: '選中的城市', type: 'string', default: "undefined" },
      { name: 'country', description: '國家代碼', type: 'string', default: "undefined" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'CountrySelect') {
    return [
      { name: 'modelValue', description: '選中的國家', type: 'string', default: "undefined" },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'OptionSelect') {
    return [
      { name: 'modelValue', description: '選中的選項', type: 'any', default: "undefined" },
      { name: 'options', description: '選項列表', type: 'any[]', default: '[]' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'DateRangePicker') {
    return [
      { name: 'modelValue', description: '日期範圍', type: '{ start: Date | null, end: Date | null }', default: '{ start: null, end: null }' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'minDate', description: '最小日期', type: 'Date', default: "undefined" },
      { name: 'maxDate', description: '最大日期', type: 'Date', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'SmartTable') {
    return [
      { name: 'title', description: '表格標題', type: 'string', default: "''" },
      { name: 'columns', description: '欄位配置', type: 'TableColumn[]', default: '[]' },
      { name: 'data', description: '資料', type: 'any[]', default: '[]' },
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'SmartComplexWidget') {
    return [
      { name: 'title', description: '標題', type: 'string', default: "''" },
      { name: 'data', description: '資料', type: 'any', default: "undefined" },
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'GlobalLoading') {
    return [
      { name: 'show', description: '是否顯示', type: 'boolean', default: 'false' },
      { name: 'message', description: '載入訊息', type: 'string', default: "'Loading...'" },
      ...commonProps
    ]
  }

  if (name === 'GlobalModal') {
    return [
      { name: 'show', description: '是否顯示', type: 'boolean', default: 'false' },
      { name: 'title', description: '標題', type: 'string', default: "undefined" },
      { name: 'persistent', description: '持久化', type: 'boolean', default: 'false' },
      ...commonProps
    ]
  }

  if (name === 'GlobalSnackbar') {
    return [
      { name: 'show', description: '是否顯示', type: 'boolean', default: 'false' },
      { name: 'message', description: '訊息', type: 'string', default: "''" },
      { name: 'type', description: '類型', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'" },
      ...commonProps
    ]
  }

  if (name === 'ApiLoadingButton') {
    return [
      { name: 'loading', description: '是否載入中', type: 'boolean', default: 'false' },
      { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
      { name: 'apiCall', description: 'API 呼叫函數', type: 'Function', default: "undefined" },
      ...commonProps
    ]
  }

  if (name === 'PolicyForm') {
    return [
      { name: 'modelValue', description: '同意狀態', type: 'boolean', default: 'false' },
      { name: 'policyText', description: '政策文字', type: 'string', default: "''" },
      { name: 'required', description: '是否必填', type: 'boolean', default: 'true' },
      ...commonProps
    ]
  }

  return commonProps
}

export const getPlaygroundConfig = (name: string) => {
  if (name === 'IButton') {
    return [
      { name: 'text', type: 'slot', label: '按鈕文字', default: '按鈕' },
      { name: 'variant', type: 'select', label: '樣式 (Variant)', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'text', 'outlined', 'plain', 'tonal'], default: 'primary' },
      { name: 'size', type: 'select', label: '尺寸 (Size)', options: ['x-small', 'small', 'medium', 'large', 'x-large'], default: 'medium' },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: '' },
      { name: 'block', type: 'boolean', label: '全寬 (Block)', default: false },
      { name: 'loading', type: 'boolean', label: '載入中 (Loading)', default: false },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'prependIcon', type: 'text', label: '前置圖示', default: '' },
      { name: 'appendIcon', type: 'text', label: '後置圖示', default: '' },
      { name: 'rounded', type: 'select', label: '圓角 (Rounded)', options: ['', '0', 'sm', 'md', 'lg', 'xl', 'pill', 'circle'], default: '' }
    ]
  }
  
  if (name === 'ICheckbox') {
    return [
      { name: 'label', type: 'text', label: '標籤文字', default: '核取方塊標籤' },
      { name: 'modelValue', type: 'boolean', label: '選取狀態', default: true },
      { name: 'indeterminate', type: 'boolean', label: '半選狀態 (Indeterminate)', default: false },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' },
      { name: 'density', type: 'select', label: '密度 (Density)', options: ['default', 'comfortable', 'compact'], default: 'compact' },
      { name: 'errorMessages', type: 'text', label: '錯誤訊息', default: '' }
    ]
  }

  if (name === 'ITextField') {
    return [
      { name: 'label', type: 'text', label: '標籤 (Label)', default: '電子郵件' },
      { name: 'placeholder', type: 'text', label: '佔位符 (Placeholder)', default: '請輸入您的電子郵件' },
      { name: 'modelValue', type: 'text', label: '數值 (Value)', default: '' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'readonly', type: 'boolean', label: '唯讀 (Readonly)', default: false },
      { name: 'clearable', type: 'boolean', label: '可清除 (Clearable)', default: true },
      { name: 'prependIcon', type: 'text', label: '前置圖示', default: 'mdi-email' },
      { name: 'appendIcon', type: 'text', label: '後置圖示', default: '' },
      { name: 'errorMessages', type: 'text', label: '錯誤訊息', default: '' },
      { name: 'density', type: 'select', label: '密度 (Density)', options: ['default', 'comfortable', 'compact'], default: 'compact' }
    ]
  }

  if (name === 'IRadio') {
    return [
      { name: 'label', type: 'text', label: '標籤文字', default: '選項' },
      { name: 'modelValue', type: 'text', label: '綁定值 (Group Value)', default: 'option1' },
      { name: 'value', type: 'text', label: '選項值 (Value)', default: 'option1' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' },
      { name: 'density', type: 'select', label: '密度 (Density)', options: ['default', 'comfortable', 'compact'], default: 'compact' }
    ]
  }

  if (name === 'ISwitch') {
    return [
      { name: 'label', type: 'text', label: '標籤文字', default: '啟用功能' },
      { name: 'modelValue', type: 'boolean', label: '開關狀態', default: true },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'loading', type: 'boolean', label: '載入中 (Loading)', default: false },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' },
      { name: 'inset', type: 'boolean', label: '內嵌樣式 (Inset)', default: false }
    ]
  }

  if (name === 'IInput') {
    return [
      { name: 'placeholder', type: 'text', label: '佔位符 (Placeholder)', default: '請輸入文字...' },
      { name: 'modelValue', type: 'text', label: '數值 (Value)', default: '' },
      { name: 'type', type: 'select', label: '類型 (Type)', options: ['text', 'password', 'email', 'number', 'tel', 'url'], default: 'text' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'readonly', type: 'boolean', label: '唯讀 (Readonly)', default: false },
      { name: 'clearable', type: 'boolean', label: '可清除 (Clearable)', default: true },
      { name: 'prependIcon', type: 'text', label: '前置圖示', default: '' },
      { name: 'appendIcon', type: 'text', label: '後置圖示', default: '' },
      { name: 'errorMessage', type: 'text', label: '錯誤訊息', default: '' }
    ]
  }

  if (name === 'ISelect') {
    return [
      { name: 'label', type: 'text', label: '標籤 (Label)', default: '選擇選項' },
      { name: 'placeholder', type: 'text', label: '佔位符 (Placeholder)', default: '請選擇' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'clearable', type: 'boolean', label: '可清除 (Clearable)', default: true },
      { name: 'multiple', type: 'boolean', label: '多選 (Multiple)', default: false },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' },
      { name: 'density', type: 'select', label: '密度 (Density)', options: ['default', 'comfortable', 'compact'], default: 'compact' }
    ]
  }

  if (name === 'ITextarea') {
    return [
      { name: 'label', type: 'text', label: '標籤 (Label)', default: '描述' },
      { name: 'placeholder', type: 'text', label: '佔位符 (Placeholder)', default: '請輸入描述...' },
      { name: 'modelValue', type: 'text', label: '數值 (Value)', default: '' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'readonly', type: 'boolean', label: '唯讀 (Readonly)', default: false },
      { name: 'rows', type: 'select', label: '行數 (Rows)', options: ['3', '5', '8', '10'], default: '3' },
      { name: 'autoGrow', type: 'boolean', label: '自動高度 (Auto Grow)', default: false },
      { name: 'counter', type: 'boolean', label: '字數統計 (Counter)', default: false },
      { name: 'maxlength', type: 'text', label: '最大長度 (Max Length)', default: '' },
      { name: 'density', type: 'select', label: '密度 (Density)', options: ['default', 'comfortable', 'compact'], default: 'compact' }
    ]
  }

  if (name === 'IDatePicker') {
    return [
      { name: 'label', type: 'text', label: '標籤 (Label)', default: '選擇日期' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'clearable', type: 'boolean', label: '可清除 (Clearable)', default: true },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' },
      { name: 'density', type: 'select', label: '密度 (Density)', options: ['default', 'comfortable', 'compact'], default: 'compact' }
    ]
  }

  // Batch 2: Display & Feedback
  if (name === 'IAlert') {
    return [
      { name: 'title', type: 'text', label: '標題 (Title)', default: '警告標題' },
      { name: 'text', type: 'text', label: '內容 (Text)', default: '這是一則警告訊息。' },
      { name: 'type', type: 'select', label: '類型 (Type)', options: ['info', 'success', 'warning', 'error'], default: 'info' },
      { name: 'variant', type: 'select', label: '樣式 (Variant)', options: ['tonal', 'outlined', 'flat'], default: 'tonal' },
      { name: 'icon', type: 'text', label: '圖示 (Icon)', default: '' }
    ]
  }

  if (name === 'ICard') {
    return [
      { name: 'title', type: 'text', label: '標題 (Title)', default: '卡片標題' },
      { name: 'subtitle', type: 'text', label: '副標題 (Subtitle)', default: '卡片副標題' },
      { name: 'variant', type: 'select', label: '樣式 (Variant)', options: ['elevated', 'flat', 'outlined'], default: 'elevated' },
      { name: 'elevation', type: 'select', label: '陰影 (Elevation)', options: ['0', '1', '2', '4', '8'], default: '1' }
    ]
  }

  if (name === 'IModal') {
    return [
      { name: 'title', type: 'text', label: '標題 (Title)', default: '對話框標題' },
      { name: 'modelValue', type: 'boolean', label: '顯示 (Show)', default: true },
      { name: 'persistent', type: 'boolean', label: '持久化 (Persistent)', default: false },
      { name: 'width', type: 'select', label: '寬度 (Width)', options: ['400', '600', '800', '1000'], default: '600' }
    ]
  }

  if (name === 'ISnackbar') {
    return [
      { name: 'text', type: 'text', label: '訊息 (Message)', default: '操作成功' },
      { name: 'modelValue', type: 'boolean', label: '顯示 (Show)', default: true },
      { name: 'color', type: 'select', label: '顏色 (Color)', options: ['success', 'error', 'warning', 'info'], default: 'success' },
      { name: 'timeout', type: 'select', label: '時長 (Timeout)', options: ['2000', '3000', '5000', '-1'], default: '3000' }
    ]
  }

  if (name === 'ILoadingSpinner') {
    return [
      { name: 'size', type: 'select', label: '尺寸 (Size)', options: ['small', 'medium', 'large'], default: 'medium' },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' }
    ]
  }

  // Batch 3: Navigation & Layout
  if (name === 'IBreadcrumbs') {
    return [
      { name: 'divider', type: 'text', label: '分隔符 (Divider)', default: '/' }
    ]
  }

  if (name === 'ITabs') {
    return [
      { name: 'modelValue', type: 'text', label: '當前標籤 (Active Tab)', default: 'tab1' },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' }
    ]
  }

  if (name === 'IDivider') {
    return [
      { name: 'vertical', type: 'boolean', label: '垂直 (Vertical)', default: false },
      { name: 'thickness', type: 'select', label: '粗細 (Thickness)', options: ['1', '2', '4'], default: '1' }
    ]
  }

  // Batch 4: Data Display
  if (name === 'IChip') {
    return [
      { name: 'label', type: 'text', label: '文字 (Text)', default: '標籤' },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: '#3498db' },
      { name: 'variant', type: 'select', label: '樣式 (Variant)', options: ['filled', 'outlined'], default: 'filled' },
      { name: 'size', type: 'select', label: '尺寸 (Size)', options: ['small', 'medium', 'large'], default: 'medium' },
      { name: 'closable', type: 'boolean', label: '可關閉 (Closable)', default: false }
    ]
  }

  if (name === 'IAvatar') {
    return [
      { name: 'size', type: 'select', label: '尺寸 (Size)', options: ['32', '40', '48', '64', '80'], default: '40' },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: '#e0e0e0' },
      { name: 'icon', type: 'text', label: '圖示 (Icon)', default: '👤' },
      { name: 'rounded', type: 'boolean', label: '圓形 (Rounded)', default: true }
    ]
  }

  if (name === 'IIcon') {
    return [
      { name: 'icon', type: 'text', label: '圖示名稱 (Icon)', default: 'mdi-heart' },
      { name: 'size', type: 'select', label: '尺寸 (Size)', options: ['x-small', 'small', 'default', 'large', 'x-large'], default: 'default' },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: '' }
    ]
  }

  // Batch 5: Specialized
  if (name === 'ILoadingButton') {
    return [
      { name: 'text', type: 'slot', label: '按鈕文字', default: '提交' },
      { name: 'loading', type: 'boolean', label: '載入中 (Loading)', default: true },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false },
      { name: 'color', type: 'text', label: '顏色 (Color)', default: 'primary' }
    ]
  }

  // Batch 6: Business Form Inputs
  if (name === 'EmailInput') {
    return [
      { name: 'label', type: 'text', label: '標籤 (Label)', default: '電子郵件地址' },
      { name: 'modelValue', type: 'text', label: '數值 (Value)', default: '' },
      { name: 'required', type: 'boolean', label: '必填 (Required)', default: false },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false }
    ]
  }

  if (name === 'PasswordInput') {
    return [
      { name: 'label', type: 'text', label: '標籤 (Label)', default: '密碼' },
      { name: 'modelValue', type: 'text', label: '數值 (Value)', default: '' },
      { name: 'showStrength', type: 'boolean', label: '顯示強度 (Show Strength)', default: true },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false }
    ]
  }

  if (name === 'PhoneInput') {
    return [
      { name: 'label', type: 'text', label: '標籤 (Label)', default: '電話號碼' },
      { name: 'modelValue', type: 'text', label: '數值 (Value)', default: '' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false }
    ]
  }

  if (name === 'GenderRadio') {
    return [
      { name: 'modelValue', type: 'select', label: '選中值 (Value)', options: ['male', 'female', 'other'], default: 'male' },
      { name: 'disabled', type: 'boolean', label: '禁用 (Disabled)', default: false }
    ]
  }

  // Batch 7: Business Complex Widgets
  if (name === 'BDataTable') {
    return [
      { name: 'loading', type: 'boolean', label: '載入中 (Loading)', default: false },
      { name: 'search', type: 'text', label: '搜尋 (Search)', default: '' }
    ]
  }

  if (name === 'SmartCard') {
    return [
      { name: 'title', type: 'text', label: '標題 (Title)', default: '智慧卡片' },
      { name: 'loading', type: 'boolean', label: '載入中 (Loading)', default: false }
    ]
  }

  return []
}
