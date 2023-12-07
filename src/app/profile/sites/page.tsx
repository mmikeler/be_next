import Main__Header from "@/src/c/profile/main_header";
import Minisites from "@/src/c/profile/minisites/minisites";

export default function MS(params: any) {

  return (
    <>
      <Main__Header title={'Ваши сайты'} />
      <Minisites />
    </>
  )
}