/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const alertOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['alert'],
			},
		},
		options: [
			{
				name: 'Acknowledge',
				value: 'acknowledge',
				description: 'Acknowledge an alert',
				action: 'Acknowledge an alert',
			},
			{
				name: 'Add Details',
				value: 'addDetails',
				description: 'Add custom details to an alert',
				action: 'Add details to an alert',
			},
			{
				name: 'Add Note',
				value: 'addNote',
				description: 'Add a note to an alert',
				action: 'Add note to an alert',
			},
			{
				name: 'Add Responder',
				value: 'addResponder',
				description: 'Add a responder to an alert',
				action: 'Add responder to an alert',
			},
			{
				name: 'Add Tags',
				value: 'addTags',
				description: 'Add tags to an alert',
				action: 'Add tags to an alert',
			},
			{
				name: 'Add Team',
				value: 'addTeam',
				description: 'Add a team as responder to an alert',
				action: 'Add team to an alert',
			},
			{
				name: 'Assign',
				value: 'assign',
				description: 'Assign an alert to a user',
				action: 'Assign an alert',
			},
			{
				name: 'Close',
				value: 'close',
				description: 'Close an alert',
				action: 'Close an alert',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new alert',
				action: 'Create an alert',
			},
			{
				name: 'Escalate',
				value: 'escalate',
				description: 'Escalate an alert to the next responder',
				action: 'Escalate an alert',
			},
			{
				name: 'Execute Action',
				value: 'executeAction',
				description: 'Execute a custom action on an alert',
				action: 'Execute action on an alert',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of an alert',
				action: 'Get an alert',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many alerts',
				action: 'Get many alerts',
			},
			{
				name: 'Get Request Status',
				value: 'getRequestStatus',
				description: 'Check the status of an async request',
				action: 'Get request status',
			},
			{
				name: 'Remove Tags',
				value: 'removeTags',
				description: 'Remove tags from an alert',
				action: 'Remove tags from an alert',
			},
			{
				name: 'Snooze',
				value: 'snooze',
				description: 'Snooze an alert',
				action: 'Snooze an alert',
			},
			{
				name: 'Unacknowledge',
				value: 'unacknowledge',
				description: 'Unacknowledge an alert',
				action: 'Unacknowledge an alert',
			},
		],
		default: 'create',
	},
];

