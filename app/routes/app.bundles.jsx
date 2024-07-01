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
import { Link } from "@remix-run/react";
import { bundles } from "./data/bundles-data";

export default function Bundles() {
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
            {bundles.map((bundle, index) => (
              <Grid.Cell
                key={index}
                columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}
              >
                <Link to={`/app/bundles/${index}`}>
                  <Card roundedAbove="xl">
                    <Image
                      width="100%"
                      height="100%"
                      alt="bundleImage"
                      source={bundle.imgSrc}
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
                </Link>
              </Grid.Cell>
            ))}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
