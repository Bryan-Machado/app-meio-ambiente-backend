import zodErrorParser from "../../helpers/zodErrorFormatter.js"
import userModel from "../../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js"
import sessionModel from "../../models/sessionModel.js"

const login = async (req, res) => {
    try {
        const { email, pass } = req.body

        // validando as entradas
        const result = userModel.validateUserToLogin({email, pass})
        if (!result.success) {
            const erroFormatado = result.error.format()
            delete erroFormatado._errors
            zodErrorParser(result.error)
            return res.status(400).json({
                error: 'Dados de login inválidos',
                fields: erroFormatado
            })
        }
        //obter os dados do usuario pelo email
        const userFound = await userModel.getByEmail(email)
        if (!userFound) {
            return res.status(401).json({
                error: 'Email ou senha inválida.'
            })
        }

        //comparar se a senha bate com o hash do banco
        const passIsValid = await bcrypt.compare(pass, userFound.pass)

        if (!passIsValid) {
            return res.status(401).json({
                error: 'Email ou senha inválida.'
            })
        }

        // gerar o token de acesso (access token) do usuario
        const token = jwt.sign({ id: userFound.id, name: userFound.name }, SECRET_KEY, { expiresIn: '5m' })

        // gerar o cookie para a web
        res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3* 30 * 24 * 60 * 60 * 1000})

        // fix timezone -3
        let date = new Date()
        date.setHours(date.getHours() - 3)

        await sessionModel.create({
            userId: userFound.id,
            token,
            createdAt: date 
        })

        return res.json({ message: 'User logado!', token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default login