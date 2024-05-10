import ecopontoModel from "../../models/ecopontoModel.js";

const listAll = async (req, res) => {
    try {
        const ecopontos = await ecopontoModel.getAll()
        return res.json({
            success: 'Ecopontos listados com sucesso',
            ecopontos
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default listAll