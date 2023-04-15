import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
    {
        email: 'alice@example.com',
        name: 'Alice',
        gender: 1,
        Post: {
            create:
            {
                title: 'Hello World',
                content: {
                    create: {
                        message: 'Hello World'
                    }
                }
            }
        }
    },
    {
        email: 'bob@example.com',
        name: 'Bob',
        gender: 0,
        Post: {
            create:
            {
                title: 'Goodbye World',
                content: {
                    create: {
                        message: 'Hello World'
                    }
                }
            }
        }
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
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
  