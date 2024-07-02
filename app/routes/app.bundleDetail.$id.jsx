import { json } from "@remix-run/node";
import { bundles } from "./data/bundles-data";
import { useLoaderData } from "@remix-run/react";
import {
  Bleed,
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  Icon,
  Image,
  InlineGrid,
  InlineStack,
  Layout,
  Page,
  Tag,
  Text,
} from "@shopify/polaris";
import {
  ViewIcon,
  ProductIcon,
  LockIcon,
  PlusIcon,
  BillIcon,
} from "@shopify/polaris-icons";
import { imageGrids } from "./data/explore-sections-data";

export const loader = async ({ params }) => {
  const bundleId = params.id;

  console.log(`Loading bundle with ID: ${bundleId}`); // Debug log

  const bundle = bundles.find((bundle) => bundle.id === bundleId);

  if (!bundle) {
    console.error(`Bundle with ID: ${bundleId} not found`); // Error log
    throw new Response("Not Found", { status: 404 });
  }

  // Filter imageGrids to include only sections with the matching bundleId
  const filteredImageGrids = imageGrids
    .map((grid) => grid.filter((item) => item.bundleId === bundleId))
    .filter((grid) => grid.length > 0); // Remove empty grids

  return json({
    title: bundle.title,
    image: bundle.imgSrc,
    price: bundle.price,
    imageGrids: filteredImageGrids, // Include filtered imageGrids data here
  });
};

function BundlesDetails() {
  let { title, image, price, imageGrids } = useLoaderData();

  return (
    <Page backAction={{ content: "Bundle", url: "/app/bundles" }} title={title}>
      <Layout>
        {/* Show Sections preview Image */}
        <Layout.Section>
          <Card>
            <Bleed>
              <Image
                width="100%"
                height="100%"
                source={image}
                alt="Template preview"
              />
            </Bleed>
            <Box padding="400">
              {imageGrids.map((grid, gridIndex) => (
                <Grid key={gridIndex}>
                  {grid.map((item, index) => (
                    <Grid.Cell
                      key={index}
                      columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                      <Card>
                        <Image
                          width="100%"
                          height="100%"
                          source={item.imgSrc}
                          alt={item.title}
                        />
                        <Text as="p" variant="bodyMd" alignment="center">
                          {item.title}
                        </Text>
                        <Text as="p" variant="bodyMd" alignment="center">
                          {item.price}
                        </Text>
                      </Card>
                    </Grid.Cell>
                  ))}
                </Grid>
              ))}
            </Box>
          </Card>
        </Layout.Section>

        {/* Section Purchase Plans */}
        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <InlineGrid columns="1fr auto">
                  <Text variant="headingMd" as="h5">
                    {title}
                  </Text>
                  <Text variant="headingMd" as="h5">
                    {price}
                  </Text>
                </InlineGrid>
              </BlockStack>
              <BlockStack gap="300" inlineAlign="start">
                <InlineGrid columns="1fr auto" gap="200">
                  <Tag>Wholesale</Tag>
                  <Tag>Testimonial</Tag>
                </InlineGrid>
                <Text variant="bodyMd" as="p">
                  Add tags to your order.
                </Text>
                <Button fullWidth variant="primary" icon={ProductIcon}>
                  Buy A Section
                </Button>
              </BlockStack>
              <Box paddingBlock="100">
                <InlineStack gap="0" blockAlign="center">
                  <Icon source={LockIcon} tone="base" />
                  <Text variant="bodyMd" as="p">
                    Secure payment through Shopify
                  </Text>
                </InlineStack>
              </Box>
            </Card>
            <Card>
              <BlockStack inlineAlign="start">
                <InlineStack gap="100">
                  <Icon source={ProductIcon} tone="base" />
                  <Text variant="bodyMd" as="p">
                    One-time charge
                  </Text>
                </InlineStack>
                <InlineStack gap="100">
                  <Icon source={BillIcon} tone="base" />
                  <Text variant="bodyMd" as="p">
                    Buy once, own forever
                  </Text>
                </InlineStack>
                <InlineStack gap="100">
                  <Icon source={PlusIcon} tone="base" />
                  <Text variant="bodyMd" as="p">
                    Add section to any theme
                  </Text>
                </InlineStack>
              </BlockStack>
            </Card>

            {/* View Demo Store */}
            <Card>
              <BlockStack inlineAlign="start">
                <Button icon={ViewIcon} fullWidth>
                  View Demo Store
                </Button>
              </BlockStack>
            </Card>
            {/* Try Section */}
            <Card>
              <BlockStack inlineAlign="start">
                <Button fullWidth>Try Section</Button>
              </BlockStack>
            </Card>
            {/* Section Information Video */}
            <Card>
              <BlockStack inlineAlign="center">
                <iframe
                  src="https://www.youtube.com/embed/zmQjOJJj7MI"
                  height="250"
                  width="auto"
                ></iframe>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default BundlesDetails;
