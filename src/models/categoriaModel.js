import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const categoriaSchema = z.object({
    id: z.number({
        required_error: 'ID é obrigatório',
        invalid_type_error: 'O ID deve ser um numero inteiro'
    }),
    nome: z.string({
        required_error: 'Nome é obrigatório',
        invalid_type_error: 'O nome deve ser uma string'
    })
    .min(3, {message: 'O nome deve ter no mínimo 3 caracteres'})
    .max(250, {message: 'O nome deve ter no máximo 250 caracteres'}),

    descricao: z.string({
        required_error: 'A descrição da categoria é obrigatória.',
        invalid_type_error: 'A descrição deve ser uma string.'
    })
    .min(50, {message: 'A descrição da categoria deve ter pelo menos 50 caracteres.'})
    .max(400, {message: 'A descrição da categoria deve ter no maximo 400 caracteres.'})
})

const validateCategoriaToCreate = (categoria) => {
    const partialcategoriaSchema = categoriaSchema.partial({id: true, email: true, telefone: true}) //true para todos que são opcionais
    return partialcategoriaSchema.safeParse(categoria)
}

const getAll = async () => {
    return await prisma.categoria.findMany()
}

const getById = async (id) => {
    return await prisma.categoria.findUnique({
        where: {
            id: id
        }
    })
}

const createCategoria = async (categoriaObject) => {
    return await prisma.categoria.create({
        data: categoriaObject
    })
}

const updateById = async (id, newcategoriaObject) => {
    return await prisma.categoria.update({
        data:  newcategoriaObject,
        where: {
            id
        }
    })
}

const deleteById = async (id) => {
    return await prisma.categoria.delete({
        where: {
            id
        }
    })
}

export default {getAll, getById, createCategoria, updateById, deleteById, validateCategoriaToCreate}