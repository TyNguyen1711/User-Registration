import AuthForm from "@/components/AuthForm";
import { loginUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        Swal.fire("Thành công !", data.message, "success");
      } else {
        Swal.fire("Thất bại !", data.message, "error");
      }
      if (data.user) {
        setUser(data.user);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    },
    onError: (error: Error) => {
      console.log("Login error:", error);
      Swal.fire(
        "Thất bại !",
        error.message || "Đăng nhập thất bại. Vui lòng thử lại!",
        "error"
      );
    },
  });
  const handleLogin = (data: { email: string; password: string }) => {
    loginMutation.mutate(data);
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
          Đăng nhập
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Nhập thông tin để tiếp tục khám phá
        </p>

        <AuthForm
          onSubmit={handleLogin}
          buttonText="Đăng nhập"
          isLoading={loginMutation.isPending}
        />

        <div className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <button
            className="text-yellow-600 font-medium hover:underline"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
