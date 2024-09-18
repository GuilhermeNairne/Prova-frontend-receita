import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Formik } from "formik";
import { EditReceita, Receita, ReceitaComIngredientes, useReceitas } from "./useReceitas";
import { useQuery } from "react-query";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";



export function Home() {
  const inicialValues = {
    nome: "",
    tempoPreparo: 0,
    custoAproximado: 0,
    ingrediente: [],
  };

  const [ingredienteAtual, setIngredienteAtual] = useState("");
  const [ingrediente, setIngredientes] = useState<string[]>([]);

  function addIngrediente() {
    if (ingredienteAtual) {
      setIngredientes([...ingrediente, ingredienteAtual]);
      setIngredienteAtual("");
    }
  }

  const { data } = useQuery({
    queryKey: ["receitas"],
    queryFn: async () => getReceitas(),
  });

  const { createReceita, getReceitas, deleteReceitas, getReceitaById, updateReceita } = useReceitas();

  async function handleDelete(_id: string) {
    await deleteReceitas(_id)
  }

  async function createReceitas(values: Receita, { resetForm }: any) {
    const receitaComIngredientes = {
      ...values,
      ingrediente,
    };
    await createReceita(receitaComIngredientes);

    resetForm();
    setIngredientes([]);
  }

  function removeIngrediente(index: number) {
    const novosIngredientes = [...ingrediente];
    novosIngredientes.splice(index, 1);
    setIngredientes(novosIngredientes);
  }

  const [receitaById, setReceitaById] = useState<ReceitaComIngredientes>()

  const inicialValuesEdit = {
    nome: receitaById?.nome || "",
    tempoPreparo: String(receitaById?.tempoPreparo) || "",
    custoAproximado: String(receitaById?.custoAproximado) || "",
  };

  const [id, setId] = useState('')

  async function handleOpen(_id: string) {
    setId(_id)
    const receitaById = await getReceitaById(_id);
    setReceitaById(receitaById);
    onOpen();
  }

  async function editReceita(receita: EditReceita) {
    console.log('receita', receita)
    console.log('id', id)
    await updateReceita(id, receita)
    onClose();
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flex={1} alignItems={"center"} p={"30px"} flexDir={"column"}>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"800px"}>
          <Formik initialValues={inicialValuesEdit} onSubmit={editReceita}>
            {({ handleChange, values, handleSubmit, resetForm }) => (
              <>
                <ModalHeader><Text fontSize={'2xl'} fontWeight={'bold'}>Editar receita</Text></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box display={'flex'} flexDir={'row'} gap={5}>
                    <Text w={'200px'} fontWeight={'bold'} fontSize={'md'}>Nome</Text>
                    <Text w={'150px'} fontWeight={'bold'} fontSize={'md'}>Tempo preparo</Text>
                    <Text w={'150px'} fontWeight={'bold'} fontSize={'md'}>Custo aproximado</Text>
                    <Text fontWeight={'bold'} fontSize={'md'}>Ingredientes</Text>
                  </Box>
                  <Box display={'flex'} flexDir={'row'} gap={5}>

                    <>
                      <Input
                        w={"200px"}
                        placeholder="Nome da receita"
                        value={values.nome}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          handleChange("nome")(newValue);
                        }}
                      />
                      <Input
                        w={"150px"}
                        placeholder="Tempo de preparo"
                        value={String(values.tempoPreparo)}
                        onChange={(e) => {
                          handleChange("tempoPreparo")(String(e.target.value));
                        }}
                      />

                      <Input
                        w={"150px"}
                        placeholder="Custo aproximado"
                        value={String(values.custoAproximado)}
                        onChange={(e) => {
                          handleChange("custoAproximado")(String(e.target.value));
                        }}
                      />
                    </>

                    <Box>
                      {receitaById?.ingredientes?.map((ingrediente, index) => (
                        <Text key={index}>{ingrediente.nome}</Text>
                      ))}
                    </Box>
                  </Box>
                </ModalBody>
                <ModalFooter mt={'30px'}>
                  <Button mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme='blue' onClick={() => handleSubmit()}>Atualizar</Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <Text fontSize={"xxx-large"} fontWeight={"bold"}>
        Adicionar Receita
      </Text>
      <Formik initialValues={inicialValues} onSubmit={createReceitas}>
        {({ handleChange, values, handleSubmit, resetForm }) => (
          <Flex
            mt={"30px"}
            flexDir={"column"}
            gap={10}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex gap={10}>
              <Box display={"flex"} flexDir={"column"}>
                <Text fontWeight={"bold"}>Nome</Text>
                <Input
                  w={"250px"}
                  placeholder="Informe o nome da receita"
                  value={values.nome}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleChange("nome")(newValue);
                  }}
                />
              </Box>
              <Box display={"flex"} flexDir={"column"}>
                <Text fontWeight={"bold"}>Tempo de preparo</Text>
                <Input
                  w={"250px"}
                  placeholder="Informe o tempo de preparo"
                  value={values.tempoPreparo}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleChange("tempoPreparo")(newValue);
                  }}
                />
              </Box>
              <Box display={"flex"} flexDir={"column"}>
                <Text fontWeight={"bold"}>Custo aproximado</Text>
                <Input
                  w={"250px"}
                  placeholder="Informe o custo aproximado"
                  value={values.custoAproximado}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleChange("custoAproximado")(newValue);
                  }}
                />
              </Box>
              <Box display={"flex"} flexDir={"column"}>
                <Text fontWeight={"bold"}>Ingredientes</Text>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Input
                    mr={"10px"}
                    w={"250px"}
                    placeholder="Adicione ingredientes"
                    value={ingredienteAtual}
                    onChange={(e) => {
                      setIngredienteAtual(e.target.value);
                    }}
                  />
                  <AddIcon onClick={addIngrediente} cursor={"pointer"} />
                </Box>
                <Box mt={"10px"}>
                  {ingrediente.map((ingrediente, index) => (
                    <Box key={index} display={"flex"} alignItems={"center"} gap={3}>
                      <Text>{ingrediente}</Text>
                      <DeleteIcon
                        onClick={() => removeIngrediente(index)}
                        cursor={"pointer"}
                        color={"red.500"}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Flex>

            <Button
              bg={"blue"}
              color={"white"}
              onClick={() => handleSubmit()}
              w={"300px"}
            >
              <Text>Adicionar</Text>
            </Button>
          </Flex>
        )}
      </Formik>
      <Flex mt={"100px"} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={"xxx-large"} fontWeight={"bold"}>
          Receitas
        </Text>

        <Center mt={"40px"}>
          <Stack>
            <HStack h={"30px"} px={"5px"}>
              <Text fontWeight={"bold"} w={"300px"}>
                Nome
              </Text>
              <Text fontWeight={"bold"} w={"200px"}>
                Tempo de preparo
              </Text>
              <Text fontWeight={"bold"} w={"200px"}>
                Custo aproximado
              </Text>
            </HStack>
            {data?.map((receita, index) => (
              <HStack
                p={"5px"}
                borderRadius={"8px"}
                bg={index % 2 === 0 ? "#EEFCFF" : "#F6F6F6"}
                w={"850px"}
              >
                <Text w={"300px"}> {receita.nome} </Text>
                <Text w={"200px"}> {receita.tempoPreparo} </Text>
                <Text w={"100px"}> R$ {receita.custoAproximado} </Text>
                <HStack w={"55px"} spacing={5} ml={'60px'}>
                  <Button
                    onClick={() => handleOpen(receita._id)}
                    bg={"transparent"}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>

                  <Button
                    onClick={() => {
                      handleDelete(receita._id)
                    }}
                    bg={"transparent"}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </HStack>
              </HStack>
            ))}
          </Stack>
        </Center>
      </Flex>
    </Flex>
  );
}
