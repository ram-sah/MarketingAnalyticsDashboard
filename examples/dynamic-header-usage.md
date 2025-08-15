# Dynamic Header Usage Examples

## Overview
The dashboard header is now fully dynamic and can be customized per client using props or API configuration.

## Usage Examples

### 1. Basic Usage with Props
```tsx
<DashboardHeader 
  clientLogoUrl="https://example.com/logo.png"
  companyName="Your Company Name"
  businessType="Your Industry"
  location="Your Location"
  auditDate="2025-08-15"
  overallScore={85}
/>
```

### 2. Using Configuration Object
```tsx
import { getClientConfig } from '@/utils/headerConfig';

const config = getClientConfig("your-client-id");
<DashboardHeader {...config} />
```

### 3. API-Driven Configuration
The header data is automatically fetched from `/api/dashboard/overview` endpoint which includes:
```json
{
  "headerConfig": {
    "clientLogoUrl": "https://example.com/logo.png",
    "companyName": "Client Company",
    "businessType": "Industry Type", 
    "location": "Country/Region",
    "auditDate": "2025-08-15",
    "overallScore": 75
  }
}
```

## Quick Setup for New Clients

### Method 1: Update API Configuration
Modify `server/routes.ts` to fetch client data from database:
```typescript
const clientData = await getClientData(clientId);
const overview = {
  headerConfig: {
    clientLogoUrl: clientData.logoUrl,
    companyName: clientData.name,
    businessType: clientData.industry,
    location: clientData.location,
    auditDate: new Date().toISOString().split('T')[0],
    overallScore: calculateScore(clientData.metrics)
  }
  // ... rest of data
};
```

### Method 2: Use Client Configuration Utility
```typescript
import { updateClientConfig } from '@/utils/headerConfig';

updateClientConfig("new-client", {
  clientLogoUrl: "https://newclient.com/logo.png",
  companyName: "New Client Corp",
  businessType: "Manufacturing",
  location: "Germany",
  overallScore: 78
});
```

## Template Mapping
Original template variables now map to props:
- `{{client_logo_url}}` → `clientLogoUrl`
- `{{company_name}}` → `companyName`
- `{{businessType}}` → `businessType`
- `{{location}}` → `location`
- `{{audit_date}}` → `auditDate`
- `{{overall_score}}` → `overallScore`