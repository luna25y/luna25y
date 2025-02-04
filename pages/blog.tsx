// Blog

import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const Blog: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('blog.heading')}</h1>
      <p>{t('blog.text')}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default Blog;
