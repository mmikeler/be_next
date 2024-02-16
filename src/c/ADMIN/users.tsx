"use client"

import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";


export function ADMIN__Users(params: any) {
  const users = params.users;
  const list = users.map((user: any, ind: number) => {
    return <ADMIN__Table_User userData={user} key={ind} />
  })

  return (
    <div className="p-5">
      <div className="my-3 text-center">Пользователи</div>
      <table className="mx-auto text-xs table-auto">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Email</th>
            <th className="text-center">Name</th>
            <th className="text-center">Created</th>
            <th className="text-center">Role</th>
            <th className="text-center">YA_Disk</th>
            <th className="text-center">Sites</th>
            <th className="text-center">Forms</th>
            <th className="text-center">Payments</th>
            <th className="text-center">Points</th>
            <th className="text-center">Last Pay</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  )
}

function ADMIN__Table_User(params: any) {
  const user = params.userData

  return (
    <tr className="bg-gray-100 text-slate-700">
      <ADMIN__Table_User__Input user={user} type="number" name="id" />
      <ADMIN__Table_User__Input user={user} type="text" name="email" />
      <ADMIN__Table_User__Input user={user} type="text" name="name" />
      <ADMIN__Table_User__Input user={user} type="date" name="created" />
      <ADMIN__Table_User__Input user={user} type="text" name="role" />
      <ADMIN__Table_User__Input user={user} type="text" name="ya_disk" />
      <ADMIN__Table_User__Input user={user} type="text" name="sites" />
      <ADMIN__Table_User__Input user={user} type="text" name="forms" />
      <ADMIN__Table_User__Input user={user} type="text" name="payments" />
      <ADMIN__Table_User__Input user={user} type="number" name="points" />
      <ADMIN__Table_User__Input user={user} type="date" name="last_pay" />
    </tr>
  )
}

function ADMIN__Table_User__Input(params: any) {
  const { user, type, name } = params;
  const v = user[name];

  const changeKey = async (e: any) => {
    const toastID = toast.loading('Пожалуйста, подождите...');
    try {
      axios.post('/api/user', {
        id: user.id,
        options: {
          [e.target.name]: type === 'number' ? Number(e.target.value) : e.target.value
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
          toast.update(toastID, {
            render: error || 'Ошибка',
            type: 'error',
            isLoading: false,
            autoClose: 1000
          })
        })
    } catch (error: any) {
      toast.update(toastID, {
        render: 'Ошибка',
        type: 'error',
        isLoading: false,
        autoClose: 1000
      })
    }
  }

  const value = () => {

    if (type === 'date') {
      return v ? moment(v).format('YYYY-MM-DD') : v;
    }

    if (name.match(/sites|forms|payments/)) {
      return user._count.sites;
    }

    return user[name] ? user[name].toString() : '-';
  }

  if (params.name.match(/id|created|role|sites|forms|payments|last_pay/)) {
    return (
      <td className="text-center p-2 border">
        {value()}
      </td>
    )
  }
  else {
    return (
      <td className="text-center p-2 border">
        <input
          onBlur={changeKey}
          name={name}
          className="bg-white p-1 w-fit text-center"
          type="text"
          defaultValue={value()} />
      </td>
    )
  }
}