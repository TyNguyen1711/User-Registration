import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Calendar, Mail } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log(199);
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysSinceJoined = (dateString: string): number => {
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTimeAgo = (dateString: string): string => {
    const days = getDaysSinceJoined(dateString);
    if (days === 0) return "Hôm nay";
    if (days === 1) return "1 ngày trước";
    if (days < 30) return `${days} ngày trước`;
    if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} tháng trước`;
    }
    const years = Math.floor(days / 365);
    return `${years} năm trước`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-slate-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Bảng điều khiển
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Quản lý tài khoản của bạn
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {/* Email Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold break-all">{user.email}</p>
            </CardContent>
          </Card>

          {/* Account Created Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Ngày tham gia</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {formatDate(user.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {getTimeAgo(user.createdAt)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Account Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Thông tin tài khoản</CardTitle>
            <CardDescription>Xem thông tin tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Địa chỉ Email
              </span>
              <span className="text-sm font-semibold">{user.email}</span>
            </div>
            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Tài khoản được tạo
              </span>
              <span className="text-sm font-semibold">
                {formatDate(user.createdAt)}
              </span>
            </div>
            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Trạng thái tài khoản
              </span>
              <Badge variant="default" className="bg-green-500">
                Đang hoạt động
              </Badge>
            </div>
            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Thành viên được
              </span>
              <span className="text-sm font-semibold">
                {getTimeAgo(user.createdAt)}
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default HomePage;
