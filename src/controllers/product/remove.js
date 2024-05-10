import productModel from "../../models/productModel.js"

const remove = async (req, res) => {
    try {
        const id = req.params.id
        const user = await productModel.deleteById(+id)
        res.json({
            success: `produto ${id} deletado com sucesso`,
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