# 設計文件

## 概述

本文件描述股票交易模擬器的技術設計。系統將使用 Nuxt.js 3 框架搭配 TypeScript 和 Tailwind CSS 開發，提供伺服器端渲染（SSR）功能。應用程式將模擬股票交易環境，讓使用者能夠查看股票資訊、執行買賣操作、管理投資組合和查看交易歷史。

## 架構

### 技術堆疊

- **框架**: Nuxt.js 3
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **狀態管理**: Pinia (Nuxt 推薦的狀態管理方案)
- **資料持久化**: LocalStorage (用於模擬環境)
- **圖表庫**: Chart.js 或 ApexCharts (用於股票價格圖表)

### 專案結構

```
stock-trading-simulator/
├── assets/
│   └── css/
│       └── tailwind.css
├── components/
│   ├── stock/
│   │   ├── StockList.vue
│   │   ├── StockCard.vue
│   │   ├── StockChart.vue
│   │   └── StockStats.vue
│   ├── transaction/
│   │   ├── TransactionForm.vue
│   │   └── TransactionHistory.vue
│   └── portfolio/
│       ├── PortfolioSummary.vue
│       └── PortfolioHoldings.vue
├── composables/
│   ├── useStockData.ts
│   ├── usePortfolio.ts
│   └── useTransaction.ts
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue (股票列表頁)
│   ├── stocks/
│   │   └── [symbol].vue (股票詳細頁)
│   ├── portfolio.vue (投資組合頁)
│   └── history.vue (交易歷史頁)
├── server/
│   └── api/
│       ├── stocks/
│       │   ├── index.get.ts
│       │   └── [symbol].get.ts
│       └── mock-data.ts
├── stores/
│   ├── portfolio.ts
│   ├── stocks.ts
│   └── transactions.ts
├── types/
│   ├── stock.ts
│   ├── portfolio.ts
│   └── transaction.ts
└── utils/
    ├── priceGenerator.ts
    └── validators.ts
```

## 元件與介面

### 資料模型

#### Stock Interface
```typescript
interface Stock {
  symbol: string;          // 股票代碼 (例如: AAPL, TSLA)
  name: string;            // 公司名稱
  currentPrice: number;    // 當前價格
  previousClose: number;   // 前一日收盤價
  change: number;          // 價格變動
  changePercent: number;   // 變動百分比
  dayHigh: number;         // 當日最高價
  dayLow: number;          // 當日最低價
  volume: number;          // 交易量
  historicalPrices: PricePoint[]; // 歷史價格資料
}

interface PricePoint {
  timestamp: number;       // 時間戳記
  price: number;           // 價格
}
```

#### Portfolio Interface
```typescript
interface Portfolio {
  cash: number;                    // 現金餘額
  holdings: PortfolioHolding[];    // 持股列表
  totalValue: number;              // 總資產價值
  totalProfitLoss: number;         // 總損益
}

interface PortfolioHolding {
  symbol: string;          // 股票代碼
  quantity: number;        // 持有數量
  averagePrice: number;    // 平均買入價格
  currentPrice: number;    // 當前價格
  totalCost: number;       // 總成本
  currentValue: number;    // 當前價值
  profitLoss: number;      // 損益
  profitLossPercent: number; // 損益百分比
}
```

#### Transaction Interface
```typescript
interface Transaction {
  id: string;              // 交易 ID
  symbol: string;          // 股票代碼
  type: 'buy' | 'sell';    // 交易類型
  quantity: number;        // 數量
  price: number;           // 交易價格
  total: number;           // 交易總額
  timestamp: number;       // 交易時間戳記
}
```

### 核心元件

#### 1. StockList.vue
顯示所有可交易股票的列表元件。

**Props:**
- `stocks: Stock[]` - 股票陣列

**功能:**
- 顯示股票代碼、名稱、當前價格和漲跌幅
- 使用顏色指示器顯示漲跌（綠色上漲、紅色下跌）
- 點擊股票項目導航至詳細頁面
- 響應式網格佈局

#### 2. StockChart.vue
顯示股票價格歷史圖表的元件。

**Props:**
- `historicalPrices: PricePoint[]` - 歷史價格資料
- `symbol: string` - 股票代碼

