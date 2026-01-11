/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import type { IOpsgenieResponse, IRequestStatus } from './types/OpsgenieTypes';

/**
 * Get the base URL based on the selected region
 */
export function getBaseUrl(region: string): string {
	return region === 'EU'
		? 'https://api.eu.opsgenie.com/v2'
		: 'https://api.opsgenie.com/v2';
}

/**
 * Make an authenticated request to the Opsgenie API
 */
export async function opsgenieApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
): Promise<IOpsgenieResponse> {
	const credentials = await this.getCredentials('opsgenieApi');
	const region = credentials.region as string;
	const baseUrl = getBaseUrl(region);

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	if (query && Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'opsgenieApi',
			options,
		);
		return response as IOpsgenieResponse;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: (error as JsonObject).message as string,
		});
	}
}

/**
 * Make paginated requests to get all items
 */
export async function opsgenieApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let offset = 0;
	const limit = 100;

	query = query || {};
	query.limit = limit;

	let responseData: IOpsgenieResponse;

	do {
		query.offset = offset;
		responseData = await opsgenieApiRequest.call(this, method, endpoint, body, query);

		const items = responseData.data as IDataObject[] | undefined;
		if (items && Array.isArray(items)) {
			returnData.push(...items);
		}
		offset += limit;
	} while (responseData.paging?.next);

	return returnData;
}

/**
 * Wait for an async request to complete
 * Opsgenie alert operations are async and return a requestId
 */
export async function waitForRequestCompletion(
	this: IExecuteFunctions,
	requestId: string,
	maxAttempts: number = 10,
	delayMs: number = 500,
): Promise<IRequestStatus> {
	let attempts = 0;

	while (attempts < maxAttempts) {
		const response = await opsgenieApiRequest.call(
			this,
			'GET',
			`/alerts/requests/${requestId}`,
		);

		const status = response.data as unknown as IRequestStatus;
		if (status && status.isSuccess !== undefined) {
			return status;
		}

		await sleep(delayMs);
		attempts++;
	}

	throw new Error(`Request ${requestId} did not complete within ${maxAttempts * delayMs}ms`);
}

/**
 * Helper function to build identifier query parameters
 */
export function buildIdentifierQuery(
	identifierType: string,
): IDataObject {
	const query: IDataObject = {};
	if (identifierType && identifierType !== 'id') {
		query.identifierType = identifierType;
	}
	return query;
}

/**
 * Helper function to parse responders from UI input
 */
export function parseResponders(respondersUi: IDataObject): IDataObject[] {
	const responders: IDataObject[] = [];

	if (respondersUi.responderValues) {
		const values = respondersUi.responderValues as IDataObject[];
		for (const value of values) {
			const responder: IDataObject = {
				type: value.type,
			};

			if (value.id) {
				responder.id = value.id;
			} else if (value.name) {
				responder.name = value.name;
			} else if (value.username) {
				responder.username = value.username;
			}

			responders.push(responder);
		}
	}

	return responders;
}

/**
 * Helper function to parse tags from comma-separated string
 */
export function parseTags(tags: string): string[] {
	if (!tags) return [];
	return tags.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0);
}

/**
 * Helper function to parse details/custom properties
 */
export function parseDetails(detailsUi: IDataObject): IDataObject {
	const details: IDataObject = {};

	if (detailsUi.detailValues) {
		const values = detailsUi.detailValues as IDataObject[];
		for (const value of values) {
			if (value.key && value.value !== undefined) {
				details[value.key as string] = value.value;
			}
		}
	}

	return details;
}

/**
 * Sleep helper for polling
 */
function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validate and format date string to ISO format
 */
export function formatDateToISO(dateString: string): string {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		throw new Error(`Invalid date format: ${dateString}`);
	}
	return date.toISOString();
}

/**
 * Build query string for alert searches
 */
export function buildAlertQuery(filters: IDataObject): string {
	const queryParts: string[] = [];

	if (filters.status) {
		queryParts.push(`status=${filters.status}`);
	}
	if (filters.priority) {
		queryParts.push(`priority=${filters.priority}`);
	}
	if (filters.tags) {
		const tags = parseTags(filters.tags as string);
		for (const tag of tags) {
			queryParts.push(`tag=${tag}`);
		}
	}
	if (filters.createdBefore) {
		queryParts.push(`createdAt<${formatDateToISO(filters.createdBefore as string)}`);
	}
	if (filters.createdAfter) {
		queryParts.push(`createdAt>=${formatDateToISO(filters.createdAfter as string)}`);
	}

	return queryParts.join(' AND ');
}

/**
 * Log licensing notice (once per node load)
 */
let licensingNoticeLogged = false;

export function logLicensingNotice(context: IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions): void {
	if (!licensingNoticeLogged) {
		const logger = 'logger' in context ? context.logger : console;
		if (logger && typeof logger.warn === 'function') {
			logger.warn(
				'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
				'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
				'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.'
			);
		}
		licensingNoticeLogged = true;
	}
}
