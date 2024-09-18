import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Home } from "./home";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider cssVarsRoot={"theme"}>
      <QueryClientProvider client={queryClient}>
        <Flex direction="column" w="100%" h="100vh">
          <Home />
        </Flex>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
