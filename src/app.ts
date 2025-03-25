// Arquivo principal da aplicação:
import express from "express";
import config from "config";

const app = express();

// JSON middleware para a rota - E para pode trafegar informações em JSON
app.use(express.json());

// Routes
import router from "./router";

// Prefixo de url para as rotas   
app.use("/api/", router);

// app port 
const port = config.get<number>("port");

// Incializando a aplicação 
// Contem alguns dados de configuração da aplicação 
app.listen(port, async () => {
    // Depois vou ter a conexão com o Banco de dados e isso pode demorar alguma tempo.
    console.log(`Aplicação está funcionando na porta: ${port}`);
});



