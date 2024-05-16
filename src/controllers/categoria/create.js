import categoriaModel from "../../models/categoriaModel.js"
import zodErrorParser from "../../helpers/zodErrorFormatter.js"

const create = async (req, res) => {
    try {
        const dados = req.body
        const result = categoriaModel.validateCategoriaToCreate(dados)
        
        if (!result.success) {
            return res.status(400).json({
                error: 'Dados de cadasro inválidos',
                fields: zodErrorParser(result.error)
            })
        }

        const categoria = await categoriaModel.createCategoria(result.data)
        res.json({
            success: `categoria ${categoria.id} criado com sucesso`,
            categoria
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default create