import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useCreateCategory from "../../hooks/useCreateCategories";

const CategoryCreateForm = () => {
  const { createCategory, isLoading, error } = useCreateCategory();
  const [kategoriid, setKategoriid] = useState("");
  const [kategorinavn, setKategorinavn] = useState("");
  const [kategoribeskrivelse, setKategoribeskrivelse] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "Feil",
        description: "Du må laste opp en logo som .webp-fil.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    createCategory(
      {
        kategoriid: Number(kategoriid),
        kategorinavn,
        kategoribeskrivelse,
        id: "",
      },
      file
    );
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="kategoriid">Kategori ID</FormLabel>
            <Input
              id="kategoriid"
              type="number"
              value={kategoriid}
              onChange={(e) => setKategoriid(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="kategorinavn">Kategorinavn</FormLabel>
            <Input
              id="kategorinavn"
              type="text"
              value={kategorinavn}
              onChange={(e) => setKategorinavn(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="kategoribeskrivelse">
              Kategoribeskrivelse
            </FormLabel>
            <Input
              id="kategoribeskrivelse"
              type="text"
              value={kategoribeskrivelse}
              onChange={(e) => setKategoribeskrivelse(e.target.value)}
            />
          </FormControl>
          <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="file">Logo (WebP format)</FormLabel>
            <Input
              id="file"
              type="file"
              accept=".webp"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
            <FormHelperText>Last opp en webp-fil som logo.</FormHelperText>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button mt={4} colorScheme="blue" isLoading={isLoading} type="submit">
            Opprett Kategori
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CategoryCreateForm;