**功能:**
- 使用圖表庫渲染折線圖
- 支援時間範圍選擇（1天、1週、1月、3月）
- 顯示價格趨勢和變化

#### 3. TransactionForm.vue
處理買入和賣出操作的表單元件。

**Props:**
- `stock: Stock` - 股票資訊
- `type: 'buy' | 'sell'` - 交易類型
- `maxQuantity?: number` - 最大可交易數量（賣出時使用）

**Emits:**
- `submit: (quantity: number) => void` - 提交交易

**功能:**
- 數量輸入欄位
- 即時計算交易總額
- 驗證輸入（正整數、不超過最大值）
- 顯示可用現金或持股數量
- 確認和取消按鈕

#### 4. PortfolioSummary.vue
顯示投資組合總覽的元件。

**Props:**
- `portfolio: Portfolio` - 投資組合資料

**功能:**
- 顯示總資產價值
- 顯示現金餘額
- 顯示總損益和百分比
- 使用卡片佈局展示關鍵指標

#### 5. PortfolioHoldings.vue
顯示持股明細的元件。

**Props:**
- `holdings: PortfolioHolding[]` - 持股陣列

**Emits:**
- `sell: (symbol: string) => void` - 觸發賣出操作

**功能:**
- 表格形式顯示所有持股
- 每行顯示股票代碼、數量、平均成本、當前價值、損益
- 提供賣出按鈕
- 響應式表格設計

#### 6. TransactionHistory.vue
顯示交易歷史記錄的元件。

**Props:**
- `transactions: Transaction[]` - 交易記錄陣列

**功能:**
- 以表格形式顯示交易記錄
- 支援按日期範圍篩選
- 支援按股票代碼篩選
- 顯示交易類型、數量、價格、總額和時間
- 分頁功能（如果記錄過多）

## Composables

### useStockData
管理股票資料的 composable。

**功能:**
- 獲取股票列表
- 獲取單一股票詳細資訊
- 模擬即時價格更新
- 生成歷史價格資料

**方法:**
```typescript
const useStockData = () => {
  const stocks = ref<Stock[]>([]);
  const loading = ref(false);
  
  const fetchStocks = async () => { /* ... */ };
  const fetchStockBySymbol = async (symbol: string) => { /* ... */ };
  const startPriceUpdates = () => { /* ... */ };
  const stopPriceUpdates = () => { /* ... */ };
  
  return {
    stocks,
    loading,
    fetchStocks,
    fetchStockBySymbol,
    startPriceUpdates,
    stopPriceUpdates
  };
};
```

### usePortfolio
管理投資組合的 composable。

**功能:**
- 獲取投資組合狀態
- 計算總資產價值
- 更新持股價值
- 重置投資組合

**方法:**
```typescript
const usePortfolio = () => {
  const portfolioStore = usePortfolioStore();
  
  const portfolio = computed(() => portfolioStore.portfolio);
  const totalValue = computed(() => portfolioStore.totalValue);
  
  const updateHoldingPrices = (stocks: Stock[]) => { /* ... */ };
  const reset = () => { /* ... */ };
  
  return {
    portfolio,
    totalValue,
    updateHoldingPrices,
    reset
  };
};
```

### useTransaction
處理交易操作的 composable。

**功能:**
- 執行買入操作
- 執行賣出操作
- 驗證交易
- 記錄交易歷史

**方法:**
```typescript
const useTransaction = () => {
  const portfolioStore = usePortfolioStore();
  const transactionStore = useTransactionStore();
  
  const buyStock = (stock: Stock, quantity: number) => { /* ... */ };
  const sellStock = (stock: Stock, quantity: number) => { /* ... */ };
  const validateBuy = (stock: Stock, quantity: number) => { /* ... */ };
  const validateSell = (symbol: string, quantity: number) => { /* ... */ };
  
  return {
    buyStock,
    sellStock,
    validateBuy,
    validateSell
  };
};
```

## Pinia Stores

