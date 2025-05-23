// Arquivo que vai conter somente as Rotas

// Importando funcionalidade Router do express ( Para criar as rotas ), e o Request e Response para trabalha com as funções que receberam as Requisições e as Respostas.  
import { Router, Request, Response } from "express";
import { createMovie, findMovieById, getAllMovies } from "./controllers/movieController";

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
// O "/movie/:id": É uma rota dinâmica — e o :id indica um parâmetro de URL, que por exemplo pode ser, /movie/123.
.get("/movie/:id", async (req: Request, res: Response) => { // Criando uma rota dinamica.
    try {
        await findMovieById(req, res); // No try, é chamado a função findMovieById, passando a requisição e a resposta como argumentos.
    } catch (error) {
        res.status(500).send("Internal Server Error"); // Se ocorrer algum erro durante a chamada, o catch captura o erro e responde com status HTTP 500 (erro interno do servidor) e com a mensagem "Internal Server Error".
    }
})
.get("/movie", async (req: Request, res: Response) => {
    try {
        await getAllMovies(req, res);
    } catch (error) {
        res.status(500).send("Internal Server Error"); // Se ocorrer algum erro durante a chamada, o catch captura o erro e responde com status HTTP 500 (erro interno do servidor) e com a mensagem "Internal Server Error".
    }
})
