// IngredientInfo.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Flex, Icon, Text, Box, Button, List, Heading } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai'

interface IngredientInfoData {
  category: string;
  description: string;
  foodScience: string;
  nutrition: Record<string, number>;
  alternatives: { title: string; details: string }[];
  preservation: { title: string; details: string }[];
}

const IngredientInfo: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [info, setInfo] = useState<IngredientInfoData | null>(null);
  const [error, setError] = useState<string>('');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    // Adjust URL & query parameters as needed
    fetch('http://127.0.0.1:5000/get-ingredient-info', {
        body: JSON.stringify({ ingredient: name }),
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error(`Error fetching ingredient info: ${response.statusText}`);
        }

        return response.clone().json();
      })
      .then((data) => {
        const info = JSON.parse(data)
        setInfo(info);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error:', err);
      })
  }, [name]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <Flex height="100vh" flexDir="column" alignItems="center" justifyContent="center" gap="20px">
      <Flex
        flexDir="column"
        width="400px"
        height="100vh"
        border="20px solid black"
        borderRadius="20px"
        alignItems="center"
      >
        {/* Header with Back Button */}
        <Flex
          flexDir="row"
          height="12vh"
          width="100%"
          bgColor="#EF5737"
          alignItems="center"
          paddingLeft="12px"
          marginBottom="10px"
        >
          <Button
            bgColor="#EF5737"
            _hover={{}}
            _active={{}}
            color="white"
            onClick={() => navigate(-1)}
            variant="ghost"
          >
            <Icon fontSize="22px">
              <AiOutlineLeft />
            </Icon>
            <Text marginLeft="10px" fontSize="lg">
              Back
            </Text>
          </Button>
        </Flex>

        {/* Ingredient Info Content */}
        <Box p="6" width="100%" overflowY="auto">
          <Heading as="h1" size="xl" mb="4">
            {name}
          </Heading>
          <Text fontSize="md" mb="2">
            <strong>Category:</strong> {info.category}
          </Text>
          <Text fontSize="md" mb="2">
            <strong>Description:</strong> {info.description}
          </Text>
          <Text fontSize="md" mb="6">
            <strong>Food Science:</strong> {info.foodScience}
          </Text>

          <Heading as="h3" size="lg" mb="2">
            Nutrition
          </Heading>
          {info.nutrition ? (
            <List.Root mb="6">
              {Object.entries(info.nutrition).map(([key, value]) => (
                <List.Item key={key}>
                  <Text fontSize="md">
                    <strong>{key}:</strong> {value}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          ) : (
            <Text>No nutrition information available.</Text>
          )}

          <Heading as="h3" size="lg" mb="2">
            Alternatives
          </Heading>
          {info.alternatives && info.alternatives.length > 0 ? (
            <List.Root mb="6">
              {info.alternatives.map((alt, idx) => (
                <List.Item key={idx}>
                  <Text fontSize="md">
                    <strong>{alt.title}:</strong> {alt.details}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          ) : (
            <Text>No alternatives available.</Text>
          )}

          <Heading as="h3" size="lg" mb="2">
            Preservation
          </Heading>
          {info.preservation && info.preservation.length > 0 ? (
            <List.Root>
              {info.preservation.map((pres, idx) => (
                <List.Item key={idx}>
                  <Text fontSize="md">
                    <strong>{pres.title}:</strong> {pres.details}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          ) : (
            <Text>No preservation details available.</Text>
          )}
        </Box>
      </Flex>
    </Flex>
     );
};

export default IngredientInfo;