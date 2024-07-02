import React, { useCallback, useState } from "react";
import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  Tabs,
  Grid,
  Button,
  Image,
} from "@shopify/polaris";
import { tabs, imageGrids } from "./data/explore-sections-data"; // Importing the data

export default function MySections() {
  const [selected, setSelected] = useState(0);

  // Handle event for Tabs
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  // Flatten the imageGrids array
  const flattenedImageGrids = imageGrids.flat();

  // Filtered grids based on selected tab
  const filteredImageGrids =
    selected === 0
      ? flattenedImageGrids // Show all for "All" tab
      : flattenedImageGrids.filter(
          (gridItem) => gridItem.categoryId === tabs[selected].category,
        );

  return (
    <Page>
      <BlockStack gap="500">
        {/* Show Page Title */}
        <Text variant="headingLg" as="h5">
          My Sections
        </Text>

        {/* Listing of Tabs */}
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />

        <BlockStack gap="300">
          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="300">
            {filteredImageGrids.map((gridItem, index) => (
              <Card key={index} sectioned>
                <BlockStack gap="200">
                  <Image
                    alt={gridItem.title}
                    source={gridItem.imgSrc}
                    fit="cover"
                    style={{ height: "200px" }}
                  />
                  <Text variant="headingSm" as="h6">
                    {gridItem.title}
                  </Text>
                  <Button fullWidth>Try Section</Button>
                </BlockStack>
              </Card>
            ))}
          </Grid>
        </BlockStack>
      </BlockStack>
    </Page>
  );
}
