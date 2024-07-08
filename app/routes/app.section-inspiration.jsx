import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineStack,
  Icon,
  Grid,
  Image,
} from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { getDetails } from "./models/section_inspiration.server";

// it loads data before page elements load
export async function loader({ request }) {
  const { admin, session } = await authenticate.admin(request);
  const data = await getDetails(session.shop);

  return json(data);
}

export default function AdditionalPage() {
  const gridItems = useLoaderData();

  return (
    <Page>
      <Box padding="200">
        {/* Show Page Title */}
        <InlineStack blockAlign="center">
          <Box width="50px">
            <Icon
              source={`<?xml version="1.0" ?><svg height="1.04463in" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" viewBox="0 0 1364 1373" width="1.03763in" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css">
  </style></defs><g id="Layer_x0020_1"><g id="_364848840"><ellipse class="fil0" cx="682" cy="1170" rx="682" ry="203"/><path class="fil0" d="M161 368l0 1 -41 -9c-1,0 -1,0 -2,0 -1,0 -1,0 -1,-1 -1,0 -1,0 -1,0 -1,0 -1,0 -2,0 -1,-1 -2,-1 -3,-1 -3,-1 -5,-2 -7,-3 0,-1 -1,-2 -2,-2 -24,-14 -36,-44 -28,-71 4,-15 13,-27 24,-36 28,-22 67,-17 98,-6 17,6 33,15 47,26 19,16 33,38 27,64 -12,44 -65,44 -109,38zm745 655c15,12 27,27 31,48 10,53 -38,97 -78,122 -49,31 -110,53 -167,61 -71,9 -147,0 -206,-44 -68,-51 -61,-132 -22,-197 -4,-16 -6,-33 -5,-49 -40,-42 -29,-107 10,-149 -4,-11 -5,-23 -3,-35 5,-27 3,-52 -6,-78 -15,-47 -50,-91 -77,-132 -19,-27 -36,-56 -50,-86 -28,-66 -32,-130 -10,-199 22,-69 65,-126 129,-162 97,-56 221,-51 324,-15 107,38 212,117 250,228 43,130 -21,251 -113,341 -18,17 -24,35 -28,60 -4,23 -6,44 -11,65 27,13 50,33 54,65 4,24 -5,44 -19,61 15,30 13,64 -3,95zm199 -501c42,14 90,33 128,56 28,18 62,47 46,85 -17,41 -68,35 -102,26 -43,-11 -86,-34 -123,-58 -36,-24 -37,-77 -3,-102 16,-11 36,-14 54,-7zm-9 -229c50,-10 107,-20 157,-18 35,1 84,10 88,54 4,47 -50,65 -87,72 -51,8 -107,4 -157,-6 -55,-11 -55,-91 -1,-102zm40 -114c-15,9 -30,19 -45,28 -15,9 -31,18 -46,25 -24,11 -54,18 -74,-6 -17,-20 -12,-44 2,-64 21,-33 50,-70 82,-93 25,-17 54,-27 84,-17 23,8 40,28 46,52 7,25 1,55 -23,69 -9,4 -17,7 -26,6zm-910 -179c36,4 67,28 90,54 28,32 73,104 31,142 -27,24 -61,12 -87,-6 -30,-20 -60,-51 -86,-78 -40,-41 -9,-118 52,-112zm347 504c-4,-32 -10,-66 -20,-88 3,29 11,59 20,88z"/><path class="fil1" d="M364 298c127,-397 924,-47 519,348 -58,58 -31,121 -64,184 70,10 95,56 29,92 47,33 31,86 -11,117 198,45 -157,263 -325,137 -56,-41 -36,-110 0,-157 -11,-23 -14,-50 -7,-74 -50,-26 -27,-91 13,-117 0,-5 2,-10 5,-14 -10,-4 -18,-13 -15,-26 36,-187 -214,-274 -144,-490zm727 264c251,87 142,136 -14,33 -17,-11 -6,-40 14,-33zm14 -227c295,-61 218,61 0,18 -9,-2 -9,-16 0,-18zm-97 -149c131,-195 161,-26 121,-52 -9,4 -154,101 -121,52zm-841 485l0 0zm-38 -353c0,0 0,1 0,1 -5,-1 -3,-1 0,-1zm-14 -24c21,-72 236,72 14,24 -11,-2 -17,-14 -14,-24zm107 -251c87,8 179,247 -17,40 -13,-14 -5,-42 17,-40zm743 423c-12,34 -26,63 -47,91 26,-26 40,-57 47,-91zm-323 343c0,-2 0,-4 0,-6 -50,-26 34,-480 -130,-454 -25,149 104,314 102,462 10,1 20,1 30,1 -1,-1 -1,-2 -2,-3zm257 -440c-30,37 -49,106 -77,137 -149,163 -130,282 -151,307 21,1 42,0 63,1 -99,-93 165,-278 165,-445zm-143 420l1 -74c-5,23 -5,48 -1,74zm-210 359c69,40 391,15 276,-98 -76,44 -211,64 -283,4 -19,33 -33,70 7,94zm278 -216c-84,32 -191,47 -277,28 -9,160 342,81 277,-28zm-287 -19c76,26 247,14 311,-41 -22,-23 -85,-20 -61,-64 -2,2 -5,3 -8,4 -1,5 -2,13 -7,16 23,46 -191,26 -219,22 -15,23 -57,49 -16,63z"/></g></g></svg>`}
            ></Icon>
          </Box>
          <Box>
            <Text variant="headingLg" as="h5">
              Section Inspiration
            </Text>
          </Box>
        </InlineStack>
      </Box>

      {/* Section Grid View */}
      <BlockStack gap="300">
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="300">
          {gridItems.map((gridItem, index) => (
            <Card key={index} sectioned>
              <BlockStack gap="200">
                <Image
                  alt={gridItem.title}
                  source={gridItem.imgSrc}
                  fit="cover"
                  className="grid-image"
                  width="100%"
                />
                <Box background="bg-surface-secondary" padding="100">
                  <Text variant="headingSm" as="h6">
                    {gridItem.title}
                  </Text>
                </Box>
              </BlockStack>
            </Card>
          ))}
        </Grid>
      </BlockStack>
    </Page>
  );
}
