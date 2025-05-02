// Criando o Middleware para a validação de filmes

// Importando o body que é o corpo da requisição 
import { body } from "express-validator";

export const movieCreateValidation = () => {
    return [
        body("title")
            .isString()
            .withMessage("O título é obrigatório"),
    ];
}