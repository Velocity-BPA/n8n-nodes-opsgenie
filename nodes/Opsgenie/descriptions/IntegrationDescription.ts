/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const integrationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['integration'],
			},
		},
		options: [
			{
				name: 'Authenticate',
				value: 'authenticate',
				description: 'Authenticate an integration',
				action: 'Authenticate an integration',
			},
			{
				name: 'Disable',
				value: 'disable',
				description: 'Disable an integration',
				action: 'Disable an integration',
			},
			{
				name: 'Enable',
				value: 'enable',
				description: 'Enable an integration',
				action: 'Enable an integration',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of an integration',
				action: 'Get an integration',
			},
			{
				name: 'Get Actions',
				value: 'getActions',
				description: 'Get actions available for an integration',
				action: 'Get integration actions',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many integrations',
				action: 'Get many integrations',
			},
		],
		default: 'getAll',
	},
];

export const integrationFields: INodeProperties[] = [
	// ----------------------------------
	//         integration:get/enable/disable/authenticate/getActions
	// ----------------------------------
	{
		displayName: 'Integration ID',
		name: 'integrationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['integration'],
				operation: ['get', 'enable', 'disable', 'authenticate', 'getActions'],
			},
		},
		description: 'ID of the integration',
	},

	// ----------------------------------
	//         integration:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['integration'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['integration'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['integration'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				description: 'Filter by team ID',
			},
			{
				displayName: 'Team Name',
				name: 'teamName',
				type: 'string',
				default: '',
				description: 'Filter by team name',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				description: 'Filter by integration type (e.g., API, Webhook)',
			},
		],
	},
];
