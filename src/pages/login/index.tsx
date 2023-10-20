// components/LoginForm.js

import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const initialValues = {
    username: "john_doe",
    password: "Abc132#",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required").min(5).max(20),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      const response = await axios.post("/api/login", values);
      if (response.status === 200) {
        localStorage.setItem("name", response?.data?.user?.name);
        Cookies.set("authToken", response?.data?.token, { expires: 7 });
        resetForm();
        router.push("/");
      }
    } catch (error: any) {
      console.log({ error });
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.error,
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col w-[90%] max-w-[400px]">
          <div className="mb-4 w-full">
            <Label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-3"
            >
              User name
            </Label>
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

          <div className="mb-4 w-full">
            <Label
              htmlFor="password"
              className="block text-gray-700 font-bold  mb-3"
            >
              Password:
            </Label>
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

          <div className="w-full">
            <Button
              type="submit"
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-600 w-full"
            >
              Log In
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
