import Dashboard from "@/src/c/profile/dashboard/dashboard";
import Main__Header from "@/src/c/profile/main_header";


export default function Profile__Page(props: any) {

  return (
    <>
      <Main__Header title={'Обзор'} />
      <Dashboard />
    </>
  )
}