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
    const env = config.get<string>("env") || "development"; // O env, ou como ambiente de desenvolvimento - "development" - ou de produção "prodution"

    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn"; // 2:14

}
