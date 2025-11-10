import type { PricePoint } from '~/types/stock';

/**
 * 生成隨機價格變動
 * @param currentPrice 當前價格
 * @returns 新的價格
 */
export function generatePriceChange(currentPrice: number): number {
  // 生成 -2% 到 +2% 的隨機變動
  const changePercent = (Math.random() - 0.5) * 4;
  return currentPrice * (1 + changePercent / 100);
}

/**
 * 生成歷史價格資料
 * @param basePrice 基礎價格
 * @param days 天數
 * @returns 歷史價格點陣列
 */
export function generateHistoricalPrices(
  basePrice: number,
  days: number
): PricePoint[] {
  const prices: PricePoint[] = [];
  let price = basePrice;
  const now = Date.now();

  for (let i = days; i >= 0; i--) {
    prices.push({
      timestamp: now - i * 24 * 60 * 60 * 1000,
      price: Math.round(price * 100) / 100, // 四捨五入到小數點後兩位
    });
    price = generatePriceChange(price);
  }

  return prices;
}
