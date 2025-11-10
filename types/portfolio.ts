/**
 * 投資組合持股資料結構
 */
export interface PortfolioHolding {
  /** 股票代碼 */
  symbol: string;
  /** 持有數量 */
  quantity: number;
  /** 平均買入價格 */
  averagePrice: number;
  /** 當前價格 */
  currentPrice: number;
  /** 總成本 */
  totalCost: number;
  /** 當前價值 */
  currentValue: number;
  /** 損益 */
  profitLoss: number;
  /** 損益百分比 */
  profitLossPercent: number;
}

/**
 * 投資組合資料結構
 */
export interface Portfolio {
  /** 現金餘額 */
  cash: number;
  /** 持股列表 */
  holdings: PortfolioHolding[];
  /** 總資產價值 */
  totalValue: number;
  /** 總損益 */
  totalProfitLoss: number;
}
