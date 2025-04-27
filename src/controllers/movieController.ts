// Linkando as Rotas até meu controller

// Trabalhando na logica
import { Request, Response } from "express";

// Model - Porque terei a sessão para trabalhar com Banco de dados, com as operações possiveis que irei aplicar.
import { MovieModel } from "../models/Movies";

// Logger - Para trabalhar com as mensagens de erro e de info ( informação )
import Logger from "../../config/logger";

// Criando as minhas funções de criação, leitura e etc...
// Todas funções serão assincronas, porque irei trabalhar com o Banco de dados, e também para pode espera o Banco de dados 
// responder com os dados.
export async function createMovie( req: Request, res: Response ) {
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
        // Obs 2: Colocando o error: any, vou ter mais controle, e vai vir um objeto de erro com variados tipos. 
        Logger.error(`Erro no sistema: ${error.message}`); 
    }
}
