import { Outlet, useNavigate } from "react-router-dom";
import NavList from "../components/NavList";
import SaleSidebar from "../components/SModule/SaleSidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Sale() {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if currentUser is not present, then redirect to "/"
    if (!currentUser || currentUser.Role !== 1) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.Role !== 1) {
    // If redirecting, return null or an empty div
    return null;
  }


  return (
    <div className="h-full w-full font-poppins flex">

      {currentUser && currentUser.Role == 1 ? (
        <div className="flex flex-col  w-full">
          <NavList />
          <div className="w-full flex font-poppins">
            <span className="hidden sm:block ">
              <SaleSidebar />
            </span>
            <div className="border-l-2 w-full mx-0 px-0 overflow-x-auto  ">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )
      }
    </div>
  );
}
