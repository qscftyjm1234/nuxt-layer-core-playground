[回到套件首頁](../README.md)

# ESLint 繼承與配置指南

在 Nuxt Layer 或 Monorepo 架構中，我們通常希望子專案能夠繼承核心層 (Core Layer) 的程式碼風格檢查規則，同時保留微調的彈性。

## 1. 核心概念：繼承而不覆蓋

當你在子專案（如 `apps/playground-app`）中開一個 `.eslintrc.cjs` 時，**這並不代表核心層的規則會被全部蓋掉**。

ESLint 的核心機制是 **「基於配置的擴展 (Extends)」**。

### 核心層的配置 (`packages/nuxt-core/.eslintrc.cjs`)

核心層定義了基礎規則，通常會包含 `root: true`：

```javascript
module.exports = {
  root: true, // 停止向上尋找配置
  extends: ['@nuxt/eslint-config', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}
```

### 子專案的繼承 (`apps/playground-app/.eslintrc.cjs`)

子專案透過 `extends` 指向核心層的配置：

```javascript
module.exports = {
  extends: [
    '../../packages/nuxt-core/.eslintrc.cjs' // 指向核心層的路徑
  ],
  rules: {
    // 這裡只寫「想改」的部分，沒寫的都會從核心層繼承
    'no-console': 'warn'
  }
}
```

> [!IMPORTANT]
> **為什麼不是「整坨蓋掉」？**
> 因為你在 `extends` 陣列中引入了核心配置。ESLint 在合併配置時，會以「子專案」的 `rules` 為最高優先順序，但子專案沒定義的規則，會使用 `extends` 中父層定義的內容。

---

## 2. 如何知道有沒有繼承到？

最直接的方法是讓 ESLint 吐出 **最終合併後的配置**。

### 使用 `--print-config` 命令

在終端機執行：

```bash
npx eslint --print-config path/to/your/file.vue
```

這個命令會印出該檔案實際套用的 **JSON 配置**。你可以在裡面搜尋特定的規則（例如 `vue/multi-word-component-names`），看看它的值是否為核心層定義的 `off`。

---

## 3. 常見問題 (FAQ)

### Q: 為什麼我在子專案加了 `.eslintrc.cjs` 後，規則全亂了？

通常是因為**路徑不對**或**缺少 `extends`**。如果你只寫了 `{ rules: { ... } }` 而沒有 `extends` 任何東西，那這個檔案就是從零開始。

### Q: 核心層的 `root: true` 會影響子專案嗎？

會。如果核心層設定了 `root: true`，當 ESLint 找配置找到核心層那一層時，就不會再往電腦的根目錄找了。這可以確保專案的 lint 規則不受環境夾帶的其他配置干擾。

### Q: 我想完全覆蓋某個規則怎麼辦？

只要在子專案的 `rules` 區塊中定義同名的規則即可。子專案的權重永遠是最高的。
