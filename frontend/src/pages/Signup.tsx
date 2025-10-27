import AuthForm from "@/components/AuthForm";
import { registerUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.success) {
        Swal.fire("Thành công !", data.message, "success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        Swal.fire("Thất bại !", data.message, "error");
      }
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      Swal.fire(
        "Thất bại !",
        error.message || "Đăng nhập thất bại. Vui lòng thử lại!",
        "error"
      );
    },
  });

  const handleSignup = (data: { email: string; password: string }) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <div className="w-8 h-4 border-4 border-yellow-400 border-b-0 rounded-t-full"></div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Đăng ký
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Tạo tài khoản mới để bắt đầu
        </p>

        <AuthForm
          onSubmit={handleSignup}
          buttonText="Đăng ký"
          isLoading={registerMutation.isPending}
        />

        <div className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <button
            className="text-yellow-600 font-medium hover:underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
