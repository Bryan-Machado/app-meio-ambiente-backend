import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient()

const categoriaSchema = z.object({
    id: z.number({
        required_error: 'ID da categoria é obrigatório',
        invalid_type_error: 'O ID da categoria deve ser um número inteiro'
    })
});

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
    }),
    categorias: z.array(categoriaSchema, {
        required_error: "As categorias associadas são obrigatórias.",
        invalid_type_error: "As categorias devem ser recebidas como um array de objetos."
    })
})

const validateMarkerToCreate = (marker) => {
    const partialMarkerSchema = markerSchema.partial({ id: true }) //true para todos que são opcionais
    return partialMarkerSchema.safeParse(marker)
}

const getAll = async () => {
    return await prisma.marker.findMany({
        include: {
            ecoponto: true,
            marker_has_categoria: {
                include: {
                    categoria: true
                }
            }
        }
    });
}

const getById = async (id) => {
    return await prisma.marker.findUnique({
        where: {
            id: id
        }
    })
}

const createMarker = async (productObject) => {
    console.log(productObject)
    return await prisma.marker.create({
        data: {
            longitude: productObject.longitude,
            latitude: productObject.latitude,
            ecoponto_id: productObject.ecoponto_id,
            marker_has_categoria: {
                create: productObject.categorias.map(categoria => ({
                    categoria: {
                        connect: { id: categoria.id }
                    }
                }))
            }
        },
        include: {
            marker_has_categoria: true
        }
    });
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

export default { getAll, getById, createMarker, updateById, deleteById, validateMarkerToCreate }