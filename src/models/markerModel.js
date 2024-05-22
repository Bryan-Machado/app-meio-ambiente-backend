import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient()

const markerSchema = z.object({
    id: z.number({
        required_error: 'ID é obrigatório',
        invalid_type_error: 'O ID deve ser um numero inteiro'
    }),
    ecoponto_id: z.number({
        required_error: 'O ID do ecoponto relacionado ao marcador é obrigatório',
        invalid_type_error: 'O ID deve ser um numero inteiro'
    }),
    longitude: z.number({
        required_error: 'A longitude é obrigatória',
        invalid_type_error: 'A longitude deve ser um numero float'
    }),
    latitude: z.number({
        required_error: 'A latitude é obrigatória',
        invalid_type_error: 'A latitude deve ser um numero float'
    })
})

const validateMarkerToCreate = (marker) => {
    const partialMarkerSchema = markerSchema.partial({id: true}) //true para todos que são opcionais
    return partialMarkerSchema.safeParse(marker)
}

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
        data: {
            longitude: 123123,
            latitude: 23232,
            marker_has_categoria: {
                create: [
                    {
                        categoria: {
                            connect: { id: productObject.categoria.id }
                        }
                    }
                ]
            }
        }
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

export default {getAll, getById, createMarker, updateById, deleteById, validateMarkerToCreate}