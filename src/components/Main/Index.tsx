import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";

import suitcase from "/logo/suitcase.jpg";
import smartpackSketch from "/logo/smartpack-sketch.jpg";
import AdminLogo from "/logo/AdminLogo.png";

const Index = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Link
          to="/SmartPack"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
            src={smartpackSketch}
            alt="Admin"
          />
          <Stack flex="1">
            <CardBody>
              <Heading size="md">SmartPack</Heading>
              <Text py="2">
                Lurer du på noe angående bagasje? Hvor mye væske kan jeg ta med?
                Spør vår chatbot
                SmartPack!
              </Text>
            </CardBody>
            <CardFooter>
              <Button
                variant="solid"
                _focus={{
                  boxShadow: "0 0 0 3px #FFFF10",
                }}
                colorScheme="blue"
              >
                Trykk her
              </Button>
            </CardFooter>
          </Stack>
        </Link>
      </Card>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Link
          to="/BaggageGrid"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={suitcase}
            alt="Informasjon"
          />
          <Stack flex="1">
            <CardBody>
              <Heading size="md">Informasjon</Heading>
              <Text py="2">
                Trykk her for å lese mer om bagasje. Utfylte tabeller med all
                informasjonen du trenger for din flytur.
              </Text>
            </CardBody>
            <CardFooter>
              <Button
                variant="solid"
                _focus={{
                  boxShadow: "0 0 0 3px #FFFF10",
                }}
                colorScheme="blue"
              >
                Trykk her
              </Button>
            </CardFooter>
          </Stack>
        </Link>
      </Card>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Link
          to="/AdminPage"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={AdminLogo}
            alt="Informasjon"
          />
          <Stack flex="1">
            <CardBody>
              <Heading size="md">Admin Dashboard</Heading>
              <Text py="2">
                Dette er en midlertidig knapp for å åpne Admin-siden. Dette vil
                selvfølgelig lukkes bak en Admin-logg inn.
              </Text>
            </CardBody>
            <CardFooter>
              <Button
                variant="solid"
                colorScheme="blue"
                _focus={{
                  boxShadow: "0 0 0 3px #FFFF10",
                }}
              >
                Trykk her
              </Button>
            </CardFooter>
          </Stack>
        </Link>
      </Card>
    </div>
  );
};

export default Index;
