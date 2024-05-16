import ecopontoModel from "../../models/ecopontoModel.js"
// import zodErrorParser from "../../helpers/zodErrorFormatter.js"

const create = async (req, res) => {
    try {
        const dados = req.body
        const result = ecopontoModel.validateEcopontoToCreate(dados)
        
        if (!result.success) {
            return res.status(400).json({
                error: 'Dados de cadasro inválidos',
                // fields: zodErrorParser(result.error)
                fields: result.error.flatten().fieldErrors
            })
        }

        const ecoponto = await ecopontoModel.createEcoponto(result.data)
        res.json({
            success: `ecoponto ${ecoponto.id} criado com sucesso`,
            ecoponto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default create