import categoriaModel from "../../models/categoriaModel.js"

const update = async (req, res) => {
    try {
        const dados = req.body
        const id = req.params.id

        const categoriaEditado = await categoriaModel.updateById(+id, dados)
        res.json({
            success: `categoria ${id} atualizado com sucesso`,
            categoriaEditado
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}




export default update