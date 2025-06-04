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
// responder com alguma coisa, por exemplo com alguns dados especificos.
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
    // O id vou pega pela URL, que vai chega via req.params. 
    // Obs: Usando o Route Params para capturar o id pela URL, com req.params.id (ou via desestruturação como const { id } = req.params), e utilizando o valor para buscar o filme no banco.
    try { // Para trata o erro
        // const id = req.params.id;

        // Recebo o id da URL.
        // Pego o valor que veio na rota, tipo se a URL for http://localhost:3000/movies/123, então id vai ser '123'.
        // Isso vem do route params, que fica tudo em req.params.
        const { id } = req.params;

        // Para encontrar o movie.
        // Busco no banco de dados.
        // Uso o método findById do Mongoose para procurar no banco de dados um documento cujo _id corresponda ao id que veio na URL.
        // Se encontrar, ele guarda esse documento na variável movie.
        const movie = await MovieModel.findById(id); 

        // Caso não encontre o movie
        //  Se não encontrar, responde com erro 404.
        // Se movie for null ou undefined, significa que não achou nada no banco, então responde ao cliente com status HTTP 404 (Not Found).
        if (!movie) {
            return res.status(404).json({ error: "O filme não existe"});
        }

        // Se encontrar, respondo com o status 200 + o filme em JSON.
        // Ou seja, mandando de volta como resposta em JSON o objeto do filme encontrado.
        return res.status(200).json(movie);
    } catch (error: any) {
        //  Se der algum erro inesperado (ex: problema no banco, erro no código), captura-se no catch:
        Logger.error(`Erro no sistema: ${error.message}`); // Captura qualquer erro que acontecer durante a criação do filme. E usa-se o Logger para registrar o erro no sistema.
        return res.status(500).json({ error: "Por favor, tente mais tarde!" }); // E retorno uma resposta com status 500 (Internal Server Error), e uma  mensagem amigável ao cliente/usuario.
    }
}
// Recebo um ID de filme pela URL (ex: /movies/1234).
// Busco no banco de dados (MongoDB) um filme com esse _id usando o modelo MovieModel.
// Retorna o filme encontrado no formato JSON, ou retorno erros apropriados se não encontrar, ou se algo der errado.
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
// Uma função assíncrona que serve para remover um filme do banco de dados, com base na arquitetura API REST.
// Recebe dois parâmetros: req (request) e res (response), que são padrão do Express.js, representando a requisição do cliente, e a resposta que o servidor enviará.
export async function removeMovie(req: Request, res: Response) {
    try {
        
        const id = req.params.id; // Obtém o parâmetro id da URL da requisição. Esse id é usado para identificar qual filme será removido.
        
        // Uso o modelo MovieModel, para buscar um filme no banco de dados, pelo seu id.
        // E com o await, indico que essa operação é assíncrona, e deve esperar o resultado antes de continuar.
        const movie = await MovieModel.findById(id); 

        // Se nenhum filme for encontrado com esse id (ou seja, movie é null ou undefined),
        // retorna um status 404 (não encontrado), e uma mensagem de erro para o cliente.
        if(!movie) {
            return res.status(404).json({ error: "O filme não existe." });
        }

        // Se o filme foi encontrado, faço a remoção do registro do banco de dados.
        await movie.deleteOne();

        // Ao deletar/remover, respondo ao cliente com um status 200 (sucesso), e uma mensagem confirmando que o filme foi removido.
        return res.status(200).json({ message: "Filme removido com sucesso!" });

        // Caso qualquer erro aconteça dentro do try, ele será capturado pelo catch.
        // E o erro é registrado no sistema de logs usando Logger.error.
        // E o cliente recebe uma resposta com status 500 (erro interno do servidor), e uma mensagem genérica para tente mais tarde.

    } catch (error: any) {
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ error: "Por favor, tente mais tarde!" }); // Atualmente, se ocorrer um erro, ele registra no logger e retorna uma resposta,ou seja com uma mensagem ao cliente/usuario.
    }
}

// Atualizando dados ( Update )
export async function updateMovie(req: Request, res: Response) {
    try {
        // Vou pega o id do filme que veio pela URL, algo como por exemplo: PUT /movies/123. Esse 123 é do req.params.id.
        const id = req.params.id; // Obtém o parâmetro id da URL, que vai bater na minha api, ou que vai chamar a minha api. Esse id é usado para identificar qual filme será atualizado.
        
        // Vou ter os dados que vão vir pelo req.body, ou seja pelo corpo da requisição, e os dados vindo em formato json. São os dados de update que vem pela requisição.
        // Ou seja, aqui vou pega os dados novos que vieram no corpo da requisição ( em JSON ). 
        const data = req.body; 
        
        // Uso o modelo MovieModel, para buscar um filme no banco de dados, pelo seu id.
        // E com o await, indico que essa operação é assíncrona, e deve esperar o resultado antes de continuar.
        // Ou seja, aqui vou procura no banco de dados (MongoDB ), se existe algum filme com aquele id.
        const movie = await MovieModel.findById(id); 

        // Se nenhum filme for encontrado com esse id (ou seja, movie é null ou undefined),
        // retorna um status 404 (não encontrado), e uma mensagem de erro para o cliente.
        // Ou seja, se não achar nada, ele retorna erro 404 dizendo que o filme não existe.
        if(!movie) {
            return res.status(404).json({ error: "O filme não existe." });
        }

        // Passando um filtro para dizer, o que vou atualizar do filme que tem um especifico _id: do id que recebo pelo meu req.params.id, e também recebendo os dados via o req.body.
        // Ou seja, se achar, vou atualiza o filme no banco de dados usando os dados novos que vieram no corpo da requisição ( data ).
        await MovieModel.updateOne({_id: id}, data);

        // Quando atualizar quero mandar uma mensagem de sucesso, com o filme atualizado.
        // Ou seja, vou responde com status 200 (OK) e manda de volta os dados atualizados.
        return res.status(200).json(data);
    } catch (error: any) {
        // Se der qualquer erro inesperado, eu registro no logger e mando retorna uma resposta com um erro 500, e com uma mensagem ao cliente/usuario. 
        Logger.error(`Erro no sistema: ${error.message}`);
        return res.status(500).json({ error: "Por favor, tente mais tarde!" });
    }
}

// ** Observações **:

// Esse código todo do controller, nessa aplicação em Node.js com Express e Mongoose (MongoDB), é responsável por lidar com a lógica de negócio relacionada aos filmes (“movies”) na aplicação.

// *** Observações Importantes ***:

// * A Função do Controller no MVC classico: O controller atua como intermediário entre as rotas (que recebem as requisições HTTP baseado nos metodos HTTP), 
// e os models (que representam o banco de dados). E o controller processa os dados recebidos, interage com o banco de dados, e retorna uma resposta adequada.

// * Todos os métodos estão protegidos por blocos try/catch para tratar erros e registrar com o logger.

// * O :id na rota representa um parâmetro dinâmico da URL, acessado via req.params.

// * As respostas é sempre enviadas no formato JSON.

