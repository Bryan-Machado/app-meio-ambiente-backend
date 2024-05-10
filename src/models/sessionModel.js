import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const create = async (session) => {
    return await prisma.product.create({
        data: session
    })
}

const remove = async (userId, token) => {
    return await prisma.session.delete({
        data: {  }
    })
}

const getByToken = async (token) => {
    return await prisma.session.findUnique({
        where: {
            token
        }
    })
}

export default {create, remove, getByToken}