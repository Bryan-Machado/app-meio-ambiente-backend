import categoriaModel from "../../models/categoriaModel.js"

const getById = (req, res) => {
    try {
        const id = req.params.id
        const categoria = categoriaModel.getById(+id)
        res.json({
            success: `categoria ${id} encontrado com sucesso`,
            categoria
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default getById