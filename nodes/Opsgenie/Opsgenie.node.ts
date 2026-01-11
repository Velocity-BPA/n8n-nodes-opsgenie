/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	opsgenieApiRequest,
	opsgenieApiRequestAllItems,
	buildIdentifierQuery,
	parseResponders,
	parseTags,
	parseDetails,
	formatDateToISO,
	logLicensingNotice,
} from './GenericFunctions';

import { alertOperations, alertFields } from './descriptions/AlertDescription';
import { incidentOperations, incidentFields } from './descriptions/IncidentDescription';
import { teamOperations, teamFields } from './descriptions/TeamDescription';
import { userOperations, userFields } from './descriptions/UserDescription';
import { scheduleOperations, scheduleFields } from './descriptions/ScheduleDescription';
import { escalationOperations, escalationFields } from './descriptions/EscalationDescription';
import { integrationOperations, integrationFields } from './descriptions/IntegrationDescription';
import { serviceOperations, serviceFields } from './descriptions/ServiceDescription';
import { maintenanceOperations, maintenanceFields } from './descriptions/MaintenanceDescription';
import { heartbeatOperations, heartbeatFields } from './descriptions/HeartbeatDescription';
import { policyOperations, policyFields } from './descriptions/PolicyDescription';
import { notificationRuleOperations, notificationRuleFields } from './descriptions/NotificationRuleDescription';

export class Opsgenie implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Opsgenie',
		name: 'opsgenie',
		icon: 'file:opsgenie.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume the Opsgenie API for alert and incident management',
		defaults: {
			name: 'Opsgenie',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'opsgenieApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Alert',
						value: 'alert',
					},
					{
						name: 'Escalation',
						value: 'escalation',
					},
					{
						name: 'Heartbeat',
						value: 'heartbeat',
					},
					{
						name: 'Incident',
						value: 'incident',
					},
					{
						name: 'Integration',
						value: 'integration',
					},
					{
						name: 'Maintenance',
						value: 'maintenance',
					},
					{
						name: 'Notification Rule',
						value: 'notificationRule',
					},
					{
						name: 'Policy',
						value: 'policy',
					},
					{
						name: 'Schedule',
						value: 'schedule',
					},
					{
						name: 'Service',
						value: 'service',
					},
					{
						name: 'Team',
						value: 'team',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'alert',
			},
			// Operations and Fields for each resource
			...alertOperations,
			...alertFields,
			...incidentOperations,
			...incidentFields,
			...teamOperations,
			...teamFields,
			...userOperations,
			...userFields,
			...scheduleOperations,
			...scheduleFields,
			...escalationOperations,
			...escalationFields,
			...integrationOperations,
			...integrationFields,
			...serviceOperations,
			...serviceFields,
			...maintenanceOperations,
			...maintenanceFields,
			...heartbeatOperations,
			...heartbeatFields,
			...policyOperations,
			...policyFields,
			...notificationRuleOperations,
			...notificationRuleFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Log licensing notice once
		logLicensingNotice(this);

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				// ==================== ALERT ====================
				if (resource === 'alert') {
					responseData = await executeAlertOperation.call(this, operation, i);
				}
				// ==================== INCIDENT ====================
				else if (resource === 'incident') {
					responseData = await executeIncidentOperation.call(this, operation, i);
				}
				// ==================== TEAM ====================
				else if (resource === 'team') {
					responseData = await executeTeamOperation.call(this, operation, i);
				}
				// ==================== USER ====================
				else if (resource === 'user') {
					responseData = await executeUserOperation.call(this, operation, i);
				}
				// ==================== SCHEDULE ====================
				else if (resource === 'schedule') {
					responseData = await executeScheduleOperation.call(this, operation, i);
				}
				// ==================== ESCALATION ====================
				else if (resource === 'escalation') {
					responseData = await executeEscalationOperation.call(this, operation, i);
				}
				// ==================== INTEGRATION ====================
				else if (resource === 'integration') {
					responseData = await executeIntegrationOperation.call(this, operation, i);
				}
				// ==================== SERVICE ====================
				else if (resource === 'service') {
					responseData = await executeServiceOperation.call(this, operation, i);
				}
				// ==================== MAINTENANCE ====================
				else if (resource === 'maintenance') {
					responseData = await executeMaintenanceOperation.call(this, operation, i);
				}
				// ==================== HEARTBEAT ====================
				else if (resource === 'heartbeat') {
					responseData = await executeHeartbeatOperation.call(this, operation, i);
				}
				// ==================== POLICY ====================
				else if (resource === 'policy') {
					responseData = await executePolicyOperation.call(this, operation, i);
				}
				// ==================== NOTIFICATION RULE ====================
				else if (resource === 'notificationRule') {
					responseData = await executeNotificationRuleOperation.call(this, operation, i);
				}

				// Process response
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as any),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

