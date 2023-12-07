import axios from "axios"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Base64 } from "js-base64";
import { randomUUID } from "crypto"
import { auth } from "../../auth/[...nextauth]/auth";
import prisma from "@/src/db/prisma";

/**
 * Создание платежа
 * @param request 
 * @returns 
 */
export async function POST(request: NextRequest) {
  const { summ } = await request.json()

  const session = await auth();
  if (!prisma || !session) {
    return NextResponse.json({
      error: true,
      errorMessage: 'Не авторизован'
    })
  };

  const idempotenceKey = randomUUID();
  const result = await axios.post(
    'https://api.yookassa.ru/v3/payments',
    {
      "amount": {
        "value": summ.toString(),
        "currency": "RUB"
      },
      "capture": true,
      "confirmation": {
        "type": "embedded"
      },
      "description": "",
      "metadata": {
        "user_email": session?.user?.email
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_YOOKASSA_TOKEN}`,
        'Idempotence-Key': idempotenceKey
      }
    }
  )

  return NextResponse.json(result.data || { error: true })
}

// Предполагаемая функция для получения токена
async function get_token(params: any) {
  let result: any = {}

  const client_id = "fjc8j9bg793nd3gs694me6t8p7alca8r"
  const client_secret = "8ukz49YghShJJUt4x4arIh7nZPW24HyDiC7tmcuK-Kefdb6cIh37H8v6GzCWCkku"
  const pwd = Base64.encode(`${client_id}:${client_secret}`)
  result = await axios.post(
    'https://yookassa.ru/oauth/v2/token',
    {
      grant_type: 'authorization_code',
      code: 'rvunUlge6gUMx6TT0UT6ys4y398qqG73KQb1PjXETuX6eiQYJXXi-IrNHe49a9mt'
    },
    {
      headers: {
        'Authorization': `Basic ${pwd}`
      }
    }
  )
  //console.log(result.data);

  return NextResponse.json(result?.data || {})
}