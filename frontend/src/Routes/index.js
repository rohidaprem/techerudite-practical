import { Route, Routes } from "react-router-dom"
import AuthComponent from "../Modules/Auth"
import SignUpComponent from "../Modules/SignUp"
import VerifyAuthComponent from "../Modules/Auth/VerifyAuthComponent"
import SignInComponent from "../Modules/SignIn"


const RoutesIndex = () => {
    return (
        <Routes>
            <Route path={""} element={<AuthComponent />} exact={true} />
            <Route path={"/"} element={<AuthComponent />} exact={true} />
            <Route path={`/sign-up/:role`} element={<SignUpComponent />} exact={true} />
            <Route path={`/sign-in/:role`} element={<SignInComponent />} exact={true} />
            <Route path={`/verify-auth/:token`} element={<VerifyAuthComponent />} exact={true} />
        </Routes>
    )
}
export default RoutesIndex