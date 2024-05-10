import sessionModel from "../../models/sessionModel"

const refreshToken = async (req, res) => {
    try {
        let token = false
        token = req.cookies?.token
        token = req.headers?.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                error: 'Usuário não autenticado'
            })
        }


        try {
            const { id, name } = jwt.verify(token, SECRET_KEY)
            return res.json({message: 'Token ativo.', user: {id, name}})
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                // obter os dados da session pelo token
                const session = sessionModel.getByToken(token)

                
                // se não achar o token: remover sessao, limpar o cookie, mensagem de erro.

                // verificar se a data de atualização é < que 1 dia

                // se não for mais valido: remover sessão, limpar o cookie e enviar mensagem de erro

                // se verdadeiro gerar novo token, atualizar os dados da sessao, gerar novo cookie

                return res.status(401).json({ error: 'Token expirado', code: 'expired-token' })
            }
            return res.status(401).json({ error: 'Token inválido', code: 'invalid-token' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default refreshToken