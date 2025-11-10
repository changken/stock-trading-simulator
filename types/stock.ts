/**
 * 股票價格點資料結構
 */
export interface PricePoint {
  /** 時間戳記 */
  timestamp: number;
  /** 價格 */
  price: number;
}

/**
 * 股票資料結構
 */
export interface Stock {
  /** 股票代碼 (例如: AAPL, TSLA) */
  symbol: string;
  /** 公司名稱 */
  name: string;
  /** 當前價格 */
  currentPrice: number;
  /** 前一日收盤價 */
  previousClose: number;
  /** 價格變動 */
  change: number;
  /** 變動百分比 */
  changePercent: number;
  /** 當日最高價 */
  dayHigh: number;
  /** 當日最低價 */
  dayLow: number;
  /** 交易量 */
  volume: number;
  /** 歷史價格資料 */
  historicalPrices: PricePoint[];
}
