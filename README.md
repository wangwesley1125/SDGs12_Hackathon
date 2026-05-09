# Eco-CO2 — 企業採購碳排比對系統

> 2026 SDGs12 Hackathon 參賽專案

在淨零排放與碳費法規的雙重壓力下，供應鏈碳管理已從企業的「加分題」變為「生存題」。本系統直接串接政府環境部氣候變遷署的官方碳排數據，讓採購人員在數秒內完成供應商碳排查詢、比對與報告匯出。

---

## 功能總覽

| 頁面 | 功能 |
|---|---|
| `index.html` | 行業關鍵字搜尋、行業類別下拉瀏覽 |
| `results.html` | 依行業篩選出對應廠商列表（碳排簡化顯示） |
| `detail.html` | 廠商完整碳排資料（範疇一/二）、聯絡廠商信件、儲存至清單 |
| `calculate.html` | 勾選廠商加總碳排、一鍵匯出 PDF 報告 |
| `about.html` | 系統說明與設計理念 |

---

## 專案結構

```
SDGs12_Hackathon/
├── index.html          # 首頁：搜尋入口
├── results.html        # 查詢結果列表
├── detail.html         # 廠商詳細資料
├── calculate.html      # 碳排加總與 PDF 匯出
├── about.html          # 關於我們
├── data.js             # 廠商資料庫（唯一資料來源）
├── style.css           # 全站共用樣式（含 RWD）
└── assets/
    └── bg.jpg          # 首頁背景圖
```

---

## 快速開始

本專案為純靜態前端，無需安裝任何套件或啟動伺服器。

直接用瀏覽器開啟 `index.html` 即可執行。

> 若從本機檔案系統開啟（`file://`），部分瀏覽器可能限制 localStorage，建議使用 VS Code Live Server 或任何靜態伺服器：
> ```bash
> npx serve .
> ```

---

## 新增 / 修改廠商資料

所有廠商資料集中在 **`data.js`**，修改此一檔案後，`results.html`、`detail.html`、`calculate.html` 的下拉選單與結果會自動反映。

```js
// data.js 資料結構
const database = [
  {
    industry: "塑膠容器製造",        // 行業別（搜尋比對用）
    name:     "宏全國際 (台中總廠)",  // 廠商名稱
    carbon:   "32006.909 公噸 CO₂e",  // 總碳排（原始完整數字）
    scope1:   "630.7632 公噸 CO₂e",   // 範疇一：直接排放
    scope2:   "31376.1456 公噸 CO₂e", // 範疇二：間接排放
    phone:    "+886-4-2359-0088",
    website:  "https://...",
    email:    "contact@example.com",
  },
  // ...
];
```

**欄位說明**

| 欄位 | 用途 |
|---|---|
| `industry` | 搜尋比對關鍵字；同一行業可有多筆廠商 |
| `carbon` | 總碳排，`results.html` 自動簡化顯示（例：`約 3.2 萬 公噸 CO₂e`），`detail.html` 顯示完整數字 |
| `scope1 / scope2` | 僅在 `detail.html` 顯示 |
| `email` | `detail.html` 聯絡廠商區塊的收件人 |

---

## 搜尋比對邏輯

`results.html` 使用雙向部分比對：

```js
database.filter(row =>
  row.industry.includes(query) || query.includes(row.industry)
)
```

- 搜尋「塑膠」→ 可找到「塑膠容器製造」
- 搜尋「飲料製造/包材」→ 可找到「飲料製造/包材」

---

## 廠商儲存與碳排加總

- **儲存**：`detail.html` 底部「儲存」按鈕，將廠商寫入瀏覽器 `localStorage`
- **Badge**：首頁「計算總排」按鈕右上角自動顯示已儲存筆數
- **加總**：`calculate.html` 勾選廠商後即時加總，支援萬／億自動換算
- **匯出**：點「匯出 PDF」觸發瀏覽器列印，選「另存為 PDF」即可下載

> 儲存清單存於 `localStorage.savedCompanies`（JSON 陣列），清除瀏覽器資料後會重置。

---

## RWD 斷點

| 裝置 | 寬度 | 說明 |
|---|---|---|
| 桌機 | > 768px | 完整版面，最大寬 860px 置中 |
| 平板 | ≤ 768px | 字體縮小、padding 縮減 |
| 手機 | ≤ 480px | 輸入框／按鈕全寬，表格橫向捲動 |

---

## 技術棧

- 純 HTML / CSS / Vanilla JS（零依賴、零建置步驟）
- 資料持久化：`localStorage`
- PDF 匯出：瀏覽器原生 `window.print()` + `@media print` CSS
- RWD：CSS Flexbox + media query
