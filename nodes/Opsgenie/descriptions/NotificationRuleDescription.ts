/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const notificationRuleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['notificationRule'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a notification rule',
				action: 'Create a notification rule',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a notification rule',
				action: 'Delete a notification rule',
			},
			{
				name: 'Disable',
				value: 'disable',
				description: 'Disable a notification rule',
				action: 'Disable a notification rule',
			},
			{
				name: 'Enable',
				value: 'enable',
				description: 'Enable a notification rule',
				action: 'Enable a notification rule',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a notification rule',
				action: 'Get a notification rule',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many notification rules',
				action: 'Get many notification rules',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a notification rule',
				action: 'Update a notification rule',
			},
		],
		default: 'getAll',
	},
];

export const notificationRuleFields: INodeProperties[] = [
	// ----------------------------------
	//         notificationRule:create
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['create', 'getAll'],
			},
		},
		default: '',
		description: 'User ID or username (email) to create/list rules for',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the notification rule',
	},
	{
		displayName: 'Action Type',
		name: 'actionType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Create Alert',
				value: 'create-alert',
				description: 'When an alert is created',
			},
			{
				name: 'Acknowledged Alert',
				value: 'acknowledged-alert',
				description: 'When an alert is acknowledged',
			},
			{
				name: 'Closed Alert',
				value: 'closed-alert',
				description: 'When an alert is closed',
			},
			{
				name: 'Assigned Alert',
				value: 'assigned-alert',
				description: 'When an alert is assigned',
			},
			{
				name: 'Add Note',
				value: 'add-note',
				description: 'When a note is added to an alert',
			},
			{
				name: 'Schedule Start',
				value: 'schedule-start',
				description: 'When on-call schedule starts',
			},
			{
				name: 'Schedule End',
				value: 'schedule-end',
				description: 'When on-call schedule ends',
			},
			{
				name: 'Incoming Call Routing',
				value: 'incoming-call-routing',
				description: 'When an incoming call is routed',
			},
		],
		default: 'create-alert',
		description: 'Type of action that triggers this rule',
	},
	{
		displayName: 'Notification Steps (JSON)',
		name: 'notificationSteps',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['create'],
			},
		},
		default: '[\n  {\n    "contact": {\n      "method": "email",\n      "to": "default"\n    },\n    "sendAfter": {\n      "timeAmount": 0,\n      "timeUnit": "minutes"\n    },\n    "enabled": true\n  }\n]',
		description: 'JSON array of notification steps with contact method, timing, and enabled status',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Criteria (JSON)',
				name: 'criteria',
				type: 'json',
				default: '',
				description: 'JSON object with filter criteria for matching alerts',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the rule is enabled',
			},
			{
				displayName: 'Notification Time (JSON)',
				name: 'notificationTime',
				type: 'json',
				default: '[]',
				description: 'JSON array of notification time configurations',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'Order of the rule (lower = higher priority)',
			},
			{
				displayName: 'Repeat (JSON)',
				name: 'repeat',
				type: 'json',
				default: '',
				description: 'JSON object for repeat configuration',
			},
			{
				displayName: 'Schedules (JSON)',
				name: 'schedules',
				type: 'json',
				default: '[]',
				description: 'JSON array of schedule references for schedule-based rules',
			},
			{
				displayName: 'Time Restriction (JSON)',
				name: 'timeRestriction',
				type: 'json',
				default: '',
				description: 'JSON object for time-based restrictions',
			},
		],
	},

	// ----------------------------------
	//         notificationRule:get
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['get', 'update', 'delete', 'enable', 'disable'],
			},
		},
		default: '',
		description: 'User ID or username (email) that owns the rule',
	},
	{
		displayName: 'Rule ID',
		name: 'ruleId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['get', 'update', 'delete', 'enable', 'disable'],
			},
		},
		default: '',
		description: 'ID of the notification rule',
	},

	// ----------------------------------
	//         notificationRule:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['notificationRule'],
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
				resource: ['notificationRule'],
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
	//         notificationRule:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notificationRule'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Action Type',
				name: 'actionType',
				type: 'options',
				options: [
					{
						name: 'Create Alert',
						value: 'create-alert',
						description: 'When an alert is created',
					},
					{
						name: 'Acknowledged Alert',
						value: 'acknowledged-alert',
						description: 'When an alert is acknowledged',
					},
					{
						name: 'Closed Alert',
						value: 'closed-alert',
						description: 'When an alert is closed',
					},
					{
						name: 'Assigned Alert',
						value: 'assigned-alert',
						description: 'When an alert is assigned',
					},
					{
						name: 'Add Note',
						value: 'add-note',
						description: 'When a note is added to an alert',
					},
					{
						name: 'Schedule Start',
						value: 'schedule-start',
						description: 'When on-call schedule starts',
					},
					{
						name: 'Schedule End',
						value: 'schedule-end',
						description: 'When on-call schedule ends',
					},
					{
						name: 'Incoming Call Routing',
						value: 'incoming-call-routing',
						description: 'When an incoming call is routed',
					},
				],
				default: 'create-alert',
				description: 'Type of action that triggers this rule',
			},
			{
				displayName: 'Criteria (JSON)',
				name: 'criteria',
				type: 'json',
				default: '',
				description: 'JSON object with filter criteria for matching alerts',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the rule is enabled',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the notification rule',
			},
			{
				displayName: 'Notification Steps (JSON)',
				name: 'steps',
				type: 'json',
				default: '',
				description: 'JSON array of notification steps',
			},
			{
				displayName: 'Notification Time (JSON)',
				name: 'notificationTime',
				type: 'json',
				default: '[]',
				description: 'JSON array of notification time configurations',
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'number',
				default: 0,
				description: 'Order of the rule (lower = higher priority)',
			},
			{
				displayName: 'Repeat (JSON)',
				name: 'repeat',
				type: 'json',
				default: '',
				description: 'JSON object for repeat configuration',
			},
			{
				displayName: 'Schedules (JSON)',
				name: 'schedules',
				type: 'json',
				default: '[]',
				description: 'JSON array of schedule references for schedule-based rules',
			},
			{
				displayName: 'Time Restriction (JSON)',
				name: 'timeRestriction',
				type: 'json',
				default: '',
				description: 'JSON object for time-based restrictions',
			},
		],
	},
];
