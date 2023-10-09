import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuthPersist } from "../store/authPersist";
import { useEffect, useState } from "react";
import { message, notification } from "antd";

export const ProtectedRoute = ({ children }) => {
  const { data, isAuthenticated, onLoading, update, clear } = useAuthPersist();
  const [isLoading, setLoading] = useState(true);
  let location = useLocation();
  const currentDate = new Date();
  let expiredToken = data[0]?.credential?.data.exp * 1000 || ''
  const dateExpire = new Date(expiredToken);
  useEffect(() => {
    if (currentDate >= dateExpire) {
      setTimeout(() => {
        update(false);
        clear();
        message.info("Session telah berakhir silahkan login ulang")
        Navigate('/')
      }, 2000);
    }
    
  }, [data, dateExpire, currentDate]);
  
  if (isAuthenticated == false) {
    notification.warning({
      message: "Warning",
      description:
        "Anda tidak dapat ke halaman tersebut tanpa login terlebih dahulu.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      placement: 'topRight',
      duration: 2,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
