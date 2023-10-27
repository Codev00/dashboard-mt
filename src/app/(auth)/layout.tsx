import "../globals.css";
import { ToastContainer } from "react-toastify";

export default function SignInLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <section>
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
         />
         <div>{children}</div>
      </section>
   );
}
