"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import HeaderNav from "@/components/headerNav";
import FooterNav from "@/components/footerNav";
import { Provider } from "react-redux";
import AlertMessage from "@/components/AlertMessage";
import store from "./store";
import LoadingComponent from "@/components/LoadingComponent";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Baemin",
//   description: "Generated by create next app",
// };

const RootLayout: React.FC = ({ children }: any) => {
  return (
    <html>
      <Provider store={store}>
        <body className="w-full h-full">
          <LoadingComponent />
          <HeaderNav />
          <AlertMessage />
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </Provider>
    </html>
  );
};
export default RootLayout;
