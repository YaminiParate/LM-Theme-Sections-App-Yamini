import React, { useState, useCallback } from "react";
import {
  Collapsible,
  Page,
  Box,
  Text,
  Card,
  BlockStack,
  Icon,
} from "@shopify/polaris";
import { ChevronRightIcon } from "@shopify/polaris-icons";
import { getAllFAQs } from "../models/FAQs.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const faqs = await getAllFAQs();
  return json(faqs);
};

const FAQPage = () => {
  let faqs = useLoaderData();

  console.log("faqs");
  console.log(faqs);

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
          Still have questions? Reach out to our support at:
          help@lm.theme.sections
        </Text>
      </Box>

      {/* Shows List of FAQs */}
      {faqs.map((item, index) => (
        <Box padding="200" key={index}>
          <Card>
            <BlockStack
              gap="300"
              padding="200"
              onClick={() => handleToggle(index)}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <Text variant="headingSm" as="h5">
                  {item.question}
                </Text>
                <span
                  style={{
                    rotate: openIndex === index && "90deg",
                    transition: "ease 300ms",
                  }}
                >
                  <Icon source={ChevronRightIcon} />
                </span>
              </Box>
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
