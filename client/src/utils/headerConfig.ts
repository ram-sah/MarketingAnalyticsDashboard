// Example configuration for different clients
// You can modify these values or create a function to fetch them from a database/API

export interface HeaderConfig {
  clientLogoUrl: string;
  companyName: string;
  businessType: string;
  location: string;
  auditDate: string;
  overallScore: number;
}

// Example configurations for different clients
export const clientConfigurations: Record<string, HeaderConfig> = {
  "unitx-lab": {
    clientLogoUrl: "https://www.unitxlabs.com/wp-content/uploads/2025/01/black-square-256-favicon.png",
    companyName: "Unitx Lab AI",
    businessType: "AI Integration",
    location: "US",
    auditDate: "2025-08-15",
    overallScore: 75
  },
  "sample-client": {
    clientLogoUrl: "https://via.placeholder.com/256x256/4285f4/ffffff?text=SC",
    companyName: "Sample Client Corp",
    businessType: "E-commerce",
    location: "Canada",
    auditDate: "2025-08-15",
    overallScore: 68
  },
  "tech-startup": {
    clientLogoUrl: "https://via.placeholder.com/256x256/34a853/ffffff?text=TS",
    companyName: "Tech Startup Inc",
    businessType: "SaaS Platform",
    location: "UK",
    auditDate: "2025-08-15",
    overallScore: 82
  }
};

// Function to get configuration by client ID
export function getClientConfig(clientId: string): HeaderConfig {
  return clientConfigurations[clientId] || clientConfigurations["unitx-lab"];
}

// Function to update configuration dynamically
export function updateClientConfig(clientId: string, config: Partial<HeaderConfig>): HeaderConfig {
  const existingConfig = getClientConfig(clientId);
  const updatedConfig = { ...existingConfig, ...config };
  clientConfigurations[clientId] = updatedConfig;
  return updatedConfig;
}