/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const heartbeatOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['heartbeat'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new heartbeat',
				action: 'Create a heartbeat',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a heartbeat',
				action: 'Delete a heartbeat',
			},
			{
				name: 'Disable',
				value: 'disable',
				description: 'Disable a heartbeat',
				action: 'Disable a heartbeat',
			},
			{
				name: 'Enable',
				value: 'enable',
				description: 'Enable a heartbeat',
				action: 'Enable a heartbeat',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a heartbeat',
				action: 'Get a heartbeat',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many heartbeats',
				action: 'Get many heartbeats',
			},
			{
				name: 'Ping',
				value: 'ping',
				description: 'Send a heartbeat ping',
				action: 'Send heartbeat ping',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a heartbeat',
				action: 'Update a heartbeat',
			},
		],
		default: 'getAll',
	},
];

export const heartbeatFields: INodeProperties[] = [
	// ----------------------------------
	//         heartbeat:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['heartbeat'],
				operation: ['create'],
			},
		},
		description: 'Name of the heartbeat',
	},
	{
		displayName: 'Interval',
		name: 'interval',
		type: 'number',
		required: true,
		default: 10,
		displayOptions: {
			show: {
				resource: ['heartbeat'],
				operation: ['create'],
			},
		},
		description: 'Expected interval between heartbeat pings',
	},
	{
		displayName: 'Interval Unit',
		name: 'intervalUnit',
		type: 'options',
		required: true,
		options: [
			{ name: 'Minutes', value: 'minutes' },
			{ name: 'Hours', value: 'hours' },
			{ name: 'Days', value: 'days' },
		],
		default: 'minutes',
		displayOptions: {
			show: {
				resource: ['heartbeat'],
				operation: ['create'],
			},
		},
		description: 'Unit of the interval',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['heartbeat'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Alert Message',
				name: 'alertMessage',
				type: 'string',
				default: '',
				description: 'Message for the alert when heartbeat expires',
			},
			{
				displayName: 'Alert Priority',
				name: 'alertPriority',
				type: 'options',
				options: [
					{ name: 'P1 - Critical', value: 'P1' },
					{ name: 'P2 - High', value: 'P2' },
					{ name: 'P3 - Moderate', value: 'P3' },
					{ name: 'P4 - Low', value: 'P4' },
					{ name: 'P5 - Informational', value: 'P5' },
				],
				default: 'P3',
				description: 'Priority of the alert when heartbeat expires',
			},
			{
				displayName: 'Alert Tags',
				name: 'alertTags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the alert',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the heartbeat',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the heartbeat is enabled',
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
		],
	},

	// ----------------------------------
	//         heartbeat:get/update/delete/enable/disable/ping
	// ----------------------------------
	{
		displayName: 'Heartbeat Name',
		name: 'heartbeatName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['heartbeat'],
				operation: ['get', 'update', 'delete', 'enable', 'disable', 'ping'],
			},
		},
		description: 'Name of the heartbeat',
	},

	// ----------------------------------
	//         heartbeat:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['heartbeat'],
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
				resource: ['heartbeat'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         heartbeat:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['heartbeat'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Alert Message',
				name: 'alertMessage',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Alert Priority',
				name: 'alertPriority',
				type: 'options',
				options: [
					{ name: 'P1 - Critical', value: 'P1' },
					{ name: 'P2 - High', value: 'P2' },
					{ name: 'P3 - Moderate', value: 'P3' },
					{ name: 'P4 - Low', value: 'P4' },
					{ name: 'P5 - Informational', value: 'P5' },
				],
				default: 'P3',
			},
			{
				displayName: 'Alert Tags',
				name: 'alertTags',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'number',
				default: 10,
			},
			{
				displayName: 'Interval Unit',
				name: 'intervalUnit',
				type: 'options',
				options: [
					{ name: 'Minutes', value: 'minutes' },
					{ name: 'Hours', value: 'hours' },
					{ name: 'Days', value: 'days' },
				],
				default: 'minutes',
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
