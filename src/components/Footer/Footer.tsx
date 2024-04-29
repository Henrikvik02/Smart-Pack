import React from 'react';
import { Box, Container, Text, VStack, HStack, Link, Divider } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.200" color="gray.700" py="5">
      <Container maxW="container.xl">
        <VStack spacing="5">
          <Divider />
          <HStack justifyContent="space-between" width="full">
            <VStack align="start">
              <Text fontWeight="bold">Kontakt Oss</Text>
              <Link href="mailto:info@eksempelside.no" isExternal>
                <HStack>
                  <EmailIcon />
                  <Text>info@eksempelside.no</Text>
                </HStack>
              </Link>
              <Link href="tel:+4712345678">
                <HStack>
                  <PhoneIcon />
                  <Text>+47 123 45 678</Text>
                </HStack>
              </Link>
            </VStack>
            <VStack align="start">
              <Text fontWeight="bold">Ressurser</Text>
              <Link href="#!">FAQ</Link>
              <Link href="#!">Hjelpesenter</Link>
              <Link href="#!">Støtte</Link>
            </VStack>
          </HStack>
          <Text fontSize="sm" pt="5">
            © {new Date().getFullYear()} Eksempelside. Alle rettigheter forbeholdt.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer;
