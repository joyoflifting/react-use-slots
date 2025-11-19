#!/usr/bin/env node

/**
 * Smoke test for the built package.
 * Validates that:
 * 1. dist files exist
 * 2. The package can be imported
 * 3. Exports are correct
 */

import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🧪 Running package smoke tests...\n');

// Test 1: Check dist files exist
console.log('✓ Checking dist files exist...');
const requiredFiles = [
  'dist/index.js',
  'dist/index.d.ts',
  'dist/useSlots.js',
  'dist/useSlots.d.ts'
];

let hasErrors = false;

for (const file of requiredFiles) {
  const filePath = join(rootDir, file);
  if (!existsSync(filePath)) {
    console.error(`  ✗ Missing file: ${file}`);
    hasErrors = true;
  } else {
    console.log(`  ✓ ${file}`);
  }
}

if (hasErrors) {
  console.error('\n❌ Package validation failed: missing required files');
  process.exit(1);
}

// Test 2: Import the package
console.log('\n✓ Testing package imports...');
try {
  const { useSlots, default: defaultExport } = await import(join(rootDir, 'dist/index.js'));
  
  if (typeof useSlots !== 'function') {
    console.error('  ✗ useSlots is not a function');
    hasErrors = true;
  } else {
    console.log('  ✓ Named export: useSlots');
  }
  
  if (typeof defaultExport !== 'function') {
    console.error('  ✗ default export is not a function');
    hasErrors = true;
  } else {
    console.log('  ✓ Default export: useSlots');
  }
  
  if (useSlots !== defaultExport) {
    console.error('  ✗ Named and default exports are not the same');
    hasErrors = true;
  }
  
} catch (error) {
  console.error('  ✗ Failed to import package:', error.message);
  hasErrors = true;
}

if (hasErrors) {
  console.error('\n❌ Package validation failed');
  process.exit(1);
}

console.log('\n✅ All package tests passed!');
