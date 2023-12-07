"use client"

import axios from "axios";
import { Icon } from "./icon";
import { useState } from "react";
import { useSession } from "next-auth/react"

export function Like({ page }) {
  const [likes, setLikes] = useState(page.likes);
  const { data: session } = useSession()

  const action = () => {
    axios.patch('/api/pages', {
      id: page.id,
      options: {
        likes: {
          increment: 1
        }
      }
    })
      .then(res => {
        if (session) {
          setLikes(likes + 1)
          res.data.result && alert('Ваше мнение учтено. Благодарю за интерес к проекту.')
        }
        else {
          alert('Сначала зарегистрируйтесь')
        }
      })
  }

  return (
    <div
      onClick={action}
      className="ms-3 flex items-center cursor-pointer hover:text-blue-500">
      <span className='me-1 h-5'>
        <Icon tag={'thumb_up'} />
      </span>
      <span>{likes}</span>
    </div>
  )
}