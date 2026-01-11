# n8n-nodes-opsgenie

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for **Opsgenie**, Atlassian's cloud-based alert and incident management platform. This integration enables workflow automation for alert management, on-call scheduling, incident response, and team coordination.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## Features

- **12 Resource Categories** with 100+ operations for complete Opsgenie API coverage
- **Alert Management** - Create, acknowledge, close, snooze, escalate, and manage alerts
- **Incident Response** - Create and manage incidents with timeline tracking
- **On-Call Scheduling** - Manage schedules, rotations, and on-call assignments
- **Team Coordination** - Create teams, manage members, and configure routing rules
- **User Management** - Full user lifecycle management with notification preferences
- **Escalation Policies** - Configure multi-level escalation workflows
- **Heartbeat Monitoring** - Monitor system health with heartbeat checks
- **Policy Management** - Create alert and notification policies with complex filtering
- **Webhook Trigger** - Real-time event handling for alerts, incidents, and schedules
- **Multi-Region Support** - Both US and EU Opsgenie regions

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Select **Install**
4. Enter `n8n-nodes-opsgenie`
5. Agree to the risks and click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-opsgenie

# Restart n8n
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-opsgenie.git
cd n8n-nodes-opsgenie

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-opsgenie

# Restart n8n
```

## Credentials Setup

### Opsgenie API Credentials

| Field | Description |
|-------|-------------|
| **API Key** | GenieKey from your Opsgenie API integration |
| **Region** | US (api.opsgenie.com) or EU (api.eu.opsgenie.com) |

### Obtaining an API Key (GenieKey)

1. Log into your Opsgenie account
2. Go to **Settings** > **Integrations**
3. Click **Add integration** and select **API**
4. Copy the generated **API Key**
5. Configure API access permissions as needed

## Resources & Operations

### Alert (17 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create a new alert |
| Get | Get alert details by ID, alias, or tinyId |
| Get All | List alerts with filtering and pagination |
| Close | Close an alert |
| Acknowledge | Acknowledge an alert |
| Unacknowledge | Remove acknowledgment from an alert |
| Snooze | Snooze an alert for a specified duration |
| Escalate | Escalate alert to next responder |
| Assign | Assign alert to a user |
| Add Team | Add team as responder |
| Add Responder | Add user, team, or schedule as responder |
| Add Note | Add note to alert |
| Add Tags | Add tags to alert |
| Remove Tags | Remove tags from alert |
| Add Details | Add custom key-value details |
| Execute Action | Execute custom action on alert |
| Get Request Status | Check async request status |

### Incident (11 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create a new incident |
| Get | Get incident details |
| Get All | List incidents with filtering |
| Close | Close an incident |
| Resolve | Resolve an incident |
| Add Responder | Add responder to incident |
| Add Note | Add timeline note |
| Add Tag | Add tag to incident |
| Remove Tag | Remove tag from incident |
| Get Timeline | Get incident timeline entries |
| Delete Timeline | Delete timeline entry |

### Team (12 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create a new team |
| Get | Get team details |
| Get All | List all teams |
| Update | Update team properties |
| Delete | Delete a team |
| Get Members | List team members |
| Add Member | Add user to team |
| Remove Member | Remove user from team |
| Get Logs | Get team activity logs |
| Get Routing Rules | List team routing rules |
| Create Routing Rule | Create new routing rule |
| Delete Routing Rule | Delete a routing rule |

### User (12 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create a new user |
| Get | Get user details |
| Get All | List all users |
| Update | Update user properties |
| Delete | Delete a user |
| Get Teams | List user's team memberships |
| Get Forwarding Rules | List forwarding rules |
| Create Forwarding Rule | Create forwarding rule |
| Delete Forwarding Rule | Delete forwarding rule |
| Get Contacts | List user contacts |
| Add Contact | Add contact method |
| Delete Contact | Delete contact method |

### Schedule (9 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create a new schedule |
| Get | Get schedule details |
| Get All | List all schedules |
| Update | Update schedule properties |
| Delete | Delete a schedule |
| Get On-Calls | Get current on-call participants |
| Get Next On-Calls | Get next on-call participants |
| Get Timeline | Get schedule timeline |
| Export iCal | Export schedule as iCal file |

### Escalation (5 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create escalation policy |
| Get | Get escalation details |
| Get All | List all escalations |
| Update | Update escalation policy |
| Delete | Delete escalation |

### Integration (6 operations)
| Operation | Description |
|-----------|-------------|
| Get | Get integration details |
| Get All | List all integrations |
| Enable | Enable an integration |
| Disable | Disable an integration |
| Authenticate | Authenticate an integration |
| Get Actions | Get integration actions |

### Service (5 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create a service |
| Get | Get service details |
| Get All | List all services |
| Update | Update service properties |
| Delete | Delete a service |

### Maintenance (6 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create maintenance window |
| Get | Get maintenance details |
| Get All | List maintenance windows |
| Update | Update maintenance window |
| Delete | Delete maintenance window |
| Cancel | Cancel active maintenance |

### Heartbeat (8 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create a heartbeat monitor |
| Get | Get heartbeat details |
| Get All | List all heartbeats |
| Update | Update heartbeat settings |
| Delete | Delete a heartbeat |
| Enable | Enable a heartbeat |
| Disable | Disable a heartbeat |
| Ping | Send heartbeat ping |

### Policy (8 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create alert/notification policy |
| Get | Get policy details |
| Get All | List policies |
| Update | Update policy |
| Delete | Delete policy |
| Enable | Enable policy |
| Disable | Disable policy |
| Change Order | Change policy execution order |

### Notification Rule (7 operations)
| Operation | Description |
|-----------|-------------|
| Create | Create user notification rule |
| Get | Get rule details |
| Get All | List user's notification rules |
| Update | Update notification rule |
| Delete | Delete notification rule |
| Enable | Enable notification rule |
| Disable | Disable notification rule |

## Trigger Node

The **Opsgenie Trigger** node receives webhook events from Opsgenie in real-time.

### Supported Events

- Alert Created, Acknowledged, Closed, Snoozed
- Alert Escalated, Assigned, Team Added
- Alert Note Added, Tags Added/Removed
- Incident Created, Closed, Resolved
- Heartbeat Expired
- Schedule On-Call Changed

### Webhook Setup

1. In n8n, add an **Opsgenie Trigger** node and copy the webhook URL
2. In Opsgenie, go to **Settings** > **Integrations**
3. Add a new **Webhook** integration
4. Paste the n8n webhook URL
5. Configure event filters and enable desired event types
6. Save and activate the integration

## Usage Examples

### Create Alert from Monitoring System

```json
{
  "message": "High CPU Usage on Production Server",
  "alias": "cpu-alert-prod-001",
  "description": "CPU usage exceeded 90% for 5 minutes",
  "priority": "P2",
  "responders": [
    { "type": "team", "name": "DevOps" }
  ],
  "tags": ["production", "infrastructure", "cpu"],
  "details": {
    "server": "prod-web-01",
    "metric": "cpu_usage",
    "value": "95%"
  }
}
```

### Create Incident with Impacted Services

```json
{
  "message": "Payment Gateway Outage",
  "description": "Payment processing is failing for all customers",
  "priority": "P1",
  "impactedServices": ["payment-service-id"],
  "responders": [
    { "type": "team", "name": "Payments Team" },
    { "type": "user", "username": "oncall@company.com" }
  ],
  "notifyStakeholders": true
}
```

### Automated Escalation Workflow

1. **Trigger**: Opsgenie Trigger (Alert Created)
2. **Check**: If priority is P1 and not acknowledged in 5 minutes
3. **Action**: Escalate to next responder
4. **Notify**: Send Slack message to incident channel

## Opsgenie Concepts

### Alert Priority Levels
- **P1** - Critical: System down, immediate action required
- **P2** - High: Major functionality impacted
- **P3** - Moderate: Some users affected
- **P4** - Low: Minor issue
- **P5** - Informational: No immediate action needed

### Responder Types
- **User**: Individual user by username or ID
- **Team**: Entire team notified based on routing rules
- **Escalation**: Follows escalation policy rules
- **Schedule**: Notifies current on-call participant

### Identifier Types
Many resources support multiple identifier types:
- **id**: Opsgenie's unique identifier (UUID)
- **name**: Human-readable name (teams, schedules, escalations)
- **alias**: User-defined deduplication key (alerts)
- **tiny**: Short ID format (alerts)

## Error Handling

The node handles common Opsgenie API errors:

| Error Code | Description | Resolution |
|------------|-------------|------------|
| 400 | Invalid parameters | Check request body format |
| 401 | Invalid API key | Verify GenieKey in credentials |
| 403 | Insufficient permissions | Check API integration permissions |
| 404 | Resource not found | Verify resource ID/name exists |
| 409 | Conflict | Resource already exists |
| 422 | Validation error | Check required fields |
| 429 | Rate limit exceeded | Implement retry with backoff |

### Rate Limits
- **Default**: 3,000 requests per minute per account
- Headers `X-RateLimit-Remaining` and `X-RateLimit-Reset` track usage
- Alert operations are asynchronous - use "Get Request Status" to verify completion

## Security Best Practices

1. **API Key Security**
   - Store API keys in n8n credentials, never in workflows
   - Use separate API integrations for different use cases
   - Regularly rotate API keys

2. **Permissions**
   - Grant minimum required permissions to API integrations
   - Use team-scoped API keys when possible

3. **Data Handling**
   - Be mindful of sensitive data in alert details
   - Use encryption for sensitive custom fields

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Watch mode for development
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-opsgenie/issues)
- **Documentation**: [Opsgenie API Docs](https://docs.opsgenie.com/docs/api-overview)
- **n8n Community**: [n8n Community Forum](https://community.n8n.io)

## Acknowledgments

- [Opsgenie](https://www.atlassian.com/software/opsgenie) by Atlassian for the incident management platform
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for node development best practices
