import createEmotionServer from "@emotion/server/create-instance";
import Document, { Head, Html, Main, NextScript } from "next/document";
import createEmotionCache from "../utils/createEmotionCache";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta name="theme-color" content="#000" /> */}
          {/* <meta httpEquiv="X-Frame-Options" content="deny" /> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          {this.props.emotionStyleTags}


          <script
            id="smatbot-chatbot-script"
            src="https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.5.1/fingerprint2.min.js"
            async={true}
          ></script>

        </Head>
        <body>
          {/* <!-- Google tag (gtag.js) by DevIT --> */}
          {/* <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-M2GQ4M7S12"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M2GQ4M7S12');
            `}
          </Script> */}

          {/* <!-- Google tag (gtag.js) by GIFT team --> */}
          {/* <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-8V1HRF0MJN"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8V1HRF0MJN');
            `}
          </Script>*/}

          <script
            id="smatbot-chatbot-load"
            dangerouslySetInnerHTML={{
              __html: `var chatbot_id=11110;!function(){var t,e,a=document,s="smatbot-chatbot";a.getElementById(s)||(t=a.createElement("script"),t.id=s,t.type="text/javascript",t.src="https://smatbot.s3.amazonaws.com/files/smatbot_plugin.js.gz",e=a.getElementsByTagName("script")[0],e.parentNode.insertBefore(t,e))}()`,
            }}
            async={true}
          ></script>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const { pathname } = ctx;
  const isUserPath = pathname?.startsWith("/");
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
