import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface ItemSearchInputProps {
  onSearch: (query: string) => void;
}

const ItemSearchInput = ({ onSearch }: ItemSearchInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value; // Preserve the user's casing
    setInputValue(inputValue); // Update state with the input as typed
    onSearch(inputValue.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  const clearInput = () => {
    setInputValue("");
    onSearch(""); // Clear the search
  };

  return (
    <Flex width="full" justifyContent="center" alignItems="center" p={4}>
      <Flex maxWidth="500px" width="full" alignItems="center">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Søk etter gjenstander..."
            value={inputValue}
            onChange={handleInputChange}
            borderColor="#84216B"
            borderRadius="md"
          />
        </InputGroup>
        {inputValue && (
          <IconButton
            aria-label="Clear search field"
            variant="ghost"
            icon={<CloseIcon />}
            onClick={clearInput}
            colorScheme="red"
            size="sm"
            marginLeft={2}
            borderRadius="md"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ItemSearchInput;
