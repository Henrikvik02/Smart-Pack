import { Flex, InputGroup, InputLeftElement, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface ItemSearchInputProps {
  onSearch: (query: string) => void;
}

const ItemSearchInput = ({ onSearch }: ItemSearchInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <Flex
      width="full" // Full width of the parent component
      justifyContent="center" // Horizontally center the content
      alignItems="center" // Vertically center the content
      p={4} // Padding around to avoid looking squished
    >
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
            borderRadius="md" // Rounded corners for the input field
          />
        </InputGroup>
        {inputValue && (
          <IconButton
            aria-label="Klarer søkefelt"
            variant="danger"
            icon={<CloseIcon />}
            onClick={clearInput}
            colorScheme="danger"
            size="sm"
            marginLeft={2} // Margin to separate button from input
            borderRadius="md" // Rounded corners for the button
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ItemSearchInput;
