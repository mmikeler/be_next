import Main__Header from "@/src/c/profile/main_header";
import prisma from "@/src/db/prisma";
import moment from "moment";
import { getServerSession } from "next-auth";
import { Span } from "next/dist/trace";

export default async function Person__Page() {
  const payments = await getPayments();
  return (
    <div className="">
      <Main__Header title={'Платежи'} />

      <div className="mx-auto max-w-[400px] mt-20 bg-white p-3 rounded border">
        {
          payments?.map((payment, ind) => {
            return (
              <div key={ind} className="flex hover:bg-gray-100 items-center p-2 my-4 border-l-4 pl-4 border-lime-500">
                <div className="">
                  <div className="">ID: {payment.id}</div>
                  <div className="text-sm">Дата: {moment(payment.created).format('DD.MM.YYYY hh:mm')}</div>
                </div>
                <div className="ms-auto">
                  <div className="text-lg">{payment.amount}.00</div>
                  <div className="text-xs text-end">
                    {
                      payment.status === 'succeeded' &&
                      <span className="bg-green-500 text-white px-2 rounded">Оплачен</span>
                    }
                    {
                      payment.status === 'canceled' &&
                      <span className="bg-gray-500 text-white px-2 rounded">Отменён</span>
                    }
                    {
                      payment.status === 'refounded' &&
                      <span className="bg-red-500 text-white px-2 rounded">Возвращён</span>
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

/**
 * Get current user payments
 * @returns array of payments
 */
async function getPayments(): Promise<{ id: number; created: Date; amount: number; currency: string; i_key: string; description: string; clientId: string; status: string; }[] | undefined> {
  const session = await getServerSession();
  const payments = await prisma?.payment.findMany({
    where: {
      clientId: session?.user?.email || ''
    }
  });
  return payments;
}