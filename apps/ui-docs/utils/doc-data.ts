import type { ComponentApiDoc } from './doc-types'

export const componentDocs: Record<string, ComponentApiDoc> = {
  'IAlert': {
    name: 'IAlert',
    description: 'IAlert',
    importPath: "import { IAlert } from 'softleader-nuxt-core'",
    summary: '向用戶顯示簡短且重要的通知訊息，支援多種語意狀態。',
    props: [
      {
            "name": "title",
            "type": "string",
            "desc": "標題文字",
            "default": "''"
      },
      {
            "name": "text",
            "type": "string",
            "desc": "顯示的主要文字內容",
            "default": "''"
      },
      {
            "name": "type",
            "type": "'info' | 'success' | 'warning' | 'error'",
            "desc": "語意類型：決定元件的視覺色彩 (info / success / warning / error)",
            "default": "'info'"
      },
      {
            "name": "variant",
            "type": "'tonal' | 'outlined' | 'flat'",
            "desc": "元件的視覺變體 (如 filled, outlined, tonal, flat)",
            "default": "'tonal'"
      },
      {
            "name": "icon",
            "type": "string",
            "desc": "圖示名稱 (如: mdi-home)",
            "default": "''"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IAlert\n  v-bind="props"\n/>`
  },
  'IApp': {
    name: 'IApp',
    description: '應用程式根容器',
    importPath: "import { IApp } from 'softleader-nuxt-core'",
    summary: '應用程式根容器，提供全局的佈局與主題注入。',
    props: [],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IApp\n  v-bind="props"\n/>`
  },
  'IAvatar': {
    name: 'IAvatar',
    description: 'IAvatar',
    importPath: "import { IAvatar } from 'softleader-nuxt-core'",
    summary: '顯示用戶頭像或項目縮圖的圓形容器元件。',
    props: [
      {
            "name": "size",
            "type": "number | string",
            "desc": "元件的尺寸 (small, medium, large)",
            "default": "40"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "元件的主題顏色",
            "default": "'#e0e0e0'"
      },
      {
            "name": "rounded",
            "type": "boolean | string",
            "desc": "圓角程度設定",
            "default": "true"
      },
      {
            "name": "icon",
            "type": "string",
            "desc": "圖示名稱 (如: mdi-home)",
            "default": "''"
      },
      {
            "name": "image",
            "type": "string",
            "desc": "",
            "default": "''"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IAvatar\n  v-bind="props"\n/>`
  },
  'IBreadcrumbs': {
    name: 'IBreadcrumbs',
    description: 'IBreadcrumbs 元件',
    importPath: "import { IBreadcrumbs } from 'softleader-nuxt-core'",
    summary: '顯示當前頁面在站點層級結構中的位置導航路徑。',
    props: [
      {
            "name": "items",
            "type": "BreadcrumbItem[]",
            "desc": "數據陣列",
            "default": ""
      },
      {
            "name": "separator",
            "type": "string",
            "desc": "",
            "default": "'/'"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<IBreadcrumbs\n  v-bind="props"\n/>`
  },
  'IButton': {
    name: 'IButton',
    description: 'IButton 元件',
    importPath: "import { IButton } from 'softleader-nuxt-core'",
    summary: '觸發動作的可點擊元件，支援多種視覺變體、載入動畫與圖示。',
    props: [
      {
            "name": "variant",
            "type": "",
            "desc": "按鈕樣式變體",
            "default": "'primary'"
      },
      {
            "name": "size",
            "type": "'x-small' | 'small' | 'medium' | 'large' | 'x-large'",
            "desc": "尺寸",
            "default": "'medium'"
      },
      {
            "name": "block",
            "type": "boolean",
            "desc": "是否為區塊按鈕 (全寬)",
            "default": "false"
      },
      {
            "name": "loading",
            "type": "boolean",
            "desc": "是否處於載入狀態",
            "default": "false"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用",
            "default": "false"
      },
      {
            "name": "href",
            "type": "string",
            "desc": "連結目標 URL (若存在則渲染為 <a>)",
            "default": "undefined"
      },
      {
            "name": "target",
            "type": "string",
            "desc": "連結開啟目標 (_blank, _self, etc.)",
            "default": "undefined"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "若未指定，將根據 variant 自動決定",
            "default": "undefined"
      },
      {
            "name": "prependIcon",
            "type": "string",
            "desc": "前置圖示名稱 (支援 mdi, fa, svg-softleader)",
            "default": "undefined"
      },
      {
            "name": "appendIcon",
            "type": "string",
            "desc": "後置圖示名稱",
            "default": "undefined"
      },
      {
            "name": "rounded",
            "type": "string | number | boolean",
            "desc": "Primary 按鈕通常使用圓角較大的風格",
            "default": "undefined"
      },
      {
            "name": "elevation",
            "type": "string | number",
            "desc": "陰影設定",
            "default": "undefined"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "prepend",
            "desc": "具名插槽: prepend"
      },
      {
            "name": "append",
            "desc": "具名插槽: append"
      },
      {
            "name": "loader",
            "desc": "具名插槽: loader"
      }
],
    codeExample: `<IButton\n  v-bind="props"\n/>`
  },
  'ICard': {
    name: 'ICard',
    description: 'ICard',
    importPath: "import { ICard } from 'softleader-nuxt-core'",
    summary: '彈性內容容器，適合組織與展示卡片式視覺資訊。',
    props: [
      {
            "name": "title",
            "type": "string",
            "desc": "標題文字",
            "default": "''"
      },
      {
            "name": "subtitle",
            "type": "string",
            "desc": "副標題文字",
            "default": "''"
      },
      {
            "name": "elevation",
            "type": "number",
            "desc": "陰影高度層次，數值越大陰影越深",
            "default": "1"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "元件的主題顏色",
            "default": "'white'"
      },
      {
            "name": "variant",
            "type": "'elevated' | 'flat' | 'outlined'",
            "desc": "元件的視覺變體 (如 filled, outlined, tonal, flat)",
            "default": "'elevated'"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "header",
            "desc": "具名插槽: header"
      },
      {
            "name": "actions",
            "desc": "具名插槽: actions"
      }
],
    codeExample: `<ICard\n  v-bind="props"\n/>`
  },
  'ICheckbox': {
    name: 'ICheckbox',
    description: 'ICheckbox 元件',
    importPath: "import { ICheckbox } from 'softleader-nuxt-core'",
    summary: '允許用戶從一組選項中選取一個或多個項目。',
    props: [
      {
            "name": "modelValue",
            "type": "boolean | any[]",
            "desc": "綁定值 (支援 Boolean 或 Array)",
            "default": "undefined"
      },
      {
            "name": "value",
            "type": "any",
            "desc": "多選模式下的選項值",
            "default": "undefined"
      },
      {
            "name": "label",
            "type": "string",
            "desc": "標籤文字",
            "default": "undefined"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用",
            "default": "false"
      },
      {
            "name": "indeterminate",
            "type": "boolean",
            "desc": "是否為半選狀態 (Indeterminate)",
            "default": "false"
      },
      {
            "name": "errorMessages",
            "type": "string | string[]",
            "desc": "錯誤訊息 (若有值則顯示錯誤狀態)",
            "default": "undefined"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "顏色主題",
            "default": "'primary'"
      },
      {
            "name": "hideDetails",
            "type": "boolean | 'auto'",
            "desc": "是否隱藏詳細訊息 (如錯誤訊息/提示)",
            "default": "false"
      },
      {
            "name": "density",
            "type": "'default' | 'comfortable' | 'compact'",
            "desc": "排列密度",
            "default": "'compact'"
      },
      {
            "name": "readonly",
            "type": "boolean",
            "desc": "是否為唯讀",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "label",
            "desc": "具名插槽: label"
      }
],
    codeExample: `<ICheckbox\n  v-bind="props"\n/>`
  },
  'IChip': {
    name: 'IChip',
    description: 'IChip',
    importPath: "import { IChip } from 'softleader-nuxt-core'",
    summary: '代表一個標籤或屬性，通常包含簡短文字與可選的關閉按鈕。',
    props: [
      {
            "name": "label",
            "type": "string",
            "desc": "顯示在元件上的文字標籤",
            "default": "''"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "元件的主題顏色",
            "default": "'#3498db'"
      },
      {
            "name": "size",
            "type": "'small' | 'medium' | 'large'",
            "desc": "元件的尺寸 (small, medium, large)",
            "default": "'medium'"
      },
      {
            "name": "variant",
            "type": "'filled' | 'outlined'",
            "desc": "元件的視覺變體 (如 filled, outlined, tonal, flat)",
            "default": "'filled'"
      },
      {
            "name": "closable",
            "type": "boolean",
            "desc": "是否顯示關閉按鈕",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IChip\n  v-bind="props"\n/>`
  },
  'IChipGroup': {
    name: 'IChipGroup',
    description: 'IChipGroup',
    importPath: "import { IChipGroup } from 'softleader-nuxt-core'",
    summary: '管理一組 IChip 選取狀態的容器，支援多選與單選。',
    props: [
      {
            "name": "gap",
            "type": "string | number",
            "desc": "",
            "default": "'0.5rem'"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IChipGroup\n  v-bind="props"\n/>`
  },
  'ICodeBlock': {
    name: 'ICodeBlock',
    description: 'ICodeBlock 元件',
    importPath: "import { ICodeBlock } from 'softleader-nuxt-core'",
    summary: '顯示語法高亮程式碼片段的展示元件。',
    props: [
      {
            "name": "code",
            "type": "string",
            "desc": "",
            "default": ""
      },
      {
            "name": "language",
            "type": "string",
            "desc": "",
            "default": "'text'"
      },
      {
            "name": "label",
            "type": "string",
            "desc": "顯示在元件上的文字標籤",
            "default": "''"
      },
      {
            "name": "filename",
            "type": "string",
            "desc": "",
            "default": "''"
      },
      {
            "name": "showWindowControls",
            "type": "boolean",
            "desc": "",
            "default": "true"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<ICodeBlock\n  v-bind="props"\n/>`
  },
  'IDataTable': {
    name: 'IDataTable',
    description: 'IDataTable 元件',
    importPath: "import { IDataTable } from 'softleader-nuxt-core'",
    summary: '展示與操作大量結構化數據，支援分頁、排序與自定義欄位。',
    props: [
      {
            "name": "columns",
            "type": "Column[]",
            "desc": "表格欄位定義陣列",
            "default": ""
      },
      {
            "name": "items",
            "type": "any[]",
            "desc": "數據陣列",
            "default": ""
      },
      {
            "name": "loading",
            "type": "boolean",
            "desc": "是否顯示載入中狀態",
            "default": "false"
      },
      {
            "name": "hover",
            "type": "boolean",
            "desc": "",
            "default": "true"
      },
      {
            "name": "serverSide",
            "type": "boolean",
            "desc": "",
            "default": "false"
      },
      {
            "name": "itemsLength",
            "type": "number",
            "desc": "",
            "default": "0"
      },
      {
            "name": "itemsPerPage",
            "type": "number",
            "desc": "",
            "default": "10"
      },
      {
            "name": "page",
            "type": "number",
            "desc": "",
            "default": "1"
      },
      {
            "name": "sortBy",
            "type": "any[]",
            "desc": "",
            "default": "() => []"
      },
      {
            "name": "density",
            "type": "string",
            "desc": "元件的密度樣式 (compact / comfortable / default)",
            "default": "'default'"
      },
      {
            "name": "showSelect",
            "type": "boolean",
            "desc": "",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IDataTable\n  v-bind="props"\n/>`
  },
  'IDatePicker': {
    name: 'IDatePicker',
    description: '統一的 DatePicker 介面，內部可替換 UI 框架',
    importPath: "import { IDatePicker } from 'softleader-nuxt-core'",
    summary: '用於選擇日期或日期範圍的日期選取器。',
    props: [
      {
            "name": "modelValue",
            "type": "string | Date | null",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "type",
            "type": "'date' | 'datetime' | 'time' | 'month' | 'year'",
            "desc": "元件的 HTML 類型屬性 (text / password / number / email 等)",
            "default": "'date'"
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "輸入框的提示佔位文字",
            "default": "'請選擇日期'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "clearable",
            "type": "boolean",
            "desc": "是否顯示清除按鈕",
            "default": "true"
      },
      {
            "name": "format",
            "type": "string // 顯示格式",
            "desc": "",
            "default": ""
      },
      {
            "name": "minDate",
            "type": "string | Date",
            "desc": "",
            "default": ""
      },
      {
            "name": "maxDate",
            "type": "string | Date",
            "desc": "",
            "default": ""
      },
      {
            "name": "error",
            "type": "boolean",
            "desc": "驗證相關",
            "default": "false"
      },
      {
            "name": "errorMessage",
            "type": "string",
            "desc": "輸入驗證失敗時顯示的錯誤訊息",
            "default": ""
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<IDatePicker\n  v-bind="props"\n/>`
  },
  'IDivider': {
    name: 'IDivider',
    description: 'IDivider',
    importPath: "import { IDivider } from 'softleader-nuxt-core'",
    summary: '水平或垂直分隔線，用於區隔頁面內容的視覺元素。',
    props: [
      {
            "name": "color",
            "type": "string",
            "desc": "元件的主題顏色",
            "default": "'#e0e0e0'"
      },
      {
            "name": "thickness",
            "type": "number",
            "desc": "",
            "default": "1"
      },
      {
            "name": "vertical",
            "type": "boolean",
            "desc": "",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<IDivider\n  v-bind="props"\n/>`
  },
  'IIcon': {
    name: 'IIcon',
    description: 'IIcon',
    importPath: "import { IIcon } from 'softleader-nuxt-core'",
    summary: '基於 Material Design Icons 的圖示元件，支援尺寸與顏色控制。',
    props: [
      {
            "name": "icon",
            "type": "string | Component",
            "desc": "圖示名稱 (MDI 字串如 'mdi-home') 或 SVG Path 字串 或 Vue Component",
            "default": "undefined"
      },
      {
            "name": "size",
            "type": "'x-small' | 'small' | 'default' | 'large' | 'x-large' | number | string",
            "desc": "string: 支援 css 單位 (rem, em, px) 或預設關鍵字 (x-small, small, default, large, x-large)",
            "default": "'default'"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "圖示顏色 (CSS color string)",
            "default": "undefined"
      },
      {
            "name": "variant",
            "type": "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
            "desc": "(Optional) 變體樣式類別",
            "default": "undefined"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IIcon\n  v-bind="props"\n/>`
  },
  'IInput': {
    name: 'IInput',
    description: 'IInput 元件',
    importPath: "import { IInput } from 'softleader-nuxt-core'",
    summary: '基礎文本輸入元件，支援校驗狀態、清除按鈕與圖示配置。',
    props: [
      {
            "name": "modelValue",
            "type": "string | number",
            "desc": "綁定的值 (v-model)",
            "default": "undefined"
      },
      {
            "name": "type",
            "type": "string",
            "desc": "輸入框類型 (text, password, number...)",
            "default": "'text'"
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "提示文字 (灰字)",
            "default": "undefined"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否鎖定 (不可點、變灰)",
            "default": "false"
      },
      {
            "name": "readonly",
            "type": "boolean",
            "desc": "是否唯讀 (可點、但不給改)",
            "default": "false"
      },
      {
            "name": "error",
            "type": "boolean",
            "desc": "是否顯示錯誤狀態 (變紅)",
            "default": "false"
      },
      {
            "name": "errorMessage",
            "type": "string",
            "desc": "錯誤訊息文字 (會顯示在下方)",
            "default": "undefined"
      },
      {
            "name": "clearable",
            "type": "boolean",
            "desc": "是否顯示清除按鈕 (X)",
            "default": "false"
      },
      {
            "name": "maxlength",
            "type": "number",
            "desc": "最大長度限制",
            "default": "undefined"
      },
      {
            "name": "autocomplete",
            "type": "string",
            "desc": "瀏覽器自動完成建議",
            "default": "'off'"
      },
      {
            "name": "prependIcon",
            "type": "string",
            "desc": "前綴圖示 (左邊的 icon)",
            "default": "undefined"
      },
      {
            "name": "appendIcon",
            "type": "string",
            "desc": "後綴圖示 (右邊的 icon)",
            "default": "undefined"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IInput\n  v-bind="props"\n/>`
  },
  'ILoadingButton': {
    name: 'ILoadingButton',
    description: '專門用於顯示 Loading 狀態的按鈕介面，',
    importPath: "import { ILoadingButton } from 'softleader-nuxt-core'",
    summary: '內建載入狀態的按鈕，點擊後自動切換為 Loading 模式。',
    props: [
      {
            "name": "variant",
            "type": "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'text'",
            "desc": "元件的視覺變體 (如 filled, outlined, tonal, flat)",
            "default": ""
      },
      {
            "name": "size",
            "type": "'small' | 'medium' | 'large'",
            "desc": "元件的尺寸 (small, medium, large)",
            "default": ""
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": ""
      },
      {
            "name": "loading",
            "type": "boolean",
            "desc": "是否顯示載入中狀態",
            "default": ""
      },
      {
            "name": "block",
            "type": "boolean",
            "desc": "是否為全寬區塊按鈕",
            "default": ""
      },
      {
            "name": "icon",
            "type": "string",
            "desc": "圖示名稱 (如: mdi-home)",
            "default": ""
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<ILoadingButton\n  v-bind="props"\n/>`
  },
  'ILoadingSpinner': {
    name: 'ILoadingSpinner',
    description: '純粹的 Loading 動畫元件',
    importPath: "import { ILoadingSpinner } from 'softleader-nuxt-core'",
    summary: '全屏或局部的載入旋轉動畫，用於非同步等待場景。',
    props: [
      {
            "name": "size",
            "type": "number | string",
            "desc": "元件的尺寸 (small, medium, large)",
            "default": "60"
      },
      {
            "name": "color1",
            "type": "string",
            "desc": "",
            "default": "'#3498db', // 主要藍色"
      },
      {
            "name": "color2",
            "type": "string",
            "desc": "",
            "default": "'#2ecc71' // 次要綠色"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<ILoadingSpinner\n  v-bind="props"\n/>`
  },
  'IModal': {
    name: 'IModal',
    description: '統一的 Modal 介面',
    importPath: "import { IModal } from 'softleader-nuxt-core'",
    summary: '全屏蓋板式對話視窗，用於重要確認或輕量級表單收集。',
    props: [
      {
            "name": "modelValue",
            "type": "boolean",
            "desc": "是否顯示彈窗",
            "default": ""
      },
      {
            "name": "title",
            "type": "string",
            "desc": "彈窗標題",
            "default": "''"
      },
      {
            "name": "content",
            "type": "string",
            "desc": "彈窗內容文字",
            "default": "''"
      },
      {
            "name": "confirmText",
            "type": "string",
            "desc": "確認按鈕文字",
            "default": "'確認'"
      },
      {
            "name": "cancelText",
            "type": "string",
            "desc": "取消按鈕文字",
            "default": "'取消'"
      },
      {
            "name": "showCancel",
            "type": "boolean",
            "desc": "是否顯示取消按鈕",
            "default": "true"
      },
      {
            "name": "closeOnMask",
            "type": "boolean",
            "desc": "是否允許點擊遮罩關閉",
            "default": "true"
      },
      {
            "name": "persistent",
            "type": "boolean",
            "desc": "若為 true，則忽略 closeOnMask",
            "default": "false"
      },
      {
            "name": "maxWidth",
            "type": "string | number",
            "desc": "最大寬度",
            "default": "500"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IModal\n  v-bind="props"\n/>`
  },
  'IRadio': {
    name: 'IRadio',
    description: 'IRadio 元件',
    importPath: "import { IRadio } from 'softleader-nuxt-core'",
    summary: '允許用戶從一組互斥選項中選取單一項目。',
    props: [
      {
            "name": "modelValue",
            "type": "any",
            "desc": "綁定值 (Radio Group 的當前值)",
            "default": "undefined"
      },
      {
            "name": "value",
            "type": "any",
            "desc": "此選項的值",
            "default": ""
      },
      {
            "name": "label",
            "type": "string",
            "desc": "標籤文字",
            "default": "undefined"
      },
      {
            "name": "name",
            "type": "string",
            "desc": "Radio Group 名稱 (原生 HTML 使用)",
            "default": "undefined"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用",
            "default": "false"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "顏色主題",
            "default": "'primary'"
      },
      {
            "name": "density",
            "type": "'default' | 'comfortable' | 'compact'",
            "desc": "排列密度",
            "default": "'compact'"
      },
      {
            "name": "hideDetails",
            "type": "boolean | 'auto'",
            "desc": "是否隱藏詳細訊息",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "label",
            "desc": "具名插槽: label"
      }
],
    codeExample: `<IRadio\n  v-bind="props"\n/>`
  },
  'ISelect': {
    name: 'ISelect',
    description: 'ISelect 元件',
    importPath: "import { ISelect } from 'softleader-nuxt-core'",
    summary: '提供預定義選項的下拉選單，支援物件格式數據綁定。',
    props: [
      {
            "name": "modelValue",
            "type": "any",
            "desc": "綁定值 (v-model)",
            "default": "undefined"
      },
      {
            "name": "items",
            "type": "SelectOption[]",
            "desc": "選項列表",
            "default": ""
      },
      {
            "name": "label",
            "type": "string",
            "desc": "標籤文字",
            "default": "undefined"
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "佔位符文字",
            "default": "'請選擇'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用",
            "default": "false"
      },
      {
            "name": "clearable",
            "type": "boolean",
            "desc": "是否可清除",
            "default": "false"
      },
      {
            "name": "multiple",
            "type": "boolean",
            "desc": "是否多選",
            "default": "false"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "顏色主題",
            "default": "'primary'"
      },
      {
            "name": "density",
            "type": "'default' | 'comfortable' | 'compact'",
            "desc": "排列密度",
            "default": "'compact'"
      },
      {
            "name": "errorMessages",
            "type": "string | string[]",
            "desc": "錯誤訊息",
            "default": "undefined"
      },
      {
            "name": "hideDetails",
            "type": "boolean | 'auto'",
            "desc": "是否隱藏詳細訊息",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<ISelect\n  v-bind="props"\n/>`
  },
  'ISheet': {
    name: 'ISheet',
    description: 'ISheet',
    importPath: "import { ISheet } from 'softleader-nuxt-core'",
    summary: '基礎的內容展示容器，類似 Card 但更為輕量。',
    props: [
      {
            "name": "color",
            "type": "string",
            "desc": "元件的主題顏色",
            "default": "'white'"
      },
      {
            "name": "rounded",
            "type": "boolean | string",
            "desc": "圓角程度設定",
            "default": "false"
      },
      {
            "name": "elevation",
            "type": "number",
            "desc": "陰影高度層次，數值越大陰影越深",
            "default": "0"
      },
      {
            "name": "border",
            "type": "boolean",
            "desc": "",
            "default": "false"
      },
      {
            "name": "padding",
            "type": "string | number",
            "desc": "",
            "default": "'1rem'"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<ISheet\n  v-bind="props"\n/>`
  },
  'ISnackbar': {
    name: 'ISnackbar',
    description: '統一的 Snackbar/Toast 介面',
    importPath: "import { ISnackbar } from 'softleader-nuxt-core'",
    summary: '顯示在頁面底部的短暫通知訊息，操作後自動消失。',
    props: [
      {
            "name": "modelValue",
            "type": "boolean",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "message",
            "type": "string",
            "desc": "",
            "default": ""
      },
      {
            "name": "color",
            "type": "'success' | 'error' | 'warning' | 'info' | string",
            "desc": "元件的主題顏色",
            "default": "'success'"
      },
      {
            "name": "timeout",
            "type": "number",
            "desc": "",
            "default": "3000"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<ISnackbar\n  v-bind="props"\n/>`
  },
  'IStack': {
    name: 'IStack',
    description: 'IStack',
    importPath: "import { IStack } from 'softleader-nuxt-core'",
    summary: '提供水平或垂直堆疊佈局的 Flex 容器輔助元件。',
    props: [
      {
            "name": "direction",
            "type": "'row' | 'column' | 'row-reverse' | 'column-reverse'",
            "desc": "",
            "default": ""
      },
      {
            "name": "vertical",
            "type": "boolean",
            "desc": "",
            "default": ""
      },
      {
            "name": "horizontal",
            "type": "boolean",
            "desc": "",
            "default": ""
      },
      {
            "name": "gap",
            "type": "string | number",
            "desc": "",
            "default": "'0.5rem'"
      },
      {
            "name": "align",
            "type": "'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'",
            "desc": "",
            "default": "'stretch'"
      },
      {
            "name": "justify",
            "type": "'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'",
            "desc": "",
            "default": "'flex-start'"
      },
      {
            "name": "wrap",
            "type": "'nowrap' | 'wrap' | 'wrap-reverse'",
            "desc": "",
            "default": "'nowrap'"
      },
      {
            "name": "inline",
            "type": "boolean",
            "desc": "",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IStack\n  v-bind="props"\n/>`
  },
  'ISwitch': {
    name: 'ISwitch',
    description: 'ISwitch 元件',
    importPath: "import { ISwitch } from 'softleader-nuxt-core'",
    summary: '在開啟與關閉兩個互斥狀態之間進行切換的開關。',
    props: [
      {
            "name": "modelValue",
            "type": "boolean | any",
            "desc": "綁定值",
            "default": "undefined"
      },
      {
            "name": "trueValue",
            "type": "any",
            "desc": "開啟時的值",
            "default": "true"
      },
      {
            "name": "falseValue",
            "type": "any",
            "desc": "關閉時的值",
            "default": "false"
      },
      {
            "name": "label",
            "type": "string",
            "desc": "標籤文字",
            "default": "undefined"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用",
            "default": "false"
      },
      {
            "name": "loading",
            "type": "boolean",
            "desc": "是否顯示載入中",
            "default": "false"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "顏色主題",
            "default": "'primary'"
      },
      {
            "name": "inset",
            "type": "boolean",
            "desc": "是否內嵌 (inset) 樣式",
            "default": "false"
      },
      {
            "name": "hideDetails",
            "type": "boolean | 'auto'",
            "desc": "是否隱藏詳細訊息",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "label",
            "desc": "具名插槽: label"
      }
],
    codeExample: `<ISwitch\n  v-bind="props"\n/>`
  },
  'ITabs': {
    name: 'ITabs',
    description: 'ITabs',
    importPath: "import { ITabs } from 'softleader-nuxt-core'",
    summary: '在多個相關內容區域之間進行水平切換的頁籤元件。',
    props: [
      {
            "name": "modelValue",
            "type": "string | number",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "options",
            "type": "TabOption[]",
            "desc": "選項列表，格式為 { label, value } 的陣列",
            "default": ""
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<ITabs\n  v-bind="props"\n/>`
  },
  'ITextarea': {
    name: 'ITextarea',
    description: 'ITextarea 元件',
    importPath: "import { ITextarea } from 'softleader-nuxt-core'",
    summary: '用於輸入多行長文本內容，支援自動高度調整。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "綁定值 (v-model)",
            "default": "''"
      },
      {
            "name": "label",
            "type": "string",
            "desc": "標籤文字",
            "default": "undefined"
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "佔位符文字",
            "default": "undefined"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用",
            "default": "false"
      },
      {
            "name": "readonly",
            "type": "boolean",
            "desc": "是否唯讀",
            "default": "false"
      },
      {
            "name": "rows",
            "type": "number",
            "desc": "行數",
            "default": "3"
      },
      {
            "name": "maxlength",
            "type": "number",
            "desc": "最大字數限制",
            "default": "undefined"
      },
      {
            "name": "autoGrow",
            "type": "boolean",
            "desc": "是否自動調整高度",
            "default": "false"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "顏色主題",
            "default": "'primary'"
      },
      {
            "name": "density",
            "type": "'default' | 'comfortable' | 'compact'",
            "desc": "排列密度",
            "default": "'compact'"
      },
      {
            "name": "errorMessages",
            "type": "string | string[]",
            "desc": "錯誤訊息",
            "default": "undefined"
      },
      {
            "name": "counter",
            "type": "boolean | number",
            "desc": "是否顯示字數統計",
            "default": "false"
      },
      {
            "name": "hideDetails",
            "type": "boolean | 'auto'",
            "desc": "是否隱藏詳細訊息",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<ITextarea\n  v-bind="props"\n/>`
  },
  'ITextField': {
    name: 'ITextField',
    description: 'ITextField 元件',
    importPath: "import { ITextField } from 'softleader-nuxt-core'",
    summary: '整合 label 的完整文字輸入框，常用於表單場景。',
    props: [
      {
            "name": "modelValue",
            "type": "string | number | null",
            "desc": "綁定值",
            "default": "''"
      },
      {
            "name": "label",
            "type": "string",
            "desc": "標籤文字",
            "default": "undefined"
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "佔位符文字",
            "default": "undefined"
      },
      {
            "name": "type",
            "type": "string",
            "desc": "輸入類型 (text, password, number, etc.)",
            "default": "'text'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用",
            "default": "false"
      },
      {
            "name": "readonly",
            "type": "boolean",
            "desc": "是否唯讀",
            "default": "false"
      },
      {
            "name": "clearable",
            "type": "boolean",
            "desc": "是否顯示清除按鈕",
            "default": "false"
      },
      {
            "name": "prependIcon",
            "type": "string",
            "desc": "前置圖示 (內部)",
            "default": "undefined"
      },
      {
            "name": "appendIcon",
            "type": "string",
            "desc": "後置圖示 (內部)",
            "default": "undefined"
      },
      {
            "name": "errorMessages",
            "type": "string | string[]",
            "desc": "錯誤訊息",
            "default": "undefined"
      },
      {
            "name": "density",
            "type": "'default' | 'comfortable' | 'compact'",
            "desc": "排列密度",
            "default": "'compact'"
      },
      {
            "name": "variant",
            "type": "'filled' | 'outlined' | 'plain' | 'underlined' | 'solo'",
            "desc": "樣式變體",
            "default": "'outlined'"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "自定義與輸入框互動的顏色",
            "default": "'primary'"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<ITextField\n  v-bind="props"\n/>`
  },
  'IAppBar': {
    name: 'IAppBar',
    description: 'IAppBar',
    importPath: "import { IAppBar } from 'softleader-nuxt-core'",
    summary: '頂部應用欄，提供標題、導航與操作按鈕的固定頂欄。',
    props: [
      {
            "name": "fixed",
            "type": "boolean // 是否固定在頂部",
            "desc": "",
            "default": "true"
      },
      {
            "name": "elevation",
            "type": "number // 陰影深度 (0-24)",
            "desc": "陰影高度層次，數值越大陰影越深",
            "default": "2"
      },
      {
            "name": "color",
            "type": "string // 背景顏色",
            "desc": "元件的主題顏色",
            "default": "'white'"
      },
      {
            "name": "dark",
            "type": "boolean // 深色模式",
            "desc": "",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IAppBar\n  v-bind="props"\n/>`
  },
  'IBadge': {
    name: 'IBadge',
    description: 'IBadge',
    importPath: "import { IBadge } from 'softleader-nuxt-core'",
    summary: '附著於元件上方的微小狀態指示器，顯示數量或通知點。',
    props: [
      {
            "name": "content",
            "type": "string | number // 徽章內容",
            "desc": "對話框的主體內容文字",
            "default": ""
      },
      {
            "name": "dot",
            "type": "boolean // 是否只顯示點",
            "desc": "",
            "default": "false"
      },
      {
            "name": "color",
            "type": "string // 顏色",
            "desc": "元件的主題顏色",
            "default": "'#f44336'"
      },
      {
            "name": "max",
            "type": "number // 最大數字(超過顯示 99+)",
            "desc": "",
            "default": "99"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IBadge\n  v-bind="props"\n/>`
  },
  'IDrawer': {
    name: 'IDrawer',
    description: 'IDrawer',
    importPath: "import { IDrawer } from 'softleader-nuxt-core'",
    summary: '可滑出的側邊欄導航面板，適用於主要導航結構。',
    props: [
      {
            "name": "modelValue",
            "type": "boolean // 開關狀態",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "permanent",
            "type": "boolean // 是否永久顯示 (桌面版)",
            "desc": "",
            "default": "false"
      },
      {
            "name": "width",
            "type": "string // 寬度",
            "desc": "",
            "default": "'256px'"
      },
      {
            "name": "position",
            "type": "'left' | 'right' // 位置",
            "desc": "",
            "default": "'left'"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<IDrawer\n  v-bind="props"\n/>`
  },
  'IMenuItem': {
    name: 'IMenuItem',
    description: 'IMenuItem',
    importPath: "import { IMenuItem } from 'softleader-nuxt-core'",
    summary: '側邊欄或選單中的單一選項，支援圖示與啟用狀態。',
    props: [
      {
            "name": "to",
            "type": "string // 路由路徑",
            "desc": "",
            "default": ""
      },
      {
            "name": "href",
            "type": "string // 外部連結",
            "desc": "連結目標 URL，設置後元件將渲染為 <a> 標籤",
            "default": ""
      },
      {
            "name": "icon",
            "type": "string // 圖示 (可以是 emoji 或 icon class)",
            "desc": "圖示名稱 (如: mdi-home)",
            "default": ""
      },
      {
            "name": "label",
            "type": "string // 文字",
            "desc": "顯示在元件上的文字標籤",
            "default": ""
      },
      {
            "name": "active",
            "type": "boolean // 是否啟用",
            "desc": "",
            "default": "false"
      },
      {
            "name": "disabled",
            "type": "boolean // 是否禁用",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<IMenuItem\n  v-bind="props"\n/>`
  },
  'ApiLoadingButton': {
    name: 'ApiLoadingButton',
    description: 'ApiLoadingButton 元件',
    importPath: "import { ApiLoadingButton } from 'softleader-nuxt-core'",
    summary: '整合 API 請求的按鈕，自動管理請求期間的載入狀態。',
    props: [
      {
            "name": "label",
            "type": "string",
            "desc": "顯示在元件上的文字標籤",
            "default": "'發送 API 請求'"
      },
      {
            "name": "url",
            "type": "string",
            "desc": "",
            "default": "'/users'"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<ApiLoadingButton\n  v-bind="props"\n/>`
  },
  'BDataTable': {
    name: 'BDataTable',
    description: 'BDataTable 元件',
    importPath: "import { BDataTable } from 'softleader-nuxt-core'",
    summary: '企業級數據表格，封裝了分頁、搜尋、API 請求等完整業務邏輯。',
    props: [],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "actionButton",
            "desc": "具名插槽: actionButton"
      }
],
    codeExample: `<BDataTable\n  v-bind="props"\n/>`
  },
  'CitySelect': {
    name: 'CitySelect',
    description: '封裝城市選擇的業務邏輯',
    importPath: "import { CitySelect } from 'softleader-nuxt-core'",
    summary: '封裝了城市數據的選擇器，自動從後端載入城市列表。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "輸入框的提示佔位文字",
            "default": "'請選擇城市'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "showAllOption",
            "type": "boolean // 是否顯示「全部」選項",
            "desc": "業務相關的 props",
            "default": "false"
      },
      {
            "name": "excludeCities",
            "type": "string[] // 排除特定城市",
            "desc": "",
            "default": "() => []"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<CitySelect\n  v-bind="props"\n/>`
  },
  'CountrySelect': {
    name: 'CountrySelect',
    description: '封裝國家選擇的業務邏輯',
    importPath: "import { CountrySelect } from 'softleader-nuxt-core'",
    summary: '封裝了國家數據的選擇器，提供國際化的國家代碼列表。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "輸入框的提示佔位文字",
            "default": "'請選擇國家'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "showAllOption",
            "type": "boolean",
            "desc": "",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<CountrySelect\n  v-bind="props"\n/>`
  },
  'DateRangePicker': {
    name: 'DateRangePicker',
    description: '封裝日期範圍選擇的業務邏輯',
    importPath: "import { DateRangePicker } from 'softleader-nuxt-core'",
    summary: '封裝了日期範圍選取邏輯的複合元件，包含開始與結束日期。',
    props: [
      {
            "name": "modelValue",
            "type": "DateRange",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "maxRange",
            "type": "number // 最大範圍天數",
            "desc": "",
            "default": "undefined"
      },
      {
            "name": "quickSelects",
            "type": "boolean // 顯示快速選擇",
            "desc": "",
            "default": "true"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<DateRangePicker\n  v-bind="props"\n/>`
  },
  'EmailInput': {
    name: 'EmailInput',
    description: '封裝 Email 輸入的業務邏輯',
    importPath: "import { EmailInput } from 'softleader-nuxt-core'",
    summary: '整合了 Email 格式驗證的輸入框，提供即時格式檢查。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "輸入框的提示佔位文字",
            "default": "'請輸入 Email'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "required",
            "type": "boolean",
            "desc": "",
            "default": "false"
      },
      {
            "name": "corporateOnly",
            "type": "boolean",
            "desc": "1. 基本業務開關：是否為嚴格模式 (例如只能用公司信箱)",
            "default": "false"
      },
      {
            "name": "allowedDomains",
            "type": "string[]",
            "desc": "2. 進階彈性：允許傳入特定的網域清單",
            "default": "() => []"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<EmailInput\n  v-bind="props"\n/>`
  },
  'GenderRadio': {
    name: 'GenderRadio',
    description: '封裝性別選擇的業務邏輯',
    importPath: "import { GenderRadio } from 'softleader-nuxt-core'",
    summary: '封裝了性別選取邏輯的單選組，提供標準化的性別選項。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "layout",
            "type": "'horizontal' | 'vertical'",
            "desc": "",
            "default": "'horizontal'"
      },
      {
            "name": "required",
            "type": "boolean",
            "desc": "",
            "default": "false"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<GenderRadio\n  v-bind="props"\n/>`
  },
  'GlobalLoading': {
    name: 'GlobalLoading',
    description: 'GlobalLoading 元件',
    importPath: "import { GlobalLoading } from 'softleader-nuxt-core'",
    summary: '全局的載入遮罩元件，用於覆蓋整個頁面的等待狀態。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<GlobalLoading\n  v-bind="props"\n/>`
  },
  'GlobalModal': {
    name: 'GlobalModal',
    description: 'GlobalModal 元件',
    importPath: "import { GlobalModal } from 'softleader-nuxt-core'",
    summary: '全局的彈窗服務，透過 useModal 組合式 API 程式化呼叫。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<GlobalModal\n  v-bind="props"\n/>`
  },
  'GlobalSnackbar': {
    name: 'GlobalSnackbar',
    description: 'GlobalSnackbar 元件',
    importPath: "import { GlobalSnackbar } from 'softleader-nuxt-core'",
    summary: '全局的訊息列服務，透過 useSnackbar 組合式 API 呼叫。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<GlobalSnackbar\n  v-bind="props"\n/>`
  },
  'OptionSelect': {
    name: 'OptionSelect',
    description: 'OptionSelect 元件',
    importPath: "import { OptionSelect } from 'softleader-nuxt-core'",
    summary: '從後端動態取得選項的下拉選單，封裝了數據載入邏輯。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "code",
            "type": "'job' | 'interest' | 'city' // 對應 options registry keys",
            "desc": "",
            "default": ""
      },
      {
            "name": "label",
            "type": "string",
            "desc": "顯示在元件上的文字標籤",
            "default": ""
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<OptionSelect\n  v-bind="props"\n/>`
  },
  'PasswordInput': {
    name: 'PasswordInput',
    description: '封裝密碼輸入的業務邏輯',
    importPath: "import { PasswordInput } from 'softleader-nuxt-core'",
    summary: '整合了密碼顯示切換與強度驗證的密碼輸入框。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "輸入框的提示佔位文字",
            "default": "'請輸入密碼'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "required",
            "type": "boolean",
            "desc": "",
            "default": "false"
      },
      {
            "name": "showStrength",
            "type": "boolean // 顯示密碼強度",
            "desc": "",
            "default": "true"
      },
      {
            "name": "minLength",
            "type": "number",
            "desc": "",
            "default": "8"
      },
      {
            "name": "requireSpecialChar",
            "type": "boolean // 需要特殊字元",
            "desc": "",
            "default": "true"
      },
      {
            "name": "requireNumber",
            "type": "boolean // 需要數字",
            "desc": "",
            "default": "true"
      },
      {
            "name": "requireUppercase",
            "type": "boolean // 需要大寫字母",
            "desc": "",
            "default": "true"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<PasswordInput\n  v-bind="props"\n/>`
  },
  'PhoneInput': {
    name: 'PhoneInput',
    description: '封裝電話號碼輸入的業務邏輯',
    importPath: "import { PhoneInput } from 'softleader-nuxt-core'",
    summary: '整合了國際電話格式的輸入框，包含區號選擇。',
    props: [
      {
            "name": "modelValue",
            "type": "string",
            "desc": "雙向綁定的值 (v-model)",
            "default": ""
      },
      {
            "name": "placeholder",
            "type": "string",
            "desc": "輸入框的提示佔位文字",
            "default": "'請輸入手機號碼'"
      },
      {
            "name": "disabled",
            "type": "boolean",
            "desc": "是否禁用，禁用後不可點擊",
            "default": "false"
      },
      {
            "name": "required",
            "type": "boolean",
            "desc": "",
            "default": "false"
      },
      {
            "name": "countryCode",
            "type": "string // 國碼，預設台灣",
            "desc": "",
            "default": "'+886'"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<PhoneInput\n  v-bind="props"\n/>`
  },
  'PolicyForm': {
    name: 'PolicyForm',
    description: 'PolicyForm 元件',
    importPath: "import { PolicyForm } from 'softleader-nuxt-core'",
    summary: '封裝了政策相關條款閱讀與確認邏輯的表單區塊。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<PolicyForm\n  v-bind="props"\n/>`
  },
  'SmartCard': {
    name: 'SmartCard',
    description: '封裝卡片的業務邏輯與標準樣式',
    importPath: "import { SmartCard } from 'softleader-nuxt-core'",
    summary: '整合了載入狀態、標題與操作按鈕的智慧卡片容器。',
    props: [
      {
            "name": "title",
            "type": "string",
            "desc": "標題文字",
            "default": "''"
      },
      {
            "name": "subtitle",
            "type": "string",
            "desc": "副標題文字",
            "default": "''"
      },
      {
            "name": "text",
            "type": "string",
            "desc": "顯示的主要文字內容",
            "default": "''"
      },
      {
            "name": "icon",
            "type": "string",
            "desc": "圖示名稱 (如: mdi-home)",
            "default": "''"
      },
      {
            "name": "color",
            "type": "string",
            "desc": "元件的主題顏色",
            "default": "'white'"
      },
      {
            "name": "elevation",
            "type": "number",
            "desc": "陰影高度層次，數值越大陰影越深",
            "default": "1"
      }
],
    emits: [],
    methods: [],
    slots: [
      {
            "name": "default",
            "desc": "預設插槽內容"
      }
],
    codeExample: `<SmartCard\n  v-bind="props"\n/>`
  },
  'SmartComplexWidget': {
    name: 'SmartComplexWidget',
    description: '封裝複雜的業務邏輯與介面互動',
    importPath: "import { SmartComplexWidget } from 'softleader-nuxt-core'",
    summary: '多功能的複合型業務組件，封裝了複雜的業務數據展示邏輯。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<SmartComplexWidget\n  v-bind="props"\n/>`
  },
  'SmartTable': {
    name: 'SmartTable',
    description: '封裝表格的業務邏輯、搜尋與分頁',
    importPath: "import { SmartTable } from 'softleader-nuxt-core'",
    summary: '整合了完整業務邏輯的智慧表格，包含 API 請求、分頁與篩選。',
    props: [
      {
            "name": "title",
            "type": "string",
            "desc": "標題文字",
            "default": "''"
      },
      {
            "name": "columns",
            "type": "Column[]",
            "desc": "表格欄位定義陣列",
            "default": ""
      },
      {
            "name": "data",
            "type": "any[]",
            "desc": "",
            "default": "() => []"
      },
      {
            "name": "api",
            "type": "string",
            "desc": "",
            "default": "''"
      }
],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<SmartTable\n  v-bind="props"\n/>`
  },
  'AppFooter': {
    name: 'AppFooter',
    description: 'AppFooter 元件',
    importPath: "import { AppFooter } from 'softleader-nuxt-core'",
    summary: '應用程式的底部頁腳，顯示版權與附加導航連結。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<AppFooter\n  v-bind="props"\n/>`
  },
  'AppHeader': {
    name: 'AppHeader',
    description: 'AppHeader 元件',
    importPath: "import { AppHeader } from 'softleader-nuxt-core'",
    summary: '應用程式的頂部標題欄，包含品牌標誌與導航入口。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<AppHeader\n  v-bind="props"\n/>`
  },
  'AppSidebar': {
    name: 'AppSidebar',
    description: 'AppSidebar 元件',
    importPath: "import { AppSidebar } from 'softleader-nuxt-core'",
    summary: '應用程式的主要側邊欄導航，管理路由選單與展開收合狀態。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<AppSidebar\n  v-bind="props"\n/>`
  },
  'AppSidebarItem': {
    name: 'AppSidebarItem',
    description: 'AppSidebarItem 元件',
    importPath: "import { AppSidebarItem } from 'softleader-nuxt-core'",
    summary: '側邊欄中的單一導航項，支援圖示、文字與啟用高亮狀態。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<AppSidebarItem\n  v-bind="props"\n/>`
  },
  'HeaderActions': {
    name: 'HeaderActions',
    description: 'HeaderActions 元件',
    importPath: "import { HeaderActions } from 'softleader-nuxt-core'",
    summary: 'HeaderActions 元件，提供標準的介面交互。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<HeaderActions\n  v-bind="props"\n/>`
  },
  'HeaderBreadcrumbs': {
    name: 'HeaderBreadcrumbs',
    description: 'HeaderBreadcrumbs 元件',
    importPath: "import { HeaderBreadcrumbs } from 'softleader-nuxt-core'",
    summary: 'HeaderBreadcrumbs 元件，提供標準的介面交互。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<HeaderBreadcrumbs\n  v-bind="props"\n/>`
  },
  'HeaderNotifications': {
    name: 'HeaderNotifications',
    description: 'HeaderNotifications 元件',
    importPath: "import { HeaderNotifications } from 'softleader-nuxt-core'",
    summary: 'HeaderNotifications 元件，提供標準的介面交互。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<HeaderNotifications\n  v-bind="props"\n/>`
  },
  'HeaderSearch': {
    name: 'HeaderSearch',
    description: 'HeaderSearch 元件',
    importPath: "import { HeaderSearch } from 'softleader-nuxt-core'",
    summary: 'HeaderSearch 元件，提供標準的介面交互。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<HeaderSearch\n  v-bind="props"\n/>`
  },
  'HeaderUserMenu': {
    name: 'HeaderUserMenu',
    description: 'HeaderUserMenu 元件',
    importPath: "import { HeaderUserMenu } from 'softleader-nuxt-core'",
    summary: 'HeaderUserMenu 元件，提供標準的介面交互。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<HeaderUserMenu\n  v-bind="props"\n/>`
  },
  'PortalHeader': {
    name: 'PortalHeader',
    description: 'PortalHeader 元件',
    importPath: "import { PortalHeader } from 'softleader-nuxt-core'",
    summary: '面向外部用戶的入口式頂部標頭，支援登入狀態與多語切換。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<PortalHeader\n  v-bind="props"\n/>`
  },
  'LoginForm': {
    name: 'LoginForm',
    description: 'LoginForm 元件',
    importPath: "import { LoginForm } from 'softleader-nuxt-core'",
    summary: 'LoginForm 元件，提供標準的介面交互。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<LoginForm\n  v-bind="props"\n/>`
  },
  'Welcome': {
    name: 'Welcome',
    description: 'Welcome 元件',
    importPath: "import { Welcome } from 'softleader-nuxt-core'",
    summary: 'Welcome 元件，提供標準的介面交互。',
    props: [],
    emits: [],
    methods: [],
    slots: [],
    codeExample: `<Welcome\n  v-bind="props"\n/>`
  },
};

export function getComponentDoc(name: string) {
  return componentDocs[name] || null
}
