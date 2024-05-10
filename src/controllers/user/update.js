import userModel from "../../models/userModel.js"

const update = async (req, res) => {
    try {
        const dados = req.body
        const id = req.params.id
        const userEdited = await userModel.updateById(+id, dados)
        res.json({
            success: `usuario ${id} atualizado com sucesso`,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}




export default update