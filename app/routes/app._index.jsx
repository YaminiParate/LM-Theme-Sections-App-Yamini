import { useCallback, useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { ChartVerticalIcon } from "@shopify/polaris-icons";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  MediaCard,
  VideoThumbnail,
  Grid,
  LegacyCard,
  Divider,
  Frame,
  Modal,
  LegacyStack,
  TextContainer,
  EmptyState,
  Icon,
  Banner,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const variantId =
    responseJson.data.productCreate.product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
      mutation shopifyRemixTemplateUpdateVariant($input: ProductVariantInput!) {
        productVariantUpdate(input: $input) {
          productVariant {
            id
            price
            barcode
            createdAt
          }
        }
      }`,
    {
      variables: {
        input: {
          id: variantId,
          price: Math.random() * 100,
        },
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return json({
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantUpdate.productVariant,
  });
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const shopify = useAppBridge();

  const [active, setActive] = useState(true);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  return (
    <Page>
      <BlockStack gap="500">
        {/* Dashboard Title */}
        <Text variant="headingLg" as="h5">
          "Hi 👋, Silver Ponies Home Test!"
        </Text>

        {/* Show Introductory Videos */}
        <Layout>
          <Layout.Section>
            <Card>
              {/* Description */}
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Quickstart video
                  </Text>
                  <Text variant="bodyMd" as="p">
                    Learn how to use LM Theme Sections easily in just a minute.
                  </Text>
                </BlockStack>

                {/* Show Videos in Grid View */}
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <MediaCard
                      portrait
                      title="Turn your side-project into a business"
                      description="Discover how Shopify can power up your entrepreneurial journey."
                    >
                      <VideoThumbnail
                        videoLength={80}
                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                        onClick={toggleModal}
                      />
                    </MediaCard>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <MediaCard
                      portrait
                      title="Turn your side-project into a business"
                      description="Discover how Shopify can power up your entrepreneurial journey."
                    >
                      <VideoThumbnail
                        videoLength={80}
                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                        onClick={toggleModal}
                      />
                    </MediaCard>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <MediaCard
                      portrait
                      title="Turn your side-project into a business"
                      description="Discover how Shopify can power up your entrepreneurial journey."
                    >
                      <VideoThumbnail
                        videoLength={80}
                        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                        onClick={toggleModal}
                      />
                    </MediaCard>
                  </Grid.Cell>
                </Grid>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Show Video Popup */}

          <Modal
            size="large"
            open={active}
            onClose={toggleModal}
            title="Get a shareable link"
            primaryAction={{
              content: "Close",
              onAction: toggleModal,
            }}
          >
            <Modal.Section>
              <iframe
                src="https://www.youtube.com/embed/zmQjOJJj7MI"
                height="480"
                width="950"
              ></iframe>
            </Modal.Section>
          </Modal>
        </Layout>

        {/* App Support Corner */}
        <Layout>
          <Layout.Section>
            <MediaCard
              title="Turn your side-project into a business"
              primaryAction={{
                content: "Learn more",
                onAction: () => {},
              }}
              description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.In this course, you’ll learn how the Kular family..`}
              popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
            >
              <VideoThumbnail
                videoLength={80}
                thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                onClick={() => console.log("clicked")}
              />
            </MediaCard>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <Banner>
                  <Text as="h2" variant="headingMd">
                    Help Center
                  </Text>
                </Banner>
                <Divider borderWidth="050" borderColor="transparent" />
                <Text variant="bodyMd" as="p">
                  Add tags to your order.
                </Text>
                <Link url="https://help.shopify.com/manual">
                  fulfilling orders
                </Link>
              </Card>
            </BlockStack>
            <Divider borderWidth="050" borderColor="transparent" />
            <BlockStack gap="500">
              <Card>
                <Banner>
                  <Text as="h2" variant="headingMd">
                    Contact Support
                  </Text>
                </Banner>

                <Divider borderWidth="050" borderColor="transparent" />

                <Text variant="bodyMd" as="p">
                  Add tags to your order.
                </Text>
                <Link url="https://help.shopify.com/manual">
                  fulfilling orders
                </Link>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>

        {/* Show Recent Layouts */}
        <Layout>
          <Layout.Section>
            <Card>
              {/* Description */}
              <BlockStack gap="500">
                <Text as="h2" variant="headingMd">
                  Recent Layouts
                </Text>
                <Divider borderColor="border" />
                <EmptyState
                  heading="No layouts installed"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>View the library to add layouts to your theme</p>
                </EmptyState>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Show Layout OverView */}
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <div
                    style={{
                      background: "#eaf4ff",
                      padding: "10px",
                    }}
                  >
                    <InlineStack wrap={false}>
                      <Text as="h2">
                        <Icon source={ChartVerticalIcon} tone="success" />
                      </Text>
                      <Text as="h2" variant="headingMd" tone="success">
                        Overview
                      </Text>
                    </InlineStack>
                  </div>
                  <Text variant="bodyMd" as="p">
                    Statistics of layouts you have installed
                  </Text>
                </BlockStack>

                {/* Show Counts */}
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                      <Text variant="bodyMd" as="p">
                        Sections
                      </Text>
                      <Text as="h2" variant="headingLg">
                        0
                      </Text>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                      <Text variant="bodyMd" as="p">
                        Pages & templates
                      </Text>
                      <Text as="h2" variant="headingLg">
                        0
                      </Text>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
                    <Card>
                      <Text variant="bodyMd" as="p">
                        Styles
                      </Text>
                      <Text as="h2" variant="headingLg">
                        0
                      </Text>
                    </Card>
                  </Grid.Cell>
                </Grid>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
