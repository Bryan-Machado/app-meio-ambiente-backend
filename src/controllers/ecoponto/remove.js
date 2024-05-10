import ecopontoModel from "../../models/ecopontoModel.js"

const remove = async (req, res) => {
    try {
        const id = req.params.id
        const ecoponto = await ecopontoModel.deleteById(+id)
        res.json({
            success: `Ecoponto ${id} com nome: ${ecoponto.nome}; e cnpj: ${ecoponto.cnpj} deletado com sucesso`,
            ecoponto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default remove