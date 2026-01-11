/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/community',
		'prettier',
	],
	env: {
		node: true,
		es2020: true,
	},
	rules: {
		// TypeScript rules
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',

		// n8n specific rules
		'n8n-nodes-base/node-param-default-wrong-for-options': 'error',
		'n8n-nodes-base/node-param-description-boolean-without-whether': 'warn',
		'n8n-nodes-base/node-param-description-wrong-for-return-all': 'warn',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'warn',
		'n8n-nodes-base/node-param-option-description-identical-to-name': 'warn',
		'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
		'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',

		// General rules
		'no-console': 'off',
		'prefer-const': 'error',
		'no-var': 'error',
	},
	ignorePatterns: ['dist/**', 'node_modules/**', '*.js'],
};
