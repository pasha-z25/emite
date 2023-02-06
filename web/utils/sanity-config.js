export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: `v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}`,
}
