/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const escalationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['escalation'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new escalation',
				action: 'Create an escalation',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an escalation',
				action: 'Delete an escalation',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of an escalation',
				action: 'Get an escalation',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many escalations',
				action: 'Get many escalations',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an escalation',
				action: 'Update an escalation',
			},
		],
		default: 'getAll',
	},
];

export const escalationFields: INodeProperties[] = [
	// ----------------------------------
	//         escalation:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['create'],
			},
		},
		description: 'Name of the escalation',
	},
	{
		displayName: 'Rules',
		name: 'rulesUi',
		type: 'fixedCollection',
		required: true,
		placeholder: 'Add Rule',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Rule',
				name: 'ruleValues',
				values: [
					{
						displayName: 'Condition',
						name: 'condition',
						type: 'options',
						options: [
							{ name: 'If Not Acknowledged', value: 'if-not-acked' },
							{ name: 'If Not Closed', value: 'if-not-closed' },
						],
						default: 'if-not-acked',
						description: 'Condition for escalation',
					},
					{
						displayName: 'Notify Type',
						name: 'notifyType',
						type: 'options',
						options: [
							{ name: 'Default', value: 'default' },
							{ name: 'Next', value: 'next' },
							{ name: 'Previous', value: 'previous' },
							{ name: 'Users', value: 'users' },
							{ name: 'Admins', value: 'admins' },
							{ name: 'Random', value: 'random' },
							{ name: 'All', value: 'all' },
						],
						default: 'default',
						description: 'How to notify recipients',
					},
					{
						displayName: 'Delay (Minutes)',
						name: 'delayMinutes',
						type: 'number',
						default: 5,
						description: 'Delay before escalating',
					},
					{
						displayName: 'Recipient Type',
						name: 'recipientType',
						type: 'options',
						options: [
							{ name: 'Escalation', value: 'escalation' },
							{ name: 'Schedule', value: 'schedule' },
							{ name: 'Team', value: 'team' },
							{ name: 'User', value: 'user' },
						],
						default: 'user',
						description: 'Type of recipient',
					},
					{
						displayName: 'Recipient ID',
						name: 'recipientId',
						type: 'string',
						default: '',
						description: 'ID of the recipient',
					},
					{
						displayName: 'Recipient Name',
						name: 'recipientName',
						type: 'string',
						default: '',
						description: 'Name of the recipient (for team/schedule)',
					},
					{
						displayName: 'Recipient Username',
						name: 'recipientUsername',
						type: 'string',
						default: '',
						description: 'Username of the recipient (for user)',
					},
				],
			},
		],
		description: 'Escalation rules defining the escalation path',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the escalation',
			},
			{
				displayName: 'Owner Team ID',
				name: 'ownerTeamId',
				type: 'string',
				default: '',
				description: 'ID of the owner team',
			},
			{
				displayName: 'Owner Team Name',
				name: 'ownerTeamName',
				type: 'string',
				default: '',
				description: 'Name of the owner team',
			},
			{
				displayName: 'Repeat Close Alert After All',
				name: 'closeAlertAfterAll',
				type: 'boolean',
				default: false,
				description: 'Whether to close alert after all repetitions',
			},
			{
				displayName: 'Repeat Count',
				name: 'repeatCount',
				type: 'number',
				default: 0,
				description: 'Number of times to repeat the escalation',
			},
			{
				displayName: 'Repeat Reset Recipient States',
				name: 'resetRecipientStates',
				type: 'boolean',
				default: false,
				description: 'Whether to reset recipient states on repeat',
			},
			{
				displayName: 'Repeat Wait Interval (Minutes)',
				name: 'waitInterval',
				type: 'number',
				default: 0,
				description: 'Wait interval between repeats',
			},
		],
	},

	// ----------------------------------
	//         escalation:get/update/delete
	// ----------------------------------
	{
		displayName: 'Escalation ID',
		name: 'escalationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Identifier of the escalation (ID or name)',
	},
	{
		displayName: 'Identifier Type',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'ID', value: 'id' },
			{ name: 'Name', value: 'name' },
		],
		default: 'id',
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Type of identifier provided',
	},

	// ----------------------------------
	//         escalation:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['escalation'],
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
				resource: ['escalation'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         escalation:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['escalation'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Owner Team ID',
				name: 'ownerTeamId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Owner Team Name',
				name: 'ownerTeamName',
				type: 'string',
				default: '',
			},
		],
	},
];
