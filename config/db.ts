// Arquivo de conexão com o banco de dados

// Importando o mongoose para criar a conexão com o banco de dados
import mongoose from "mongoose";
import config from "config";

async function connect() {
    // Criando a conexão do pacote momgoose com o mongoDB Atlas
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        console.log("Conectou ao banco de dados!!!");
    } catch (error) {
        // Vai trazer um erro, se não houver a conexão com o banco de dados
        console.log("Não foi possível conectar ao banco de dados!!!");

        // Capturando o erro que realmente vai está chegando atraves do catch
        console.log(`Erro: ${error}`);
    }
}

export default connect;


