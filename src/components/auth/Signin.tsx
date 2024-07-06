import { useFormik } from "formik";
import * as Yup from "yup";

import Swal from "sweetalert2";
import useMutation from "../../hooks/useMutation.tsx";
import useAuth from "../../hooks/useAuth.tsx";
const Signin = () => {
  const { mutation } = useMutation();
  const { setUser } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await mutation("user/signin", {
          body: {
            email: values.email,
            password: values.password,
          },
        });
        console.log(response);
        setUser({ ...response?.results?.data?.user });

        localStorage.setItem("ACCESS_TOKEN", response?.results?.data?.token);
        if (response?.results?.success) {
          Swal.fire({
            icon: "success",
            title: "Successful",
            text: "You have successfully logged in",
          }).then(() => {
            window.location.href = "/dashboard";
          });
        }
        console.log("Hello", response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <section
        className="w-full bg-center bg-cover bg-no-repeat h-screen "
        style={{
          backgroundImage: `url('/img/login-bg.png')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="  bg-white border rounded-xl border-slate-300 w-full md:w-[40%] ld:w-[39%] py-10 px-5 md:px-5 lg:px-0">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-4 text-center text-lg font-semibold leading-9 tracking-tight text-black-600">
                Welcome! Nice to see you again
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email Address<span className="text-redTalent">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring--600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-redTalent">{formik.errors.email}</div>
                  ) : null}

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password<span className="text-redTalent">*</span>
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-redTalent">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-redTalent px-3 py-1.5 text-md font-semibold leading-6 text-red-500 shadow-sm hover:bg-white hover:border hover:border-redTalent hover:text-redTalent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
