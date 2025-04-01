import Form from "../components/Form";

const Register = () => {
    return (
        <>
            <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Form inputNameShow={true} inputRepeatPassword={true} path="register"></Form>
            </main>

        </>
    );
}

export default Register;
