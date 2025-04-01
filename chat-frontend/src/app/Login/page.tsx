'use client'
import Form from "../components/Form";
import { useUser } from "../components/user-provider";

const Login = () => {

    return (
        <>

            <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Form inputNameShow={false} inputRepeatPassword={false} path="login"></Form>
            </main>


        </>
    );
}

export default Login; 