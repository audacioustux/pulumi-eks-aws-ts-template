import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'
import * as eks from '@pulumi/eks'
import * as k8s from '@pulumi/kubernetes'
import { registerAutoTags } from './utils/autoTag.ts'
import * as config from './config.ts'
import { assumeRoleForEKSPodIdentity } from './utils/policyStatement.ts'

const partitionId = await aws.getPartition().then((partition) => partition.id)
const regionId = await aws.getRegion().then((region) => region.id)
const accountId = await aws.getCallerIdentity().then((identity) => identity.accountId)

const { project, organization, stack } = config.pulumi

// Automatically inject tags.
registerAutoTags({
  'pulumi:Organization': organization,
  'pulumi:Project': project,
  'pulumi:Stack': stack,
})

const nm = (name: string) => `${project}-${stack}-${name}`
const nmo = (name: string) => `${nm(name)}-${organization}`

