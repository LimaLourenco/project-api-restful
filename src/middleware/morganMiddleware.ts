// Criando o middleware de configuração

import morgan, { StreamOptions } from "morgan";

// Impotando as minhas configurações do ambiente que está sendo executado 
import config from "config";

// Logger para imprimir as mensagens como padrão estabelecido e configurado
import Logger from "../../config/logger"; // 1:27

// Criando a const para ler as requisições HTTP baseado no pacote winston
const stream: StreamOptions = {
    write: (message) => {
        Logger.http(message);
    }
};

// Caso não quero mais exibir as menssagem com base no morgan para que não chegue em produção, 
// e que isso pode também aumentar o processamento da maquina do servidor, se aplicação for grande e isso pode ser não util.
// Obs: Para o ambiente de desenvolvimento.
const skip = () => {
    const env = config.get<string>("env") || "development";
    return env !==  "development";
};

const morganMiddleware = morgan( // 3:25
    // Definindo um padrão de menssagem
    ":method :url :status :res[content-lenght] - :response-time ms",
    {stream, skip}
);

export default morganMiddleware;