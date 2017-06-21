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
		display: block;
		height: 100vh;
		width: auto;

		@media screen and (min-width: 800px) {
			display: flex;
			overflow-y: hidden;
			overflow-x: scroll;
		}
	}

	.section {
		font-family: 'Neutral BP';
    display: block;
    width: 100vw;
    padding: 0;
    margin: 0;
    overflow: auto;
    height: auto;
    position: relative;

		@media screen and (min-width: 800px) {
			display: table-cell;
			width: 25vw;
			min-width: 16em;
			height: 100%;
			overflow: hidden;
		}
	}

	.section-track {
		height: 100%;
    display: block;
    padding: 0;
    overflow: scroll;
    position: relative;
	}

	.content {
		padding: 1em;
	}

	.title {
		margin: 0;
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
