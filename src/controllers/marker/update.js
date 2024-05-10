import markerModel from "../../models/markerModel.js"

const update = async (req, res) => {
    try {
        const dados = req.body
        const id = req.params.id
        const marker = await markerModel.updateById(+id, dados)
        res.json({
            success: `marcador ${id} atualizado com sucesso`,
            marker
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default update