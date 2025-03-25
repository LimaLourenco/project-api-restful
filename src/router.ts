// Arquivo que vai conter somente as Rotas

// Importando funcionalidade Router ( para criar as rotas ) do express, e o Request e Response para trabalhar com as funções que receberam as Requisições e as Respostas.  
import { Router, Request, Response } from "express";

const router = Router();

// Define uma rota GET com o caminho "/test"
export default router.get("/test", (req: Request, res: Response) => {
    // Responde com status 200 e a mensagem "Trabalhando na API"
    res.status(200).send("Trabalhando na API");
});
