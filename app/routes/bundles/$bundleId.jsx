import { useLoaderData } from "@remix-run/react";
import { Box, Card, Layout, Page, Text, Image } from "@shopify/polaris";
import { bundles } from "../data/bundles-data";

// Loader function to fetch the data for a specific bundle
export const loader = ({ params }) => {
  const bundleId = params.bundleId;
  const bundle = bundles[bundleId];

  if (!bundle) {
    throw new Response("Not Found", { status: 404 });
  }

  return { bundle };
};

export default function BundleDetailPage() {
  const { bundle } = useLoaderData();

  return (
    <Page>
      <Box padding="200">
        <Text variant="headingLg" as="h5">
          {bundle.title}
        </Text>
        <Text variant="bodyMd" as="p">
          {bundle.price}
        </Text>
      </Box>
      <Layout>
        <Layout.Section>
          <Card>
            <Image
              width="100%"
              height="100%"
              alt="bundleImage"
              source={bundle.imgSrc}
            />
            <Box padding="200">
              <Text variant="bodyMd" as="p">
                This is a detailed description of the {bundle.title}. Add more
                information here as needed.
              </Text>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
