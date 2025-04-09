// Arquivo principal da aplicação:

// .ENV variables 
require("dotenv").config();

import express from "express";
import config from "config";

const app = express();

// JSON middleware para a rota - É para trafega informações em JSON
app.use(express.json());

// Importando o DB
import db from "../config/db";

// Routes
import router from "./router";

// Logger
import Logger from "../config/logger";

// Middleware
import morganMiddleware from "./middleware/morganMiddleware";

app.use(morganMiddleware);

// Prefixo de url para as rotas da API
// Todas as rotas que estão dentro do router vão ter o prefixo "/api/"  
app.use("/api/", router);

// app port 
const port = config.get<number>("port");

// Inicializando a aplicação 
// Contem alguns dados de configuração da aplicação 
app.listen(port, async () => {

    // Iniciando a conexão do banco de dados
    await db();

    // // Depois vou ter a conexão com o Banco de dados e isso pode demorar alguma tempo.
    // console.log(`Aplicação está funcionando na porta: ${port}`);

    Logger.info(`Aplicação está funcionando na porta: ${port}`);
});



