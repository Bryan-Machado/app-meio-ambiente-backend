const endereco = {
    rua: 'Disneylandia',
    numero: 1
}

const user = {
    nome: 'Pirulebes',
    idade: 39,
    email: 'pirulebes@gmail.com',
    prof: true,
    end: endereco,
    familia: {
        mae: 'João',
        pai: 'Maria',
        irmão: 'Pirulebes'
    },
    pets: [{nome: 'tobias', animal: 'cachorro'}, 'gato', 'peixe']
}

delete user.prof
console.log(user);
user.pets[0] = {sla: 'nome varial', teste: 'teste dois'}
console.log(user);
console.log(user.pets[0]);

user.idade = 100000
console.log(user.idade)
console.log(user.familia.mae);
console.log(user.prof);



// Atribuição via desestruturação (destructuring assignment)
const array1 = [10, 'ola', 'teste', {prop1: 'oi'}]

const [ , , teste, {prop1}] = array1
console.log(teste, prop1);