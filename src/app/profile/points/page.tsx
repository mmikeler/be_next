import Main__Header from "@/src/c/profile/main_header";
import { Pay__Form } from "@/src/c/profile/points/pay_form";

export default function Points__Page(params: any) {
  return (
    <>
      <Main__Header title="Счёт" />
      <div className="w-11/12 mx-auto">
        <Pay__Form />
      </div>
    </>
  )
}