// Vou ter uma serie de campos para inserir

// Sempre que eu cria uma entidade de model, preciso estabelecer os dois: model e Schema.
// Em primeiro vou fazer o Schema.
// Em segundo vou cria uma entidade de model, para realiza todos metodos com base na operação de CRUD, que o banco precisa realizar.
import { model, Schema} from "mongoose";

// Schema/Esquema
const movieSchema = new Schema(
    {
        // Todas as propridades que eu quero inserir e o tipo definido
        title: { type: String },
        rating: { type: Number },
        description: { type: String },
        director: { type: String },
        stars: { type: Array },
        poster: { type: String }
    },
    {
        timestamps: true
    }
);

// Com o Schema pronto, eu vou exportar o model deste Schema.
// Nomeando o model e passando o Schema.
// Depois quando eu trazer este MovieModel no meus controllers para poder ativar os metodos por exemplo de criação e leitura, 
// Eu vou ter acesso a todos os metodos que tem no mongoose, e vou conseguir criar e ler as minhas entidades de maneira bem facil. 
export const MovieModel = model("Movies", movieSchema); 

