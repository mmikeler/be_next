import axios from "axios";
import { useEffect, useState } from "react";


export function MS_Image({ path }: { path: string }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLoading(true)
    try {
      axios.post('/api/yadisk', {
        options: {
          path: path
        }
      })
        .then(result => {
          setImage(result.data.res.sizes[0].url || '');
          setLoading(false)
        })
    } catch (error) {
      //
    }

  }, [])

  return (
    <img src={image} alt="miniweb" style={{ width: '100%' }} />
  )
}