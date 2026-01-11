/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OpsgenieApi implements ICredentialType {
	name = 'opsgenieApi';
	displayName = 'Opsgenie API';
	documentationUrl = 'https://docs.opsgenie.com/docs/api-overview';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key (GenieKey)',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The GenieKey from your Opsgenie API integration. Go to Settings → Integrations → Add new "API" integration to get your key.',
		},
		{
			displayName: 'Region',
			name: 'region',
			type: 'options',
			options: [
				{
					name: 'US (api.opsgenie.com)',
					value: 'US',
				},
				{
					name: 'EU (api.eu.opsgenie.com)',
					value: 'EU',
				},
			],
			default: 'US',
			required: true,
			description: 'The region where your Opsgenie account is hosted',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=GenieKey {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.region === "EU" ? "https://api.eu.opsgenie.com" : "https://api.opsgenie.com"}}',
			url: '/v2/users',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}
