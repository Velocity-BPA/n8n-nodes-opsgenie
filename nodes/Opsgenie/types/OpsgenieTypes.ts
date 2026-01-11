/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

// Base Types
export type IdentifierType = 'id' | 'name' | 'alias' | 'tiny';
export type Priority = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';
export type AlertStatus = 'open' | 'closed';
export type SortOrder = 'asc' | 'desc';

// Responder Types
export interface IResponder {
	type: 'user' | 'team' | 'escalation' | 'schedule';
	id?: string;
	name?: string;
	username?: string;
}

// Alert Types
export interface IAlertCreate {
	message: string;
	alias?: string;
	description?: string;
	responders?: IResponder[];
	visibleTo?: IResponder[];
	actions?: string[];
	tags?: string[];
	details?: IDataObject;
	entity?: string;
	source?: string;
	priority?: Priority;
	user?: string;
	note?: string;
}

export interface IAlertAction {
	user?: string;
	source?: string;
	note?: string;
}

export interface IAlertSnooze extends IAlertAction {
	endTime: string;
}

export interface IAlertEscalate extends IAlertAction {
	escalation: {
		id?: string;
		name?: string;
	};
}

export interface IAlertAssign extends IAlertAction {
	owner: {
		id?: string;
		username?: string;
	};
}

export interface IAlertAddResponder extends IAlertAction {
	responder: IResponder;
}

export interface IAlertAddTeam extends IAlertAction {
	team: {
		id?: string;
		name?: string;
	};
}

export interface IAlertTags extends IAlertAction {
	tags: string[];
}

export interface IAlertDetails extends IAlertAction {
	details: IDataObject;
}

// Incident Types
export interface IIncidentCreate {
	message: string;
	description?: string;
	responders?: IResponder[];
	tags?: string[];
	details?: IDataObject;
	priority?: Priority;
	impactedServices?: string[];
	statusPageEntry?: {
		title?: string;
		detail?: string;
	};
	notifyStakeholders?: boolean;
}

// Team Types
export interface ITeamMember {
	user: {
		id?: string;
		username?: string;
	};
	role: 'user' | 'admin';
}

export interface ITeamCreate {
	name: string;
	description?: string;
	members?: ITeamMember[];
}

export interface IRoutingRule {
	name?: string;
	order?: number;
	timezone?: string;
	criteria?: {
		type: 'match-all' | 'match-any-condition' | 'match-all-conditions';
		conditions?: ICondition[];
	};
	timeRestrictions?: ITimeRestriction;
	notify: {
		type: 'none' | 'default' | 'escalation' | 'schedule';
		id?: string;
		name?: string;
	};
}

// User Types
export interface IUserCreate {
	username: string;
	fullName: string;
	role: {
		id?: string;
		name?: string;
	};
	skypeUsername?: string;
	timeZone?: string;
	locale?: string;
	userAddress?: {
		country?: string;
		state?: string;
		city?: string;
		line?: string;
		zipCode?: string;
	};
	tags?: string[];
	details?: IDataObject;
	invitationDisabled?: boolean;
}

export interface IForwardingRule {
	toUser: {
		id?: string;
		username?: string;
	};
	startDate: string;
	endDate: string;
	alias?: string;
}

export interface IContact {
	to: string;
	method: 'email' | 'sms' | 'voice';
}

// Schedule Types
export interface IRotation {
	name: string;
	startDate: string;
	endDate?: string;
	type: 'daily' | 'weekly' | 'hourly';
	length: number;
	participants: IResponder[];
	timeRestriction?: ITimeRestriction;
}

export interface IScheduleCreate {
	name: string;
	description?: string;
	timezone?: string;
	enabled?: boolean;
	ownerTeam?: {
		id?: string;
		name?: string;
	};
	rotations?: IRotation[];
}

// Escalation Types
export interface IEscalationRule {
	condition: 'if-not-acked' | 'if-not-closed';
	notifyType: 'default' | 'next' | 'previous' | 'users' | 'admins' | 'random' | 'all';
	delay: {
		timeAmount: number;
		timeUnit?: 'minutes' | 'hours' | 'days';
	};
	recipient: IResponder;
}

export interface IEscalationCreate {
	name: string;
	description?: string;
	ownerTeam?: {
		id?: string;
		name?: string;
	};
	rules: IEscalationRule[];
	repeat?: {
		waitInterval: number;
		count: number;
		resetRecipientStates?: boolean;
		closeAlertAfterAll?: boolean;
	};
}

