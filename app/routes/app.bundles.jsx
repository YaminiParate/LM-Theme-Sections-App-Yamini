import {
  Box,
  Card,
  Layout,
  Page,
  Text,
  Grid,
  Image,
  InlineGrid,
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import { bundles } from "./data/bundles-data";

export default function Bundles() {
  const navigate = useNavigate(); // Get the navigate function from Remix

  // Function to handle the manage button click
  const handleManageClick = (bundleId) => {
    // Use navigate function to change the route programmatically
    navigate(`/app/bundleDetail/${bundleId}`);
  };

  return (
    <Page>
      {/* Page Title  */}
      <Box padding="200">
        <Text variant="headingLg" as="h5">
          All bundles
        </Text>
        <Text variant="bodyMd" as="p">
          Bundles lets you buy multiple sections at a discounted price.
        </Text>
      </Box>
      <Layout>
        <Layout.Section>
          {/* Show bundles sections */}
          <Grid>
            {bundles.map((bundle) => (
              <Grid.Cell
                key={bundle.id}
                columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}
              >
                <Card roundedAbove="xl">
                  <Image
                    width="100%"
                    height="100%"
                    alt="bundleImage"
                    source={bundle.imgSrc}
                    onClick={() => handleManageClick(bundle.id)}
                  />
                  <InlineGrid columns="1fr auto">
                    <Text as="p" variant="bodyMd">
                      {bundle.title}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      {bundle.price}
                    </Text>
                  </InlineGrid>
                </Card>
              </Grid.Cell>
            ))}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
