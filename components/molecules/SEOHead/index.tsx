import Head from 'next/head';

type MetaSEO = {
  description: string;
  type: string;
  url: string;
  image: string;
};

type SEOHeadProps = {
  title: string;
  meta: MetaSEO;
};

const SEOHead = ({ title, meta }: SEOHeadProps) => (
  <Head key="SEOHead">
    <title>{title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:type" content={meta.type} />
    <meta property="og:url" content={meta.url} />
    <meta property="og:image" content={meta.image} />
  </Head>
);

export default SEOHead;
