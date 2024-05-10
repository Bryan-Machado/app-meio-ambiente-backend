import userModel from "../../models/userModel.js"

const getById = (req, res) => {
    try {
        const id = req.params.id
        const user = userModel.getById(+id)
        res.json({
            success: `usuario ${id} encontrado com sucesso`,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default getById