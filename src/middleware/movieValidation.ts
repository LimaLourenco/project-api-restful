// Criando o Middleware para a validação de filmes

// Importando o body que é o corpo da requisição ( e é onde eu recebo os dados, ou seja pelo corpo da requisição mesmo ) - pelo express-validator
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
            .withMessage("A nota deve ser um número").custom((value: number) => {  // Criando uma validação custom, quando eu não tenho validações que a atendam na ferramenta .
            // Valor que está vindo aqui é da requisição, que é a nota.
            if(value < 0 || value > 10) {
                throw new Error("A nota precisa ser entre 0 a 10")
            }
            // Caso de certo, preciso indicar para que continue o fluxo do código.
            return true; 
        }),
        // Fazendo a validação de outro campo
        body("description").isString().withMessage("A descrição é obrigatória"),
        body("director").isString().withMessage("O nome do diretor é obrigatório"),
        body("poster").isURL().withMessage("A imagem precisa ser uma URL"),
    ];
}

// Obs: Todos esses campos que estão sendo validados são do Model, e que vem pela a requisição feita.