import sessionModel from "../../models/sessionModel";

const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3* 30 * 24 * 60 * 60 * 1000 })

        // limpar dados do banco
        await sessionModel.remove(req.userLogged.id, req.userLogged.token)
        return res.json({message: 'logout feito com sucesso'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default logout