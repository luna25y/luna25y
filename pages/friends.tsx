import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Head from 'next/head';

const Friends: React.FC = () => {
  const { t } = useTranslation('common');

  const handleCardClick_lanceMoe = () => {
    window.open("https://www.lance.moe/", "_blank", "noopener,noreferrer");
  };

  return (
      <Container className="my-4 d-flex justify-content-center">
        <Row className="mb-4">
          <Col>
            <Card 
              className="shadow-sm clickable-card friend-card" 
              onClick={handleCardClick_lanceMoe} 
              onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.96)"}
              onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              style={{ cursor: 'pointer', transition: 'transform 0.1s ease-in-out' }}
            >

              <Card.Body>
                <Row className="d-flex align-items-center">
                  {/* 左侧：头像 + 名字 */}
                  <Col xs={5} className="text-center">
                    <img
                      src="/avatar_lancemoe.png"
                      alt="Avatar"
                      className="img-fluid rounded-circle"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <div className="mt-2">{t('friends.lanceMoe.name')}</div>
                  </Col>

                  {/* 右侧：描述文字 */}
                  <Col xs={5} className="text-center">
                    <p className="mb-0">{t('friends.lanceMoe.info')}</p>
                  </Col>
                </Row>
              </Card.Body>

            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default Friends;

