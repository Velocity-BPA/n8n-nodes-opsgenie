/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const scheduleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['schedule'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new schedule',
				action: 'Create a schedule',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a schedule',
				action: 'Delete a schedule',
			},
			{
				name: 'Export ICal',
				value: 'exportIcal',
				description: 'Export schedule as iCal file',
				action: 'Export schedule as iCal',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a schedule',
				action: 'Get a schedule',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many schedules',
				action: 'Get many schedules',
			},
			{
				name: 'Get Next On-Calls',
				value: 'getNextOnCalls',
				description: 'Get next on-call participants',
				action: 'Get next on-call participants',
			},
			{
				name: 'Get On-Calls',
				value: 'getOnCalls',
				description: 'Get who is currently on-call',
				action: 'Get current on-call participants',
			},
			{
				name: 'Get Timeline',
				value: 'getTimeline',
				description: 'Get schedule timeline',
				action: 'Get schedule timeline',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a schedule',
				action: 'Update a schedule',
			},
		],
		default: 'getAll',
	},
];

export const scheduleFields: INodeProperties[] = [
	// ----------------------------------
	//         schedule:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create'],
			},
		},
		description: 'Name of the schedule',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the schedule',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the schedule is enabled',
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
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'Timezone of the schedule (e.g., America/New_York)',
			},
		],
	},

	// ----------------------------------
	//         schedule:get/update/delete
	// ----------------------------------
	{
		displayName: 'Schedule ID',
		name: 'scheduleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['get', 'update', 'delete', 'getOnCalls', 'getNextOnCalls', 'getTimeline', 'exportIcal'],
			},
		},
		description: 'Identifier of the schedule (ID or name)',
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
				resource: ['schedule'],
				operation: ['get', 'update', 'delete', 'getOnCalls', 'getNextOnCalls', 'getTimeline', 'exportIcal'],
			},
		},
		description: 'Type of identifier provided',
	},

	// ----------------------------------
	//         schedule:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['schedule'],
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
				resource: ['schedule'],
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
				resource: ['schedule'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'boolean',
				default: false,
				description: 'Whether to return rotation details',
			},
		],
	},

	// ----------------------------------
	//         schedule:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['schedule'],
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
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
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
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         schedule:getOnCalls
	// ----------------------------------
	{
		displayName: 'On-Call Options',
		name: 'onCallOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['getOnCalls'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date to check for on-call participants',
			},
			{
				displayName: 'Flat',
				name: 'flat',
				type: 'boolean',
				default: false,
				description: 'Whether to return flat on-call list',
			},
		],
	},

	// ----------------------------------
	//         schedule:getNextOnCalls
	// ----------------------------------
	{
		displayName: 'Next On-Call Options',
		name: 'nextOnCallOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['getNextOnCalls'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date to check for next on-call participants',
			},
			{
				displayName: 'Flat',
				name: 'flat',
				type: 'boolean',
				default: false,
				description: 'Whether to return flat on-call list',
			},
		],
	},

	// ----------------------------------
	//         schedule:getTimeline
	// ----------------------------------
	{
		displayName: 'Timeline Options',
		name: 'timelineOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['schedule'],
				operation: ['getTimeline'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date to center the timeline around',
			},
			{
				displayName: 'Expand',
				name: 'expand',
				type: 'boolean',
				default: false,
				description: 'Whether to expand rotation details',
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'number',
				default: 1,
				description: 'Number of interval units to include',
			},
			{
				displayName: 'Interval Unit',
				name: 'intervalUnit',
				type: 'options',
				options: [
					{ name: 'Days', value: 'days' },
					{ name: 'Weeks', value: 'weeks' },
					{ name: 'Months', value: 'months' },
				],
				default: 'weeks',
				description: 'Unit of the interval',
			},
		],
	},
];
