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
};

const level = () => {
     // Fazendo a operação na função para saber qual é o ambiente que vai retornar
    // Essa linha tenta obter o valor do ambiente atual (env) a partir de uma configuração (config.get<string>("env")).
   // Se não encontrar nenhum valor definido, assume "development" como padrão.
    const env = config.get<string>("env") || "development"; // O env, ou como ambiente de desenvolvimento - "development" - ou até de produção - "prodution"

    // Verifica se o ambiente atual é igual a "development" e salva um resultado ( boolean ) em isDevelopment.
    // Se sim, isDevelopment será true; caso contrário, será false.
    const isDevelopment = env === "development";
    
    // Fazendo o retorno de qual ambiente que eu vou está tratando
    // Com o operador ternário: condição ? valor_se_verdadeiro : valor_se_falso.
    // Se isDevelopment for true, retorna "debug".
    // Se for false, retorna "warn".
    // Se o ambiente for de desenvolvimento, retorna "debug" (nível de log detalhado).
    // Se for outro (como produção), retorna "warn" (nível de log mais restrito).
    return isDevelopment ? "debug" : "warn"; 
};

const colors = {
    // Definindo as Cores especificas de erros da aplicação 
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white" 
};

// Definindo as cores no pacote winston
winston.addColors(colors);

// Formantando as mensagens
const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        // O que vir da requisição (request) em info, vou pode extrair e exibir 
        (info) => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        }
    )
);

// Definindo para criar um arquivo para transportar os erros e os avisos
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error"
    }),
    // Para entender como um todo o que está ocorrendo na minha aplicação/sistema
    new winston.transports.File({ filename: "logs/all.log" }),
];

// Criando a instancia de Logger com tudo que foi configurado
const Logger = winston.createLogger({ 
    level: level(),
    // Colocando as opções de levels disponiveis
    levels,
    // Passando a formatação definida
    format,
    // Para criar os arquivos e o arquivo especifico
    transports
});

export default Logger;