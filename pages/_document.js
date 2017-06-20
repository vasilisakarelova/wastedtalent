import Document, { Head, Main, NextScript } from 'next/document'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import { injectGlobal } from 'styled-components'

injectGlobal`
	html {
		width: 100%;
		height: 100%;
	}

	body {
    font-family: 'Apercu';
		margin: 0;
	}

	.main-container {
		position: relative;
		display: flex;
	}

	.section {
		position: relative;
		display: block;
		width: 100vw;
		padding: 1em;
		font-family: 'Neutral BP';

		@media screen and (min-width: 800px) {
			display: inline-block;
			width: 25vw;
		}
	}
`;

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage()
    const styles = (
      <style dangerouslySetInnerHTML={{ __html: styleSheet.rules().map(rule => rule.cssText).join('\n') }} />
    )
    return { ...page, styles }
  }

  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <body>
          <injectGlobal>
            <Main />
            <NextScript />
          </injectGlobal>
        </body>
      </html>
    )
  }
}
