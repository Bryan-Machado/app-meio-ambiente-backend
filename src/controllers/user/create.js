import userModel from "../../models/userModel.js"
import zodErrorParser from "../../helpers/zodErrorFormatter.js"
import bcrypt from 'bcrypt'

const create = async (req, res) => {
    try {
        const dados = req.body
        const result = userModel.validateUserToCreate(dados)
        
        if (!result.success) {
            const erroFormatado = result.error.format()
            delete erroFormatado._errors
            // erroFormatado.name ? erroFormatado.name = erroFormatado.name._errors : null
            // erroFormatado.email ? erroFormatado.email = erroFormatado.email._errors : null
            // erroFormatado.avatar ? erroFormatado.avatar = erroFormatado.avatar._errors : null
            zodErrorParser(result.error)
            return res.status(400).json({
                error: 'Dados de cadasro inválidos',
                fields: erroFormatado
            })
        }

        result.data.pass = await bcrypt.hash(result.data.pass, 10)
        const user = await userModel.createUser(result.data)
        delete user.pass
        res.json({
            success: `usuario ${user.id} criado com sucesso`,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default create