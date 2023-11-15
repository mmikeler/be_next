import { PrismaClient } from "@prisma/client";
import { logger } from "./ext/logger";
const cron = require('node-schedule');

export function register() {

  cron.scheduleJob('15 4 * * *', async () => {
    /**
     * Записываем в лог итоги операции
     */
    logger.info({
      level: 'info',
      message: 'Ежедневное списание средств за аренду сервиса началось',
    })

    const today = new Date()
    const prisma = new PrismaClient()

    // Получаем юзеров
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        points: true,
        last_pay: true,
        _count: {
          select: {
            sites: { where: { published: true } },
          },
        },
      },
    })

    // Обновляем юзеров
    const result = { sites: 0, sites_stoped: 0, users: 0, points: 0 }
    users.map(async (user) => {
      const sites = user._count.sites
      const tax = sites * 5
      // Собираем статистику
      result.sites += sites
      result.users += 1
      result.points += tax
      /**
       * Обновляем данные в зависимости от состояния счёта
       * 
       * Если средств достаточно производим списание за все включенные сайты
       * Если нет, отключаем все сайты
       */
      if (user.points - tax >= 0) {
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            points: user.points - tax,
            last_pay: today
          }
        })
      }
      else {
        /**
         * Отключаем сайты
         */
        const blocked = await prisma.minisite.updateMany({
          where: {
            masterId: user.email
          },
          data: {
            published: false
          }
        })
        // Собираем статистику
        result.sites_stoped += blocked.count
      }
    })

    /**
     * Записываем в лог итоги операции
     */
    logger.info({
      level: 'info',
      message: 'Ежедневное списание средств за аренду сервиса',
      stat: result
    })

  });

}