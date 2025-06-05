'use client';
import isAuth from "@/utils/isAuth";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex justify-center py-10">
      {children}
    </div>
  )
}
// export default isAuth(AuthLayout);
export default AuthLayout;