import Main__Header from "@/c/profile/main_header";
import { Person__Widget, YaDiskConnectionWidget } from "../../../c/profile/profile/client";

export default function Person__Page() {
  return (
    <div className="">
      <Main__Header title={'Профиль'} />

      <div className="w-11/12 mx-auto">
        <Person__Widget title="Яндекс.Диск" tag="cloud">
          <YaDiskConnectionWidget />
        </Person__Widget>
      </div>
    </div>
  )
}