import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const authSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const AuthForm = ({
  onSubmit,
  buttonText,
}: {
  onSubmit: any;
  buttonText: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <div onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 bg-blue-50 border-blue-100"
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {String(errors.email.message)}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Mật khẩu
        </Label>
        <div className="relative mt-1">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="bg-blue-50 border-blue-100 pr-10"
            placeholder="••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {String(errors.password.message)}
          </p>
        )}
      </div>

      <Button
        type="button"
        onClick={handleFormSubmit}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-6 rounded-lg"
      >
        {buttonText}
      </Button>
    </div>
  );
};
export default AuthForm;
