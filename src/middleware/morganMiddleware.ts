// Criando o middleware de configuração

import morgan, { StreamOptions } from "morgan";

// Impotando as minhas configurações do ambiente que está sendo executado 
import config from "config";

// Logger para imprimir as mensagens como padrão estabelecido e configurado
import Logger from "../../config/logger";

// Criando a const para ler as requisições HTTP baseado no pacote morgan
// O StreamOptions - Define que tudo o que o morgan vai gerar de log será redirecionado para o método Logger.http().
// Ou seja, ao invés de simplesmente imprimir no console.log, ele joga para um sistema de log configurado ( assim salvando em um arquivo ).
const stream: StreamOptions = {
    write: (message) => {
        Logger.http(message);
    }
};

// Caso não quero mais exibir as menssagem com base no morgan para que não chegue em produção, 
// e que isso pode também aumentar o processamento da maquina do servidor, se aplicação for grande e isso pode ser não util.
// Obs: Para o ambiente de desenvolvimento.
// A Função skip - Decide se o log do morgan será ignorado.
// Se o ambiente NÃO for development → ignora os logs.
// Isso é importante porque:
// Em produção, excesso de logs pode gerar sobrecarga.
// Em desenvolvimento, você quer ter mais detalhes para depurar.
const skip = () => {
    const env = config.get<string>("env") || "development";
    return env !==  "development";
};

// * Configuração do morgan * // 
// Define o formato do log.
// Usa o stream ( que joga para um sistema de log configurado que é o Logger ).
// Usa o skip ( que bloqueia os logs em ambientes de não de desenvolvimento, ou seja de produção ).
const morganMiddleware = morgan(
    // Definindo um padrão de menssagem
    ":method :url :status :res[content-length] - :response-time ms",
    {stream, skip}
);

export default morganMiddleware;

// ** Observações Importantes de Importações **

// Usando o morgan - Que é o middleware para fazer o logger das requisições HTTP.
// Usando config - Para importa as configurações do projeto ( geralmente um arquivo do tipo default.json, ou production.json ).
// Usando o Logger - Que é um módulo interno ( arquivo interno ) do projeto, que vai trazer as configurações de formato dos logs.

// ** Observação de Resumo final ** //

// Nesse código eu crio um middleware para logar requisições HTTP.
// Usando o morgan para gerar os logs.
// Ele manda os logs para um sistema de logging customizado ( Logger ).
// E ele só ativa os logs em desenvolvimento ( para não sobrecarregar em produção ).