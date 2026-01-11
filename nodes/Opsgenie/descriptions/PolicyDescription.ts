/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const policyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['policy'],
			},
		},
		options: [
			{
				name: 'Change Order',
				value: 'changeOrder',
				description: 'Change policy order',
				action: 'Change policy order',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new policy',
				action: 'Create a policy',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a policy',
				action: 'Delete a policy',
			},
			{
				name: 'Disable',
				value: 'disable',
				description: 'Disable a policy',
				action: 'Disable a policy',
			},
			{
				name: 'Enable',
				value: 'enable',
				description: 'Enable a policy',
				action: 'Enable a policy',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a policy by ID',
				action: 'Get a policy',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many policies',
				action: 'Get many policies',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a policy',
				action: 'Update a policy',
			},
		],
		default: 'getAll',
	},
];

export const policyFields: INodeProperties[] = [
	// ----------------------------------
	//         policy:create
	// ----------------------------------
	{
		displayName: 'Policy Type',
		name: 'policyType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Alert',
				value: 'alert',
				description: 'Alert policy',
			},
			{
				name: 'Notification',
				value: 'notification',
				description: 'Notification policy',
			},
		],
		default: 'alert',
		description: 'Type of policy to create',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the policy',
	},
	{
		displayName: 'Team Name or ID',
		name: 'teamId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Team ID or name for team policy. Leave empty for global policy.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Actions',
				name: 'actions',
				type: 'string',
				default: '',
				description: 'Comma-separated list of modified actions',
			},
			{
				displayName: 'Alert Description',
				name: 'alertDescription',
				type: 'string',
				default: '',
				description: 'Modified alert description',
			},
			{
				displayName: 'Alias',
				name: 'alias',
				type: 'string',
				default: '',
				description: 'Modified alias for the alert',
			},
			{
				displayName: 'Continue',
				name: 'continue',
				type: 'boolean',
				default: true,
				description: 'Whether to continue to next policy if this one matches',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the policy is enabled',
			},
			{
				displayName: 'Entity',
				name: 'entity',
				type: 'string',
				default: '',
				description: 'Modified entity field',
			},
			{
				displayName: 'Filter Conditions (JSON)',
				name: 'filterConditions',
				type: 'json',
				default: '[]',
				description: 'JSON array of filter conditions',
			},
			{
				displayName: 'Filter Type',
				name: 'filterType',
				type: 'options',
				options: [
					{
						name: 'Match All',
						value: 'match-all',
					},
					{
						name: 'Match All Conditions',
						value: 'match-all-conditions',
					},
					{
						name: 'Match Any Condition',
						value: 'match-any-condition',
					},
				],
				default: 'match-all',
				description: 'Filter matching type',
			},
			{
				displayName: 'Ignore Original Actions',
				name: 'ignoreOriginalActions',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert actions',
			},
			{
				displayName: 'Ignore Original Details',
				name: 'ignoreOriginalDetails',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert details',
			},
			{
				displayName: 'Ignore Original Responders',
				name: 'ignoreOriginalResponders',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert responders',
			},
			{
				displayName: 'Ignore Original Tags',
				name: 'ignoreOriginalTags',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert tags',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Modified alert message',
			},
			{
				displayName: 'Policy Description',
				name: 'policyDescription',
				type: 'string',
				default: '',
				description: 'Description of the policy',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'P1 - Critical', value: 'P1' },
					{ name: 'P2 - High', value: 'P2' },
					{ name: 'P3 - Moderate', value: 'P3' },
					{ name: 'P4 - Low', value: 'P4' },
					{ name: 'P5 - Informational', value: 'P5' },
				],
				default: 'P3',
				description: 'Modified priority',
			},
			{
				displayName: 'Responders (JSON)',
				name: 'responders',
				type: 'json',
				default: '[]',
				description: 'JSON array of responders to add',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Modified source field',
			},
			{
				displayName: 'Suppress',
				name: 'suppress',
				type: 'boolean',
				default: false,
				description: 'Whether to suppress matching alerts',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags to add',
			},
			{
				displayName: 'Time Restrictions (JSON)',
				name: 'timeRestrictions',
				type: 'json',
				default: '',
				description: 'JSON object for time-based restrictions',
			},
		],
	},

	// ----------------------------------
	//         policy:get
	// ----------------------------------
	{
		displayName: 'Policy ID',
		name: 'policyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get', 'update', 'delete', 'enable', 'disable', 'changeOrder'],
			},
		},
		default: '',
		description: 'ID of the policy',
	},
	{
		displayName: 'Policy Type',
		name: 'policyType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get', 'update', 'delete', 'enable', 'disable', 'changeOrder'],
			},
		},
		options: [
			{
				name: 'Alert',
				value: 'alert',
				description: 'Alert policy',
			},
			{
				name: 'Notification',
				value: 'notification',
				description: 'Notification policy',
			},
		],
		default: 'alert',
		description: 'Type of policy',
	},
	{
		displayName: 'Team Name or ID',
		name: 'teamId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get', 'update', 'delete', 'enable', 'disable', 'changeOrder', 'getAll'],
			},
		},
		default: '',
		description: 'Team ID or name. Leave empty for global policies.',
	},

	// ----------------------------------
	//         policy:getAll
	// ----------------------------------
	{
		displayName: 'Policy Type',
		name: 'policyType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Alert',
				value: 'alert',
				description: 'Alert policies',
			},
			{
				name: 'Notification',
				value: 'notification',
				description: 'Notification policies',
			},
		],
		default: 'alert',
		description: 'Type of policies to retrieve',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         policy:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Actions',
				name: 'actions',
				type: 'string',
				default: '',
				description: 'Comma-separated list of modified actions',
			},
			{
				displayName: 'Alert Description',
				name: 'alertDescription',
				type: 'string',
				default: '',
				description: 'Modified alert description',
			},
			{
				displayName: 'Alias',
				name: 'alias',
				type: 'string',
				default: '',
				description: 'Modified alias for the alert',
			},
			{
				displayName: 'Continue',
				name: 'continue',
				type: 'boolean',
				default: true,
				description: 'Whether to continue to next policy if this one matches',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the policy is enabled',
			},
			{
				displayName: 'Entity',
				name: 'entity',
				type: 'string',
				default: '',
				description: 'Modified entity field',
			},
			{
				displayName: 'Filter Conditions (JSON)',
				name: 'filterConditions',
				type: 'json',
				default: '[]',
				description: 'JSON array of filter conditions',
			},
			{
				displayName: 'Filter Type',
				name: 'filterType',
				type: 'options',
				options: [
					{
						name: 'Match All',
						value: 'match-all',
					},
					{
						name: 'Match All Conditions',
						value: 'match-all-conditions',
					},
					{
						name: 'Match Any Condition',
						value: 'match-any-condition',
					},
				],
				default: 'match-all',
				description: 'Filter matching type',
			},
			{
				displayName: 'Ignore Original Actions',
				name: 'ignoreOriginalActions',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert actions',
			},
			{
				displayName: 'Ignore Original Details',
				name: 'ignoreOriginalDetails',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert details',
			},
			{
				displayName: 'Ignore Original Responders',
				name: 'ignoreOriginalResponders',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert responders',
			},
			{
				displayName: 'Ignore Original Tags',
				name: 'ignoreOriginalTags',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore original alert tags',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Modified alert message',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the policy',
			},
			{
				displayName: 'Policy Description',
				name: 'policyDescription',
				type: 'string',
				default: '',
				description: 'Description of the policy',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'P1 - Critical', value: 'P1' },
					{ name: 'P2 - High', value: 'P2' },
					{ name: 'P3 - Moderate', value: 'P3' },
					{ name: 'P4 - Low', value: 'P4' },
					{ name: 'P5 - Informational', value: 'P5' },
				],
				default: 'P3',
				description: 'Modified priority',
			},
			{
				displayName: 'Responders (JSON)',
				name: 'responders',
				type: 'json',
				default: '[]',
				description: 'JSON array of responders to add',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Modified source field',
			},
			{
				displayName: 'Suppress',
				name: 'suppress',
				type: 'boolean',
				default: false,
				description: 'Whether to suppress matching alerts',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags to add',
			},
			{
				displayName: 'Time Restrictions (JSON)',
				name: 'timeRestrictions',
				type: 'json',
				default: '',
				description: 'JSON object for time-based restrictions',
			},
		],
	},

	// ----------------------------------
	//         policy:changeOrder
	// ----------------------------------
	{
		displayName: 'Target Index',
		name: 'targetIndex',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['changeOrder'],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'New index (order) for the policy (0-based)',
	},
];
