import type { Stock } from '~/types/stock';
import { mockStocks } from '../mock-data';

/**
 * API 端點：獲取所有股票列表
 * GET /api/stocks
 * 
 * @returns 所有股票的陣列
 */
export default defineEventHandler((): Stock[] => {
  return mockStocks;
});
