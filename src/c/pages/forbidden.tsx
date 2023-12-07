import { Icon } from "../ui/icon";
import LoginBtn from "../ui/login-btn";


export function Forbidden__Page() {
  return (
    <div className="w-[360px] h-[100dvh] mx-auto bg-white border flex">
      <div className="m-auto text-center">
        <Icon className="text-[100px] text-red-700" tag="lock" />
        <div className="text-center text-lg">
          Вы не авторизованы!
        </div>
        <div className="border mt-10 w-fit mx-auto rounded p-5 bg-gray-100 cursor-pointer">
          <LoginBtn />
        </div>
      </div>
    </div>
  );
}