/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	buildIdentifierQuery,
	parseResponders,
	parseTags,
	parseDetails,
	formatDateToISO,
} from '../../nodes/Opsgenie/GenericFunctions';

describe('GenericFunctions', () => {
	describe('buildIdentifierQuery', () => {
		it('should return empty object for id type', () => {
			const result = buildIdentifierQuery('id');
			expect(result).toEqual({});
		});

		it('should return identifierType for alias', () => {
			const result = buildIdentifierQuery('alias');
			expect(result).toEqual({ identifierType: 'alias' });
		});

		it('should return identifierType for name', () => {
			const result = buildIdentifierQuery('name');
			expect(result).toEqual({ identifierType: 'name' });
		});

		it('should return identifierType for tiny', () => {
			const result = buildIdentifierQuery('tiny');
			expect(result).toEqual({ identifierType: 'tiny' });
		});
	});

	describe('parseResponders', () => {
		it('should return empty array for empty object', () => {
			const result = parseResponders({});
			expect(result).toEqual([]);
		});

		it('should return empty array for object without responderValues', () => {
			const result = parseResponders({ someOtherKey: 'value' });
			expect(result).toEqual([]);
		});

		it('should parse responders with id', () => {
			const input = {
				responderValues: [
					{ type: 'team', id: '123' },
					{ type: 'user', id: '456' },
				],
			};
			const result = parseResponders(input);
			expect(result).toEqual([
				{ type: 'team', id: '123' },
				{ type: 'user', id: '456' },
			]);
		});

		it('should parse responders with name', () => {
			const input = {
				responderValues: [
					{ type: 'team', name: 'Engineering' },
				],
			};
			const result = parseResponders(input);
			expect(result).toEqual([
				{ type: 'team', name: 'Engineering' },
			]);
		});

		it('should parse responders with username', () => {
			const input = {
				responderValues: [
					{ type: 'user', username: 'john@example.com' },
				],
			};
			const result = parseResponders(input);
			expect(result).toEqual([
				{ type: 'user', username: 'john@example.com' },
			]);
		});
	});

	describe('parseTags', () => {
		it('should return empty array for empty string', () => {
			const result = parseTags('');
			expect(result).toEqual([]);
		});

		it('should parse comma-separated tags', () => {
			const input = 'tag1,tag2,tag3';
			const result = parseTags(input);
			expect(result).toEqual(['tag1', 'tag2', 'tag3']);
		});

		it('should trim whitespace from tags', () => {
			const input = 'tag1 , tag2 , tag3';
			const result = parseTags(input);
			expect(result).toEqual(['tag1', 'tag2', 'tag3']);
		});

		it('should filter empty tags', () => {
			const input = 'tag1,,tag2,';
			const result = parseTags(input);
			expect(result).toEqual(['tag1', 'tag2']);
		});
	});

	describe('parseDetails', () => {
		it('should return empty object for empty object', () => {
			const result = parseDetails({});
			expect(result).toEqual({});
		});

		it('should return empty object for object without detailValues', () => {
			const result = parseDetails({ someOtherKey: 'value' });
			expect(result).toEqual({});
		});

		it('should parse details with key-value pairs', () => {
			const input = {
				detailValues: [
					{ key: 'key1', value: 'value1' },
					{ key: 'key2', value: 'value2' },
				],
			};
			const result = parseDetails(input);
			expect(result).toEqual({ key1: 'value1', key2: 'value2' });
		});

		it('should handle values with special characters', () => {
			const input = {
				detailValues: [
					{ key: 'url', value: 'https://example.com?param=value' },
					{ key: 'json', value: '{"nested": "data"}' },
				],
			};
			const result = parseDetails(input);
			expect(result).toEqual({
				url: 'https://example.com?param=value',
				json: '{"nested": "data"}',
			});
		});

		it('should skip entries without key', () => {
			const input = {
				detailValues: [
					{ key: 'key1', value: 'value1' },
					{ value: 'value2' }, // no key
				],
			};
			const result = parseDetails(input);
			expect(result).toEqual({ key1: 'value1' });
		});
	});

	describe('formatDateToISO', () => {
		it('should return ISO string for valid date', () => {
			const input = '2024-01-15T10:30:00.000Z';
			const result = formatDateToISO(input);
			expect(result).toBe(input);
		});

		it('should convert date string to ISO format', () => {
			const input = '2024-01-15';
			const result = formatDateToISO(input);
			expect(result).toContain('2024-01-15');
			expect(result).toContain('T');
		});

		it('should throw error for invalid date', () => {
			expect(() => formatDateToISO('invalid-date')).toThrow('Invalid date format');
		});

		it('should throw error for empty string', () => {
			expect(() => formatDateToISO('')).toThrow('Invalid date format');
		});
	});
});

