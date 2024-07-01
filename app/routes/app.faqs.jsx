import React, { useState, useCallback } from "react";
import {
  Collapsible,
  Link,
  Page,
  Box,
  Text,
  Card,
  BlockStack,
  InlineGrid,
} from "@shopify/polaris";
import { faqItems } from "./data/faqs-data"; // Importing the data

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = useCallback(
    (index) => {
      setOpenIndex(openIndex === index ? null : index);
    },
    [openIndex],
  );

  return (
    <Page>
      {/* Display Page Title */}
      <Box padding="200">
        <Text variant="headingLg" as="h5">
          FAQs
        </Text>
        <Text variant="bodyMd" as="p">
          Bundles lets you buy multiple sections at a discounted price.
        </Text>
      </Box>

      {/* Shows List of FAQs */}
      {faqItems.map((item, index) => (
        <Box padding="200">
          <Card key={index}>
            <BlockStack gap="300">
              <InlineGrid columns="1fr auto">
                <Text variant="headingSm" as="h5">
                  {item.question}
                </Text>
                <Link onClick={() => handleToggle(index)}>
                  {openIndex === index ? "Hide" : "Show"}
                </Link>
              </InlineGrid>
            </BlockStack>
            <Collapsible
              open={openIndex === index}
              id={`faq-collapsible-${index}`}
              transition={{
                duration: "500ms",
                timingFunction: "ease-in-out",
              }}
              expandOnPrint
            >
              <Text variant="bodyMd" as="p">
                {item.answer}
              </Text>
            </Collapsible>
          </Card>
        </Box>
      ))}
    </Page>
  );
};

export default FAQPage;
