import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const ecopontoSchema = z.object({
    id: z.number({
        required_error: 'ID é obrigatório',
        invalid_type_error: 'O ID deve ser um numero inteiro'
    }),
    name: z.string({
        required_error: 'Nome é obrigatório',
        invalid_type_error: 'O nome deve ser uma string'
    })
    .min(3, {message: 'O nome deve ter no mínimo 3 caracteres'})
    .max(250, {message: 'O nome deve ter no máximo 250 caracteres'}),

    email: z.string({
        required_error: 'Email é obrigatório',
        invalid_type_error: 'O email deve ser uma string'
    })
    .email({message: 'Email inválido'}),

    pass: z.string({
        required_error: 'Senha é obrigatória',
        invalid_type_error: 'A senha deve ser uma string'
    }),

    avatar: z.string({
        required_error: 'Avatar é obrigatório',
        invalid_type_error: 'O avatar deve ser uma string'
    })
    .url({message: 'URL inválida'})
    .max(10000, {message: 'A url deve ter no máximo 10 mil caracteres'})
})

const validateEcopontoToCreate = (user) => {
    const partialEcopontoSchema = ecopontoSchema.partial({id: true}) //true para todos que são opcionais
    return partialEcopontoSchema.safeParse(user)
}

const validateEcopontoToUpdate = (user) => {
    const partialEcopontoSchema = ecopontoSchema.partial({pass: true}) //true para todos que são opcionais
    return partialEcopontoSchema.safeParse(user)
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

export default {getAll, getById, getByEmail, createEcoponto, updateById, deleteById, validateEcopontoToCreate, validateEcopontoToUpdate, validateEcopontoToLogin}