describe('Opsgenie Node', () => {
	describe('Node Structure', () => {
		it('should have correct resources', async () => {
			// Dynamically import to avoid initialization issues
			const { Opsgenie } = await import('../../nodes/Opsgenie/Opsgenie.node');
			const node = new Opsgenie();

			const resourceProperty = node.description.properties.find(
				(p) => p.name === 'resource'
			);

			expect(resourceProperty).toBeDefined();
			expect(resourceProperty?.type).toBe('options');

			const resources = (resourceProperty as any)?.options?.map((o: any) => o.value) || [];
			expect(resources).toContain('alert');
			expect(resources).toContain('incident');
			expect(resources).toContain('team');
			expect(resources).toContain('user');
			expect(resources).toContain('schedule');
			expect(resources).toContain('escalation');
			expect(resources).toContain('integration');
			expect(resources).toContain('service');
			expect(resources).toContain('maintenance');
			expect(resources).toContain('heartbeat');
			expect(resources).toContain('policy');
			expect(resources).toContain('notificationRule');
		});

		it('should have correct node metadata', async () => {
			const { Opsgenie } = await import('../../nodes/Opsgenie/Opsgenie.node');
			const node = new Opsgenie();

			expect(node.description.displayName).toBe('Opsgenie');
			expect(node.description.name).toBe('opsgenie');
			expect(node.description.group).toContain('transform');
			expect(node.description.version).toBe(1);
		});
	});
});

describe('Opsgenie Trigger Node', () => {
	describe('Node Structure', () => {
		it('should have correct events', async () => {
			const { OpsgenieTrigger } = await import('../../nodes/Opsgenie/OpsgenieTrigger.node');
			const node = new OpsgenieTrigger();

			const eventsProperty = node.description.properties.find(
				(p) => p.name === 'events'
			);

			expect(eventsProperty).toBeDefined();
			expect(eventsProperty?.type).toBe('multiOptions');

			const events = (eventsProperty as any)?.options?.map((o: any) => o.value) || [];
			expect(events).toContain('Create');
			expect(events).toContain('Close');
			expect(events).toContain('Acknowledge');
			expect(events).toContain('Escalate');
		});

		it('should have correct trigger metadata', async () => {
			const { OpsgenieTrigger } = await import('../../nodes/Opsgenie/OpsgenieTrigger.node');
			const node = new OpsgenieTrigger();

			expect(node.description.displayName).toBe('Opsgenie Trigger');
			expect(node.description.name).toBe('opsgenieTrigger');
			expect(node.description.group).toContain('trigger');
		});
	});
});

describe('Opsgenie Credentials', () => {
	it('should have correct credential properties', async () => {
		const { OpsgenieApi } = await import('../../credentials/OpsgenieApi.credentials');
		const credentials = new OpsgenieApi();

		expect(credentials.name).toBe('opsgenieApi');
		expect(credentials.displayName).toBe('Opsgenie API');

		const properties = credentials.properties;
		const apiKeyProp = properties.find((p) => p.name === 'apiKey');
		const regionProp = properties.find((p) => p.name === 'region');

		expect(apiKeyProp).toBeDefined();
		expect(apiKeyProp?.type).toBe('string');
		expect(apiKeyProp?.typeOptions?.password).toBe(true);

		expect(regionProp).toBeDefined();
		expect(regionProp?.type).toBe('options');
	});
});
