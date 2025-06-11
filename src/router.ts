// Arquivo que vai conter somente as Rotas

// Importando funcionalidade Router do express ( Para criar as rotas ), e o Request e Response para trabalha com as funções que receberam as Requisições e as Respostas.  
import { Router, Request, Response } from "express";
import { createMovie, findMovieById, getAllMovies, removeMovie, updateMovie } from "./controllers/movieController";

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
.delete("/movie/:id", async (req: Request, res: Response) => { // Rota com o metodo http delete.
    try {
        await removeMovie(req, res);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})
.patch("/movie/:id", movieCreateValidation(), validate, async (req: Request, res: Response) => { // Rota com o metodo http patch, o patch sendo um update que trabalha com a atualização de campo-a-campo, e não como um update direto em todos os campos ( put ).
    try {
        await updateMovie(req, res);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})


// Observação: Quando eu tenho verbos ou metodos de http diferentes, eu posso usar a mesma rota. Ou seja, as rotas (ou Endpoints) são as mesmas, mas com metodos http diferentes.

// Observação: O :id na definição da rota é um Route Param, e seu valor é passado dinamicamente na URL, por exemplo GET /movies/6639b66d0a1e7dfd2587a13c.
// Observação: Utilizando o conceito de Route Params - Route: é o caminho da URL (ex: /movies/:id), e o Params: são os dados dinâmicos passados na rota, indicados por :algumaCoisa.

// Obs: Aqui está todas as funcionalidades da minha aplicação. E todas as APIs testadas pelo Postman.