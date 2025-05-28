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
// req representa a requisição feita, e o res representa uma resposta de retorno para a requisição.
export async function createMovie( req: Request, res: Response ) { // createMovie - Responsável por criar um novo filme (movie) no banco de dados, a partir dos dados recebidos na requisição.
    
    // return res.status(200).send("Deu certo o controller");

    try {
       // Primeiro recebo os dados pelo req.body, ou seja pelo corpo da requisição, e os dados vindo em formato json. 
       const data = req.body;

        // Verifica se já existe um filme com o mesmo título
        const existingMovie = await MovieModel.findOne({ title: data.title });
        if (existingMovie) {
            return res.status(409).json({ message: "Já existe um filme com este título." }); // 409 = Conflict
        }
       
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
        return res.status(500).json({ error: "Por favor, tente mais tarde!" });
    }
}

// Encontrando/Resgatando o filme por id
export async function findMovieById(req: Request, res: Response) {
    // Utizando o Route params - Para recebe os dados da requisição na rota.
    // O id vou pega pela URL, e que também vai chega via req.params. 
    // Obs: Usando o Route Params para capturar o id pela URL, com req.params.id (ou via desestruturação como const { id } = req.params), e utilizando o valor para buscar o filme no banco.
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
        return res.status(500).json({ error: "Por favor, tente mais tarde!" });
    }
}
// Observação: O :id na definição da rota é um Route Param, e seu valor é passado dinamicamente na URL, por exemplo GET /movies/6639b66d0a1e7dfd2587a13c.
// Observação: Utilizando o conceito de Route Params - Route: é o caminho da URL (ex: /movies/:id), e o Params: são os dados dinâmicos passados na rota, indicados por :algumaCoisa.

// Encontrando todos os filmes cadastrados
// Obs: Encontra todos os filmes cadastrados no sistema, para caso o front-end possa consumir essa Api aqui, 
// e desta maneira resgato todos os dados sem filtro nenhum, para por exemplo exibir numa home page.
export async function getAllMovies(req: Request, res: Response) {
    try {
        const movies = await MovieModel.find();
        return res.status(200).json(movies);  // json(movies) – Envia como resposta um objeto JavaScript (ou array) no formato JSON. Neste caso, o conteúdo da variável movies será enviado para o cliente.
    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ error: "Por favor, tente mais tarde!" });
    }
}

// Removendo registros
export async function removeMovie(req: Request, res: Response) {
    try {
        
        const id = req.params.id;
        const movie = await MovieModel.findById(id);

        if(!movie) {
            return res.status(404).json({ error: "O filme não existe." });
        }

        await movie.deleteOne();

        return res.status(200).json({ message: "Filme removido com sucesso!" });

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ error: "Por favor, tente mais tarde!" }); // Atualmente, se ocorrer um erro, ele registra no logger e retorna uma resposta,ou seja uma mensagem ao cliente/usuario.
    }
}

// ** Observações **:

// Esse código todo do controller, nessa aplicação em Node.js com Express e Mongoose (MongoDB), é responsável por lidar com a lógica de negócio relacionada aos filmes (“movies”) na aplicação.

// *** Observações Importantes ***:

// * A Função do Controller no MVC classico: O controller atua como intermediário entre as rotas (que recebem requisições HTTP), 
// e os models (que representam o banco de dados). E o controller processa os dados recebidos, interage com o banco de dados, e retorna uma resposta adequada.

// * Todos os métodos estão protegidos por blocos try/catch para tratar erros e registrar com o logger.

// * O :id na rota representa um parâmetro dinâmico da URL, acessado via req.params.

// * As respostas é sempre enviadas no formato JSON.

