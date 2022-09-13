import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { observer } from "mobx-react-lite";
import { Box, HStack, Text, useRadio, useRadioGroup } from "@chakra-ui/react";

const Tumbler = observer(({ viewMode, changeViewMode }) => {
  const options = [
    { name: "Список", value: "0" },
    { name: "Картки", value: "1" },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "viewMode1",
    defaultValue: "0",
    onChange: changeViewMode,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      <Text>Режим перегляду</Text>
      {options.map(({ name, value }) => {
        const radio = getRadioProps({ value, name });
        return (
          <RadioCard key={value} {...radio}>
            {name}
          </RadioCard>
        );
      })}
    </HStack>
  );
});

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Tumbler;
