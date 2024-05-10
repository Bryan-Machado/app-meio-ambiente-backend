import productModel from "../../models/productModel.js"

const getById = (req, res) => {
    try {
        const id = req.params.id
        const user = productModel.getById(+id)
        res.json({
            success: `produto ${id} encontrado com sucesso`,
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