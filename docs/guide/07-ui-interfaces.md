[返回指南總覽](../../README.md)

# 全域 UI 組件規範

本專案採用統一的組件包裝方式。為了維護設計系統的統一性與未來的可抽換性，我們制定了嚴格的 UI 組件使用規範。

## 1. 核心規範：必須使用 `uiInterface` 封裝組件

嚴禁在頁面或業務組件中直接使用底層 UI 框架的原生組件 (如 Vuetify, Ant Design)。
必須使用 `components/uiInterface/` 目錄下提供的包裝組件 (以 `I` 開頭)。

**對照表範例：**

| 原生概念 (禁止直接使用) | 封裝組件 (必須使用) |
| ----------------------- | ------------------- |
| Table / Data Grid       | IDataTable          |
| Button                  | IButton             |
| Input / Text Field      | IInput              |
| Select                  | ISelect             |
| Modal / Dialog          | IModal              |

## 2. 範例比較

**錯誤 (直接依賴原生屬性與標籤)：**

```vue
<template>
  <v-btn
    color="primary"
    @click="submit"
  >
    提交
  </v-btn>
</template>
```

**正確 (使用介面層)：**

```vue
<template>
  <IButton
    variant="primary"
    @click="submit"
  >
    提交
  </IButton>
</template>
```

## 3. 如何查詢可用組件與屬性

若要查看目前 `uiInterface` 提供了哪些組件以及其接受的 Props，請直接在此 Monorepo 啟動 `ui-docs` 專案：

```bash
npm run dev:ui-docs
```

該文件站台會展示所有 `I` 開頭組件的即時範例與規格說明。開發時請隨時對照使用。
