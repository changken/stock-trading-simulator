import type { Stock } from '~/types/stock';
import { getStockBySymbol } from '../mock-data';

/**
 * API 端點：根據股票代碼獲取單一股票詳細資訊
 * GET /api/stocks/:symbol
 * 
 * @param event - Nuxt 事件處理器上下文
 * @returns 股票詳細資訊或 404 錯誤
 */
export default defineEventHandler((event): Stock => {
  const symbol = getRouterParam(event, 'symbol');

  if (!symbol) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少股票代碼參數',
    });
  }

  const stock = getStockBySymbol(symbol.toUpperCase());

  if (!stock) {
    throw createError({
      statusCode: 404,
      statusMessage: `找不到股票代碼: ${symbol}`,
    });
  }

  return stock;
});
