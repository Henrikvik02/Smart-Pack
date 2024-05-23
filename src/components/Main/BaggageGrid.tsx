import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import useCategories from "../../hooks/useCategories";
import CategoryCard from "./CategoryCard";
import ItemList from "./Lists/ItemList";
import SearchedItemList from "./Lists/SearchedItemList";
import ItemSearchInput from "./ItemSearchInput";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const BaggageGrid = () => {
  const { categories, isLoading, error } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedCategoryDescription, setSelectedCategoryDescription] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const contentAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedCategoryName && contentAreaRef.current) {
      setTimeout(() => {
        if (contentAreaRef.current) {
          // Check again to ensure ref is not null
          contentAreaRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Delay the scroll to allow the content to render
    }
  }, [selectedCategoryName]);
  

  return (
    <Box width="full" height="full" className="baggage-grid-container">
      <VStack spacing={4} as="section" className="baggage-grid-header">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          className="baggage-rules-heading"
        >
          Bagasjeregler
        </Text>
        <Text fontSize="lg" className="baggage-rules-subheading">
          Hva kan du ta med i håndbagasjen og hva kan du ta med i innsjekket
          bagasje?
        </Text>
        <ItemSearchInput onSearch={setSearchQuery} />
      </VStack>
      <Container
        maxW="container.xl"
        centerContent
        className="category-cards-container"
      >
        {!searchQuery && (
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 6, lg: 6 }}
            spacing="20px"
            mt={6}
            className="category-cards-grid"
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.kategoriid}
                category={category}
                onClick={() => {
                  setSelectedCategoryId(category.kategoriid);
                  setSelectedCategoryName(category.kategorinavn);
                  setSelectedCategoryDescription(category.kategoribeskrivelse);
                  setSearchQuery(""); // Clear search query when a category is selected
                }}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
      {searchQuery && <SearchedItemList searchQuery={searchQuery} />}
      {selectedCategoryName && !searchQuery && (
        <Flex
          direction="column"
          width="full"
          alignItems="center"
          justifyContent="center"
          mt={10}
          mb={10}
          className="selected-category-display"
        >
          <VStack
            ref={contentAreaRef}
            spacing={2}
            width="full"
            className="selected-category-info"
          >
            <Text
              fontSize="xl"
              fontWeight="semibold"
              textAlign="center"
              className="selected-category-heading"
            >
              Kategori valgt:
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center"
              className="selected-category-name"
            >
              {capitalizeFirstLetter(selectedCategoryName)}
            </Text>
            <Text>
            
            </Text>
            {selectedCategoryId && <ItemList kategoriid={selectedCategoryId} />}
          </VStack>
        </Flex>
      )}
    </Box>
  );
};

export default BaggageGrid;
