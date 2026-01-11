/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const incidentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['incident'],
			},
		},
		options: [
			{
				name: 'Add Note',
				value: 'addNote',
				description: 'Add a timeline note to an incident',
				action: 'Add note to an incident',
			},
			{
				name: 'Add Responder',
				value: 'addResponder',
				description: 'Add a responder to an incident',
				action: 'Add responder to an incident',
			},
			{
				name: 'Add Tag',
				value: 'addTag',
				description: 'Add a tag to an incident',
				action: 'Add tag to an incident',
			},
			{
				name: 'Close',
				value: 'close',
				description: 'Close an incident',
				action: 'Close an incident',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new incident',
				action: 'Create an incident',
			},
			{
				name: 'Delete Timeline Entry',
				value: 'deleteTimeline',
				description: 'Delete a timeline entry from an incident',
				action: 'Delete timeline entry',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of an incident',
				action: 'Get an incident',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many incidents',
				action: 'Get many incidents',
			},
			{
				name: 'Get Timeline',
				value: 'getTimeline',
				description: 'Get the timeline of an incident',
				action: 'Get incident timeline',
			},
			{
				name: 'Remove Tag',
				value: 'removeTag',
				description: 'Remove a tag from an incident',
				action: 'Remove tag from an incident',
			},
			{
				name: 'Resolve',
				value: 'resolve',
				description: 'Resolve an incident',
				action: 'Resolve an incident',
			},
		],
		default: 'create',
	},
];

export const incidentFields: INodeProperties[] = [
	// ----------------------------------
	//         incident:create
	// ----------------------------------
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
			},
		},
		description: 'Summary of the incident',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Detailed description of the incident',
			},
			{
				displayName: 'Details',
				name: 'detailsUi',
				type: 'fixedCollection',
				placeholder: 'Add Detail',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'Detail',
						name: 'detailValues',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'Custom key-value properties for the incident',
			},
			{
				displayName: 'Impacted Services',
				name: 'impactedServices',
				type: 'string',
				default: '',
				description: 'Comma-separated list of impacted service IDs',
			},
			{
				displayName: 'Notify Stakeholders',
				name: 'notifyStakeholders',
				type: 'boolean',
				default: false,
				description: 'Whether to send notifications to stakeholders',
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
				description: 'Priority level of the incident',
			},
			{
				displayName: 'Responders',
				name: 'respondersUi',
				type: 'fixedCollection',
				placeholder: 'Add Responder',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'Responder',
						name: 'responderValues',
						values: [
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Team', value: 'team' },
									{ name: 'User', value: 'user' },
								],
								default: 'team',
							},
							{
								displayName: 'ID',
								name: 'id',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'Teams or users to assign as responders',
			},
			{
				displayName: 'Service ID',
				name: 'serviceId',
				type: 'string',
				default: '',
				description: 'ID of the service to associate with the incident',
			},
			{
				displayName: 'Status Page Detail',
				name: 'statusPageDetail',
				type: 'string',
				default: '',
				description: 'Detail message for status page entry',
			},
			{
				displayName: 'Status Page Title',
				name: 'statusPageTitle',
				type: 'string',
				default: '',
				description: 'Title for status page entry',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the incident',
			},
		],
	},

	// ----------------------------------
	//         incident:get
	// ----------------------------------
	{
		displayName: 'Incident ID',
		name: 'incidentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['get', 'close', 'resolve', 'addResponder', 'addNote', 'addTag', 'removeTag', 'getTimeline', 'deleteTimeline'],
			},
		},
		description: 'Identifier of the incident',
	},
	{
		displayName: 'Identifier Type',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'ID', value: 'id' },
			{ name: 'Tiny ID', value: 'tiny' },
		],
		default: 'id',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['get', 'close', 'resolve', 'addResponder', 'addNote', 'addTag', 'removeTag', 'getTimeline', 'deleteTimeline'],
			},
		},
		description: 'Type of identifier provided',
	},

	// ----------------------------------
	//         incident:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['incident'],
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
				resource: ['incident'],
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
				resource: ['incident'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query in Opsgenie query language',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'createdAt' },
					{ name: 'Updated At', value: 'updatedAt' },
					{ name: 'Tiny ID', value: 'tinyId' },
					{ name: 'Message', value: 'message' },
					{ name: 'Status', value: 'status' },
					{ name: 'Is Seen', value: 'isSeen' },
					{ name: 'Owner', value: 'owner' },
				],
				default: 'createdAt',
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
				default: 'desc',
				description: 'Sort order for results',
			},
		],
	},

	// ----------------------------------
	//         incident:close/resolve
	// ----------------------------------
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['close', 'resolve'],
			},
		},
		description: 'Note to add when closing/resolving the incident',
	},

	// ----------------------------------
	//         incident:addResponder
	// ----------------------------------
	{
		displayName: 'Responder',
		name: 'responderUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['addResponder'],
			},
		},
		options: [
			{
				displayName: 'Responder',
				name: 'responder',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'Team', value: 'team' },
							{ name: 'User', value: 'user' },
						],
						default: 'team',
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the responder',
					},
				],
			},
		],
		description: 'Responder to add to the incident',
	},

	// ----------------------------------
	//         incident:addNote
	// ----------------------------------
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['addNote'],
			},
		},
		description: 'Note content to add to the timeline',
	},

	// ----------------------------------
	//         incident:addTag/removeTag
	// ----------------------------------
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['addTag', 'removeTag'],
			},
		},
		description: 'Tag to add or remove',
	},

	// ----------------------------------
	//         incident:getTimeline
	// ----------------------------------
	{
		displayName: 'Timeline Options',
		name: 'timelineOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['getTimeline'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 20,
				description: 'Max number of timeline entries to return',
			},
			{
				displayName: 'Sort Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Sort order for timeline entries',
			},
		],
	},

	// ----------------------------------
	//         incident:deleteTimeline
	// ----------------------------------
	{
		displayName: 'Entry ID',
		name: 'entryId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['incident'],
				operation: ['deleteTimeline'],
			},
		},
		description: 'ID of the timeline entry to delete',
	},
];
