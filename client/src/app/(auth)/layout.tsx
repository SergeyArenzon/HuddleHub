'use client';
import isAuth from "@/utils/isAuth";


function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('AuthLayout');
  
  return children
   
}
// export default isAuth(AuthLayout);
export default AuthLayout;