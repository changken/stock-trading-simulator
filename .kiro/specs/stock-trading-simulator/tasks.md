# 實作計畫

- [x] 1. 初始化 Nuxt.js 專案並配置基礎設定





  - 使用 `npx nuxi@latest init` 建立新的 Nuxt 3 專案，選擇 TypeScript
  - 安裝並配置 Tailwind CSS
  - 安裝 Pinia 和 pinia-plugin-persistedstate
  - 配置 TypeScript 嚴格模式（tsconfig.json）
  - 建立基本的專案目錄結構（components、composables、stores、types、utils）
  - _需求: 8.1, 8.4, 7.4_

- [x] 2. 定義 TypeScript 類型和介面





  - 在 `types/stock.ts` 中定義 Stock 和 PricePoint 介面
  - 在 `types/portfolio.ts` 中定義 Portfolio 和 PortfolioHolding 介面
  - 在 `types/transaction.ts` 中定義 Transaction 介面
  - 確保所有介面符合設計文件的規格
  - _需求: 8.2, 8.5_

- [x] 3. 實作模擬資料生成工具





  - 在 `utils/priceGenerator.ts` 中實作價格生成函式
  - 實作 `generatePriceChange()` 函式用於隨機價格變動
  - 實作 `generateHistoricalPrices()` 函式用於生成歷史價格資料
  - 在 `server/api/mock-data.ts` 中建立初始股票資料（10-15 支股票）
  - _需求: 1.1, 2.5_

- [x] 4. 建立 API 端點





  - 實作 `server/api/stocks/index.get.ts` 返回所有股票列表
  - 實作 `server/api/stocks/[symbol].get.ts` 返回單一股票詳細資訊
  - 確保 API 端點使用 TypeScript 並有適當的類型定義
  - _需求: 1.2, 2.1, 8.3_

- [ ] 5. 實作 Pinia Stores
  - [ ] 5.1 建立 Portfolio Store (`stores/portfolio.ts`)
    - 實作 state: cash, holdings
    - 實作 getters: totalValue, totalProfitLoss
    - 實作 actions: addHolding, removeHolding, updateHoldingPrices, reset
    - 啟用 persist 選項
    - _需求: 5.2, 5.3, 5.4, 5.5, 9.1, 9.2_
  - [ ] 5.2 建立 Stocks Store (`stores/stocks.ts`)
    - 實作 state: stocks, lastUpdate
    - 實作 actions: setStocks, updatePrices
    - _需求: 1.1, 1.3_
  - [ ] 5.3 建立 Transactions Store (`stores/transactions.ts`)
    - 實作 state: transactions
    - 實作 getters: sortedTransactions
    - 實作 actions: addTransaction, clearHistory
    - 啟用 persist 選項
    - _需求: 3.6, 4.6, 6.2, 9.4_

- [ ] 6. 實作 Composables
  - [ ] 6.1 建立 useStockData composable (`composables/useStockData.ts`)
    - 實作 fetchStocks() 方法
    - 實作 fetchStockBySymbol() 方法
    - 實作 startPriceUpdates() 和 stopPriceUpdates() 方法用於即時更新
    - _需求: 1.1, 1.3, 2.1_
  - [ ] 6.2 建立 usePortfolio composable (`composables/usePortfolio.ts`)
    - 實作 portfolio 和 totalValue computed 屬性
    - 實作 updateHoldingPrices() 方法
    - 實作 reset() 方法
    - _需求: 5.1, 5.2, 5.3, 5.6, 9.3, 9.5_
  - [ ] 6.3 建立 useTransaction composable (`composables/useTransaction.ts`)
    - 實作 buyStock() 方法
    - 實作 sellStock() 方法
    - 實作 validateBuy() 和 validateSell() 驗證方法
    - _需求: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 7. 建立驗證工具函式
  - 在 `utils/validators.ts` 中實作交易驗證函式
  - 實作數量驗證（正整數檢查）
  - 實作資金充足性驗證
  - 實作持股數量驗證
  - _需求: 3.2, 3.3, 4.2, 4.3_

- [ ] 8. 實作股票相關元件
  - [ ] 8.1 建立 StockCard 元件 (`components/stock/StockCard.vue`)
    - 接收 stock prop
    - 顯示股票代碼、名稱、價格、漲跌幅
    - 使用 Tailwind CSS 實作響應式卡片佈局
    - 使用顏色指示器（綠色上漲、紅色下跌）
    - _需求: 1.1, 1.5, 7.1, 7.2, 7.3, 7.4_
  - [ ] 8.2 建立 StockList 元件 (`components/stock/StockList.vue`)
    - 接收 stocks prop
    - 使用 StockCard 元件渲染股票列表
    - 實作響應式網格佈局（mobile: 1欄, tablet: 2欄, desktop: 3欄）
    - 處理點擊事件導航至股票詳細頁
    - _需求: 1.1, 1.4, 7.1, 7.2, 7.3, 7.5_
  - [ ] 8.3 建立 StockChart 元件 (`components/stock/StockChart.vue`)
    - 安裝並整合圖表庫（Chart.js 或 ApexCharts）
    - 接收 historicalPrices 和 symbol props
    - 渲染折線圖顯示價格趨勢
    - 實作時間範圍選擇器（1天、1週、1月、3月）
    - _需求: 2.3_
  - [ ] 8.4 建立 StockStats 元件 (`components/stock/StockStats.vue`)
    - 接收 stock prop
    - 顯示股票統計資料（當日最高、最低、交易量）
    - 使用 Tailwind CSS 實作響應式佈局
    - _需求: 2.5_

