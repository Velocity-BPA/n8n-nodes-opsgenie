/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const teamOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['team'],
			},
		},
		options: [
			{
				name: 'Add Member',
				value: 'addMember',
				description: 'Add a member to a team',
				action: 'Add member to a team',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new team',
				action: 'Create a team',
			},
			{
				name: 'Create Routing Rule',
				value: 'createRoutingRule',
				description: 'Create a routing rule for a team',
				action: 'Create routing rule',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a team',
				action: 'Delete a team',
			},
			{
				name: 'Delete Routing Rule',
				value: 'deleteRoutingRule',
				description: 'Delete a routing rule from a team',
				action: 'Delete routing rule',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a team',
				action: 'Get a team',
			},
			{
				name: 'Get Logs',
				value: 'getLogs',
				description: 'Get activity logs for a team',
				action: 'Get team logs',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many teams',
				action: 'Get many teams',
			},
			{
				name: 'Get Members',
				value: 'getMembers',
				description: 'Get members of a team',
				action: 'Get team members',
			},
			{
				name: 'Get Routing Rules',
				value: 'getRoutingRules',
				description: 'Get routing rules of a team',
				action: 'Get team routing rules',
			},
			{
				name: 'Remove Member',
				value: 'removeMember',
				description: 'Remove a member from a team',
				action: 'Remove member from a team',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a team',
				action: 'Update a team',
			},
		],
		default: 'getAll',
	},
];

export const teamFields: INodeProperties[] = [
	// ----------------------------------
	//         team:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['create'],
			},
		},
		description: 'Name of the team',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the team',
			},
			{
				displayName: 'Members',
				name: 'membersUi',
				type: 'fixedCollection',
				placeholder: 'Add Member',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'Member',
						name: 'memberValues',
						values: [
							{
								displayName: 'User ID',
								name: 'userId',
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
							{
								displayName: 'Role',
								name: 'role',
								type: 'options',
								options: [
									{ name: 'User', value: 'user' },
									{ name: 'Admin', value: 'admin' },
								],
								default: 'user',
								description: 'Role of the member in the team',
							},
						],
					},
				],
				description: 'Members to add to the team',
			},
		],
	},

	// ----------------------------------
	//         team:get/update/delete
	// ----------------------------------
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['get', 'update', 'delete', 'getMembers', 'addMember', 'removeMember', 'getLogs', 'getRoutingRules', 'createRoutingRule', 'deleteRoutingRule'],
			},
		},
		description: 'Identifier of the team (ID or name)',
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
				resource: ['team'],
				operation: ['get', 'update', 'delete', 'getMembers', 'addMember', 'removeMember', 'getLogs', 'getRoutingRules', 'createRoutingRule', 'deleteRoutingRule'],
			},
		},
		description: 'Type of identifier provided',
	},

	// ----------------------------------
	//         team:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['team'],
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
				resource: ['team'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         team:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description of the team',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name of the team',
			},
		],
	},

	// ----------------------------------
	//         team:addMember
	// ----------------------------------
	{
		displayName: 'User',
		name: 'userUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['addMember'],
			},
		},
		options: [
			{
				displayName: 'User',
				name: 'user',
				values: [
					{
						displayName: 'User ID',
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
		description: 'User to add to the team',
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{ name: 'User', value: 'user' },
			{ name: 'Admin', value: 'admin' },
		],
		default: 'user',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['addMember'],
			},
		},
		description: 'Role of the member in the team',
	},

	// ----------------------------------
	//         team:removeMember
	// ----------------------------------
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['removeMember'],
			},
		},
		description: 'ID or username of the member to remove',
	},

	// ----------------------------------
	//         team:getLogs
	// ----------------------------------
	{
		displayName: 'Log Options',
		name: 'logOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['getLogs'],
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
				description: 'Max number of log entries to return',
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
				description: 'Sort order for log entries',
			},
		],
	},

	// ----------------------------------
	//         team:createRoutingRule
	// ----------------------------------
	{
		displayName: 'Routing Rule',
		name: 'routingRuleUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['createRoutingRule'],
			},
		},
		options: [
			{
				displayName: 'Routing Rule',
				name: 'routingRule',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the routing rule',
					},
					{
						displayName: 'Order',
						name: 'order',
						type: 'number',
						default: 0,
						description: 'Order of the routing rule',
					},
					{
						displayName: 'Timezone',
						name: 'timezone',
						type: 'string',
						default: '',
						description: 'Timezone for time restrictions',
					},
					{
						displayName: 'Notify Type',
						name: 'notifyType',
						type: 'options',
						options: [
							{ name: 'None', value: 'none' },
							{ name: 'Default', value: 'default' },
							{ name: 'Escalation', value: 'escalation' },
							{ name: 'Schedule', value: 'schedule' },
						],
						default: 'default',
						description: 'How to handle notifications',
					},
					{
						displayName: 'Notify ID',
						name: 'notifyId',
						type: 'string',
						default: '',
						description: 'ID of escalation or schedule to notify (if applicable)',
					},
				],
			},
		],
		description: 'Configuration for the routing rule',
	},

	// ----------------------------------
	//         team:deleteRoutingRule
	// ----------------------------------
	{
		displayName: 'Routing Rule ID',
		name: 'routingRuleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['deleteRoutingRule'],
			},
		},
		description: 'ID of the routing rule to delete',
	},
];
