import { Icon } from './ui/icon'
import moment from 'moment'
import { Like } from './ui/like'

moment.locale('ru')

export function PAGE({ page }: any | null) {

  if (!page) return (
    <div className="m-auto text-center">
      <div className="text-4xl">404</div>
      <p>Страница не найдена</p>
    </div>
  )

  return (
    <>
      <div className="">
        <h1 className="text-4xl text-center mb-6">{page.title}</h1>

        <div className="p-10">
          {page.content}
        </div>

        <div className="flex justify-between">

          <span className='flex items-center'>
            <span className='me-1 h-5'><Icon tag={'visibility'} /></span>
            <span>{page.views}</span>

            <Like page={page} />

          </span>

          <div className="ms-auto flex">
            <span className='me-5 flex items-center'>
              <span className="me-1 h-5"><Icon tag={'person'} /></span>
              <span>{page.author.name}</span>
            </span>
            <span className='me-3 flex items-center'>
              <span className="me-1 h-5"><Icon tag={'calendar_month'} /></span>
              {moment(page.created.getTime()).format('DD.MM.YY')}
            </span>
          </div>

        </div>

      </div>
    </>
  )
}