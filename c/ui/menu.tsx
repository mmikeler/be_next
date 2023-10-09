import { useSession, signIn, signOut } from "next-auth/react"

export default function Menu(props: any) {

  const menu = [
    {
      title: 'Профиль',
      url: '/profile',
    },
    {
      title: 'Выйти',
      url: null,
      action: signOut,
    }
  ]

  return (
    <ul>
      {
        menu.map((item, ind) => {
          if (item.url) {
            return (
              <li className="p-1 cursor-pointer relative left-0 hover:underline hover:left-2 transition-all" key={ind}>
                <a href={item.url}>{item.title}</a>
              </li>
            )
          }
          else {
            return (
              <li
                className="p-1 cursor-pointer relative left-0 hover:underline hover:left-2 transition-all"
                key={ind}
                onClick={() => item.action && item.action()}>
                <div>{item.title}</div>
              </li>)
          }
        })
      }
    </ul>
  )
}