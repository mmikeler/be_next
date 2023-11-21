"use client"

import axios from "axios";
import moment from "moment";


export function ADMIN__Users(params: any) {
  const users = params.users;
  const list = users.map((user: any, ind: number) => {
    return <ADMIN__Table_User userData={user} key={ind} />
  })

  return (
    <div className="p-5">
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
    <tr>
      <ADMIN__Table_User__Input id={user.id} name="id" value={user.id} />
      <ADMIN__Table_User__Input id={user.id} name="email" value={user.email} />
      <ADMIN__Table_User__Input id={user.id} name="name" value={user.name} />
      <ADMIN__Table_User__Input id={user.id} name="created" value={moment(user.created).format('DD.MM.yyyy hh:mm')} />
      <ADMIN__Table_User__Input id={user.id} name="role" value={user.role} />
      <ADMIN__Table_User__Input id={user.id} name="ya_disk" value={user.ya_disk} />
      <ADMIN__Table_User__Input id={user.id} name="points" value={user._count.sites} />
      <ADMIN__Table_User__Input id={user.id} name="site" value={user._count.forms} />
      <ADMIN__Table_User__Input id={user.id} name="form" value={user._count.payments} />
      <ADMIN__Table_User__Input id={user.id} name="payment" value={user.points} />
      <ADMIN__Table_User__Input id={user.id} name="last_pay" value={user.last_pay} />
    </tr>
  )
}

function ADMIN__Table_User__Input(params: any) {

  const changeKey = async (e: any) => {
    axios.post('/api/user', {
      id: params.id,
      options: {
        [e.target.name]: params.name.match(['points']) ? Number(e.target.value) : e.target.value
      }
    }).then(res => {
      console.log(res);
    })
  }

  return (
    <td className="text-center p-2 border">
      <input
        onBlur={changeKey}
        name={params.name}
        className="bg-slate-700 p-1 w-fit text-center"
        type="text"
        defaultValue={params.value} />
    </td>
  )
}