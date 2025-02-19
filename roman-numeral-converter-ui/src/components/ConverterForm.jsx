"use client";

import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, View, Heading, Flex, Content, Divider } from "@adobe/react-spectrum";

// Get base URL for RNC (Roman Numeral Converter) API
const API_BASE_URL = process.env.NEXT_PUBLIC_RNC_API_BASE_URL

const ConverterForm = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    // Client side input validation
    if (!/^\d+$/.test(number) || number < 1 || number > 3999) {
      setError("Please enter a number between 1 and 3999.");
      setResult(null);
      return;
    }

    // Invoke the API to convert the number to roman numeral
    try {
      const response = await axios.get(`${API_BASE_URL}/romannumeral?query=${number}`);
      setResult(response.data.output);
      setError("");
    } catch (err) {
      setError("Conversion failed. Try again later.");
      setResult(null);
    }
  };

  return (
    <View 
      padding={{ base: 'size-100', M: 'size-200' }} 
      maxWidth="size-6000" 
      margin="auto" 
      borderRadius="medium" 
      backgroundColor="gray-300"  
      boxShadow="shadow-100"
    >
      <View 
        backgroundColor="gray-100" 
        padding={{ base: 'size-200', M: 'size-600' }}  
        borderRadius="medium" 
        boxShadow="shadow-600"  
      >
        <Heading 
          level={1} 
          alignSelf="center" 
          UNSAFE_style={{ fontSize: "22px", textAlign: "center", whiteSpace: "nowrap" }}  
        >
          Roman Numeral Converter
        </Heading>
        
        <Flex 
          direction="column" 
          gap="size-200" 
          alignItems="center" 
          justifyContent="center"  
          width="100%"  
        >
          <TextField
            label="Enter a number from 1 to 3999"
            id="number-input"
            value={number}
            onChange={setNumber}
            maxLength={4}
            width={{ base: '100%', M: 'size-3600' }}
            alignSelf="center"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConvert();
                }
              }}
            />

          <Button id="convert-button" variant="cta" onPress={handleConvert}>
            Convert to Roman Numeral
          </Button>

          {result && (
            <Content id="result" UNSAFE_style={{ fontWeight: "bold", color: "green", fontSize: "18px" }}>
              Roman numeral: {result}
            </Content>
          )}

          {error && (
            <Content id="result" UNSAFE_style={{ fontWeight: "bold", color: "red", fontSize: "18px" }}>
              {error}
            </Content>
          )}
        </Flex>
      </View>
    </View>
  );
};

export default ConverterForm;
