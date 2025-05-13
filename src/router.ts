// Arquivo que vai conter somente as Rotas

// Importando funcionalidade Router do express ( Para criar as rotas ), e o Request e Response para trabalha com as funções que receberam as Requisições e as Respostas.  
import { Router, Request, Response } from "express";
import { createMovie, findMovieById } from "./controllers/movieController";

// Validations
import { validate } from "./middleware/handleValidation";
import { movieCreateValidation } from "./middleware/movieValidation";

const router = Router();

// Consigo definir qual método HTTP que a rota vai aceitar.
// E também posso criar as minhas rotas da API.

// Define uma rota GET com o caminho de rota "/test"
export default router.get("/test", (req: Request, res: Response) => {
    // Responde com o status 200 e com a mensagem de "Trabalhando na API"
    res.status(200).send("Trabalhando na API");
})
.post("/movie", movieCreateValidation(), validate, async (req: Request, res: Response) => { // Utilizando o validate em Rotas especificas, para deixa mais otimizado.
    try {
        await createMovie(req, res);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}) // Cada Rota aqui, vai corresponder a uma função do meu Controller.
.get("/movie/:id", async (req: Request, res: Response) => { // Criando uma rota dinamica.
    try {
        await findMovieById(req, res);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

