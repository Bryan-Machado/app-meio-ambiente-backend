import markerModel from "../../models/markerModel.js"

const getById = (req, res) => {
    try {
        const id = req.params.id
        const marker = markerModel.getById(+id)
        res.json({
            success: `marcador ${id} encontrado com sucesso`,
            marker
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default getById