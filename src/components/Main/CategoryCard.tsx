import {
  Button,
  Box,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Category } from "../../services/object-service";

interface Props {
  category: Category;
  onClick: (categoryId: number) => void;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const CategoryCard = ({ category, onClick }: Props) => {
  const cardBackground = useColorModeValue("white", "gray.700");
  const imageSize = useBreakpointValue({
    base: "50px",
    sm: "60px",
    md: "70px",
    lg: "80px",
  });

  return (
    <Button
      borderWidth="2px"
      borderColor="customPurple.500"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      textAlign="center"
      width="120px"
      height="auto"
      onClick={() => onClick(category.kategoriid)}
      padding={2}
      flexDirection="column"
      alignItems="center"
      variant="cardButton"
    >
      <Image
        src={category.logoPath || "/fallback-logo-path.webp"}
        alt={`Logo for ${capitalizeFirstLetter(category.kategorinavn)}`}
        boxSize={imageSize}
        objectFit="cover"
        marginBottom={2}
      />
      <Box color="black" fontSize="sm" isTruncated>
        {capitalizeFirstLetter(category.kategorinavn)}
      </Box>
    </Button>
  );
};

export default CategoryCard;
