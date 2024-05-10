import markerModel from "../../models/markerModel.js"

const remove = async (req, res) => {
    try {
        const id = req.params.id
        const marker = await markerModel.deleteById(+id)
        res.json({
            success: `marcador ${id} deletado com sucesso`,
            marker
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default remove