// Service Types
export interface IServiceCreate {
	name: string;
	description?: string;
	teamId: string;
	visibility?: 'TEAM_MEMBERS' | 'OPSGENIE_USERS';
	tags?: string[];
}

// Maintenance Types
export interface IMaintenanceTime {
	type: 'for' | 'schedule' | 'time-of-day';
	startDate?: string;
	endDate?: string;
	duration?: {
		timeAmount: number;
		timeUnit: 'minutes' | 'hours' | 'days';
	};
}

export interface IMaintenanceRule {
	state: 'enabled' | 'disabled';
	entity: {
		id?: string;
		type: 'integration' | 'policy';
	};
}

export interface IMaintenanceCreate {
	description: string;
	time: IMaintenanceTime;
	rules: IMaintenanceRule[];
}

// Heartbeat Types
export interface IHeartbeatCreate {
	name: string;
	description?: string;
	interval: number;
	intervalUnit: 'minutes' | 'hours' | 'days';
	enabled?: boolean;
	ownerTeam?: {
		id?: string;
		name?: string;
	};
	alertMessage?: string;
	alertPriority?: Priority;
	alertTags?: string[];
}

// Policy Types
export interface ICondition {
	field: string;
	operation: 'contains' | 'equals' | 'starts-with' | 'ends-with' | 'matches' | 'is-empty' | 'equals-ignore-whitespace';
	expectedValue?: string;
	key?: string;
	not?: boolean;
	order?: number;
}

export interface ITimeRestriction {
	type: 'time-of-day' | 'weekday-and-time-of-day';
	restrictions?: Array<{
		startDay?: string;
		startHour?: number;
		startMin?: number;
		endDay?: string;
		endHour?: number;
		endMin?: number;
	}>;
	restriction?: {
		startHour?: number;
		startMin?: number;
		endHour?: number;
		endMin?: number;
	};
}

export interface IPolicyCreate {
	name: string;
	policyDescription?: string;
	type: 'alert' | 'notification';
	enabled?: boolean;
	filter?: {
		type: 'match-all' | 'match-any-condition' | 'match-all-conditions';
		conditions?: ICondition[];
	};
	timeRestrictions?: ITimeRestriction;
	message?: string;
	continue?: boolean;
	alias?: string;
	description?: string;
	entity?: string;
	source?: string;
	actions?: string[];
	tags?: string[];
	priority?: Priority;
	responders?: IResponder[];
	suppress?: boolean;
	ignoreOriginalActions?: boolean;
	ignoreOriginalDetails?: boolean;
	ignoreOriginalResponders?: boolean;
	ignoreOriginalTags?: boolean;
}

// Notification Rule Types
export interface INotificationStep {
	contact: {
		method: 'email' | 'sms' | 'voice' | 'mobile';
		to?: string;
	};
	sendAfter?: {
		timeAmount: number;
		timeUnit?: 'minutes' | 'hours' | 'days';
	};
	enabled?: boolean;
}

export interface INotificationRuleCreate {
	name: string;
	actionType: 'create-alert' | 'acknowledged-alert' | 'closed-alert' | 'assigned-alert' |
		'add-note' | 'schedule-start' | 'schedule-end' | 'incoming-call-routing';
	criteria?: {
		type: 'match-all' | 'match-any-condition' | 'match-all-conditions';
		conditions?: ICondition[];
	};
	notificationTime?: Array<{
		type: 'just-before' | 'at-start' | 'at-end' | 'after';
		value?: number;
		unit?: 'minutes' | 'hours';
	}>;
	timeRestriction?: ITimeRestriction;
	schedules?: Array<{
		id?: string;
		name?: string;
	}>;
	steps?: INotificationStep[];
	repeat?: {
		loopAfter: number;
		enabled: boolean;
	};
	order?: number;
	enabled?: boolean;
}

// API Response Types
export interface IOpsgenieResponse {
	data?: IDataObject | IDataObject[];
	took?: number;
	requestId?: string;
	paging?: {
		next?: string;
		first?: string;
		last?: string;
	};
}

export interface IOpsgenieError {
	message: string;
	took?: number;
	requestId?: string;
}

// Request Status Types
export interface IRequestStatus {
	isSuccess: boolean;
	action: string;
	processedAt: string;
	integrationId: string;
	success: boolean;
	alertId?: string;
	alias?: string;
}

// Webhook Payload Types
export interface IWebhookPayload {
	action: string;
	alert?: IDataObject;
	incident?: IDataObject;
	source?: {
		name: string;
		type: string;
	};
	integrationName?: string;
	integrationId?: string;
}
