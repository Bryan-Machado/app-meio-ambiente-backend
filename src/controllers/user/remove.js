import userModel from "../../models/userModel.js"

const remove = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userModel.deleteById(+id)
        res.json({
            success: `usuario ${id} deletado com sucesso`,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default remove