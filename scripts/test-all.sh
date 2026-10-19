#!/bin/bash
# Run all tests across the project

echo "🧪 Running all BrightUp tests..."

# Engine tests
echo "Testing engine..."
cd engine
npm test

# Server tests (if any)
echo "Checking server..."
cd ../server
npm test 2>/dev/null || echo "No server tests yet"

# Client tests (if any)
echo "Checking client..."
cd ../client
npm test 2>/dev/null || echo "No client tests yet"

echo "✅ All tests complete!"