// ==================== ALERT OPERATIONS ====================
async function executeAlertOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const message = this.getNodeParameter('message', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = { message };

		if (additionalFields.alias) body.alias = additionalFields.alias;
		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.responders) body.responders = parseResponders(additionalFields.responders);
		if (additionalFields.visibleTo) body.visibleTo = parseResponders(additionalFields.visibleTo);
		if (additionalFields.actions) body.actions = parseTags(additionalFields.actions);
		if (additionalFields.tags) body.tags = parseTags(additionalFields.tags);
		if (additionalFields.details) body.details = parseDetails(additionalFields.details);
		if (additionalFields.entity) body.entity = additionalFields.entity;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.priority) body.priority = additionalFields.priority;
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', '/alerts', body);
		return response;
	}

	if (operation === 'get') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'GET', `/alerts/${alertId}`, undefined, query);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex, {}) as any;

		const query: any = {};
		if (filters.query) query.query = filters.query;
		if (filters.searchIdentifier) query.searchIdentifier = filters.searchIdentifier;
		if (filters.searchIdentifierType) query.searchIdentifierType = filters.searchIdentifierType;
		if (filters.sort) query.sort = filters.sort;
		if (filters.order) query.order = filters.order;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/alerts', undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', '/alerts', undefined, query);
			return response.data;
		}
	}

	if (operation === 'close') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/close`, body, query);
		return response;
	}

	if (operation === 'acknowledge') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/acknowledge`, body, query);
		return response;
	}

	if (operation === 'unacknowledge') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/unacknowledge`, body, query);
		return response;
	}

	if (operation === 'snooze') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const endTime = this.getNodeParameter('endTime', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { endTime: formatDateToISO(endTime) };
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/snooze`, body, query);
		return response;
	}

	if (operation === 'escalate') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const escalationId = this.getNodeParameter('escalationId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { escalation: { id: escalationId } };
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/escalate`, body, query);
		return response;
	}

	if (operation === 'assign') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const ownerUsername = this.getNodeParameter('ownerUsername', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { owner: { username: ownerUsername } };
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/assign`, body, query);
		return response;
	}

	if (operation === 'addTeam') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { team: { id: teamId } };
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/teams`, body, query);
		return response;
	}

	if (operation === 'addResponder') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const responderType = this.getNodeParameter('responderType', itemIndex) as string;
		const responderId = this.getNodeParameter('responderId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {
			responder: { type: responderType, id: responderId },
		};
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/responders`, body, query);
		return response;
	}

	if (operation === 'addNote') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const note = this.getNodeParameter('note', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { note };
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/notes`, body, query);
		return response;
	}

	if (operation === 'addTags') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const tags = this.getNodeParameter('tags', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { tags: parseTags(tags) };
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/tags`, body, query);
		return response;
	}

	if (operation === 'removeTags') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const tags = this.getNodeParameter('tags', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query: any = {
			...buildIdentifierQuery(identifierType),
			tags: tags,
		};
		if (additionalFields.user) query.user = additionalFields.user;
		if (additionalFields.source) query.source = additionalFields.source;
		if (additionalFields.note) query.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'DELETE', `/alerts/${alertId}/tags`, undefined, query);
		return response;
	}

	if (operation === 'addDetails') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const details = this.getNodeParameter('details', itemIndex) as IDataObject;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { details: parseDetails(details) };
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/details`, body, query);
		return response;
	}

	if (operation === 'executeAction') {
		const alertId = this.getNodeParameter('alertId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const actionName = this.getNodeParameter('actionName', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};
		if (additionalFields.user) body.user = additionalFields.user;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/alerts/${alertId}/actions/${actionName}`, body, query);
		return response;
	}

	if (operation === 'getRequestStatus') {
		const requestId = this.getNodeParameter('requestId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/alerts/requests/${requestId}`);
		return response.data;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== INCIDENT OPERATIONS ====================
async function executeIncidentOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const message = this.getNodeParameter('message', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = { message };

		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.responders) body.responders = parseResponders(additionalFields.responders);
		if (additionalFields.tags) body.tags = parseTags(additionalFields.tags);
		if (additionalFields.details) body.details = parseDetails(additionalFields.details);
		if (additionalFields.priority) body.priority = additionalFields.priority;
		if (additionalFields.impactedServices) {
			body.impactedServices = parseTags(additionalFields.impactedServices);
		}
		if (additionalFields.notifyStakeholders !== undefined) {
			body.notifyStakeholders = additionalFields.notifyStakeholders;
		}
		if (additionalFields.statusPageEntry) {
			body.statusPageEntry = JSON.parse(additionalFields.statusPageEntry);
		}

		const response = await opsgenieApiRequest.call(this, 'POST', '/incidents/create', body);
		return response;
	}

	if (operation === 'get') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'GET', `/incidents/${incidentId}`, undefined, query);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex, {}) as any;

		const query: any = {};
		if (filters.query) query.query = filters.query;
		if (filters.sort) query.sort = filters.sort;
		if (filters.order) query.order = filters.order;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/incidents', undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', '/incidents', undefined, query);
			return response.data;
		}
	}

	if (operation === 'close') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/incidents/${incidentId}/close`, body, query);
		return response;
	}

	if (operation === 'resolve') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/incidents/${incidentId}/resolve`, body, query);
		return response;
	}

	if (operation === 'addResponder') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const responderType = this.getNodeParameter('responderType', itemIndex) as string;
		const responderId = this.getNodeParameter('responderId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {
			responder: { type: responderType, id: responderId },
		};
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/incidents/${incidentId}/responders`, body, query);
		return response;
	}

	if (operation === 'addNote') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const note = this.getNodeParameter('note', itemIndex) as string;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { note };

		const response = await opsgenieApiRequest.call(this, 'POST', `/incidents/${incidentId}/timeline`, body, query);
		return response;
	}

	if (operation === 'addTag') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const tags = this.getNodeParameter('tags', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = { tags: parseTags(tags) };
		if (additionalFields.note) body.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'POST', `/incidents/${incidentId}/tags`, body, query);
		return response;
	}

	if (operation === 'removeTag') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const tags = this.getNodeParameter('tags', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query: any = {
			...buildIdentifierQuery(identifierType),
			tags: tags,
		};
		if (additionalFields.note) query.note = additionalFields.note;

		const response = await opsgenieApiRequest.call(this, 'DELETE', `/incidents/${incidentId}/tags`, undefined, query);
		return response;
	}

	if (operation === 'getTimeline') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		const query = buildIdentifierQuery(identifierType);

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(
				this,
				'data',
				'GET',
				`/incidents/${incidentId}/timeline`,
				undefined,
				query,
			);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(
				this,
				'GET',
				`/incidents/${incidentId}/timeline`,
				undefined,
				query,
			);
			return response.data;
		}
	}

	if (operation === 'deleteTimeline') {
		const incidentId = this.getNodeParameter('incidentId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const entryId = this.getNodeParameter('entryId', itemIndex) as string;

		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(
			this,
			'DELETE',
			`/incidents/${incidentId}/timeline/${entryId}`,
			undefined,
			query,
		);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== TEAM OPERATIONS ====================
async function executeTeamOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = { name };

		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.members) body.members = JSON.parse(additionalFields.members);

		const response = await opsgenieApiRequest.call(this, 'POST', '/teams', body);
		return response.data;
	}

	if (operation === 'get') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'GET', `/teams/${teamId}`, undefined, query);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/teams');
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			const response = await opsgenieApiRequest.call(this, 'GET', '/teams', undefined, { limit });
			return response.data;
		}
	}

	if (operation === 'update') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};

		if (updateFields.name) body.name = updateFields.name;
		if (updateFields.description) body.description = updateFields.description;
		if (updateFields.members) body.members = JSON.parse(updateFields.members);

		const response = await opsgenieApiRequest.call(this, 'PATCH', `/teams/${teamId}`, body, query);
		return response.data;
	}

	if (operation === 'delete') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/teams/${teamId}`, undefined, query);
		return response;
	}

	if (operation === 'getMembers') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);

		const response = await opsgenieApiRequest.call(this, 'GET', `/teams/${teamId}`, undefined, query);
		const teamData = response.data as IDataObject | undefined;
		return (teamData?.members as IDataObject[]) || [];
	}

	if (operation === 'addMember') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const role = this.getNodeParameter('role', itemIndex, 'user') as string;

		const query = buildIdentifierQuery(identifierType);
		const body = { user: { id: userId }, role };

		const response = await opsgenieApiRequest.call(this, 'POST', `/teams/${teamId}/members`, body, query);
		return response;
	}

	if (operation === 'removeMember') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const userId = this.getNodeParameter('userId', itemIndex) as string;

		const query = { ...buildIdentifierQuery(identifierType), memberId: userId };
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/teams/${teamId}/members/${userId}`, undefined, query);
		return response;
	}

	if (operation === 'getLogs') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		const query = buildIdentifierQuery(identifierType);

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(
				this,
				'data',
				'GET',
				`/teams/${teamId}/logs`,
				undefined,
				query,
			);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', `/teams/${teamId}/logs`, undefined, query);
			return response.data;
		}
	}

	if (operation === 'getRoutingRules') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'GET', `/teams/${teamId}/routing-rules`, undefined, query);
		return response.data;
	}

	if (operation === 'createRoutingRule') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const name = this.getNodeParameter('name', itemIndex) as string;
		const notify = this.getNodeParameter('notify', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {
			name,
			notify: JSON.parse(notify),
		};

		if (additionalFields.criteria) body.criteria = JSON.parse(additionalFields.criteria);
		if (additionalFields.timezone) body.timezone = additionalFields.timezone;
		if (additionalFields.timeRestriction) body.timeRestriction = JSON.parse(additionalFields.timeRestriction);
		if (additionalFields.order !== undefined) body.order = additionalFields.order;

		const response = await opsgenieApiRequest.call(this, 'POST', `/teams/${teamId}/routing-rules`, body, query);
		return response.data;
	}

	if (operation === 'deleteRoutingRule') {
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const ruleId = this.getNodeParameter('ruleId', itemIndex) as string;

		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(
			this,
			'DELETE',
			`/teams/${teamId}/routing-rules/${ruleId}`,
			undefined,
			query,
		);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== USER OPERATIONS ====================
async function executeUserOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const username = this.getNodeParameter('username', itemIndex) as string;
		const fullName = this.getNodeParameter('fullName', itemIndex) as string;
		const role = this.getNodeParameter('role', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = {
			username,
			fullName,
			role: { name: role },
		};

		if (additionalFields.skypeUsername) body.skypeUsername = additionalFields.skypeUsername;
		if (additionalFields.timeZone) body.timeZone = additionalFields.timeZone;
		if (additionalFields.locale) body.locale = additionalFields.locale;
		if (additionalFields.userAddress) body.userAddress = JSON.parse(additionalFields.userAddress);
		if (additionalFields.invitationDisabled !== undefined) {
			body.invitationDisabled = additionalFields.invitationDisabled;
		}
		if (additionalFields.tags) body.tags = parseTags(additionalFields.tags);

		const response = await opsgenieApiRequest.call(this, 'POST', '/users', body);
		return response.data;
	}

	if (operation === 'get') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/users/${userId}`);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex, {}) as any;

		const query: any = {};
		if (filters.query) query.query = filters.query;
		if (filters.sort) query.sort = filters.sort;
		if (filters.order) query.order = filters.order;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/users', undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', '/users', undefined, query);
			return response.data;
		}
	}

	if (operation === 'update') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const body: any = {};

		if (updateFields.fullName) body.fullName = updateFields.fullName;
		if (updateFields.role) body.role = { name: updateFields.role };
		if (updateFields.skypeUsername) body.skypeUsername = updateFields.skypeUsername;
		if (updateFields.timeZone) body.timeZone = updateFields.timeZone;
		if (updateFields.locale) body.locale = updateFields.locale;
		if (updateFields.userAddress) body.userAddress = JSON.parse(updateFields.userAddress);
		if (updateFields.tags) body.tags = parseTags(updateFields.tags);

		const response = await opsgenieApiRequest.call(this, 'PATCH', `/users/${userId}`, body);
		return response.data;
	}

	if (operation === 'delete') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/users/${userId}`);
		return response;
	}

	if (operation === 'getTeams') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/users/${userId}/teams`);
		return response.data;
	}

	if (operation === 'getForwardingRules') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/users/${userId}/forwarding-rules`);
		return response.data;
	}

	if (operation === 'createForwardingRule') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const toUserId = this.getNodeParameter('toUserId', itemIndex) as string;
		const startDate = this.getNodeParameter('startDate', itemIndex) as string;
		const endDate = this.getNodeParameter('endDate', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const body: any = {
			toUser: { id: toUserId },
			startDate: formatDateToISO(startDate),
			endDate: formatDateToISO(endDate),
		};

		if (additionalFields.alias) body.alias = additionalFields.alias;

		const response = await opsgenieApiRequest.call(this, 'POST', `/users/${userId}/forwarding-rules`, body);
		return response.data;
	}

	if (operation === 'deleteForwardingRule') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const ruleId = this.getNodeParameter('ruleId', itemIndex) as string;

		const response = await opsgenieApiRequest.call(this, 'DELETE', `/users/${userId}/forwarding-rules/${ruleId}`);
		return response;
	}

	if (operation === 'getContacts') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/users/${userId}/contacts`);
		return response.data;
	}

	if (operation === 'addContact') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const contactMethod = this.getNodeParameter('contactMethod', itemIndex) as string;
		const to = this.getNodeParameter('to', itemIndex) as string;

		const body = { method: contactMethod, to };
		const response = await opsgenieApiRequest.call(this, 'POST', `/users/${userId}/contacts`, body);
		return response.data;
	}

	if (operation === 'deleteContact') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const contactId = this.getNodeParameter('contactId', itemIndex) as string;

		const response = await opsgenieApiRequest.call(this, 'DELETE', `/users/${userId}/contacts/${contactId}`);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== SCHEDULE OPERATIONS ====================
