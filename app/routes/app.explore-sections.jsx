import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  LegacyCard,
  Tabs,
  Grid,
  InlineGrid,
  Badge,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { tabs, imageGrids } from "./data/explore-sections-data"; // Importing the data

export default function AdditionalPage() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  return (
    <Page fullWidth>
      <BlockStack gap="500">
        <Text variant="headingLg" as="h5">
          Explore Sections
        </Text>

        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
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

                    <img
                      alt=""
                      width="100%"
                      height="100%"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      src={gridItem.imgSrc}
                    />
                  </Card>
                </Grid.Cell>
              ))}
            </Grid>
          </LegacyCard.Section>
        </Tabs>
      </BlockStack>
    </Page>
  );
}
