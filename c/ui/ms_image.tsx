import axios from "axios";
import { useEffect, useState } from "react";


export function MS_Image({ path, author }: { path: string, author: string }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ preview: '' });

  useEffect(() => {
    setLoading(true)
    try {
      axios.get(`/api/yadisk?path=${path}&author=${author}`)
        .then(result => {
          setImage(result.data || '');
          setLoading(false)
        })
    } catch (error) {
      //
    }

  }, [])

  return (
    <>
      <img src={image?.preview} alt="miniweb" />
    </>
  )
}