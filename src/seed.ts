import { PrismaClient, LogType } from '@prisma/client'
import * as readline from 'readline'

const prisma = new PrismaClient()

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close()
      resolve(ans)
    }),
  )
}

async function main() {
  // Запитуємо кількість сутностей
  const usersCount =
    parseInt(await askQuestion('Скільки користувачів створити? ')) || 5
  const productsCount =
    parseInt(await askQuestion('Скільки продуктів створити? ')) || 5
  const ordersCount =
    parseInt(await askQuestion('Скільки замовлень створити? ')) || 5
  const logsCount =
    parseInt(await askQuestion('Скільки логів створити? ')) || 300

  // Створення користувачів
  const users = await Promise.all(
    Array(usersCount)
      .fill(null)
      .map((_, index) =>
        prisma.user.create({
          data: {
            originalId: index + 1,
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
          },
        }),
      ),
  )

  // Створення продуктів
  const products = await Promise.all(
    Array(productsCount)
      .fill(null)
      .map((_, index) =>
        prisma.product.create({
          data: {
            originalId: 1000 + index + 1,
            name: `Product ${index + 1}`,
          },
        }),
      ),
  )

  // Створення замовлень
  const orders = await Promise.all(
    Array(ordersCount)
      .fill(null)
      .map((_, index) =>
        prisma.order.create({
          data: {
            originalId: 2000 + index + 1,
          },
        }),
      ),
  )

  // Define log types
  const logTypes: LogType[] = [
    'login',
    'logout',
    'fiscalReceiptCreated',
    'invoiceCreated',
    'shipmentLabelCreated',
    'printLabel',
    'mailSent',
    'orderUpdate',
    'orderCreate',
    'productCreate',
    'productUpdate',
    'productDelete',
    'productCreateArticle',
    'packStart',
    'packEnd',
    'packAddManual',
    'packAddByScan',
    'packSkip',
  ]

  // Генерація логів
  const logs = []
  for (let i = 0; i < logsCount; i++) {
    // Циклічний розподіл користувачів, продуктів та замовлень
    const user = users[i % users.length]
    const product = products[i % products.length]
    const order = orders[i % orders.length]

    // Циклічне чергування типів логів
    const logType = logTypes[i % logTypes.length]

    const log = await prisma.log.create({
      data: {
        type: logType,
        userId: user.id,

        // Умовне додавання продукту та замовлення
        ...(i % 3 === 0 && { productId: product.id }),
        ...(i % 4 === 0 && { orderId: order.id }),

        // Додаткові дані
        payload: {
          batchId: `BATCH-${Math.floor(i / 10) + 1}`,
          actionDetails: `Action for ${logType} - Iteration ${i}`,
          timestamp: new Date(2025, 1, 1, Math.floor(i / 12), (i % 12) * 5),
        },

        // // Кількість продуктів для логів пов'язаних з пакуванням
        // ...(logType.startsWith('pack') && {
        //   productCount: (i % 5) + 1,
        // }),

        // Розподіл часу створення
        createdAt: new Date(2025, 1, 1, Math.floor(i / 12), (i % 12) * 5),
      },
    })

    logs.push(log)
  }

  console.log('Seed дані створено успішно')
  console.log(`Створено ${users.length} користувачів`)
  console.log(`Створено ${products.length} продуктів`)
  console.log(`Створено ${orders.length} замовлень`)
  console.log(`Створено ${logs.length} логів`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