### Portfolio Store
```typescript
export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    cash: 100000,
    holdings: [] as PortfolioHolding[]
  }),
  
  getters: {
    totalValue: (state) => {
      const holdingsValue = state.holdings.reduce(
        (sum, h) => sum + h.currentValue, 0
      );
      return state.cash + holdingsValue;
    },
    
    totalProfitLoss: (state) => {
      return state.holdings.reduce(
        (sum, h) => sum + h.profitLoss, 0
      );
    }
  },
  
  actions: {
    addHolding(symbol: string, quantity: number, price: number) { /* ... */ },
    removeHolding(symbol: string, quantity: number) { /* ... */ },
    updateHoldingPrices(stocks: Stock[]) { /* ... */ },
    reset() { /* ... */ }
  },
  
  persist: true // 使用 pinia-plugin-persistedstate
});
```

### Stocks Store
```typescript
export const useStocksStore = defineStore('stocks', {
  state: () => ({
    stocks: [] as Stock[],
    lastUpdate: 0
  }),
  
  actions: {
    setStocks(stocks: Stock[]) { /* ... */ },
    updatePrices() { /* ... */ }
  }
});
```

### Transactions Store
```typescript
export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[]
  }),
  
  getters: {
    sortedTransactions: (state) => {
      return [...state.transactions].sort(
        (a, b) => b.timestamp - a.timestamp
      );
    }
  },
  
  actions: {
    addTransaction(transaction: Omit<Transaction, 'id'>) { /* ... */ },
    clearHistory() { /* ... */ }
  },
  
  persist: true
});
```

## 頁面設計

### 1. 首頁 (index.vue)
顯示股票列表的主頁面。

**SSR 行為:**
- 在伺服器端獲取初始股票資料
- 渲染完整的股票列表 HTML

**客戶端行為:**
- 啟動價格即時更新（每 3-5 秒）
- 處理股票項目點擊導航

### 2. 股票詳細頁 (stocks/[symbol].vue)
顯示單一股票的詳細資訊。

**SSR 行為:**
- 根據 URL 參數獲取股票資料
- 渲染股票詳情和圖表

**客戶端行為:**
- 即時更新價格
- 處理買入/賣出表單互動
- 顯示交易確認對話框

### 3. 投資組合頁 (portfolio.vue)
顯示使用者的投資組合。

**SSR 行為:**
- 從 store 獲取投資組合資料
- 渲染持股列表和總覽

**客戶端行為:**
- 根據最新股價更新持股價值
- 處理賣出操作

### 4. 交易歷史頁 (history.vue)
顯示所有交易記錄。

**SSR 行為:**
- 從 store 獲取交易歷史
- 渲染交易列表

**客戶端行為:**
- 處理篩選和排序
- 分頁導航

## 資料流程

### 買入股票流程
1. 使用者在股票詳細頁點擊「買入」按鈕
2. 顯示 TransactionForm 元件（type='buy'）
3. 使用者輸入購買數量
4. 系統驗證：
   - 數量為正整數
   - 現金餘額足夠（數量 × 價格 ≤ 現金）
5. 驗證通過後：
   - 從現金餘額扣除交易金額
   - 新增或更新持股記錄
   - 記錄交易到歷史
   - 持久化到 LocalStorage
6. 顯示成功訊息並更新 UI

### 賣出股票流程
1. 使用者在投資組合或股票詳細頁點擊「賣出」按鈕
2. 顯示 TransactionForm 元件（type='sell'）
3. 使用者輸入賣出數量
4. 系統驗證：
   - 數量為正整數
   - 持股數量足夠
5. 驗證通過後：
   - 增加現金餘額（數量 × 價格）
   - 減少或移除持股記錄
   - 記錄交易到歷史
   - 持久化到 LocalStorage
6. 顯示成功訊息並更新 UI

### 價格更新流程
1. 頁面載入時啟動價格更新定時器
2. 每 3-5 秒執行一次：
   - 為每支股票生成新的隨機價格變動（±0.5% ~ ±2%）
   - 更新 stocks store
   - 更新投資組合中的持股價值
3. UI 自動反應式更新
4. 頁面卸載時清除定時器

## 錯誤處理

### 交易驗證錯誤
- **資金不足**: 顯示「現金餘額不足，無法完成購買」
- **持股不足**: 顯示「持有股票數量不足，無法完成賣出」
- **無效數量**: 顯示「請輸入有效的數量（正整數）」

