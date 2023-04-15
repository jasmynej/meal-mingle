import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    const recipe = await prisma.recipe.findFirst({
        where:{
           id:"642ecafde525b87ebd3e665a"
        }
    })


    console.log(recipe)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })