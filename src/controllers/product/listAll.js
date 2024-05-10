import productModel from "../../models/productModel.js"

const listAll = async (req, res) => {
    try {
        const users = await productModel.getAll()
        return res.json({
            success: 'produtos listados com sucesso',
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'oops, erro no servidor, tente novamente!'
        })
    }
}

export default listAll