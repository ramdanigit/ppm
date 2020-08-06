import { logout } from "service/authService";
import { useEffect } from "react";

function SignOut() {
  useEffect(() => {
    logout();

    window.location = "/";
  });
  return null;
}
export default SignOut;
