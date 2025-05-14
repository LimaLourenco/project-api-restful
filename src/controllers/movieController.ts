// Linkando as Rotas até meu controller

// Obs: O controller tendo como a função principal conter a lógica de negócio da aplicação
// Trabalhando na logica
import { Request, Response } from "express";

// Model - Porque terei a sessão para trabalhar com Banco de dados, com as operações possiveis que irei aplicar.
import { MovieModel } from "../models/Movies";

// Logger - Para trabalhar com as mensagens de erro e de info ( informação )
import Logger from "../../config/logger";

// Criando as minhas funções de criação, leitura e etc...
// Todas funções serão assincronas, porque irei trabalhar com o Banco de dados, e também para pode espera o Banco de dados 
// responder com os dados.
export async function createMovie( req: Request, res: Response ) { // createMovie - Responsável por criar um novo filme (movie) no banco de dados, a partir dos dados recebidos na requisição.
    
    // return res.status(200).send("Deu certo o controller");

    try {
       // Primeiro recebo os dados pelo req.body, ou seja pelo corpo da requisição, e os dados vindo em formato json. 
       const data = req.body;
       
       // Criando novo movie
       // Esperando o MovieModel dar a entrada para ativar o metodo create para criar o dado que foi passado/fornecido.
       const movie = await MovieModel.create(data);
       
       // Criado o movie, eu mando de volta como resposta em formato json. 
       // E para ser utilizado, por exemplo - para exibir no front-end com alguma informação a mais que seja útil.
       return res.status(201).json(movie); 
    } catch (error: any) {
        // Obs 1: As vezes error.message não entende que vai vir uma propriedade de message de erro.
        // Obs 2: Colocando o error: any, vou ter mais controle, e para vir um objeto de erro com variados tipos. 
        // Obs 3: A tipagem error: any é usada para garantir acesso à propriedade message, mesmo se o tipo do erro não for específico.
        Logger.error(`Erro no sistema: ${error.message}`); 
    }
}

export async function findMovieById(req: Request, res: Response) {
    // Utizando o Route params - Para recebe os dados da requisição na rota.
    // O id vou pega pela URL, e que também vai chega pelo req.params. 
    // Usando o Route Params para capturar o id pela URL, com req.params.id (ou via desestruturação como const { id } = req.params), e utilizando o valor para buscar o filme no banco.
    try { // Para trata o erro
        // const id = req.params.id;
        const { id } = req.params;

        // Para encontrar o movie
        const movie = await MovieModel.findById(id); // Buscando um documento pelo seu _id, e passando o id que veio pela URL.

        // Caso não encontre o movie
        if (!movie) {
            return res.status(404).json({ error: "O filme não existe"});
        }

        // Se rota funcionar e encontra o movie
        return res.status(200).json(movie);
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`); // Captura qualquer erro que acontecer durante a criação do filme. E usa-se o Logger para registrar o erro no sistema.
    }
}

// Observação: O id está sendo extraído dos parâmetros da rota — ou seja, da URL. Porque a rota foi definida.
// Observação: O :id na definição da rota é um Route Param, e seu valor é passado dinamicamente na URL, por exemplo GET /movies/6639b66d0a1e7dfd2587a13c.
// Observação: Utilizando o conceito de Route Params - Route: é o caminho da URL (ex: /movies/:id), e o Params: são os dados dinâmicos passados na rota, indicados por :algumaCoisa.