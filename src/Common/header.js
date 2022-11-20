import { Flex, Heading, Box, HStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Flex
      justify="space-around"
      align="center"
      wrap={['wrap', 'wrap', 'nowrap']}
      borderBottom="2px"
    >
      <Box>
        <Heading>Hacker News</Heading>
      </Box>
      <HStack justify="space-around" wrap={['wrap', 'wrap', 'nowrap']}>
        <HStack justify="space-around" fontSize="sm">
          <Box fontWeight="bold">
            <Link to="/home"> New Stories </Link>
          </Box>
          <Box fontWeight="bold">
            <Link to="/search"> Search </Link>
          </Box>
        </HStack>
        <Box justify="space-around">
          <ColorModeSwitcher />
        </Box>
      </HStack>
    </Flex>
  );
};

export default Header;
