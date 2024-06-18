import { getProject, getOrganization, getStack } from '@pulumi/pulumi'

const pulumi = {
  organization: getOrganization().toLowerCase(),
  project: getProject().toLowerCase(),
  stack: getStack().toLowerCase(),
}

export { pulumi }
