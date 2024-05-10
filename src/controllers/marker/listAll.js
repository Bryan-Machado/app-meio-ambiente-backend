import markerModel from "../../models/markerModel.js"

const listAll = async (req, res) => {
    try {
        const markers = await markerModel.getAll()
        return res.json({
            success: 'marcadores listados com sucesso',
            markers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default listAll