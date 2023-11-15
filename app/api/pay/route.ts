import axios from "axios"
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

//
// Получаем данные платёжа из кассы
//
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: true })
  }

  const result = await axios.get(
    'https://api.yookassa.ru/v3/payments/' + id,
    {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_YOOKASSA_TOKEN}`
      }
    }
  )
  // Если платёж завершён
  if (result?.data?.status === 'succeeded') {
    /**
     *  Проверяем его наличие в базе
     */
    const hasPayment = await prisma.payment.findUnique({ where: { i_key: id } })
    if (hasPayment?.id) {
      /**
       * Выходим, если такой платёж уже есть
       */
      return NextResponse.json(result.data || { error: true })
    }
    /**
     * Если платёж новый, добавляем номинал на счёт юзеру и создаём транзакцию
     */
    let res = await prisma.user.update({
      where: {
        email: result.data.metadata.user_email
      },
      data: {
        points: {
          increment: Number(result.data.amount.value)
        },
        payments: {
          upsert: {
            where: { i_key: id },
            update: { status: result.data.status },
            create: {
              i_key: id,
              amount: Number(result.data.amount.value),
              status: result.data.status
            }
          }
        }
      }
    })

    return NextResponse.json(result.data || { error: true })
  }

  return NextResponse.json(result.data || { error: true })
}