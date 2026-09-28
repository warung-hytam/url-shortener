import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([...nextVitals, prettierRecommended, globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])]);
