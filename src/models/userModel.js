import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const userSchema = z.object({
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

const validateUserToCreate = (user) => {
    const partialUserSchema = userSchema.partial({id: true}) //true para todos que são opcionais
    return partialUserSchema.safeParse(user)
}

const validateUserToUpdate = (user) => {
    const partialUserSchema = userSchema.partial({pass: true}) //true para todos que são opcionais
    return partialUserSchema.safeParse(user)
}

const validateUserToLogin = (user) => {
    const partialUserSchema = userSchema.partial({id: true, name: true, avatar: true}) //true para todos que são opcionais
    return partialUserSchema.safeParse(user)
}

const getAll = async () => {
    return await prisma.user.findMany()
}

const getById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}

const getByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

const createUser = async (userObject) => {
    return await prisma.user.create({
        data: userObject
    })
}

const updateById = async (id, newUserObject) => {
    return await prisma.user.update({
        data:  newUserObject,
        where: {
            id
        }
    })
}

const deleteById = async (id) => {
    return await prisma.user.delete({
        where: {
            id
        }
    })
}

export default {getAll, getById, getByEmail, createUser, updateById, deleteById, validateUserToCreate, validateUserToUpdate, validateUserToLogin}