// components/LoginForm.js

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();

  const initialValues = {
    username: "dummyuser",
    password: "password",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      const response = await axios.post("/api/login", values);
      console.log({ response });
      if (response.status === 200) {
        Cookies.set("authToken", response?.data?.token, { expires: 7 });
        resetForm();
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold">
              User name
            </label>
            <Field
              type="username"
              id="username"
              name="username"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Log In
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
