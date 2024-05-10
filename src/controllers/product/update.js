import productModel from "../../models/productModel.js"

const update = async (req, res) => {
    try {
        const dados = req.body
        const id = req.params.id
        const user = await productModel.updateById(+id, dados)
        res.json({
            success: `produto ${id} atualizado com sucesso`,
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