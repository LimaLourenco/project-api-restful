import winston from "winston";

// Para pode trazer alguns dados depois
import config from "config";


// Definindo os leveis de erro
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = () => {
    // Fazendo a operação na função para saber qual é o ambiente que vai retornar
    const env = config.get<string>("env") || "development"; // O env, ou como ambiente de desenvolvimento - "development" - ou até de produção - "prodution"

    const isDevelopment = env === "development";
    
    // Fazendo o retorno de qual ambiente que eu vou está tratando
    return isDevelopment ? "debug" : "warn"; 
}

const colors = {
    // Definindo as Cores especificas de erros da aplicação 
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white" // 3:05
}

// Definindo as cores no pacote winston