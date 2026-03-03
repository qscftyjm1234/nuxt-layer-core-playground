---
trigger: always_on
---

# 如何讓組員記住函式命名規範

## 問題

組員在開發時常常忘記函式名稱的限制,例如不知道可以用哪些動詞開頭。

## 解決方案

### 1. **最簡單:把規範頁面加入書籤** ⭐ 推薦

- 讓組員把 `/showcase/rules` 加入瀏覽器書籤
- 忘記時隨時查閱「快速參考:允許的函式動詞」區塊

### 2. **團隊協作:在溝通工具釘選連結**

- 在 Slack / Discord / Teams 頻道釘選規範頁面連結
- 新人加入時第一件事就是看這個頁面

### 3. **編輯器提示:VS Code Snippets** (可選)

在 `.vscode/snippets.code-snippets` 加入:

```json
{
  "Function with verb": {
    "prefix": "func",
    "body": [
      "/**",
      " * ${1:description}",
      " * @param {${2:type}} ${3:param}",
      " * @returns {${4:type}}",
      " */",
      "function ${5|get,set,fetch,handle,click,submit,validate,create,update,delete,toggle,show,hide,initialize,process,execute,perform|}${6:Name}($3) {",
      "  $0",
      "}"
    ],
    "description": "Create function with approved verb prefix"
  }
}
```

輸入 `func` 後按 Tab,就會自動提示可用的動詞!

### 4. **Code Review 時提醒**

- PR 審查時,看到不符合規範的命名就留言提醒
- 附上規範頁面連結: `/showcase/rules`

### 5. **ESLint 自動檢查** (進階,需要設定)

可以設定 ESLint 規則來自動檢查,但設定較複雜,建議先用上面的方法。

## 允許的動詞快速參考

### 單一動作 (常用)

get, set, fetch, handle, click, submit, validate, create, update, delete, toggle, show, hide, open, close, add, remove, clear, reset

### 流程性 (多步驟)

initialize, init, process, execute, perform, complete, setup, run

### 判斷 (回傳 boolean)

is, has, should, can, will, check, verify

## 範例

✅ **正確**

```javascript
function getUserData() {}
function handleClick() {}
function processPayment() {}
function initializeApp() {}
function isValid() {}
```

❌ **錯誤**

```javascript
function userData() {} // 缺少動詞
function click() {} // 應該是 handleClick
function payment() {} // 應該是 processPayment
function valid() {} // 應該是 isValid
```

6. 計劃書接要給我繁體中文
