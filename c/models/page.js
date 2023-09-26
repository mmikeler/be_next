import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class PageModel {
  constructor(data) {
    this.prisma = prisma
    this.id = data.id
    this.title = data.title
    this.createdAt = data.created.getTime()
    this.expiredAt = data.expired?.getTime() ?? null
    this.content = data.content
    this.status = data.status === 1 ? 'published' : 'close'
    this.authorId = data.authorId
    this.views = data.views
  }

  async getAuthor() {
    await prisma.user.findUnique({
      where: {
        id: this.authorId,
      },
    })
      .then(res => { return res })
  }

  async init() {
    this.author = this.getAuthor()
  }
}