import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Flex
      height={'100vh'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Text textAlign={'center'} fontSize={20} fontWeight={700}>
          I'm sorry those page is temporary not exist
          <br />
          (and I think will never be)
        </Text>
        <Text position={'absolute'} bottom={20} fontWeight={500}>
          NB : I'm sorry if this page hurt your eyes
        </Text>
      </Flex>
    </Flex>
  );
};

export default NotFoundPage;
