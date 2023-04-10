import "../styles/globals.css";
// import "../styles/dashboard.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { useState } from "react";

function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionContextProvider>
    </Provider>
  );
}
export default App;
