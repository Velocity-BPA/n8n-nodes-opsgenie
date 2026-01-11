/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const serviceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['service'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new service',
				action: 'Create a service',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a service',
				action: 'Delete a service',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a service',
				action: 'Get a service',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many services',
				action: 'Get many services',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a service',
				action: 'Update a service',
			},
		],
		default: 'getAll',
	},
];

export const serviceFields: INodeProperties[] = [
	// ----------------------------------
	//         service:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['create'],
			},
		},
		description: 'Name of the service',
	},
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['create'],
			},
		},
		description: 'ID of the owning team',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the service',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the service',
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{ name: 'Team Members', value: 'TEAM_MEMBERS' },
					{ name: 'Opsgenie Users', value: 'OPSGENIE_USERS' },
				],
				default: 'TEAM_MEMBERS',
				description: 'Visibility of the service',
			},
		],
	},

	// ----------------------------------
	//         service:get/update/delete
	// ----------------------------------
	{
		displayName: 'Service ID',
		name: 'serviceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['service'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'ID of the service',
	},

	// ----------------------------------
	//         service:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['service'],
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
				resource: ['service'],
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
				resource: ['service'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Name', value: 'name' },
					{ name: 'Created At', value: 'createdAt' },
				],
				default: 'name',
				description: 'Field to sort results by',
			},
			{
				displayName: 'Sort Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'asc',
				description: 'Sort order for results',
			},
		],
	},

	// ----------------------------------
	//         service:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['service'],
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
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags',
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				options: [
					{ name: 'Team Members', value: 'TEAM_MEMBERS' },
					{ name: 'Opsgenie Users', value: 'OPSGENIE_USERS' },
				],
				default: 'TEAM_MEMBERS',
			},
		],
	},
];
