// Criando o Middleware para a validação de filmes

// Importando o body que é o corpo da requisição pelo express-validator
import { body } from "express-validator";

export const movieCreateValidation = () => {
    return [
        body("title")
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({min: 5})
            .withMessage("O titulo precisa ter minimo 5 caracteres"),
        body("rating")
            .isNumeric()
            .withMessage("A nota deve ser um número").custom((value: number) => {  // Criando uma validação custom
            // Valor que está vindo da requisição, que é a nota.
            if(value < 0 || value > 10) {
                throw new Error("A nota precisa ser entre 0 a 10")
            }
        }),
    ];
}