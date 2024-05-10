import userModel from "../../models/userModel.js"
import zodErrorParser from "../../helpers/zodErrorFormatter.js"
import bcrypt from 'bcrypt'

const create = async (req, res) => {
    try {
        const dados = req.body
        const result = userModel.validateUserToCreate(dados)
        
        if (!result.success) {
            return res.status(400).json({
                error: 'Dados de cadasro inválidos',
                fields: zodErrorParser(result.error)
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