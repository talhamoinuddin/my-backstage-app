import { createBackend } from '@backstage/backend-defaults';
import dotenv from 'dotenv';





const backend = createBackend();
dotenv.config();

// Add the various plugins
backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-techdocs-backend'));

// Optional: Add the auth plugin only if needed
 backend.add(import('@backstage/plugin-auth-backend'));
 backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));

// Add the guest provider module (optional)
 backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));

// Catalog plugin
backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'));
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// Permission plugin
backend.add(import('@backstage/plugin-permission-backend'));
backend.add(import('./extenstions/permissionsPolicyExtension'));  // Ensure this path is correct

// Search plugin and search engine
backend.add(import('@backstage/plugin-search-backend'));
backend.add(import('@backstage/plugin-search-backend-module-pg'));
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

// Kubernetes plugin
backend.add(import('@backstage/plugin-kubernetes-backend'));

async function startBackend() {
  // Start the backend without using 'config'
  await backend.start();
}

startBackend().catch(error => {
  console.error('Error starting backend:', error);
  process.exit(1);
});
