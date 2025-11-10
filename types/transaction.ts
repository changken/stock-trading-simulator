/**
 * 交易記錄資料結構
 */
export interface Transaction {
  /** 交易 ID */
  id: string;
  /** 股票代碼 */
  symbol: string;
  /** 交易類型 */
  type: 'buy' | 'sell';
  /** 數量 */
  quantity: number;
  /** 交易價格 */
  price: number;
  /** 交易總額 */
  total: number;
  /** 交易時間戳記 */
  timestamp: number;
}
