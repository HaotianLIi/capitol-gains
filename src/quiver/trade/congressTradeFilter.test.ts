import { describe, test, expect } from 'bun:test';
import { filterTrades, validateFilters } from './congressTradeFilter';
import { mockFilterTrades } from './mockData.ts';
import { getCongressTradeData } from './congressTrade.ts';

export const allTrade = await getCongressTradeData();

describe("FilterTrades - one to many scenarios", () => {
  mockFilterTrades.forEach(testCase => {
    test(testCase.name, () => {
      const result = filterTrades(allTrade, testCase.filters);

      result.forEach(trade => {
        if (testCase.filters.ticker) {
          expect(trade.Ticker).toBe(testCase.filters.ticker);
        }
        if (testCase.filters.transaction) {
          expect(trade.Transaction).toBe(testCase.filters.transaction);
        }
        if (testCase.filters.representative) {
          expect(trade.Representative).toBe(testCase.filters.representative);
        }
        if (testCase.filters.transactionDate) {
          expect(trade.TransactionDate).toBe(testCase.filters.transactionDate);
        }
      })
    })
  })
})

// Testing validation works for all scenarios
describe("Testing validateFilters", () => {
  mockFilterTrades.forEach(testCase => {
    test(`Validates: ${testCase.name}`, () => {
      const result = validateFilters(testCase.filters);
      expect(result).toEqual(testCase.filters);
    })
  })
})
