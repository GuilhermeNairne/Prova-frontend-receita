import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

export function Home() {
    return (
        <Flex flex={1} alignItems={'center'} p={'30px'} flexDir={'column'}>
            <Text fontSize={'xxx-large'} fontWeight={'bold'}>Adicionar Receita</Text>

            <Flex mt={'30px'} flexDir={'row'} gap={10}>
                <Box display={'flex'} flexDir={'column'}>
                    <Text fontWeight={'bold'}>Nome</Text>
                    <Input w={'250px'} placeholder="Informe o nome da receita" />
                </Box>
                <Box display={'flex'} flexDir={'column'}>
                    <Text fontWeight={'bold'}>Tempo de preparo</Text>
                    <Input w={'250px'} placeholder="Informe o tempo de preparo" />
                </Box>
                <Box display={'flex'} flexDir={'column'}>
                    <Text fontWeight={'bold'}>Custo aproximado</Text>
                    <Input w={'250px'} placeholder="Informe o custo aproximado" />
                </Box>
                <Box display={'flex'} flexDir={'column'}>
                    <Text fontWeight={'bold'}>Ingredientes</Text>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Input mr={'10px'} w={'250px'} placeholder="Adicione ingredientes" />
                        <AddIcon />
                    </Box>
                </Box>
            </Flex>

            <Flex mt={'200px'}>
              <Text fontSize={'xxx-large'} fontWeight={'bold'}>Receitas</Text>
            </Flex>
        </Flex>
    )
}