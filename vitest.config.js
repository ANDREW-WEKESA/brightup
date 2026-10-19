import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment
    environment: 'jsdom',
    
    // Setup files
    setupFiles: ['./client/tests/setup.js'],
    
    // Global test utilities
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
        '**/tests/**',
        '**/__tests__/**',
        '**/coverage/**',
        '**/.vite/**',
      ],
      all: true,
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
    },
    
    // Test file patterns
    include: [
      'client/**/*.{test,spec}.{js,jsx}',
      'client/tests/**/*.{js,jsx}',
    ],
    
    // Files to exclude
    exclude: [
      'node_modules',
      'dist',
      'build',
      '.vite',
      'coverage',
    ],
    
    // Test timeout
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Reporter
    reporter: 'verbose',
    
    // Mock reset
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@components': path.resolve(__dirname, './client/src/components'),
      '@pages': path.resolve(__dirname, './client/src/pages'),
      '@utils': path.resolve(__dirname, './client/src/utils'),
      '@hooks': path.resolve(__dirname, './client/src/hooks'),
    },
  },
});
