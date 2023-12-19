const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Music' },
        { name: 'Fitness' },
        { name: 'Photography' },
        { name: 'Accounting' },
        { name: 'Engineering' },
        { name: 'Filming' },
      ],
    })
    // const ownCourse = await db.course.findUnique({
    //   where: {
    //     id: '87db9ac8-9a56-484a-aeeb-375c90ce2a34',
    //     userId: '4de2a677-2f9a-400a-a5cf-f2a0a5130f46',
    //   },
    // })
    // console.log(ownCourse)

    console.log('Success')
  } catch (error) {
    console.log('Error seeding the database categories', error)
  } finally {
    await db.$disconnect()
  }
}

main()
