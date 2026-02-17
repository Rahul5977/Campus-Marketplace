import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import { validators } from "../../utils/validation.js";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  /**
   * Validate registration form
   */
  const validateForm = (values) => {
    const errors = {};

    const nameError = validators.name(values.name);
    if (nameError) errors.name = nameError;

    const usernameError = validators.username(values.username);
    if (usernameError) errors.username = usernameError;

    const emailError = validators.email(values.email);
    if (emailError) errors.email = emailError;

    const passwordError = validators.password(values.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validators.confirmPassword(
      values.password,
      values.confirmPassword
    );
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return errors;
  };

  /**
   * Handle registration submission
   */
  const handleRegister = async (values) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = values;
      await register(userData);

      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    handleRegister,
    validateForm
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">CM</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Registration Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                leftIcon={<User className="h-4 w-4" />}
                placeholder="John Doe"
                required
              />

              <Input
                label="Username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                error={errors.username}
                leftIcon={<User className="h-4 w-4" />}
                placeholder="johndoe"
                helperText="Letters, numbers, and underscores only"
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                leftIcon={<Mail className="h-4 w-4" />}
                placeholder="you@iitbhilai.ac.in"
                required
              />

              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer bg-transparent hover:bg-transparent border-0 p-1 focus:ring-0"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                }
                placeholder="enter password"
                helperText="Min. 8 characters with uppercase, lowercase, number, and special character"
                required
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                leftIcon={<Lock className="h-4 w-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer bg-transparent hover:bg-transparent border-0 p-1 focus:ring-0"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    )}
                  </button>
                }
                placeholder="enter password"
                required
              />
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-800 font-medium">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-600">
              By signing up, you agree to our{" "}
              <Link
                to="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