export const alertFields: INodeProperties[] = [
	// ----------------------------------
	//         alert:create
	// ----------------------------------
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['create'],
			},
		},
		description: 'Alert message (max 130 characters)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Actions',
				name: 'actions',
				type: 'string',
				default: '',
				description: 'Comma-separated list of available actions for the alert',
			},
			{
				displayName: 'Alias',
				name: 'alias',
				type: 'string',
				default: '',
				description: 'User-defined identifier for deduplication. Max 512 characters.',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Detailed description of the alert. Max 15000 characters.',
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
				description: 'Custom key-value properties for the alert',
			},
			{
				displayName: 'Entity',
				name: 'entity',
				type: 'string',
				default: '',
				description: 'Domain of the alert. Max 512 characters.',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'Note to add when creating the alert',
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
				description: 'Priority level of the alert',
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
									{ name: 'Escalation', value: 'escalation' },
									{ name: 'Schedule', value: 'schedule' },
									{ name: 'Team', value: 'team' },
									{ name: 'User', value: 'user' },
								],
								default: 'user',
							},
							{
								displayName: 'ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'ID of the responder',
							},
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the responder (for team/schedule/escalation)',
							},
							{
								displayName: 'Username',
								name: 'username',
								type: 'string',
								default: '',
								description: 'Username of the responder (for user type)',
							},
						],
					},
				],
				description: 'Teams, users, escalations, or schedules that will be notified',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Source of the alert. Max 100 characters.',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the alert',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'User triggering the action. Max 100 characters.',
			},
			{
				displayName: 'Visible To',
				name: 'visibleToUi',
				type: 'fixedCollection',
				placeholder: 'Add Visibility',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'Visibility',
						name: 'visibleToValues',
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
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Username',
								name: 'username',
								type: 'string',
								default: '',
							},
						],
					},
				],
				description: 'Teams and users who can see the alert',
			},
		],
	},

	// ----------------------------------
	//         alert:get
	// ----------------------------------
	{
		displayName: 'Alert ID',
		name: 'alertId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['get', 'close', 'acknowledge', 'unacknowledge', 'snooze', 'escalate', 'assign', 'addTeam', 'addResponder', 'addNote', 'addTags', 'removeTags', 'addDetails', 'executeAction'],
			},
		},
		description: 'Identifier of the alert (ID, alias, or tinyId)',
	},
	{
		displayName: 'Identifier Type',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'ID', value: 'id' },
			{ name: 'Alias', value: 'alias' },
			{ name: 'Tiny ID', value: 'tiny' },
		],
		default: 'id',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['get', 'close', 'acknowledge', 'unacknowledge', 'snooze', 'escalate', 'assign', 'addTeam', 'addResponder', 'addNote', 'addTags', 'removeTags', 'addDetails', 'executeAction'],
			},
		},
		description: 'Type of identifier provided',
	},

	// ----------------------------------
	//         alert:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['alert'],
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
				resource: ['alert'],
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
				resource: ['alert'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Created After',
				name: 'createdAfter',
				type: 'dateTime',
				default: '',
				description: 'Return alerts created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'createdBefore',
				type: 'dateTime',
				default: '',
				description: 'Return alerts created before this date',
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
				default: 'P1',
				description: 'Filter by priority',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query in Opsgenie query language',
			},
			{
				displayName: 'Search Identifier',
				name: 'searchIdentifier',
				type: 'string',
				default: '',
				description: 'Identifier of a saved search to use',
			},
			{
				displayName: 'Search Identifier Type',
				name: 'searchIdentifierType',
				type: 'options',
				options: [
					{ name: 'ID', value: 'id' },
					{ name: 'Name', value: 'name' },
				],
				default: 'id',
				description: 'Type of the search identifier',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'createdAt' },
					{ name: 'Updated At', value: 'updatedAt' },
					{ name: 'Tiny ID', value: 'tinyId' },
					{ name: 'Alias', value: 'alias' },
					{ name: 'Message', value: 'message' },
					{ name: 'Status', value: 'status' },
					{ name: 'Acknowledged', value: 'acknowledged' },
					{ name: 'Is Seen', value: 'isSeen' },
					{ name: 'Snoozed', value: 'snoozed' },
					{ name: 'Snoozed Until', value: 'snoozedUntil' },
					{ name: 'Count', value: 'count' },
					{ name: 'Last Occurred At', value: 'lastOccurredAt' },
					{ name: 'Source', value: 'source' },
					{ name: 'Owner', value: 'owner' },
					{ name: 'Integration Type', value: 'integration.type' },
					{ name: 'Integration Name', value: 'integration.name' },
					{ name: 'Acknowledged At', value: 'report.ackTime' },
					{ name: 'Close Time', value: 'report.closeTime' },
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
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Closed', value: 'closed' },
				],
				default: 'open',
				description: 'Filter by alert status',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags to filter by',
			},
		],
	},

	// ----------------------------------
	//         alert:action fields
	// ----------------------------------
	{
		displayName: 'Action Options',
		name: 'actionOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['close', 'acknowledge', 'unacknowledge'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'Note to add with the action',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Source of the action',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'User performing the action',
			},
		],
	},

	// ----------------------------------
	//         alert:snooze
	// ----------------------------------
	{
		displayName: 'Snooze Until',
		name: 'endTime',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['snooze'],
			},
		},
		description: 'Date and time when the snooze ends',
	},
	{
		displayName: 'Snooze Options',
		name: 'snoozeOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['snooze'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:escalate
	// ----------------------------------
	{
		displayName: 'Escalation',
		name: 'escalationUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['escalate'],
			},
		},
		options: [
			{
				displayName: 'Escalation',
				name: 'escalation',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the escalation',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the escalation',
					},
				],
			},
		],
		description: 'Escalation to assign the alert to',
	},
	{
		displayName: 'Escalate Options',
		name: 'escalateOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['escalate'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:assign
	// ----------------------------------
	{
		displayName: 'Owner',
		name: 'ownerUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['assign'],
			},
		},
		options: [
			{
				displayName: 'Owner',
				name: 'owner',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the user',
					},
					{
						displayName: 'Username',
						name: 'username',
						type: 'string',
						default: '',
						description: 'Username (email) of the user',
					},
				],
			},
		],
		description: 'User to assign the alert to',
	},
	{
		displayName: 'Assign Options',
		name: 'assignOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['assign'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:addTeam
	// ----------------------------------
	{
		displayName: 'Team',
		name: 'teamUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addTeam'],
			},
		},
		options: [
			{
				displayName: 'Team',
				name: 'team',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the team',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the team',
					},
				],
			},
		],
		description: 'Team to add as responder',
	},
	{
		displayName: 'Add Team Options',
		name: 'addTeamOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addTeam'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:addResponder
	// ----------------------------------
	{
		displayName: 'Responder',
		name: 'responderUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
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
							{ name: 'Escalation', value: 'escalation' },
							{ name: 'Schedule', value: 'schedule' },
							{ name: 'Team', value: 'team' },
							{ name: 'User', value: 'user' },
						],
						default: 'user',
					},
					{
						displayName: 'ID',
						name: 'id',
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
						displayName: 'Username',
						name: 'username',
						type: 'string',
						default: '',
					},
				],
			},
		],
		description: 'Responder to add to the alert',
	},
	{
		displayName: 'Add Responder Options',
		name: 'addResponderOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addResponder'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:addNote
	// ----------------------------------
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addNote'],
			},
		},
		description: 'Note to add to the alert',
	},
	{
		displayName: 'Add Note Options',
		name: 'addNoteOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addNote'],
			},
		},
		options: [
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:addTags
	// ----------------------------------
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addTags'],
			},
		},
		description: 'Comma-separated list of tags to add',
	},
	{
		displayName: 'Add Tags Options',
		name: 'addTagsOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addTags'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:removeTags
	// ----------------------------------
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['removeTags'],
			},
		},
		description: 'Comma-separated list of tags to remove',
	},
	{
		displayName: 'Remove Tags Options',
		name: 'removeTagsOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['removeTags'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:addDetails
	// ----------------------------------
	{
		displayName: 'Details',
		name: 'detailsUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addDetails'],
			},
		},
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
		description: 'Custom key-value details to add',
	},
	{
		displayName: 'Add Details Options',
		name: 'addDetailsOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['addDetails'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:executeAction
	// ----------------------------------
	{
		displayName: 'Action Name',
		name: 'actionName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['executeAction'],
			},
		},
		description: 'Name of the custom action to execute',
	},
	{
		displayName: 'Execute Action Options',
		name: 'executeActionOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['executeAction'],
			},
		},
		options: [
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         alert:getRequestStatus
	// ----------------------------------
	{
		displayName: 'Request ID',
		name: 'requestId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['getRequestStatus'],
			},
		},
		description: 'ID of the async request to check status for',
	},
];
