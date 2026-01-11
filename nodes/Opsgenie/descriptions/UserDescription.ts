/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Add Contact',
				value: 'addContact',
				description: 'Add a contact method to a user',
				action: 'Add contact to a user',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new user',
				action: 'Create a user',
			},
			{
				name: 'Create Forwarding Rule',
				value: 'createForwardingRule',
				description: 'Create a forwarding rule for a user',
				action: 'Create forwarding rule',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a user',
				action: 'Delete a user',
			},
			{
				name: 'Delete Contact',
				value: 'deleteContact',
				description: 'Delete a contact method from a user',
				action: 'Delete contact from a user',
			},
			{
				name: 'Delete Forwarding Rule',
				value: 'deleteForwardingRule',
				description: 'Delete a forwarding rule',
				action: 'Delete forwarding rule',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get details of a user',
				action: 'Get a user',
			},
			{
				name: 'Get Contacts',
				value: 'getContacts',
				description: 'Get contact methods of a user',
				action: 'Get user contacts',
			},
			{
				name: 'Get Forwarding Rules',
				value: 'getForwardingRules',
				description: 'Get forwarding rules of a user',
				action: 'Get user forwarding rules',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many users',
				action: 'Get many users',
			},
			{
				name: 'Get Teams',
				value: 'getTeams',
				description: 'Get teams of a user',
				action: 'Get user teams',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a user',
				action: 'Update a user',
			},
		],
		default: 'getAll',
	},
];

export const userFields: INodeProperties[] = [
	// ----------------------------------
	//         user:create
	// ----------------------------------
	{
		displayName: 'Username (Email)',
		name: 'username',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Email address of the user',
	},
	{
		displayName: 'Full Name',
		name: 'fullName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'Display name of the user',
	},
	{
		displayName: 'Role',
		name: 'roleUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Role',
				name: 'role',
				values: [
					{
						displayName: 'Role ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'ID of the role',
					},
					{
						displayName: 'Role Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the role (e.g., Admin, User, Observer)',
					},
				],
			},
		],
		description: 'Role to assign to the user',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City of the user',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Country of the user',
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
				description: 'Custom key-value properties for the user',
			},
			{
				displayName: 'Disable Invitation',
				name: 'invitationDisabled',
				type: 'boolean',
				default: false,
				description: 'Whether to disable sending an invitation email',
			},
			{
				displayName: 'Line',
				name: 'line',
				type: 'string',
				default: '',
				description: 'Address line of the user',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'User locale (e.g., en_US)',
			},
			{
				displayName: 'Skype Username',
				name: 'skypeUsername',
				type: 'string',
				default: '',
				description: 'Skype username of the user',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State of the user',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the user',
			},
			{
				displayName: 'Timezone',
				name: 'timeZone',
				type: 'string',
				default: '',
				description: 'Timezone of the user (e.g., America/New_York)',
			},
			{
				displayName: 'Zip Code',
				name: 'zipCode',
				type: 'string',
				default: '',
				description: 'Zip code of the user',
			},
		],
	},

	// ----------------------------------
	//         user:get/update/delete
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete', 'getTeams', 'getForwardingRules', 'createForwardingRule', 'deleteForwardingRule', 'getContacts', 'addContact', 'deleteContact'],
			},
		},
		description: 'Identifier of the user (ID or username)',
	},

	// ----------------------------------
	//         user:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
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
				resource: ['user'],
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
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query for filtering users',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Username', value: 'username' },
					{ name: 'Full Name', value: 'fullName' },
					{ name: 'Created At', value: 'createdAt' },
				],
				default: 'username',
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
	//         user:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Full Name',
				name: 'fullName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Line',
				name: 'line',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Skype Username',
				name: 'skypeUsername',
				type: 'string',
				default: '',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Timezone',
				name: 'timeZone',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Zip Code',
				name: 'zipCode',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         user:createForwardingRule
	// ----------------------------------
	{
		displayName: 'Forwarding Rule',
		name: 'forwardingRuleUi',
		type: 'fixedCollection',
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createForwardingRule'],
			},
		},
		options: [
			{
				displayName: 'Forwarding Rule',
				name: 'forwardingRule',
				values: [
					{
						displayName: 'To User ID',
						name: 'toUserId',
						type: 'string',
						default: '',
						description: 'ID of the user to forward to',
					},
					{
						displayName: 'To Username',
						name: 'toUsername',
						type: 'string',
						default: '',
						description: 'Username of the user to forward to',
					},
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						description: 'Start date of the forwarding rule',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'End date of the forwarding rule',
					},
					{
						displayName: 'Alias',
						name: 'alias',
						type: 'string',
						default: '',
						description: 'Alias for the forwarding rule',
					},
				],
			},
		],
		description: 'Configuration for the forwarding rule',
	},

	// ----------------------------------
	//         user:deleteForwardingRule
	// ----------------------------------
	{
		displayName: 'Forwarding Rule ID',
		name: 'forwardingRuleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['deleteForwardingRule'],
			},
		},
		description: 'ID or alias of the forwarding rule to delete',
	},

	// ----------------------------------
	//         user:addContact
	// ----------------------------------
	{
		displayName: 'Contact Method',
		name: 'method',
		type: 'options',
		required: true,
		options: [
			{ name: 'Email', value: 'email' },
			{ name: 'SMS', value: 'sms' },
			{ name: 'Voice', value: 'voice' },
		],
		default: 'email',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['addContact'],
			},
		},
		description: 'Type of contact method',
	},
	{
		displayName: 'Contact Value',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['addContact'],
			},
		},
		description: 'Email address or phone number',
	},

	// ----------------------------------
	//         user:deleteContact
	// ----------------------------------
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['deleteContact'],
			},
		},
		description: 'ID of the contact to delete',
	},
];
