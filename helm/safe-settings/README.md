# GitHub Safe-Settings Chart

A Helm chart for Safe-Settings, an app to manage policy-as-code and apply repository settings across an organization.

To avoid storing sensitive information in version control, use the GitOps approach. For instance, instead of storing sensitive environment values (like private key and webhook secret) in your Helm values, deploy SealedSecrets or ExternalSecrets to manage Kubernetes secrets. These secrets can then be referenced in your Helm values.

The documentation is generated with [helm-docs](https://github.com/norwoodj/helm-docs). This way it's ensure that values are consistent with the chart documentation.
A simple script will execute the helm-docs docker container (so no need to downloading the binary).

To regenerate this document, run:

```shell
./helm/scripts/helm-docs.sh
```

## Prerequisites

- Tested on Kubernetes: `>=1.19.0-0`
- Helm v3.0.0+

## Note

The Helm Chart is published using OCI rather than a traditional charts registry.

> Standard commands like `helm search repo` and `helm repo add` don't work ([Helm issue related](https://github.com/helm/helm/issues/11000))

To view the latest Helm chart tag:

```shell
helm show values oci://ghcr.io/github/helm-charts/safe-settings
```

To list chart tags:

```shell
$ docker run quay.io/skopeo/stable:latest list-tags docker://ghcr.io/github/helm-charts/safe-settings
{
  "Repository": "ghcr.io/github/helm-charts/safe-settings",
  "Tags": [
      "2.1.8",
      "2.1.9",
      "2.1.10",
      "2.1.11",
      "2.1.13",
      "2.1.14"
  ]
}
```

To display the configuration layer:

```shell
$ docker run quay.io/skopeo/stable:latest inspect --config --raw docker://ghcr.io/github/helm-charts/safe-settings:2.1.14 | jq -r
{
  "name": "safe-settings",
  "version": "2.1.14",
  "description": "A Helm chart for Kubernetes",
  "apiVersion": "v2",
  "appVersion": "2.1.14",
  "type": "application"
}
```

## Install

You can see the values that can be configured:

```shell
helm show values oci://ghcr.io/github/helm-charts/safe-settings
# or using specific version
# helm show values oci://ghcr.io/github/helm-charts/safe-settings --version 2.14
```

Review the default values, then **make sure to set the [Deployment Environment Variables](../../docs/deploy.md#deployment-environment-variables)** (by example using `envFrom:`, `helm ... --set` or `env:`)

To install the chart:

```shell
# Using values
helm install my-release oci://ghcr.io/github/helm-charts/safe-settings \
  --values my-values.yml

# Override or define additional values using `--set`
helm install my-release oci://ghcr.io/github/helm-charts/safe-settings \
  --values my-values.yml \
  --set env.APP_ID=${APP_ID} \
  --set env.PRIVATE_KEY=${PRIVATE_KEY} \
  --set env.WEBHOOK_SECRET=${WEBHOOK_SECRET}
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` | Affinity |
| autoscaling.enabled | bool | `false` | Enable Horizontal Pod Autoscaler |
| autoscaling.maxReplicas | int | `10` | Maximum number of replicas |
| autoscaling.minReplicas | int | `2` | Minimum number of replicas |
| autoscaling.targetCPUUtilizationPercentage | int | `80` | Average CPU utilization percentage |
| containerPorts | object | `{"http":3000}` | Safe-Settings application container ports |
| containerPorts.http | int | `3000` | Application container port |
| containerSecurityContext.allowPrivilegeEscalation | bool | `false` |  |
| containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| containerSecurityContext.privileged | bool | `false` |  |
| containerSecurityContext.readOnlyRootFilesystem | bool | `true` |  |
| containerSecurityContext.runAsNonRoot | bool | `true` |  |
| containerSecurityContext.runAsUser | int | `1000` |  |
| deploymentConfig | string | `""` | Safe-Settings deployment configuration |
| env | object | `{}` | Environment variables to pass to safe-settings application |
| envFrom | list | `[]` | envFrom to pass to safe-settings application |
| extraObjects | list | `[]` | Array of extra K8s manifests to deploy supporting Helm templating |
| fullnameOverride | string | `""` | String to fully override `"safe-settings.fullname"` |
| global.additionalLabels | object | `{}` | Additional labels to be added to all resources |
| image.pullPolicy | string | `"IfNotPresent"` | Image pull policy |
| image.repository | string | `"ghcr.io/github/safe-settings"` | Repository to use |
| image.tag | string | `""` | Overrides the image tag whose default is the chart appVersion |
| imagePullSecrets | list | `[]` | Secrets with credentials to pull images from a private registry |
| ingress.annotations | object | `{}` | Additional ingress annotations |
| ingress.className | string | `""` | Defines which ingress controller will implement the resource |
| ingress.enabled | bool | `false` | Enable and ingress resources |
| ingress.hosts[0] | object | `{"host":"chart-example.local","paths":[{"path":"/","pathType":"ImplementationSpecific"}]}` | Hostname |
| ingress.hosts[0].paths[0] | object | `{"path":"/","pathType":"ImplementationSpecific"}` | The path to Safe-Settings application |
| ingress.hosts[0].paths[0].pathType | string | `"ImplementationSpecific"` | Ingress path type |
| ingress.tls | list | `[]` | Ingress TLS configuration |
| nameOverride | string | `""` | Provide a name in place of `safe-settings` |
| nodeSelector | object | `{}` | Node selector |
| podAnnotations | object | `{}` | Annotations to be added to pods |
| podLabels | object | `{}` | Labels to be added to pods |
| replicaCount | int | `2` | The number of application pods to run |
| resources | object | `{}` | Resource limits and requests for the application pods |
| securityContext | string | `nil` | Toggle and define pod-level security context |
| service.annotations | object | `{}` | Service annotations |
| service.port | int | `3000` | Service http port |
| service.type | string | `"ClusterIP"` | Service type |
| serviceAccount.annotations | object | `{}` | Annotations applied to created service account |
| serviceAccount.automountServiceAccountToken | bool | `false` | Automount API credentials for the Service Account |
| serviceAccount.create | bool | `true` | Create a service account |
| serviceAccount.name | string | `""` | Service account name |
| tolerations | list | `[]` | Tolerations |
| volumeMounts | list | `[]` | Additional volumeMounts to mount |
| volumes | list | `[]` | Additional volumes to the server pod |

----------------------------------------------
Autogenerated from chart metadata using [helm-docs](https://github.com/norwoodj/helm-docs)
