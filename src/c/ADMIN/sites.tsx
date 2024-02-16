"use client"

import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";


export function ADMIN__Pages(params: any) {
  const sites = params.sites;
  const list = sites.map((site: any, ind: number) => {
    return <ADMIN__Table_Page data={site} key={ind} />
  })

  return (
    <div className="p-5">
      <div className="my-3 text-center">Страницы</div>
      <table className="mx-auto text-xs table-auto">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Title</th>
            <th className="text-center">Slug</th>
            <th className="text-center">Open</th>
            <th className="text-center">Author</th>
            <th className="text-center">Master</th>
            {/* <th className="text-center">Content</th> */}
            <th className="text-center">Created</th>
            <th className="text-center">Expired</th>
            <th className="text-center">Views</th>
            <th className="text-center">Likes</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  )
}

function ADMIN__Table_Page(params: any) {
  const page = params.data

  return (
    <tr className="bg-gray-100 text-slate-700">
      <ADMIN__Table_User__Input page={page} type="number" name="id" />
      <ADMIN__Table_User__Input page={page} type="text" name="title" />
      <ADMIN__Table_User__Input page={page} type="text" name="slug" />
      <ADMIN__Table_User__Input page={page} type="string" name="published" />
      <ADMIN__Table_User__Input page={page} type="text" name="authorId" />
      <ADMIN__Table_User__Input page={page} type="text" name="masterId" />
      {/* <ADMIN__Table_User__Input page={page} type="text" name="content" /> */}
      <ADMIN__Table_User__Input page={page} type="date" name="created" />
      <ADMIN__Table_User__Input page={page} type="date" name="expired" />
      <ADMIN__Table_User__Input page={page} type="number" name="views" />
      <ADMIN__Table_User__Input page={page} type="number" name="likes" />
    </tr>
  )
}

function ADMIN__Table_User__Input(params: any) {
  const { page, type, name } = params;
  const v = page[name];

  if (v === null) {
    return (
      <td className="text-center p-2 border">-</td>
    )
  }

  const value = () => {

    if (type === 'date') {
      return v ? moment(v).format('DD.MM.YYYY h:mm') : v;
    }

    return page[name].toString();
  }

  const changeKey = async (e: any) => {
    const toastID = toast.loading('Пожалуйста, подождите...');
    axios.patch('/api/minisites', {
      id: page.id,
      options: {
        [e.target.name]: name.match(/points/) ? Number(e.target.value) : e.target.value
      }
    }).then(res => {
      res?.data?.error ?
        toast.update(toastID, {
          render: res.data?.errorMessage || 'Ошибка',
          type: 'error',
          isLoading: false,
          autoClose: 1000
        })
        :
        toast.update(toastID, {
          render: 'Данные обновлены',
          type: 'success',
          isLoading: false,
          autoClose: 1000
        });
    })
      .catch(error => {
        toast.error(error.message);
      })
  }

  if (name.match(/title|slug|master/)) {
    return (
      <td className="text-center p-2 border">
        <input
          onBlur={changeKey}
          name={name}
          className="bg-white p-1 w-fit text-center"
          type={type}
          defaultValue={value()} />
      </td>
    )
  }
  else {
    return (
      <td className="text-center p-2 border">
        {value()}
      </td>
    )
  }
}