import Main__Header from "@/c/profile/main_header";
import Minisites from "@/c/profile/minisites/minisites";

export default function MS(params: any) {

  return (
    <>
      <Main__Header title={'Ваши сайты'} />
      <Minisites />
    </>
  )
}