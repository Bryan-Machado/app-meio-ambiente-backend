import markerModel from "../../models/markerModel.js"

const create = async (req, res) => {
    try {
        const dados = req.body
        const result = markerModel.validateMarkerToCreate(dados)

        if (!result.success) {
            return res.status(400).json({
                error: 'Dados de cadasro inválidos',
                // fields: zodErrorParser(result.error)
                fields: result.error.flatten().fieldErrors
            })
        }

        const marker = await markerModel.createMarker(result.data)
        res.json({
            success: `marcador ${marker.id} criado com sucesso`,
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