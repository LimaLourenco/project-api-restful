// Criando o middleware de configuração

import morgan, { StreamOptions } from "morgan";

// Impotando as minhas configurações do ambiente que está sendo executado 
import config from "config";

// Logger para imprimir as mensagens como padrão estabelecido e configurado
import Logger from "../../config/logger"; // 1:27

// Criando a const para conseguir ler as requisições HTTP
const stream: StreamOptions = {
    write: (message) => {
        Logger.http(message);
    }
};

