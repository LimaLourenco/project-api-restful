// Utilizando o NextFunction, porque como é um middleware, e vai precisa fazer um tratamento para vê se realmente vai precisa seguir mesmo,
// para frente a requisição ou não vai.

import { Request, Response, NextFunction } from "express";

// Importando o validationResult do express-validator para lidar com as validações do meu sistema/aplicação.
import { validationResult } from "express-validator";

// * Basicamente aqui, vou pegar todos os erros gerados da minha outra validação com base nas entidades do banco de dados,
// para depois pode enviar de volta para aquela Rota especifica, e para não deixa os dados serem criados ou atualizados, e também até fazer outras operações, 
// ou seja, para que os dados não venham incorretos, e que sejam impedidos e não possa prosseguir.
export const validate = (req: Request, res: Response, next: NextFunction) => {
    
    // Vai receber o validationResult, e vai trazer os erros a partir da requisição
    const errors = validationResult(req);

    // Se não tiver nenhum erro capturado no array, e estiver vazio, vou prosseguir com a criação de filmes no sistema/aplicação.
    if (errors.isEmpty()) {
        return next();
    }

    // Se estiver algum erro capturado no array.
    const extratectErrors: object[] = [];

    // Vou inserir cada um dos erros no array.
    errors.array().map((err) => {
        // err.param -> Para saber da onde está vindo o erro especifico e o err.msg -> Será a mensagem do erro. 
        extratectErrors.push({ [err.path]: err.msg });
    });

    return res.status(422).json({
        errors: extratectErrors,
    });
};

// Observação: Este seria o Middleware principal de validação, para trabalha com qualquer validação do sistema/aplicação.



