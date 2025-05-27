// Utilizando o NextFunction, porque como é um middleware, e vai precisa fazer um tratamento para vê se realmente vai precisa seguir mesmo,
// para frente a requisição ou não vai.

import { Request, Response, NextFunction } from "express";

// Importando o validationResult do express-validator para lidar com as validações do meu sistema/aplicação.
// Usado para pegar os erros de validação que foram definidos anteriormente em algum middleware (por exemplo de:, verificando se um campo está vazio). 
import { validationResult } from "express-validator";

// * Basicamente aqui, vou pegar todos os erros gerados da minha outra validação com base nas entidades do banco de dados,
// para depois pode enviar de volta para aquela Rota especifica, e para não deixa os dados serem criados ou atualizados, e também até fazer outras operações, 
// ou seja, para que os dados não venham incorretos, e que sejam impedidos e não possa prosseguir.
export const validate = (req: Request, res: Response, next: NextFunction) => {
    
    // Vai receber o validationResult, e vai trazer os erros a partir da requisição
    // E também aqui ele coleta todos os erros que foram acumulados nas validações anteriores no req.
    const errors = validationResult(req);

    // Se não tiver nenhum erro capturado no array, e estiver vazio, vou prosseguir com a criação de filmes no sistema/aplicação.
    // Ou seja, se não houver erros, ele chama next() para seguir para o próximo middleware ou controller (ou seja, deixa a requisição continuar normalmente).
    if (errors.isEmpty()) {
        return next();
    }

    // Se tiver algum erro captura no array.
    const extratectErrors: object[] = [];

    // Se tiver erros, monta um array com os erros.
    // Vou inserir cada um dos erros no array.
    // Se houver algum erro, ele percorre cada erro e monta um array chamado extratectErrors.
    errors.array().map((err) => {
        // err.param -> Para saber da onde está vindo o erro especifico e o err.msg -> Será a mensagem do erro. 
        extratectErrors.push({ [err.path]: err.msg });
    });

    return res.status(422).json({
        errors: extratectErrors,
    });
};

// Observação: Este seria o Middleware principal de validação, para trabalha com qualquer validação do sistema/aplicação.

// *** Observações Importantes ***:

// Esse é um middleware do Express. Ele vai ser chamado depois dos middlewares que fazem a validação dos dados, e antes de chegar no controller final.

// Se houver algum erro, ele percorre cada erro e monta um array chamado extratectErrors no formato:

// [
//  { "campo": "mensagem de erro" },
//  { "outroCampo": "outra mensagem de erro" }
// ]

// Por exemplo, se o campo email estiver vazio, ele pode virar:

// [{ "email": "O e-mail é obrigatório" }]

// Retorna a resposta com status 422 - status 422 Unprocessable Entity → significa que os dados enviados estão incorretos. E um JSON contendo a lista dos erros, para que quem enviou saiba o que corrigir.

// Esse middleware bloqueia a requisição se os dados enviados não passarem nas validações. E garante que eu não continue criando, atualizando ou processando dados inválidos no backend. Assim, evita inserir informações erradas no banco de dados.
