/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Integration tests for n8n-nodes-opsgenie
 *
 * These tests require a valid Opsgenie API key and should be run manually.
 * Set the following environment variables before running:
 *   - OPSGENIE_API_KEY: Your Opsgenie GenieKey
 *   - OPSGENIE_REGION: 'US' or 'EU'
 *
 * Run with: OPSGENIE_API_KEY=xxx npm run test:integration
 */

describe('Opsgenie Integration Tests', () => {
	const apiKey = process.env.OPSGENIE_API_KEY;
	const region = process.env.OPSGENIE_REGION || 'US';

	const skip = !apiKey;

	beforeAll(() => {
		if (skip) {
			console.log('Skipping integration tests: OPSGENIE_API_KEY not set');
		}
	});

	describe('API Connection', () => {
		(skip ? it.skip : it)('should connect to Opsgenie API', async () => {
			const baseUrl =
				region === 'EU'
					? 'https://api.eu.opsgenie.com/v2'
					: 'https://api.opsgenie.com/v2';

			const response = await fetch(`${baseUrl}/heartbeats`, {
				method: 'GET',
				headers: {
					Authorization: `GenieKey ${apiKey}`,
					'Content-Type': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(data).toHaveProperty('requestId');
		});
	});

	describe('Alert Operations', () => {
		(skip ? it.skip : it)('should list alerts', async () => {
			const baseUrl =
				region === 'EU'
					? 'https://api.eu.opsgenie.com/v2'
					: 'https://api.opsgenie.com/v2';

			const response = await fetch(`${baseUrl}/alerts?limit=1`, {
				method: 'GET',
				headers: {
					Authorization: `GenieKey ${apiKey}`,
					'Content-Type': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Team Operations', () => {
		(skip ? it.skip : it)('should list teams', async () => {
			const baseUrl =
				region === 'EU'
					? 'https://api.eu.opsgenie.com/v2'
					: 'https://api.opsgenie.com/v2';

			const response = await fetch(`${baseUrl}/teams`, {
				method: 'GET',
				headers: {
					Authorization: `GenieKey ${apiKey}`,
					'Content-Type': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('User Operations', () => {
		(skip ? it.skip : it)('should list users', async () => {
			const baseUrl =
				region === 'EU'
					? 'https://api.eu.opsgenie.com/v2'
					: 'https://api.opsgenie.com/v2';

			const response = await fetch(`${baseUrl}/users?limit=1`, {
				method: 'GET',
				headers: {
					Authorization: `GenieKey ${apiKey}`,
					'Content-Type': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Schedule Operations', () => {
		(skip ? it.skip : it)('should list schedules', async () => {
			const baseUrl =
				region === 'EU'
					? 'https://api.eu.opsgenie.com/v2'
					: 'https://api.opsgenie.com/v2';

			const response = await fetch(`${baseUrl}/schedules`, {
				method: 'GET',
				headers: {
					Authorization: `GenieKey ${apiKey}`,
					'Content-Type': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(data).toHaveProperty('data');
			expect(Array.isArray(data.data)).toBe(true);
		});
	});

	describe('Heartbeat Operations', () => {
		(skip ? it.skip : it)('should list heartbeats', async () => {
			const baseUrl =
				region === 'EU'
					? 'https://api.eu.opsgenie.com/v2'
					: 'https://api.opsgenie.com/v2';

			const response = await fetch(`${baseUrl}/heartbeats`, {
				method: 'GET',
				headers: {
					Authorization: `GenieKey ${apiKey}`,
					'Content-Type': 'application/json',
				},
			});

			expect(response.ok).toBe(true);
			const data = await response.json();
			expect(data).toHaveProperty('requestId');
		});
	});
});
