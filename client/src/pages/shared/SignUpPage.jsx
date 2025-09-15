

// import { useState } from "react";
// import { axiosInstance } from "../../config/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     role: "user", 
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false); // 👈 password visibility state

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // 👇 mobile and password max length restriction
//     if (name === "mobile" && value.length > 10) return;
//     if (name === "password" && value.length > 6) return;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.mobile) {
//       newErrors.mobile = "Phone number is required";
//     } else if (formData.mobile.length < 10) {
//       newErrors.mobile = "Phone number must be 10 digits";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be exactly 6 characters";
//     } else if (formData.password.length > 6) {
//       newErrors.password = "Password must be exactly 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axiosInstance.post("/user/signup", formData);
//       if (response.data.success) {
//         setMessage("Signup successful!");
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           mobile: "",
//           role: "user",
//         });
//         setTimeout(() => {
//           navigate("/home"); 
//         }, 1000);
//       } else {
//         setMessage(response.data.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       if (error.response?.data?.message === "user already exist") {
//         setMessage("User already exists. Please login instead.");
//       } else {
//         setMessage("An error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Start ordering your favorite food today
//           </p>
//         </div>

//         {message && (
//           <div
//             className={`p-4 rounded-md ${
//               message.includes("success")
//                 ? "bg-green-50 text-green-800"
//                 : "bg-red-50 text-red-800"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`mt-1 appearance-none block w-full px-3 py-2 border ${
//                   errors.name ? "border-red-500" : "border-gray-300"
//                 } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                 placeholder="Name"
//                 disabled={loading}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`mt-1 appearance-none block w-full px-3 py-2 border ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                 placeholder="you@example.com"
//                 disabled={loading}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="mobile"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone Number
//               </label>
//               <input
//                 id="mobile"
//                 name="mobile"
//                 type="tel"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 className={`mt-1 appearance-none block w-full px-3 py-2 border ${
//                   errors.mobile ? "border-red-500" : "border-gray-300"
//                 } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                 placeholder="1234567890"
//                 disabled={loading}
//               />
//               {errors.mobile && (
//                 <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"} // 👈 toggle show/hide
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`mt-1 appearance-none block w-full px-3 py-2 border ${
//                     errors.password ? "border-red-500" : "border-gray-300"
//                   } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                   placeholder="Exactly 6 characters"
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             <input type="hidden" name="role" value="user" />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
              
//                 </>
//               ) : (
//                 "Sign up"
//               )}
//             </button>
//           </div>
//         </form>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <a
//               href="/login"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Log in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length > 10) return;
    if (name === "password" && value.length > 6) return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Phone number is required";
    } else if (formData.mobile.length < 10) {
      newErrors.mobile = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length !== 6) {
      newErrors.password = "Password must be exactly 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axiosInstance.post("/user/signup", formData);
      console.log("Signup Response:", response.data); // 👈 Debug

      if (response.data.success) {
        setMessage("Signup successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
          role: "user",
        });

        navigate("/home"); // 👈 direct navigation
      } else {
        setMessage(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message === "user already exist") {
        setMessage("User already exists. Please login instead.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start ordering your favorite food today
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md ${
              message.includes("success")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm sm:text-sm`}
                placeholder="Name"
                disabled={loading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm sm:text-sm`}
                placeholder="you@example.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm sm:text-sm`}
                placeholder="1234567890"
                disabled={loading}
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm sm:text-sm`}
                  placeholder="Exactly 6 characters"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <input type="hidden" name="role" value="user" />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
