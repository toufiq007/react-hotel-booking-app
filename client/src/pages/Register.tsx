import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Error from "../components/Error";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  //   console.log(errors);
  return (
    <div>
      <form action="" className="flex flex-col gap-5 px-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create An Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              type="text"
              placeholder="enter first name"
              className="border w-full rounded py-1 px-2 font-normal"
              {...register("firstName", {
                required: "This field is required!!",
              })}
            />
            {errors.firstName && (
              <Error message={errors.firstName?.message as string} />
            )}
          </label>
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              type="text"
              placeholder="enter last name"
              className="border w-full rounded py-1 px-2 font-normal"
              {...register("lastName", {
                required: "This field is required!!",
              })}
            />
            {errors.lastName && (
              <Error message={errors.lastName.message as string} />
            )}
          </label>
        </div>
        <div>
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              placeholder="enter email"
              className="border w-full rounded py-1 px-2 font-normal"
              {...register("email", {
                required: "This field is required!!",
              })}
            />
            {errors.email && <Error message={errors.email.message as string} />}
          </label>
        </div>
        <div>
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
            Password
            <input
              type="password"
              placeholder="enter password"
              className="border w-full rounded py-1 px-2 font-normal"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be greater than 6 character",
                },
              })}
            />
            {errors.password && (
              <Error message={errors.password.message as string} />
            )}
          </label>
        </div>
        <div>
          <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input
              type="password"
              placeholder="enter password"
              className="border w-full rounded py-1 px-2 font-normal"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required!!";
                  } else if (watch("password") !== val){
                     return "Password do not matched"
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <Error message={errors.confirmPassword.message as string} />
            )}
          </label>
        </div>
        <span className="flex justify-between">
          <p>
            Already sign in{" "}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="bg-blue-600 p-2 border rounded-md text-white hover:bg-blue-800"
          >
            Create Account
          </button>
        </span>
      </form>
    </div>
  );
};

export default Register;
