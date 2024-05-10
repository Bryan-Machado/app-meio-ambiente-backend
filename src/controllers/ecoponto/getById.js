import ecopontoModel from "../../models/ecopontoModel.js"

const getById = (req, res) => {
    try {
        const id = req.params.id
        const ecoponto = ecopontoModel.getById(+id)
        res.json({
            success: `ecoponto ${id} encontrado com sucesso`,
            ecoponto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default getById