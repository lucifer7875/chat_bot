import createEmotionServer from "@emotion/server/create-instance";
import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";
import createEmotionCache from "./utils/createEmotionCache";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {

    return (
      <Html lang="en">
        <Head>
          {/* <meta name="theme-color" content="#000" /> */}
          <meta httpEquiv="X-Frame-Options" content="deny" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          {this.props.emotionStyleTags}

          <script
            id="smatbot-chatbot-script"
            src="https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.5.1/fingerprint2.min.js"
          ></script>
        </Head>
        <body>
          <script
            id="smatbot-chatbot-load"
            dangerouslySetInnerHTML={{
              __html: `var chatbot_id=11110;!function(){var t,e,a=document,s="smatbot-chatbot";a.getElementById(s)||(t=a.createElement("script"),t.id=s,t.type="text/javascript",t.src="https://smatbot.s3.amazonaws.com/files/smatbot_plugin.js.gz",e=a.getElementsByTagName("script")[0],e.parentNode.insertBefore(t,e))}()`,
            }}
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
