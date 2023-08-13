import { ProductRecommendationProvider } from '../Context/ProductRecommendationContext'
import Layout from '../Components/Layout/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ProductRecommendationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductRecommendationProvider>
  ) 
}

export default MyApp
