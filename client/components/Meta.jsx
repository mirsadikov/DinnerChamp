import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#F48E64" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'DinnerChamp',
  keywords: 'dinner, food, restaurants, pickup, delivery',
  description: 'Order online - pickup when ready',
};

export default Meta;
