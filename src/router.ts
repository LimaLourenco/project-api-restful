// Arquivo que vai conter somente as Rotas

// Importando funcionalidade Router do express ( Para criar as rotas ), e o Request e Response para trabalha com as funções que receberam as Requisições e as Respostas.  
import { Router, Request, Response } from "express";

const router = Router();

// Consigo definir qual método HTTP que a rota vai aceitar.
// E também posso criar as minhas rotas da API.

// Define uma rota GET com o caminho "/test"
export default router.get("/test", (req: Request, res: Response) => {
    // Responde com o status 200 e com a mensagem de "Trabalhando na API"
    res.status(200).send("Trabalhando na API");
});
