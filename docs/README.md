# Payments Operations Platform

Production-style fintech operations platform built to support transaction investigation, merchant visibility, and operational reporting.

Designed to simulate the internal tools used by payments operations, merchant support, and risk teams.

---

## Live Demo

### Frontend

https://payments-operations-platform.vercel.app

### API Health

https://payments-ops-api-a9chf3hcfshbdehc.eastus-01.azurewebsites.net/health

### Documentation

https://www.notion.so/Payments-Operations-Intelligence-Platform-362a52107914805ebd3bc2e290c0fe4c

---

## Business Problem

Operations teams need visibility into transaction activity, merchant performance, and potential operational issues.

Many reporting systems provide metrics but lack workflows that support investigation and analysis.

This project models how operations teams review transactions, monitor merchants, and investigate payment activity through a centralized platform.

---

## Solution

The platform provides:

* Operational dashboards
* Transaction investigation workflows
* Merchant visibility
* KPI reporting
* Risk indicators
* Search and filtering capabilities

The application focuses on internal tooling rather than consumer-facing experiences.

---

## Architecture

```text
Next.js Frontend
        ↓
ASP.NET Core Minimal API
        ↓
Entity Framework Core
        ↓
PostgreSQL (Supabase)
```

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* ASP.NET Core Minimal API
* Entity Framework Core
* PostgreSQL

### Infrastructure

* Azure App Service
* Vercel
* GitHub Actions
* Supabase

---

## Features

### Operational Dashboard

* KPI analytics cards
* Approval-rate monitoring
* Operational alerts
* Merchant visibility
* Transaction activity reporting

### Transaction Operations

* Search and filtering
* Merchant context
* Risk indicators
* Chargeback visibility
* Transaction investigation workflows

### APIs

* Merchant endpoints
* Transaction endpoints
* Analytics endpoint
* EF Core persistence
* Code-first migrations

---

## Screenshots

### Dashboard

<img width="1656" height="1273" alt="paymentops" src="https://github.com/user-attachments/assets/9aa1af64-2327-4c00-9ac4-cab16cd6dff8" />

### Transaction Investigation
<img width="1656" height="1273" alt="transactionDetailsTable" src="https://github.com/user-attachments/assets/366fc614-8f50-4821-a73c-737099f6ff5a" />

### Filters and Search
<img width="991" height="90" alt="filtersScreenshot" src="https://github.com/user-attachments/assets/dc9bdbb9-b233-477d-8551-2f941fae94e1" />


---

## API Examples

### Transactions

```http
GET /api/transactions
```

```json
[
  {
    "id": 1,
    "merchantName": "Acme Fitness",
    "amount": 275.50,
    "status": "Approved",
    "riskLevel": "Low"
  }
]
```

---

### Merchant Details

```http
GET /api/merchants/1
```

```json
{
  "id": 1,
  "name": "Acme Fitness",
  "approvalRate": 92.4
}
```

---

### Analytics Summary

```http
GET /api/analytics/summary
```

```json
{
  "totalTransactions": 500,
  "approvalRate": 84.2,
  "processedVolume": 125000
}
```

---

## Investigation Workflow

```text
Transaction Appears
          ↓
Operations Dashboard
          ↓
Analyst Selects Transaction
          ↓
Transaction Investigation Drawer
          ↓
Merchant Context Review
          ↓
Risk Assessment
          ↓
Resolution
```

---

## Sequence Diagram

```text
User
 ↓
Frontend
 ↓
Transaction API
 ↓
Entity Framework Core
 ↓
PostgreSQL
 ↓
Response Returned
 ↓
Dashboard Updated
```

---

## Database Model

```text
Merchant
    │
    ├── 1 → Many
    │
Transaction
```

Future entities:

```text
Merchant
    │
    ├── Transactions
    │
Case
    │
AuditEvent
    │
Alert
    │
User
```

---

## Project Structure

```text
frontend/
    Next.js application

backend/PaymentsOps.Api/
    ASP.NET Core Minimal API
```

---

## Deployment

### Frontend

Vercel

### Backend

Azure App Service

### Database

Supabase PostgreSQL

### CI/CD

GitHub Actions

---

## Current Focus

* Investigation workflows
* Analytics enhancements
* Merchant visibility
* Production-style architecture

---

## Planned Enhancements

### Security

* Authentication
* Role-based access control

### Operations

* Case management
* Audit logging
* SLA monitoring
* Alerts

### Reporting

* Export workflows
* Real-time updates
* Observability and structured logging

---

## Documentation

Additional architecture and workflow documentation is maintained in the Notion workspace.

https://www.notion.so/Payments-Operations-Intelligence-Platform-362a52107914805ebd3bc2e290c0fe4c
