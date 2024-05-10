import markerModel from "../../models/markerModel.js"

const create = async (req, res) => {
    try {
        const dados = req.body
        const marker = await markerModel.createMarker(dados)
        res.json({
            success: `marcador ${id} criado com sucesso`,
            marker
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default create