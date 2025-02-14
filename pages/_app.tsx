import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  // 根据当前路径设置对应的标题
  const getTitle = () => {
    const path = router.pathname;
    if (path === '/') return 'luna';
    if (path === '/friends') return 'luna | Friends';
    return 'luna | Software Engineer';
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

// 正确配置 appWithTranslation
export default appWithTranslation(MyApp);

// 添加 getInitialProps
MyApp.getInitialProps = async ({ Component, ctx }: any) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