- [ ] 9. 實作交易相關元件
  - [ ] 9.1 建立 TransactionForm 元件 (`components/transaction/TransactionForm.vue`)
    - 接收 stock, type, maxQuantity props
    - 實作數量輸入欄位
    - 即時計算並顯示交易總額
    - 顯示可用現金或持股數量
    - 實作表單驗證
    - 發出 submit 事件
    - 實作響應式表單佈局
    - _需求: 3.1, 3.2, 4.1, 4.2, 7.1, 7.2, 7.3_
  - [ ] 9.2 建立 TransactionHistory 元件 (`components/transaction/TransactionHistory.vue`)
    - 接收 transactions prop
    - 以表格形式顯示交易記錄
    - 實作日期範圍篩選
    - 實作股票代碼篩選
    - 實作響應式表格（mobile 顯示為卡片列表）
    - _需求: 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3_

- [ ] 10. 實作投資組合相關元件
  - [ ] 10.1 建立 PortfolioSummary 元件 (`components/portfolio/PortfolioSummary.vue`)
    - 接收 portfolio prop
    - 顯示總資產價值、現金餘額、總損益
    - 使用卡片佈局展示關鍵指標
    - 實作響應式佈局
    - _需求: 5.3, 5.4, 5.5, 7.1, 7.2, 7.3_
  - [ ] 10.2 建立 PortfolioHoldings 元件 (`components/portfolio/PortfolioHoldings.vue`)
    - 接收 holdings prop
    - 以表格形式顯示持股明細
    - 每行顯示股票代碼、數量、平均成本、當前價值、損益
    - 提供賣出按鈕並發出 sell 事件
    - 實作響應式表格
    - _需求: 5.2, 5.4, 7.1, 7.2, 7.3_

- [ ] 11. 建立應用程式佈局
  - 實作 `layouts/default.vue` 包含導航列
  - 導航列包含連結：首頁、投資組合、交易歷史
  - 實作響應式導航（mobile 使用漢堡選單）
  - 使用 Tailwind CSS 樣式
  - _需求: 7.1, 7.2, 7.3, 7.5_

- [ ] 12. 實作首頁（股票列表頁）
  - 建立 `pages/index.vue`
  - 使用 useAsyncData 在伺服器端獲取股票資料
  - 使用 StockList 元件顯示股票
  - 在客戶端啟動價格即時更新
  - 在元件卸載時停止價格更新
  - _需求: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 13. 實作股票詳細頁
  - 建立 `pages/stocks/[symbol].vue`
  - 使用 useAsyncData 根據 URL 參數獲取股票資料
  - 顯示股票基本資訊（代碼、名稱、價格、變動百分比）
  - 整合 StockChart 元件顯示價格圖表
  - 整合 StockStats 元件顯示統計資料
  - 實作買入和賣出按鈕
  - 整合 TransactionForm 元件處理交易
  - 實作交易成功/失敗的提示訊息
  - 處理股票不存在的情況（404）
  - _需求: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 4.1_

- [ ] 14. 實作投資組合頁
  - 建立 `pages/portfolio.vue`
  - 使用 usePortfolio composable 獲取投資組合資料
  - 整合 PortfolioSummary 元件顯示總覽
  - 整合 PortfolioHoldings 元件顯示持股明細
  - 實作重置功能按鈕
  - 根據最新股價即時更新持股價值
  - 處理賣出操作
  - _需求: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 9.3, 9.4, 9.5_

- [ ] 15. 實作交易歷史頁
  - 建立 `pages/history.vue`
  - 從 transactions store 獲取交易歷史
  - 整合 TransactionHistory 元件
  - 實作篩選功能
  - 計算並顯示總損益
  - _需求: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 16. 實作錯誤處理和使用者回饋
  - 在交易驗證失敗時顯示適當的錯誤訊息
  - 實作資金不足的錯誤提示
  - 實作持股不足的錯誤提示
  - 實作無效數量的錯誤提示
  - 實作交易成功的確認訊息
  - 可使用 Nuxt 的 toast 或 notification 套件
  - _需求: 3.3, 4.3_

- [ ] 17. 配置 Tailwind CSS 主題
  - 在 `tailwind.config.js` 中配置顏色主題
  - 定義上漲（綠色）和下跌（紅色）的顏色變數
  - 配置響應式斷點（如需自訂）
  - 配置字體和間距
  - _需求: 7.4_

- [ ] 18. 實作資料持久化
  - 配置 pinia-plugin-persistedstate
  - 確保 portfolio store 持久化
  - 確保 transactions store 持久化
  - 測試頁面重新載入後資料保持
  - _需求: 9.2_

- [ ] 19. 優化 SSR 效能
  - 確保所有頁面正確使用 useAsyncData 或 useFetch
  - 檢查伺服器端不執行客戶端專用的程式碼（如 localStorage）
  - 實作適當的錯誤處理
  - 測試 SSR 渲染結果
  - _需求: 1.2, 2.1, 5.1, 6.1_

- [ ] 20. 整合測試和除錯
  - 測試完整的買入流程
  - 測試完整的賣出流程
  - 測試投資組合計算的正確性
  - 測試價格即時更新功能
  - 測試響應式佈局在不同裝置上的表現
  - 測試重置功能
  - 修復發現的任何問題
  - _需求: 所有需求_
