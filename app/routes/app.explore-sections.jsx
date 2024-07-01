import {
  Box,
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  LegacyCard,
  Tabs,
  Grid,
  InlineStack,
  Button,
  Modal,
  Image,
  Tag,
  Icon,
  Bleed,
  InlineGrid,
  Badge,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  ViewIcon,
  ProductIcon,
  LockIcon,
  PlusIcon,
  BillIcon,
} from "@shopify/polaris-icons";
import { tabs, imageGrids } from "./data/explore-sections-data"; // Importing the data

export default function ExploreSections() {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    imgSrc: "",
    details: [],
  });

  // Handle event for showing Template Details Modal
  const handleShowTemplateModal = useCallback(
    () => setActive((active) => !active),
    [],
  );

  // Handle event for Tabs
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  // Handle event for setting modal content and showing the modal
  const handleViewButtonClick = useCallback(
    (gridItem) => {
      setModalContent(gridItem);
      handleShowTemplateModal();
    },
    [handleShowTemplateModal],
  );

  return (
    <Page fullWidth>
      <BlockStack gap="500">
        {/* Show Page Title */}
        <Text variant="headingLg" as="h5">
          Explore Sections
        </Text>

        {/* Listing of Tabs */}
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {/* Shows Various List Templates */}
          <LegacyCard.Section title={tabs[selected].content}>
            <Grid>
              {imageGrids[selected].map((gridItem, index) => (
                <Grid.Cell
                  key={index}
                  columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}
                >
                  <Card>
                    <InlineStack gap="200" wrap={false}>
                      <Text variant="headingMd" as="h5">
                        {gridItem.title}
                      </Text>
                      {gridItem.badgeTone && gridItem.badgeProgress && (
                        <Badge
                          tone={gridItem.badgeTone}
                          progress={gridItem.badgeProgress}
                        >
                          {gridItem.badgeTone === "success" ? "Unlock" : "Lock"}
                        </Badge>
                      )}
                    </InlineStack>

                    <Image
                      alt=""
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      source={gridItem.imgSrc}
                    />
                    <InlineStack wrap={false} gap="100">
                      <Button fullWidth>Install</Button>
                      <Button
                        icon={ViewIcon}
                        onClick={() => handleViewButtonClick(gridItem)}
                      />
                    </InlineStack>
                  </Card>
                </Grid.Cell>
              ))}
            </Grid>
          </LegacyCard.Section>
        </Tabs>
      </BlockStack>

      {/* Show Template Details in Popup */}

      <Modal
        size="large"
        open={active}
        onClose={handleShowTemplateModal}
        title={modalContent.title}
        primaryAction={{
          content: "Close",
          onAction: handleShowTemplateModal,
        }}
      >
        <Modal.Section>
          <Page fullWidth>
            <Layout>
              {/* Show Sections preview Image */}
              <Layout.Section>
                <Card>
                  <Bleed>
                    <Image
                      width="100%"
                      height="100%"
                      source={modalContent.imgSrc}
                      alt="Template preview"
                    />
                  </Bleed>

                  {/* Show Sections Details */}
                  {modalContent.details?.map((detail, index) => (
                    <InlineStack key={index} gap="100">
                      <Text variant="headingMd" as="h5">
                        {detail.title}
                      </Text>
                      <Text variant="bodyMd" as="p">
                        {detail.description}
                      </Text>
                    </InlineStack>
                  ))}
                </Card>
              </Layout.Section>

              {/* Section Purchase Plans */}
              <Layout.Section variant="oneThird">
                <BlockStack gap="400">
                  <Card>
                    <BlockStack gap="300">
                      <InlineGrid columns="1fr auto">
                        <Text variant="headingMd" as="h5">
                          {modalContent.title}
                        </Text>
                        <Text variant="headingMd" as="h5">
                          $9
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
        </Modal.Section>
      </Modal>
    </Page>
  );
}
