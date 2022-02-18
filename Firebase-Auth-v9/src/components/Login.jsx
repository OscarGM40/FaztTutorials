
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Alert } from "./Alert";

const Login = () => {

  const navigate = useNavigate()
  const { login, loginWithGoogle, resetPassword } = useAuth()

  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    // console.log(values);

    try {
      await login(values.email, values.password);
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (formik) => {
    if (!formik.values.email) {
      return setError('Please enter your email for reseting password')
    }

    try {
      await resetPassword(formik.values.email);
      setError('Reset password email sent - please check your email')
    } catch (error) {
      setError(error.message);
    }

  }


  return (
    <div className="container mx-auto p-5">
      {error && <Alert message={error} />}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email('Invalid format').required('Email is required'),
          password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        })}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="text-black flex flex-col gap-4 w-1/2 bg-red-100 p-4 rounded-lg mx-auto mt-4">
            <label htmlFor="email"
              className="text-slate-700 text-lg">Email</label>
            <Field type="email" name="email" id="email" placeholder="Enter your email" className="outline-none border-2 p-1.5" />
            <ErrorMessage name="email" component="div" />

            <label
              htmlFor="password"
              className="text-slate-700 text-lg">Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="*********"
              className="outline-none border-2 p-1.5" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" className="py-1.5 w-2/3 mx-auto bg-slate-700 text-white text-lg px-1 rounded-lg shadow-md hover:bg-slate-900 transition duration-200">Sign In</button>

            <button className="py-1.5 w-2/3 mx-auto bg-red-500 text-black text-lg px-1 rounded-lg shadow-md hover:bg-red-700 transition duration-300" onClick={handleGoogleSignIn}>
              Sign In With Google
            </button>


            <a href="#!" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => handleResetPassword(formik)}
            >Forgot Password?</a>

            <Link to="/register" className="text-slate-700 text-lg hover:text-slate-900 bg-red-300 hover:bg-red-400 w-max mx-auto p-1 rounded-md transition ease-in-out duration-300">Don't have an account?</Link>
          </Form>

        )}
      </Formik>
    </div>
  )
}

export default Login