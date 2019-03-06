const {Prisma} = require('prisma-binding')

module.exports = new Prisma({
    endpoint: 'https://shopketti-dev-ffe6bbb79d.herokuapp.com',
    typeDefs: 'src/generated/prisma.graphql'
})