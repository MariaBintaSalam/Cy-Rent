import { Outlet } from "react-router-dom";
import { NavMenu } from "./NavMenu";

export default function Main() {
  return (
    <div> <NavMenu/>
      <div className="mx-auto max-w-screen-xl mt-8">

        <Outlet/>
      </div>
      </div>
  )
}
