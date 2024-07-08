import db from "../db.server";

// To get all FAQs
export const getAllFAQs = async () => {
  try {
    // fetching FAQs from Database
    const FAQs = await db.faqs.findMany();

    // if there are no FAQs, return null
    if (FAQs.length === 0) return null;

    return FAQs;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw new Error("Failed to fetch FAQs data");
  }
};
