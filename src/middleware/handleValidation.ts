// Utilizando o NextFunction, porque como é middleware, e vai precisa fazer um tratamento para vê se realmente vai seguir mesmo,
// para frente a requisição ou não vai.

import { Request, Response, NextFunction } from "express";

// Importando o validationResult do express-validator para lidar com as validações do meu sistema/aplicação.
import { validationResult } from "express-validator";

// Basicamente aqui, vou pegar todos os erros gerados da minha validação com base nas entidades do banco de dados,
// para depois pode enviar de volta para Rota, e não deixar os dados serem criados ou atualizados e também para outras operações, 
// ou seja para que os dados não venha incorretos, e que sejam impedidos e para que não possa prosseguir.

export const validate = (req: Request, res: Response, next: NextFunction) => {
    // 1:33
    const errors = validationResult(req);
}