### API 錯誤
- **股票不存在**: 導航至 404 頁面或顯示「找不到該股票」
- **資料載入失敗**: 顯示錯誤訊息並提供重試按鈕

### 狀態錯誤
- **LocalStorage 失敗**: 使用記憶體狀態作為備援
- **資料損壞**: 提供重置功能恢復初始狀態

## 測試策略

### 單元測試
- **Composables**: 測試 useStockData、usePortfolio、useTransaction 的邏輯
- **Stores**: 測試 Pinia stores 的 actions 和 getters
- **Utils**: 測試價格生成器和驗證函式

### 元件測試
- **TransactionForm**: 測試表單驗證和提交
- **StockList**: 測試股票列表渲染和互動
- **PortfolioHoldings**: 測試持股顯示和賣出操作

### 整合測試
- **買入流程**: 測試完整的買入操作流程
- **賣出流程**: 測試完整的賣出操作流程
- **價格更新**: 測試價格更新對投資組合的影響

### E2E 測試
- **完整交易流程**: 從瀏覽股票到完成買賣的完整流程
- **投資組合管理**: 測試投資組合的計算和顯示
- **SSR 渲染**: 驗證頁面在伺服器端正確渲染

## 效能考量

### SSR 優化
- 使用 Nuxt 的 `useAsyncData` 進行資料預取
- 實作適當的快取策略
- 避免在伺服器端執行不必要的計算

### 客戶端優化
- 使用 `computed` 進行衍生狀態計算
- 實作虛擬滾動（如果股票列表很長）
- 使用 `debounce` 處理頻繁的價格更新

### 資料持久化
- 使用 `pinia-plugin-persistedstate` 自動持久化
- 僅持久化必要的狀態（portfolio 和 transactions）
- 實作資料版本控制以處理結構變更

## 響應式設計

### 斷點
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 佈局調整
- **Mobile**: 單欄佈局，堆疊卡片，簡化表格為卡片列表
- **Tablet**: 雙欄佈局，保留表格但調整欄位
- **Desktop**: 多欄佈局，完整表格顯示

### Tailwind 類別範例
```html
<!-- 響應式網格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- 響應式文字大小 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">

<!-- 響應式間距 -->
<div class="p-4 md:p-6 lg:p-8">
```

## 模擬資料生成

### 初始股票資料
系統將包含 10-15 支模擬股票，涵蓋不同產業：
- 科技股（TECH、SOFT、CHIP）
- 金融股（BANK、FIN、INS）
- 零售股（SHOP、RETAIL）
- 能源股（OIL、GAS、SOLAR）
- 醫療股（HEALTH、PHARMA、BIO）

### 價格生成邏輯
```typescript
// 生成隨機價格變動
function generatePriceChange(currentPrice: number): number {
  const changePercent = (Math.random() - 0.5) * 4; // -2% 到 +2%
  return currentPrice * (1 + changePercent / 100);
}

// 生成歷史價格
function generateHistoricalPrices(
  basePrice: number, 
  days: number
): PricePoint[] {
  const prices: PricePoint[] = [];
  let price = basePrice;
  const now = Date.now();
  
  for (let i = days; i >= 0; i--) {
    prices.push({
      timestamp: now - i * 24 * 60 * 60 * 1000,
      price: price
    });
    price = generatePriceChange(price);
  }
  
  return prices;
}
```

## 安全性考量

由於這是模擬環境，不涉及真實金錢或敏感資料：
- 所有資料儲存在客戶端 LocalStorage
- 不需要使用者認證
- 不需要後端資料庫
- API 端點僅提供模擬資料

## 未來擴展可能性

1. **多使用者支援**: 新增使用者認證和個人帳戶
2. **真實市場資料**: 整合真實股票 API（如 Alpha Vantage）
3. **進階圖表**: 新增技術指標（MA、RSI、MACD）
4. **排行榜**: 比較不同使用者的投資績效
5. **通知系統**: 價格警示和交易通知
6. **匯出功能**: 匯出交易記錄為 CSV 或 PDF
