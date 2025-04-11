// Arquivo de conexão com o banco de dados

// Importando o mongoose para criar a conexão com o banco de dados
import mongoose from "mongoose";
import config from "config";

// Logger
import Logger from "./logger";

async function connect() {
    // Criando a conexão do pacote mongoose com o mongoDB Atlas
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        Logger.info("Conectou ao banco de dados!!!");
    } catch (error) {
        // Vai trazer um erro, se não houver a conexão com o banco de dados
        Logger.error("Não foi possível conectar ao banco de dados!!!");

        // Capturando o erro que realmente vai está chegando atraves do catch
        Logger.error(`Erro: ${error}`);

        // Vou dar um exit para parar/terminar a aplicação, quando ocorrer um erro de banco de dados com:
        process.exit(1);
    }
}

export default connect;


