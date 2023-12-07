"use client"

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function Breadcrumbs(params: any) {
  const crumbs = usePathname().split('/')
  const breadcrumbs: string[] = []

  for (let index = 1; index < crumbs.length - 1; index++) {
    breadcrumbs.push(breadcrumbs.join('/') + '/' + crumbs[index])
  }

  const out: React.JSX.Element[] = breadcrumbs.map((crumb, ind) => {
    return <li key={ind}><Link href={crumb}>{crumb.split('/').pop()}</Link> {'>'} </li>
  })

  return (
    <ul className='flex'>
      <li><Link href={'/'}>Home</Link>&nbsp;{'>'}&nbsp;</li>
      {out}
      <li><span>{crumbs[crumbs.length - 1]}</span></li>
    </ul>
  )
}