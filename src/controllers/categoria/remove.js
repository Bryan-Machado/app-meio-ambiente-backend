import categoriaModel from "../../models/categoriaModel.js"

const remove = async (req, res) => {
    try {
        const id = req.params.id
        const categoria = await categoriaModel.deleteById(+id)
        res.json({
            success: `categoria ${id} com nome: ${categoria.nome} deletado com sucesso`,
            categoria
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default remove