import { CartContextProvider } from "@/components/CartContext";
import { AuthProvider } from "@/context/authContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={pageProps.session}>
        <AuthProvider>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  );
}
