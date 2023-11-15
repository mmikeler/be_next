import Main__Header from "@/c/profile/main_header";
import { Pay__Form } from "@/c/profile/profile/client";

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