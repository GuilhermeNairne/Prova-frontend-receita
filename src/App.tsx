import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Home } from './home';

function App() {
  return (
    <ChakraProvider cssVarsRoot={'theme'}>
        <Flex direction="column" w="100%" h="100vh">
          <Home />
        </Flex>
    </ChakraProvider>
  );
}

export default App;