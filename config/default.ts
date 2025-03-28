const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


export default {
    // Exportando meu objeto com meus dados de configuração
    port: 3003,

    // Definindo a url de conexão com o banco de dados
    dbUri: `mongodb+srv://${dbUser}:${dbPassword}@cluster0.oghyq0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
}