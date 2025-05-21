# Gateway Helm Chart

This Helm chart deploys the API gateway for the HuddleHub application. It includes:
- A service configuration for the gateway itself
- An ingress controller that routes traffic to the appropriate backend services

## Installation

From the root of the repo:

```bash
helm install gateway k8s/helm/gateway
```

## Configuration

You can override default values by creating a custom values file:

```yaml
# custom-values.yaml
service:
  port: 5000  # Custom port

ingress:
  host: myapp.example.com  # Custom domain
```

Then install with:

```bash
helm install gateway k8s/helm/gateway -f custom-values.yaml
```

## Ingress Routes

The default configuration includes routes for:
- `/api/user/*` → user service
- `/api/auth/*` → auth service

To add more routes, modify the `values.yaml` file or provide overrides. 