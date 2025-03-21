// Arquivo que vai conter somente as Rotas

// Importando funcionalidade Router ( para criar as rotas ) do express, e o Request, Response para trabalhar com as funções que recebem a Requisição e a Resposta.  
import { Router, Request, Response } from "express";

const router = Router();

export default router.get("/test", (req: Request, res: Response) => {
    res.status(200).send("Trabalhando na API");
});
