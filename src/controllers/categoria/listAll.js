import categoriaModel from "../../models/categoriaModel.js";

const listAll = async (req, res) => {
    try {
        const categorias = await categoriaModel.getAll()
        return res.json({
            success: 'categorias listados com sucesso',
            categorias
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default listAll