// Linkando as Rotas até meu controller

// Trabalhando na logica
import { Request, Response } from "express";

// Model - Porque terei a sessão para trabalhar com Banco de dados, com as operações possiveis que irei aplicar.
import { MovieModel } from "../models/Movies";

// Logger - Para trabalhar com as mensagens de erro e de info ( informação )
import Logger from "../../config/logger";

// Criando as minhas funções de criação, leitura e etc...
// Todas funções serão assincronas, porque irei trabalhar com o Banco de dados, e para também poder esperar o Banco de dados responder com os dados.
export async function createMovie( req: Request, res: Response ) {
    return res.status(200).send("Deu certo o controller");
}
