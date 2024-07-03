import React, { useCallback, useMemo, useState } from "react";
import {
  Card,
  Page,
  Text,
  BlockStack,
  Tabs,
  Grid,
  Button,
  Image,
  Icon,
  Autocomplete,
  InlineGrid,
  Divider,
} from "@shopify/polaris";
import "./css/my-sections-styles.css";
import { useNavigate } from "@remix-run/react";
import { SearchIcon } from "@shopify/polaris-icons";

import { tabs, imageGrids } from "./data/explore-sections-data"; // Importing the data

export default function MySections() {
  const [selected, setSelected] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from Remix

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

  const rightArrow = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
      </svg>
    );
  };

  const handleRedirectDetailPage = (sectionId) => {
    // Use navigate function to change the route programmatically
    navigate(`/app/sectionDetail/${sectionId}`);
  };

  const deselectedOptions = useMemo(
    () => [
      { value: "rustic", label: "Rustic" },
      { value: "antique", label: "Antique" },
      { value: "vinyl", label: "Vinyl" },
      { value: "vintage", label: "Vintage" },
      { value: "refurbished", label: "Refurbished" },
    ],
    [],
  );
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || "");
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <Page>
      <BlockStack gap="500">
        {/* Show Page Title */}
        <Text variant="headingLg" as="h5">
          My Sections
        </Text>

        {/* Listing of Tabs */}
        <InlineGrid columns={["twoThirds", "oneThird"]}>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} />

          <div style={{ width: "325px" }}>
            <Autocomplete
              options={options}
              selected={selectedOptions}
              onSelect={updateSelection}
              textField={textField}
            />
          </div>
        </InlineGrid>

        <BlockStack gap="300">
          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="300">
            {filteredImageGrids.map((gridItem, index) => (
              <Card key={index} sectioned>
                <BlockStack gap="200">
                  <div
                    className="image-container"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      alt={gridItem.title}
                      source={gridItem.imgSrc}
                      fit="cover"
                      className="grid-image"
                    />
                    {hoveredIndex === index && (
                      <div
                        className="overlay"
                        onClick={() =>
                          handleRedirectDetailPage(gridItem.sectionId)
                        }
                      >
                        <Icon source={rightArrow} tone="textPrimary" />
                      </div>
                    )}
                  </div>
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
