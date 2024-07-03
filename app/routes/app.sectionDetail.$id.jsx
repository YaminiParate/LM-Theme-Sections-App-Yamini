import { json } from "@remix-run/node";

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
  const sectionId = params.id;

  console.log(`Loading section with ID: ${sectionId}`); // Debug log

  // Find the bundle containing the given sectionId
  const section = imageGrids
    .flat()
    .find((item) => item.sectionId === sectionId);

  console.log(section);

  if (!section) {
    console.error(`section with ID: ${sectionId} not found`); // Error log
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    title: section.title,
    image: section.imgSrc,
    price: section.price,
    details: section.details,
  });
};

function sectionsDetails() {
  let { title, image, price, details } = useLoaderData();

  return (
    <Page
      backAction={{ content: "Section", url: "/app/my-sections" }}
      title={title}
    >
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

            <Box padding="400" background="nav-bg-surface-hover">
              {/* Show Sections Details */}
              {details?.map((detail, index) => (
                <InlineStack key={index} gap="100">
                  <Text variant="headingMd" as="h5">
                    {detail.title}
                  </Text>
                  <Text variant="bodyMd" as="p">
                    {detail.description}
                  </Text>
                </InlineStack>
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

export default sectionsDetails;
