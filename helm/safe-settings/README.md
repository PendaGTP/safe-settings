# Github Safe-Settings Chart

A Helm chart for Safe-Settings, an app to manage policy-as-code and apply repository settings across an organization.

The documentation is generated with [helm-docs](https://github.com/norwoodj/helm-docs). This way it's ensure that values are consistent with the chart documentation.
A simple script will execute the helm-docs docker container (so no need to downloading the binary).

To regenerate this document, please run:

```shell
./helm/scripts/helm-docs.sh
```

## Prerequisites

- Tested on Kubernetes: `>=1.19.0-0`
- Helm v3.0.0+

## Installing the Chart

Refer to [Deploying using helm](https://github.com/github/safe-settings/blob/main-enterprise/docs/deploy.md#deploying-using-helm).

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
| deploymentConfig.configvalidators[0].error | string | `"`Admin cannot be assigned to collaborators`\n"` |  |
| deploymentConfig.configvalidators[0].plugin | string | `"collaborators"` |  |
| deploymentConfig.configvalidators[0].script | string | `"console.log(`baseConfig ${JSON.stringify(baseconfig)}`)\nreturn baseconfig.permission != 'admin'\n"` |  |
| deploymentConfig.overridevalidators[0].error | string | `"`Branch protection required_approving_review_count cannot be overidden to a lower value`\n"` |  |
| deploymentConfig.overridevalidators[0].plugin | string | `"branches"` |  |
| deploymentConfig.overridevalidators[0].script | string | `"console.log(`baseConfig ${JSON.stringify(baseconfig)}`)\nconsole.log(`overrideConfig ${JSON.stringify(overrideconfig)}`)\nif (baseconfig.protection.required_pull_request_reviews.required_approving_review_count && overrideconfig.protection.required_pull_request_reviews.required_approving_review_count ) {\n  return overrideconfig.protection.required_pull_request_reviews.required_approving_review_count >= baseconfig.protection.required_pull_request_reviews.required_approving_review_count\n}\nreturn true\n"` |  |
| deploymentConfig.overridevalidators[1].error | string | `"Some error\n"` |  |
| deploymentConfig.overridevalidators[1].plugin | string | `"labels"` |  |
| deploymentConfig.overridevalidators[1].script | string | `"return true\n"` |  |
| deploymentConfig.restrictedRepos.exclude[0] | string | `"^admin$"` |  |
| deploymentConfig.restrictedRepos.exclude[1] | string | `"^\\.github$"` |  |
| deploymentConfig.restrictedRepos.exclude[2] | string | `"^safe-settings$"` |  |
| deploymentConfig.restrictedRepos.exclude[3] | string | `".*-test"` |  |
| deploymentConfig.restrictedRepos.include[0] | string | `"^test$"` |  |
| env | list | `[]` | Environment variables to pass to safe-settings application |
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
