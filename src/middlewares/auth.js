import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'

const auth = (req, res, next) => {
    //pegar o token
    let token = false
    token = req.cookies?.token
    token = req.headers?.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({
            error: 'Usuário não autenticado'
        })
    }
    
    try {
        const {id, name} = jwt.verify(token, SECRET_KEY)
        req.userLogged = {id, name}
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({error: 'Token expirado', code: 'expired-token'})          
        }
        return res.status(401).json({ error: 'Token inválido', code: 'invalid-token'})
    }

    next()
}

export default auth