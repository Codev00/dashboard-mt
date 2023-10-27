import Sidebar from "@/components/Sidebar";
import "../globals.css";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <section className="flex w-full">
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
         />
         <Sidebar />
         <div className="bg-main w-full h-screen">{children}</div>
      </section>
   );
}
