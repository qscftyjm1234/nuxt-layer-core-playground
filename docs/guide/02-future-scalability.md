[返回指南總覽](../../README.md)

# 未來可擴充性與企業級藍圖

本架構已經打下穩固的基礎，未來可朝著「企業級前端基礎設施」的方向持續演進：

1. **設計系統 Token 化**：[詳細規劃](../future-plans/03-design-tokens.md)
   - 將顏色、間距等視覺樣式抽離為純 JSON 或 CSS 變數（Design Tokens）。未來即使松凌有 React 或 APP 專案，也能直接共用同一套視覺標準。
2. **業務模組樂高化**：[詳細規劃 (含資料結構設計)](../future-plans/02-domain-layers.md)
   - 當系統越來越龐大，可將核心包依照業務拆分成獨立 Layer（例如 `payment-layer` 金流模組、`auth-layer` 認證模組）。新專案可像組裝樂高一樣，只載入需要的模組。
3. **多版本平行維護 (Long Term Support 策略)**：[詳細規劃](../future-plans/04-lts-versioning.md)
   - 隨著架構演進（如 v3 晉升為 v4），這套系統能支援「多版本共存」。v3 可切出專門的維護分支（Maintenance Branch）持續提供安全性修復（LTS），現有專案可安穩停留在 v3；新專案或資源許可的專案則可無縫接軌正在迭代新功能的 v4 版本。
