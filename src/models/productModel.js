import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    return await prisma.product.findMany()
}

const getById = async (id) => {
    return await prisma.product.findUnique({
        where: {
            id: id
        }
    })
}

const createProduct = async (productObject) => {
    return await prisma.product.create({
        data: productObject
    })
}

const updateById = async (id, newProductObject) => {
    return await prisma.product.update({
        data: {
            newProductObject
        },
        where: {
            id
        }
    })
}

const deleteById = async (id) => {
    return await prisma.product.delete({
        where: {
            id
        }
    })
}

export default {getAll, getById, createProduct, updateById, deleteById}