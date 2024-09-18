import api from "./api";

export type Receita = {
    nome: string,
    tempoPreparo: number,
    custoAproximado: number,
    ingrediente: string[]
}
 export type ReceitaComIngredientes = {
    nome: string,
    tempoPreparo: string,
    custoAproximado: string,
    ingredientes: {
      "_id": string,
      "nome": string
    }[]
}
 type ReceitaComId = {
    _id: string,
    nome: string,
    tempoPreparo: number,
    custoAproximado: number,
    ingrediente: string[]
}

export type EditReceita = {
  nome: string,
  tempoPreparo: string,
  custoAproximado: string,
}

export function useReceitas() {
    async function createReceita(body: Receita) {
      try {
        console.log('aqui', body)
        const { data } = await api.post("/receitas", body);

        return data;
      } catch (error: any) {
        console.error("Erro ao enviar requisição:", error.response?.data || error.message);
      }
      
    }

    async function getReceitas() {
        const { data } = await api.get<ReceitaComId[]>("/receitas");

        return data;
    }

    async function getReceitaById(_id: string) {
        const { data } = await api.get<ReceitaComIngredientes>("/receitas/" + _id);
        console.log(data)
        return data;
      }

    async function deleteReceitas(_id: string) { 
      try {
        const { data } = await api.delete("/receitas/" + _id);

        return data;
      } catch (error: any) {
        console.error("Erro ao enviar requisição:", error.response?.data || error.message);        
      }       
         
    }

    async function updateReceita(_id: string, body: EditReceita) {
        try {
          const { data } = await api.patch(`/receitas/${_id}`, body);
    
          return data;  
        } catch (error: any) {
          console.error("Erro ao enviar requisição:", error.response?.data || error.message); 
        }
        
      }

      return {
        createReceita,
        getReceitas,
        getReceitaById,
        deleteReceitas,
        updateReceita
      }
}