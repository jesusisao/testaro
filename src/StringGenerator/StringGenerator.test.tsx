import React from 'react';
import { render } from '@testing-library/react';
import { generateManyChars } from './StringGenerator';

describe('generateManyChars', () => {
  test('num0', () => {
    const pattern = "○○○○○○○○○●"
    const result = generateManyChars(pattern, 0)
    expect(result).toBe("");
  });

  test('num21', () => {
    const pattern = "○○○○○○○○○●"
    const result = generateManyChars(pattern, 21)
    expect(result).toBe("○○○○○○○○○●○○○○○○○○○●○");
  });

  test('number is smaller than pattern', () => {
    const pattern = "○○○○○○○○○●"
    const result = generateManyChars(pattern, 9)
    expect(result).toBe("○○○○○○○○○");
  });

  test('no pattern', () => {
    const pattern = ""
    const result = generateManyChars(pattern, 10)
    expect(result).toBe("");
  });
})
