/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const maintenanceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['maintenance'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel an active maintenance window',
				action: 'Cancel a maintenance window',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new maintenance window',
				action: 'Create a maintenance window',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a maintenance window',
				action: 'Delete a maintenance window',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a maintenance window',
				action: 'Get a maintenance window',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many maintenance windows',
				action: 'Get many maintenance windows',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a maintenance window',
				action: 'Update a maintenance window',
			},
		],
		default: 'getAll',
	},
];

export const maintenanceFields: INodeProperties[] = [
	// ----------------------------------
	//         maintenance:create
	// ----------------------------------
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['maintenance'],
				operation: ['create'],
			},
		},
		description: 'Description of the maintenance window',
	},
	{
		displayName: 'Time Type',
		name: 'timeType',
		type: 'options',
		required: true,
		options: [
			{ name: 'For (Duration)', value: 'for' },
			{ name: 'Schedule (Start/End)', value: 'schedule' },
			{ name: 'Time of Day', value: 'time-of-day' },
		],
		default: 'for',
		displayOptions: {
			show: {
				resource: ['maintenance'],
				operation: ['create'],
			},
		},
		description: 'Type of time specification for the maintenance window',
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'number',
		required: true,
		default: 60,
		displayOptions: {
			show: {
				resource: ['maintenance'],
				operation: ['create'],
				timeType: ['for'],
			},
		},
		description: 'Duration of the maintenance window',
	},
	{
		displayName: 'Duration Unit',
		name: 'durationUnit',
		type: 'options',
		options: [
			{ name: 'Minutes', value: 'minutes' },
			{ name: 'Hours', value: 'hours' },
			{ name: 'Days', value: 'days' },
		],
		default: 'minutes',
		displayOptions: {
			show: {
				resource: ['maintenance'],
				operation: ['create'],
				timeType: ['for'],
			},
		},
		description: 'Unit of the duration',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['maintenance'],
				operation: ['create'],
				timeType: ['schedule'],
			},
		},
		description: 'Start date of the maintenance window',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['maintenance'],
				operation: ['create'],
				timeType: ['schedule'],
			},
		},
		description: 'End date of the maintenance window',
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
				resource: ['maintenance'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Rule',
				name: 'ruleValues',
				values: [
					{
						displayName: 'State',
						name: 'state',
						type: 'options',
						options: [
							{ name: 'Enabled', value: 'enabled' },
							{ name: 'Disabled', value: 'disabled' },
						],
						default: 'disabled',
						description: 'State for affected entities during maintenance',
					},
					{
						displayName: 'Entity Type',
						name: 'entityType',
						type: 'options',
						options: [
							{ name: 'Integration', value: 'integration' },
							{ name: 'Policy', value: 'policy' },
						],
						default: 'integration',
						description: 'Type of entity affected',
					},
					{
						displayName: 'Entity ID',
						name: 'entityId',
						type: 'string',
						default: '',
						description: 'ID of the entity affected',
					},
				],
			},
		],
		description: 'Rules defining which entities are affected by the maintenance',
	},

	// ----------------------------------
	//         maintenance:get/update/delete/cancel
	// ----------------------------------
	{
		displayName: 'Maintenance ID',
		name: 'maintenanceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['maintenance'],
				operation: ['get', 'update', 'delete', 'cancel'],
			},
		},
		description: 'ID of the maintenance window',
	},

	// ----------------------------------
	//         maintenance:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['maintenance'],
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
				resource: ['maintenance'],
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
				resource: ['maintenance'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Past', value: 'past' },
					{ name: 'Non-Expired', value: 'non-expired' },
				],
				default: 'all',
				description: 'Filter by maintenance type',
			},
		],
	},

	// ----------------------------------
	//         maintenance:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['maintenance'],
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
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
			},
		],
	},
];
