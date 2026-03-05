---
title: IButton 按鈕組件
navigation: true
---

# IButton 按鈕組件

`IButton` 是專案中最基礎的按鈕組件，支援多種樣式與自動 Loading 狀態。

## 基礎展示

<div class="glass-card" style="margin: 2rem 0;">
  <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; padding: 1rem;">
    ::i-button{variant="primary"}
      Primary Button
    ::
    ::i-button{variant="outlined"}
      Outlined Button
    ::
  </div>
</div>

## 程式碼範例

```vue
<template>
  <IButton
    variant="primary"
    @click="handleClick"
  >
    提交
  </IButton>
</template>
```

## 參數說明 (Props)

| 參數     | 類型                    | 預設值    | 說明                  |
| -------- | ----------------------- | --------- | --------------------- |
| variant  | `primary` \| `outlined` | `primary` | 按鈕風格              |
| loading  | `boolean`               | `false`   | 是否顯示 Loading 狀態 |
| disabled | `boolean`               | `false`   | 是否停用              |
