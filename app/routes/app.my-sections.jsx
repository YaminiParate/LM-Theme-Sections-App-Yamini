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
  IndexFilters,
  ChoiceList,
  TextField,
  RangeSlider,
  useSetIndexFiltersMode,
  Label,
  Box,
  InlineStack,
} from "@shopify/polaris";
import "./css/my-sections-styles.css";
import { useNavigate } from "@remix-run/react";
import { SearchIcon } from "@shopify/polaris-icons";

import { tabs, imageGrids } from "./data/explore-sections-data"; // Importing the data

export default function MySections() {
  const [selected, setSelected] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from Remix.
  const [taggedWith, setTaggedWith] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  // Handle event for Tabs
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const sortOptions = [
    { label: "Order", value: "order asc", directionLabel: "Ascending" },
    { label: "Order", value: "order desc", directionLabel: "Descending" },
    { label: "Customer", value: "customer asc", directionLabel: "A-Z" },
    { label: "Customer", value: "customer desc", directionLabel: "Z-A" },
    { label: "Date", value: "date asc", directionLabel: "A-Z" },
    { label: "Date", value: "date desc", directionLabel: "Z-A" },
    { label: "Total", value: "total asc", directionLabel: "Ascending" },
    { label: "Total", value: "total desc", directionLabel: "Descending" },
  ];

  const primaryAction = {
    onAction: handleSearchChange,
    disabled: false,
    loading: false,
  };

  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const [queryValue, setQueryValue] = useState("");

  const [accountStatus, setAccountStatus] = useState(undefined);

  const [moneySpent, setMoneySpent] = useState(undefined);

  const { mode, setMode } = useSetIndexFiltersMode();

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    [],
  );

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );

  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    [],
  );

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  function disambiguateLabel(key, value) {
    switch (key) {
      case "moneySpent":
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case "taggedWith":
        return `Tagged with ${value}`;
      case "accountStatus":
        return value.map((val) => `Customer ${val}`).join(", ");
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }

  const appliedFilters = [];
  if (accountStatus && !isEmpty(accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (moneySpent) {
    const key = "moneySpent";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(undefined),
    [],
  );
  const handleMoneySpentRemove = useCallback(
    () => setMoneySpent(undefined),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  // Flatten the imageGrids array
  const flattenedImageGrids = imageGrids.flat();

  const filteredImageGrids =
    selected === 0
      ? flattenedImageGrids.filter((gridItem) =>
          gridItem.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : flattenedImageGrids.filter(
          (gridItem) =>
            gridItem.categoryId === tabs[selected].category &&
            gridItem.title.toLowerCase().includes(searchQuery.toLowerCase()),
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

  return (
    <Page>
      <BlockStack gap="500">
        {/* Show Page Title */}

        <InlineStack>
          <Box width="50px">
            <Icon source='<svg height="150px" id="Capa_1" style="enable-background:new 0 0 70 50;" version="1.1" viewBox="0 0 70 50" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M10,40H5c-2.762,0-5,2.238-5,5s2.238,5,5,5h5c2.762,0,5-2.238,5-5S12.762,40,10,40z M10,20H5c-2.762,0-5,2.238-5,5  s2.238,5,5,5h5c2.762,0,5-2.238,5-5S12.762,20,10,20z M10,0H5C2.238,0,0,2.238,0,5s2.238,5,5,5h5c2.762,0,5-2.238,5-5S12.762,0,10,0  z M30,10h35c2.762,0,5-2.238,5-5s-2.238-5-5-5H30c-2.762,0-5,2.238-5,5S27.238,10,30,10z M65,20H30c-2.762,0-5,2.238-5,5  s2.238,5,5,5h35c2.762,0,5-2.238,5-5S67.762,20,65,20z M65,40H30c-2.762,0-5,2.238-5,5s2.238,5,5,5h35c2.762,0,5-2.238,5-5  S67.762,40,65,40z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>'></Icon>
          </Box>
          <Box>
            <Text variant="headingLg" as="h5">
              My Sections
            </Text>
          </Box>
        </InlineStack>

        {/* Listing of Tabs With Search , Filters and Sorting feature */}

        <IndexFilters
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          queryValue={searchQuery}
          onQueryChange={handleSearchChange}
          queryPlaceholder="Searching in all"
          onQueryClear={() => setSearchQuery("")}
          onSort={setSortSelected}
          primaryAction={primaryAction}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={setSelected}
          filters={filters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />
        {/* <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} /> */}

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
                        <Card padding="200">
                          <Icon source={rightArrow} tone="textPrimary" />
                        </Card>
                      </div>
                    )}
                  </div>
                  <Box background="bg-surface-secondary" padding="100">
                    <Text variant="headingSm" as="h6">
                      {gridItem.title}
                    </Text>
                    <Button fullWidth>Try Section</Button>
                  </Box>
                </BlockStack>
              </Card>
            ))}
          </Grid>
        </BlockStack>
      </BlockStack>
    </Page>
  );
}
