import ecopontoModel from "../../models/ecopontoModel.js"

const update = async (req, res) => {
    try {
        const dados = req.body
        const id = req.params.id

        const ecopontoEditado = await ecopontoModel.updateById(+id, dados)
        res.json({
            success: `Ecoponto ${id} atualizado com sucesso`,
            ecopontoEditado
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}




export default update