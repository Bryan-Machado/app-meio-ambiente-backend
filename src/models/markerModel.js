import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAll = async () => {
    return await prisma.marker.findMany()
}

const getById = async (id) => {
    return await prisma.marker.findUnique({
        where: {
            id: id
        }
    })
}

const createMarker = async (productObject) => {
    return await prisma.marker.create({
        data: productObject
    })
}

const updateById = async (id, newMarkerObject) => {
    return await prisma.marker.update({
        data: {
            newMarkerObject
        },
        where: {
            id
        }
    })
}

const deleteById = async (id) => {
    return await prisma.marker.delete({
        where: {
            id
        }
    })
}

export default {getAll, getById, createMarker, updateById, deleteById}