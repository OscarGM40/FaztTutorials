import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { Alert } from "./Alert";

const RegisterFormik = () => {

  const navigate = useNavigate()
  const { signup } = useAuth()

  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      await signup(values.email, values.password);
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  };

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
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label htmlFor="email" className="mt-4 block text-gray-700  font-bold my-2">Email</label>
            <Field type="email" name="email" id="email" placeholder="Enter your email" className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-400" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password" className="mt-4 block text-gray-700 font-bold my-2">Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="*********" 
              className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
              />
            <ErrorMessage name="password" component="div" />

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-base py-2 px-4 rounded focus:outline-none focus:shadow-slate-500 block my-4">Register Through Formik</button>
          
            <Link to="/login" className="text-slate-700 text-lg bg-slate-300 p-2 rounded border focus:outline-none focus:shadow-md ">Already have an account?</Link>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterFormik