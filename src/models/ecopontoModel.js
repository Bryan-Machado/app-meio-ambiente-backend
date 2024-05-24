import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const ecopontoSchema = z.object({
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

    cnpj: z.string({
        required_error: 'O CNPJ do ecoponto é obrigatório.',
        invalid_type_error: 'O CNPJ deve ser uma string.'
    })
    .min(14, {message: 'O CNPJ deve ter 14 caracteres'})
    .max(14, {message: 'O CNPJ deve ter 14 caracteres'}),

    descricao: z.string({
        required_error: 'O CNPJ do ecoponto é obrigatório.',
        invalid_type_error: 'O CNPJ deve ser uma string.'
    })
    .min(50, {message: 'A descrição do ecoponto deve ter pelo menos 50 caracteres.'})
    .max(400, {message: 'A descrição do ecoponto deve ter no maximo 400 caracteres.'}),

    email: z.string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'O email deve ser uma string'
    })
    .email({message: 'Email inválido'}),

    telefone: z.string({
        required_error: 'O telefone do ecoponto é obrigatório.',
        invalid_type_error: 'O telefone deve ser uma string.'
    })
    .min(12, {message: 'O telefone do ecoponto deve ter pelo menos 12 caracteres.'})
    .max(14, {message: 'O telefone do ecoponto deve ter no maximo 14 caracteres.'}),

    imagemurl:  z.string({
        invalid_type_error: 'A url da imagem deve ser uma string.'
    })
    .max(400, {message: 'A url da imagem fornecida do ecoponto deve ter no maximo 400 caracteres.'})
})

const validateEcopontoToCreate = (ecoponto) => {
    const partialEcopontoSchema = ecopontoSchema.partial({id: true, email: true, telefone: true, imagemurl: true}) //true para todos que são opcionais
    return partialEcopontoSchema.safeParse(ecoponto)
}

const getAll = async () => {
    return await prisma.ecoponto.findMany()
}

const getById = async (id) => {
    return await prisma.ecoponto.findUnique({
        where: {
            id: id
        }
    })
}

const createEcoponto = async (ecopontoObject) => {
    return await prisma.ecoponto.create({
        data: ecopontoObject
    })
}

const updateById = async (id, newEcopontoObject) => {
    return await prisma.ecoponto.update({
        data:  newEcopontoObject,
        where: {
            id
        }
    })
}

const deleteById = async (id) => {
    return await prisma.ecoponto.delete({
        where: {
            id
        }
    })
}

export default {getAll, getById, createEcoponto, updateById, deleteById, validateEcopontoToCreate}