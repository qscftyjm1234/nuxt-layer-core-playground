[回到首頁](../../README.md)

# 團隊規範與程式碼撰寫紀律

本文件定義了專案開發時必須遵守的命名與文件準則，以確保程式碼具備高度可讀性與專業一致性。

## 1. 專業語氣與文件規範

- **禁止表情符號**：程式註解、Markdown 文件與 Commit 訊息中，嚴禁使用任何 Emoji。
- **避免非正式用語**：敘述應保持客觀、專業、精簡，避免主觀形容詞與冗言贅字。
- **步驟性寫法**：撰寫教學或操作指示時，必須採用條列式列出步驟順序。

## 2. 函式命名動詞規範

函式名稱必須以特定的動詞開頭，清楚表達其業務意圖與行為。禁止使用無動詞或語意不明確的命名。

### 允許的開頭動詞參考

- **單一動作**：`get`, `set`, `fetch`, `handle`, `click`, `submit`, `validate`, `create`, `update`, `delete`, `toggle`, `show`, `hide`, `open`, `close`, `add`, `remove`, `clear`, `reset`
- **生命週期或流程**：`initialize`, `init`, `process`, `execute`, `perform`, `complete`, `setup`, `run`
- **狀態判斷 (回傳 boolean)**：`is`, `has`, `should`, `can`, `will`, `check`, `verify`

### 範例比較

**正確寫法**：

```javascript
function getUserData() {}
function handleClick() {}
function processPayment() {}
function isValid() {}
```

**錯誤寫法**：

```javascript
function userData() {} // 缺少動詞
function click() {} // 應為 handleClick，避免與原生功能衝突
function payment() {} // 應為 processPayment
function valid() {} // 應為 isValid
```