async function executeScheduleOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = { name };

		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.timezone) body.timezone = additionalFields.timezone;
		if (additionalFields.enabled !== undefined) body.enabled = additionalFields.enabled;
		if (additionalFields.ownerTeam) body.ownerTeam = { id: additionalFields.ownerTeam };
		if (additionalFields.rotations) body.rotations = JSON.parse(additionalFields.rotations);

		const response = await opsgenieApiRequest.call(this, 'POST', '/schedules', body);
		return response.data;
	}

	if (operation === 'get') {
		const scheduleId = this.getNodeParameter('scheduleId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'GET', `/schedules/${scheduleId}`, undefined, query);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex, {}) as any;

		const query: any = {};
		if (filters.expand) query.expand = filters.expand;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/schedules', undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', '/schedules', undefined, query);
			return response.data;
		}
	}

	if (operation === 'update') {
		const scheduleId = this.getNodeParameter('scheduleId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};

		if (updateFields.name) body.name = updateFields.name;
		if (updateFields.description) body.description = updateFields.description;
		if (updateFields.timezone) body.timezone = updateFields.timezone;
		if (updateFields.enabled !== undefined) body.enabled = updateFields.enabled;
		if (updateFields.ownerTeam) body.ownerTeam = { id: updateFields.ownerTeam };
		if (updateFields.rotations) body.rotations = JSON.parse(updateFields.rotations);

		const response = await opsgenieApiRequest.call(this, 'PATCH', `/schedules/${scheduleId}`, body, query);
		return response.data;
	}

	if (operation === 'delete') {
		const scheduleId = this.getNodeParameter('scheduleId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/schedules/${scheduleId}`, undefined, query);
		return response;
	}

	if (operation === 'getOnCalls') {
		const scheduleId = this.getNodeParameter('scheduleId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query: any = buildIdentifierQuery(identifierType);
		if (additionalFields.flat !== undefined) query.flat = additionalFields.flat;
		if (additionalFields.date) query.date = formatDateToISO(additionalFields.date);

		const response = await opsgenieApiRequest.call(this, 'GET', `/schedules/${scheduleId}/on-calls`, undefined, query);
		return response.data;
	}

	if (operation === 'getNextOnCalls') {
		const scheduleId = this.getNodeParameter('scheduleId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query: any = buildIdentifierQuery(identifierType);
		if (additionalFields.flat !== undefined) query.flat = additionalFields.flat;
		if (additionalFields.date) query.date = formatDateToISO(additionalFields.date);

		const response = await opsgenieApiRequest.call(
			this,
			'GET',
			`/schedules/${scheduleId}/next-on-calls`,
			undefined,
			query,
		);
		return response.data;
	}

	if (operation === 'getTimeline') {
		const scheduleId = this.getNodeParameter('scheduleId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;

		const query: any = buildIdentifierQuery(identifierType);
		if (additionalFields.interval) query.interval = additionalFields.interval;
		if (additionalFields.intervalUnit) query.intervalUnit = additionalFields.intervalUnit;
		if (additionalFields.date) query.date = formatDateToISO(additionalFields.date);

		const response = await opsgenieApiRequest.call(
			this,
			'GET',
			`/schedules/${scheduleId}/timeline`,
			undefined,
			query,
		);
		return response.data;
	}

	if (operation === 'exportIcal') {
		const scheduleId = this.getNodeParameter('scheduleId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);

		const response = await opsgenieApiRequest.call(this, 'GET', `/schedules/${scheduleId}.ics`, undefined, query);
		return { ical: response };
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== ESCALATION OPERATIONS ====================
async function executeEscalationOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const rules = this.getNodeParameter('rules', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = {
			name,
			rules: JSON.parse(rules),
		};

		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.ownerTeam) body.ownerTeam = { id: additionalFields.ownerTeam };
		if (additionalFields.repeat) body.repeat = JSON.parse(additionalFields.repeat);

		const response = await opsgenieApiRequest.call(this, 'POST', '/escalations', body);
		return response.data;
	}

	if (operation === 'get') {
		const escalationId = this.getNodeParameter('escalationId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'GET', `/escalations/${escalationId}`, undefined, query);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/escalations');
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			const response = await opsgenieApiRequest.call(this, 'GET', '/escalations', undefined, { limit });
			return response.data;
		}
	}

	if (operation === 'update') {
		const escalationId = this.getNodeParameter('escalationId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const query = buildIdentifierQuery(identifierType);
		const body: any = {};

		if (updateFields.name) body.name = updateFields.name;
		if (updateFields.description) body.description = updateFields.description;
		if (updateFields.rules) body.rules = JSON.parse(updateFields.rules);
		if (updateFields.ownerTeam) body.ownerTeam = { id: updateFields.ownerTeam };
		if (updateFields.repeat) body.repeat = JSON.parse(updateFields.repeat);

		const response = await opsgenieApiRequest.call(this, 'PATCH', `/escalations/${escalationId}`, body, query);
		return response.data;
	}

	if (operation === 'delete') {
		const escalationId = this.getNodeParameter('escalationId', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex, 'id') as string;
		const query = buildIdentifierQuery(identifierType);
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/escalations/${escalationId}`, undefined, query);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== INTEGRATION OPERATIONS ====================
async function executeIntegrationOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'get') {
		const integrationId = this.getNodeParameter('integrationId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/integrations/${integrationId}`);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex, {}) as any;

		const query: any = {};
		if (filters.type) query.type = filters.type;
		if (filters.teamId) query.teamId = filters.teamId;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/integrations', undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', '/integrations', undefined, query);
			return response.data;
		}
	}

	if (operation === 'enable') {
		const integrationId = this.getNodeParameter('integrationId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `/integrations/${integrationId}/enable`);
		return response;
	}

	if (operation === 'disable') {
		const integrationId = this.getNodeParameter('integrationId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `/integrations/${integrationId}/disable`);
		return response;
	}

	if (operation === 'authenticate') {
		const integrationId = this.getNodeParameter('integrationId', itemIndex) as string;
		const integrationType = this.getNodeParameter('integrationType', itemIndex) as string;

		const body = { type: integrationType };
		const response = await opsgenieApiRequest.call(this, 'POST', `/integrations/${integrationId}/authenticate`, body);
		return response;
	}

	if (operation === 'getActions') {
		const integrationId = this.getNodeParameter('integrationId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/integrations/${integrationId}/actions`);
		return response.data;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== SERVICE OPERATIONS ====================
async function executeServiceOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const teamId = this.getNodeParameter('teamId', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = {
			name,
			teamId,
		};

		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.visibility) body.visibility = additionalFields.visibility;
		if (additionalFields.tags) body.tags = parseTags(additionalFields.tags);

		const response = await opsgenieApiRequest.call(this, 'POST', '/services', body);
		return response.data;
	}

	if (operation === 'get') {
		const serviceId = this.getNodeParameter('serviceId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/services/${serviceId}`);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex, {}) as any;

		const query: any = {};
		if (filters.query) query.query = filters.query;
		if (filters.sort) query.sort = filters.sort;
		if (filters.order) query.order = filters.order;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/services', undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', '/services', undefined, query);
			return response.data;
		}
	}

	if (operation === 'update') {
		const serviceId = this.getNodeParameter('serviceId', itemIndex) as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const body: any = {};

		if (updateFields.name) body.name = updateFields.name;
		if (updateFields.description) body.description = updateFields.description;
		if (updateFields.visibility) body.visibility = updateFields.visibility;
		if (updateFields.tags) body.tags = parseTags(updateFields.tags);

		const response = await opsgenieApiRequest.call(this, 'PATCH', `/services/${serviceId}`, body);
		return response.data;
	}

	if (operation === 'delete') {
		const serviceId = this.getNodeParameter('serviceId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/services/${serviceId}`);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== MAINTENANCE OPERATIONS ====================
async function executeMaintenanceOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const description = this.getNodeParameter('description', itemIndex) as string;
		const timeType = this.getNodeParameter('timeType', itemIndex) as string;
		const rules = this.getNodeParameter('rules', itemIndex) as string;

		const body: any = {
			description,
			time: { type: timeType },
			rules: JSON.parse(rules),
		};

		if (timeType === 'for') {
			body.time.forMinutes = this.getNodeParameter('forMinutes', itemIndex) as number;
		} else if (timeType === 'schedule') {
			body.time.startDate = formatDateToISO(this.getNodeParameter('startDate', itemIndex) as string);
			body.time.endDate = formatDateToISO(this.getNodeParameter('endDate', itemIndex) as string);
		}

		const response = await opsgenieApiRequest.call(this, 'POST', '/maintenance', body);
		return response.data;
	}

	if (operation === 'get') {
		const maintenanceId = this.getNodeParameter('maintenanceId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/maintenance/${maintenanceId}`);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;
		const filters = this.getNodeParameter('filters', itemIndex, {}) as any;

		const query: any = {};
		if (filters.type) query.type = filters.type;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/maintenance', undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', '/maintenance', undefined, query);
			return response.data;
		}
	}

	if (operation === 'update') {
		const maintenanceId = this.getNodeParameter('maintenanceId', itemIndex) as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const body: any = {};

		if (updateFields.description) body.description = updateFields.description;
		if (updateFields.rules) body.rules = JSON.parse(updateFields.rules);
		if (updateFields.time) body.time = JSON.parse(updateFields.time);

		const response = await opsgenieApiRequest.call(this, 'PATCH', `/maintenance/${maintenanceId}`, body);
		return response.data;
	}

	if (operation === 'delete') {
		const maintenanceId = this.getNodeParameter('maintenanceId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/maintenance/${maintenanceId}`);
		return response;
	}

	if (operation === 'cancel') {
		const maintenanceId = this.getNodeParameter('maintenanceId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `/maintenance/${maintenanceId}/cancel`);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== HEARTBEAT OPERATIONS ====================
async function executeHeartbeatOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const interval = this.getNodeParameter('interval', itemIndex) as number;
		const intervalUnit = this.getNodeParameter('intervalUnit', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = {
			name,
			interval,
			intervalUnit,
		};

		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.enabled !== undefined) body.enabled = additionalFields.enabled;
		if (additionalFields.ownerTeam) body.ownerTeam = { id: additionalFields.ownerTeam };
		if (additionalFields.alertMessage) body.alertMessage = additionalFields.alertMessage;
		if (additionalFields.alertPriority) body.alertPriority = additionalFields.alertPriority;
		if (additionalFields.alertTags) body.alertTags = parseTags(additionalFields.alertTags);

		const response = await opsgenieApiRequest.call(this, 'POST', '/heartbeats', body);
		return response.data;
	}

	if (operation === 'get') {
		const heartbeatName = this.getNodeParameter('heartbeatName', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/heartbeats/${heartbeatName}`);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', '/heartbeats');
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			const response = await opsgenieApiRequest.call(this, 'GET', '/heartbeats', undefined, { limit });
			const heartbeatData = response.data as IDataObject | undefined;
			return (heartbeatData?.heartbeats as IDataObject[]) || heartbeatData || [];
		}
	}

	if (operation === 'update') {
		const heartbeatName = this.getNodeParameter('heartbeatName', itemIndex) as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const body: any = {};

		if (updateFields.description) body.description = updateFields.description;
		if (updateFields.interval) body.interval = updateFields.interval;
		if (updateFields.intervalUnit) body.intervalUnit = updateFields.intervalUnit;
		if (updateFields.enabled !== undefined) body.enabled = updateFields.enabled;
		if (updateFields.ownerTeam) body.ownerTeam = { id: updateFields.ownerTeam };
		if (updateFields.alertMessage) body.alertMessage = updateFields.alertMessage;
		if (updateFields.alertPriority) body.alertPriority = updateFields.alertPriority;
		if (updateFields.alertTags) body.alertTags = parseTags(updateFields.alertTags);

		const response = await opsgenieApiRequest.call(this, 'PATCH', `/heartbeats/${heartbeatName}`, body);
		return response.data;
	}

	if (operation === 'delete') {
		const heartbeatName = this.getNodeParameter('heartbeatName', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'DELETE', `/heartbeats/${heartbeatName}`);
		return response;
	}

	if (operation === 'enable') {
		const heartbeatName = this.getNodeParameter('heartbeatName', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `/heartbeats/${heartbeatName}/enable`);
		return response;
	}

	if (operation === 'disable') {
		const heartbeatName = this.getNodeParameter('heartbeatName', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `/heartbeats/${heartbeatName}/disable`);
		return response;
	}

	if (operation === 'ping') {
		const heartbeatName = this.getNodeParameter('heartbeatName', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `/heartbeats/${heartbeatName}/ping`);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== POLICY OPERATIONS ====================
async function executePolicyOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	const policyType = this.getNodeParameter('policyType', itemIndex) as string;
	const teamId = this.getNodeParameter('teamId', itemIndex, '') as string;

	// Determine the base path based on whether it's a team policy or global
	const basePath = teamId ? `/teams/${teamId}/policies` : '/policies';

	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = {
			name,
			type: policyType,
		};

		if (additionalFields.policyDescription) body.policyDescription = additionalFields.policyDescription;
		if (additionalFields.enabled !== undefined) body.enabled = additionalFields.enabled;
		if (additionalFields.filterType) {
			body.filter = body.filter || {};
			body.filter.type = additionalFields.filterType;
		}
		if (additionalFields.filterConditions) {
			body.filter = body.filter || { type: 'match-all-conditions' };
			body.filter.conditions = JSON.parse(additionalFields.filterConditions);
		}
		if (additionalFields.timeRestrictions) {
			body.timeRestrictions = JSON.parse(additionalFields.timeRestrictions);
		}
		if (additionalFields.message) body.message = additionalFields.message;
		if (additionalFields.alias) body.alias = additionalFields.alias;
		if (additionalFields.alertDescription) body.description = additionalFields.alertDescription;
		if (additionalFields.entity) body.entity = additionalFields.entity;
		if (additionalFields.source) body.source = additionalFields.source;
		if (additionalFields.actions) body.actions = parseTags(additionalFields.actions);
		if (additionalFields.tags) body.tags = parseTags(additionalFields.tags);
		if (additionalFields.priority) body.priority = additionalFields.priority;
		if (additionalFields.responders) body.responders = JSON.parse(additionalFields.responders);
		if (additionalFields.continue !== undefined) body.continue = additionalFields.continue;
		if (additionalFields.suppress !== undefined) body.suppress = additionalFields.suppress;
		if (additionalFields.ignoreOriginalActions !== undefined) {
			body.ignoreOriginalActions = additionalFields.ignoreOriginalActions;
		}
		if (additionalFields.ignoreOriginalDetails !== undefined) {
			body.ignoreOriginalDetails = additionalFields.ignoreOriginalDetails;
		}
		if (additionalFields.ignoreOriginalResponders !== undefined) {
			body.ignoreOriginalResponders = additionalFields.ignoreOriginalResponders;
		}
		if (additionalFields.ignoreOriginalTags !== undefined) {
			body.ignoreOriginalTags = additionalFields.ignoreOriginalTags;
		}

		const response = await opsgenieApiRequest.call(this, 'POST', basePath, body);
		return response.data;
	}

	if (operation === 'get') {
		const policyId = this.getNodeParameter('policyId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `${basePath}/${policyId}`);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		const query: any = { type: policyType };

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', basePath, undefined, query);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			query.limit = limit;
			const response = await opsgenieApiRequest.call(this, 'GET', basePath, undefined, query);
			return response.data;
		}
	}

	if (operation === 'update') {
		const policyId = this.getNodeParameter('policyId', itemIndex) as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const body: any = {};

		if (updateFields.name) body.name = updateFields.name;
		if (updateFields.policyDescription) body.policyDescription = updateFields.policyDescription;
		if (updateFields.enabled !== undefined) body.enabled = updateFields.enabled;
		if (updateFields.filterType) {
			body.filter = body.filter || {};
			body.filter.type = updateFields.filterType;
		}
		if (updateFields.filterConditions) {
			body.filter = body.filter || { type: 'match-all-conditions' };
			body.filter.conditions = JSON.parse(updateFields.filterConditions);
		}
		if (updateFields.timeRestrictions) {
			body.timeRestrictions = JSON.parse(updateFields.timeRestrictions);
		}
		if (updateFields.message) body.message = updateFields.message;
		if (updateFields.alias) body.alias = updateFields.alias;
		if (updateFields.alertDescription) body.description = updateFields.alertDescription;
		if (updateFields.entity) body.entity = updateFields.entity;
		if (updateFields.source) body.source = updateFields.source;
		if (updateFields.actions) body.actions = parseTags(updateFields.actions);
		if (updateFields.tags) body.tags = parseTags(updateFields.tags);
		if (updateFields.priority) body.priority = updateFields.priority;
		if (updateFields.responders) body.responders = JSON.parse(updateFields.responders);
		if (updateFields.continue !== undefined) body.continue = updateFields.continue;
		if (updateFields.suppress !== undefined) body.suppress = updateFields.suppress;
		if (updateFields.ignoreOriginalActions !== undefined) {
			body.ignoreOriginalActions = updateFields.ignoreOriginalActions;
		}
		if (updateFields.ignoreOriginalDetails !== undefined) {
			body.ignoreOriginalDetails = updateFields.ignoreOriginalDetails;
		}
		if (updateFields.ignoreOriginalResponders !== undefined) {
			body.ignoreOriginalResponders = updateFields.ignoreOriginalResponders;
		}
		if (updateFields.ignoreOriginalTags !== undefined) {
			body.ignoreOriginalTags = updateFields.ignoreOriginalTags;
		}

		const response = await opsgenieApiRequest.call(this, 'PUT', `${basePath}/${policyId}`, body);
		return response.data;
	}

	if (operation === 'delete') {
		const policyId = this.getNodeParameter('policyId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'DELETE', `${basePath}/${policyId}`);
		return response;
	}

	if (operation === 'enable') {
		const policyId = this.getNodeParameter('policyId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `${basePath}/${policyId}/enable`);
		return response;
	}

	if (operation === 'disable') {
		const policyId = this.getNodeParameter('policyId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `${basePath}/${policyId}/disable`);
		return response;
	}

	if (operation === 'changeOrder') {
		const policyId = this.getNodeParameter('policyId', itemIndex) as string;
		const targetIndex = this.getNodeParameter('targetIndex', itemIndex) as number;

		const body = { targetIndex };
		const response = await opsgenieApiRequest.call(this, 'POST', `${basePath}/${policyId}/change-order`, body);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}

// ==================== NOTIFICATION RULE OPERATIONS ====================
async function executeNotificationRuleOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<any> {
	const userId = this.getNodeParameter('userId', itemIndex) as string;
	const basePath = `/users/${userId}/notification-rules`;

	if (operation === 'create') {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const actionType = this.getNodeParameter('actionType', itemIndex) as string;
		const steps = this.getNodeParameter('notificationSteps', itemIndex) as string;
		const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;

		const body: any = {
			name,
			actionType,
			steps: JSON.parse(steps),
		};

		if (additionalFields.criteria) body.criteria = JSON.parse(additionalFields.criteria);
		if (additionalFields.notificationTime) body.notificationTime = JSON.parse(additionalFields.notificationTime);
		if (additionalFields.timeRestriction) body.timeRestriction = JSON.parse(additionalFields.timeRestriction);
		if (additionalFields.schedules) body.schedules = JSON.parse(additionalFields.schedules);
		if (additionalFields.repeat) body.repeat = JSON.parse(additionalFields.repeat);
		if (additionalFields.order !== undefined) body.order = additionalFields.order;
		if (additionalFields.enabled !== undefined) body.enabled = additionalFields.enabled;

		const response = await opsgenieApiRequest.call(this, 'POST', basePath, body);
		return response.data;
	}

	if (operation === 'get') {
		const ruleId = this.getNodeParameter('ruleId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'GET', `${basePath}/${ruleId}`);
		return response.data;
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', itemIndex) as boolean;

		if (returnAll) {
			const data = await opsgenieApiRequestAllItems.call(this, 'data', 'GET', basePath);
			return data;
		} else {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			const response = await opsgenieApiRequest.call(this, 'GET', basePath, undefined, { limit });
			return response.data;
		}
	}

	if (operation === 'update') {
		const ruleId = this.getNodeParameter('ruleId', itemIndex) as string;
		const updateFields = this.getNodeParameter('updateFields', itemIndex) as any;

		const body: any = {};

		if (updateFields.name) body.name = updateFields.name;
		if (updateFields.actionType) body.actionType = updateFields.actionType;
		if (updateFields.steps) body.steps = JSON.parse(updateFields.steps);
		if (updateFields.criteria) body.criteria = JSON.parse(updateFields.criteria);
		if (updateFields.notificationTime) body.notificationTime = JSON.parse(updateFields.notificationTime);
		if (updateFields.timeRestriction) body.timeRestriction = JSON.parse(updateFields.timeRestriction);
		if (updateFields.schedules) body.schedules = JSON.parse(updateFields.schedules);
		if (updateFields.repeat) body.repeat = JSON.parse(updateFields.repeat);
		if (updateFields.order !== undefined) body.order = updateFields.order;
		if (updateFields.enabled !== undefined) body.enabled = updateFields.enabled;

		const response = await opsgenieApiRequest.call(this, 'PATCH', `${basePath}/${ruleId}`, body);
		return response.data;
	}

	if (operation === 'delete') {
		const ruleId = this.getNodeParameter('ruleId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'DELETE', `${basePath}/${ruleId}`);
		return response;
	}

	if (operation === 'enable') {
		const ruleId = this.getNodeParameter('ruleId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `${basePath}/${ruleId}/enable`);
		return response;
	}

	if (operation === 'disable') {
		const ruleId = this.getNodeParameter('ruleId', itemIndex) as string;
		const response = await opsgenieApiRequest.call(this, 'POST', `${basePath}/${ruleId}/disable`);
		return response;
	}

	throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
}
