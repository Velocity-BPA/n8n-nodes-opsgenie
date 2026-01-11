/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import { logLicensingNotice } from './GenericFunctions';

export class OpsgenieTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Opsgenie Trigger',
		name: 'opsgenieTrigger',
		icon: 'file:opsgenie.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts the workflow when Opsgenie events occur',
		defaults: {
			name: 'Opsgenie Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'opsgenieApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description: 'The events to listen for',
				options: [
					{
						name: 'Alert Acknowledged',
						value: 'Acknowledge',
						description: 'Triggered when an alert is acknowledged',
					},
					{
						name: 'Alert Add Note',
						value: 'AddNote',
						description: 'Triggered when a note is added to an alert',
					},
					{
						name: 'Alert Add Responder',
						value: 'AddResponder',
						description: 'Triggered when a responder is added to an alert',
					},
					{
						name: 'Alert Add Tags',
						value: 'AddTags',
						description: 'Triggered when tags are added to an alert',
					},
					{
						name: 'Alert Add Team',
						value: 'AddTeam',
						description: 'Triggered when a team is added to an alert',
					},
					{
						name: 'Alert Assigned',
						value: 'AssignOwnership',
						description: 'Triggered when an alert is assigned to a user',
					},
					{
						name: 'Alert Closed',
						value: 'Close',
						description: 'Triggered when an alert is closed',
					},
					{
						name: 'Alert Created',
						value: 'Create',
						description: 'Triggered when a new alert is created',
					},
					{
						name: 'Alert Custom Action',
						value: 'CustomAction',
						description: 'Triggered when a custom action is executed on an alert',
					},
					{
						name: 'Alert Delete',
						value: 'Delete',
						description: 'Triggered when an alert is deleted',
					},
					{
						name: 'Alert Escalated',
						value: 'Escalate',
						description: 'Triggered when an alert is escalated',
					},
					{
						name: 'Alert Priority Updated',
						value: 'UpdatePriority',
						description: 'Triggered when an alert priority is updated',
					},
					{
						name: 'Alert Remove Tags',
						value: 'RemoveTags',
						description: 'Triggered when tags are removed from an alert',
					},
					{
						name: 'Alert Snoozed',
						value: 'Snooze',
						description: 'Triggered when an alert is snoozed',
					},
					{
						name: 'Alert Snooze Ended',
						value: 'UnSnooze',
						description: 'Triggered when an alert snooze ends',
					},
					{
						name: 'Alert Take Ownership',
						value: 'TakeOwnership',
						description: 'Triggered when ownership of an alert is taken',
					},
					{
						name: 'Alert Unacknowledged',
						value: 'UnAcknowledge',
						description: 'Triggered when an alert is unacknowledged',
					},
					{
						name: 'Heartbeat Expired',
						value: 'HeartbeatExpired',
						description: 'Triggered when a heartbeat expires',
					},
					{
						name: 'Incident Closed',
						value: 'IncidentClosed',
						description: 'Triggered when an incident is closed',
					},
					{
						name: 'Incident Created',
						value: 'IncidentCreated',
						description: 'Triggered when a new incident is created',
					},
					{
						name: 'Incident Resolved',
						value: 'IncidentResolved',
						description: 'Triggered when an incident is resolved',
					},
					{
						name: 'Schedule On-Call Changed',
						value: 'ScheduleOnCallChange',
						description: 'Triggered when on-call rotation changes',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Include Alert Details',
						name: 'includeAlertDetails',
						type: 'boolean',
						default: true,
						description: 'Whether to include full alert details in the webhook payload',
					},
					{
						displayName: 'Include Source',
						name: 'includeSource',
						type: 'boolean',
						default: true,
						description: 'Whether to include source information in the webhook payload',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Webhooks are configured manually in Opsgenie
				// We just return true to indicate it can receive webhooks
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// Log licensing notice
				logLicensingNotice(this as any);

				// Webhooks must be configured manually in Opsgenie
				// Provide the webhook URL to the user via the UI
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// Webhooks must be deleted manually in Opsgenie
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		// Log licensing notice
		logLicensingNotice(this);

		const req = this.getRequestObject();
		const body = this.getBodyData() as any;

		// Get configured events
		const events = this.getNodeParameter('events') as string[];

		// Extract the action from the webhook payload
		const action = body.action || body.alert?.action || '';

		// Check if this event type matches our configured events
		// If no events are selected, process all events
		if (events.length > 0 && !events.includes(action)) {
			// Event type not in our list, ignore
			return {
				webhookResponse: { status: 'ignored', message: 'Event type not configured' },
			};
		}

		// Structure the output data
		const outputData: any = {
			action,
			timestamp: new Date().toISOString(),
			headers: req.headers,
		};

		// Include alert data if present
		if (body.alert) {
			outputData.alert = body.alert;
		}

		// Include incident data if present
		if (body.incident) {
			outputData.incident = body.incident;
		}

		// Include source information
		if (body.source) {
			outputData.source = body.source;
		}

		// Include integration information
		if (body.integrationName) {
			outputData.integrationName = body.integrationName;
		}
		if (body.integrationId) {
			outputData.integrationId = body.integrationId;
		}

		// Include escalation info if present
		if (body.escalation) {
			outputData.escalation = body.escalation;
		}

		// Include any additional data from the payload
		if (body.data) {
			outputData.data = body.data;
		}

		// Include responders if present
		if (body.responders) {
			outputData.responders = body.responders;
		}

		// Include tags if present
		if (body.tags) {
			outputData.tags = body.tags;
		}

		// Include user who triggered the action
		if (body.user) {
			outputData.user = body.user;
		}

		// Include note if present
		if (body.note) {
			outputData.note = body.note;
		}

		// Include schedule information if present
		if (body.schedule) {
			outputData.schedule = body.schedule;
		}

		// Include on-call information if present
		if (body.onCall) {
			outputData.onCall = body.onCall;
		}

		// Include heartbeat information if present
		if (body.heartbeat) {
			outputData.heartbeat = body.heartbeat;
		}

		return {
			workflowData: [this.helpers.returnJsonArray(outputData)],
		};
	}
}
