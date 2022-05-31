import Head from "next/head";
import Layout from "../components/layout/layout";
import {NotificationContextProvider} from "../store/notification-context";
import "../styles/globals.css";

function MyApp({Component, pageProps}) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
