import axios from "axios";
import { useEffect, useState } from "react";


export function MS_Image({ path, author, className }: {
  path: string,
  author: string,
  className: string
}) {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

  useEffect(() => {
    try {
      axios.get(`/api/yadisk?path=${path}&author=${author}`)
        .then(result => {
          setImage(result.data || '');
        })
    } catch (error) {
      //
    }

  }, [])

  return (
    <>
      <img
        className={className + (!loading ? '' : 'hidden')}
        onLoad={() => setLoading(false)}
        rel="noreferrer"
        src={image} alt="miniweb" />

      {loading && <div className="w-full h-full bg-stone-300"></div>}
    </>
  )
}