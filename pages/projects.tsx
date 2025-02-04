import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Container, Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import { FaGithub, FaDownload, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Projects: React.FC = () => {
  const { t } = useTranslation('common');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <Container className="my-5">
      {/* 项目列表 */}
      <Row className="g-4">
        <Col xl={4} md={6}>
        {/* TapTune */}
          <Card 
            className="shadow-sm project-card h-100"
            onClick={() => setSelectedProject('taptune')}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Image
                  src="/images/taptune-icon.png"
                  alt="TapTune Icon"
                  width={64}
                  height={64}
                  className="rounded-2 mb-3"
                />
                <span className="text-muted">2023</span>
              </div>
              <div>
                <Card.Title className="mb-3">TapTune</Card.Title>
                <Badge bg="primary" className="me-2">macOS App</Badge>
                <Badge bg="info">Swift</Badge>
              </div>
              <Card.Text className="mt-3 text-secondary">
                {t('projects.taptune.short_desc')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 项目详情模态框 */}
      <Modal
        show={!!selectedProject}
        onHide={() => setSelectedProject(null)}
        centered
        size="lg"
        className="project-modal"
      >
        <Modal.Header className="border-0 position-relative p-0">
          <Button 
            variant="link" 
            className="position-absolute top-0 end-0 m-3 z-3"
            onClick={(e) => {
              e.stopPropagation();  // 阻止事件冒泡
              setSelectedProject(null);
            }}
            style={{ zIndex: 1050 }}  // 确保按钮在最上层
          >
            <FaTimes size={24} />
          </Button>
        </Modal.Header>
          
        <Modal.Body className="p-4">
          {selectedProject === 'taptune' && (
            <div className="project-detail">
              <div className="d-flex align-items-center gap-4 mb-4">
                <Image
                  src="/images/taptune-icon.png"
                  alt="TapTune Icon"
                  width={80}
                  height={80}
                  className="rounded-3"
                />
                <h2 className="mb-0">TapTune</h2>
              </div>
              
              {/* 技术标签 */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Badge pill bg="primary" className="px-3">Swift</Badge>
                <Badge pill bg="danger" className="px-3">macOS</Badge>
              </div>

              {/* 功能列表 */}
              <div className="row mb-4">
                <h5 className="mb-3">🚀 {t('projects.features')}</h5>
                <ul className="list-unstyled">
                  {Array.isArray(t('projects.taptune.features', { returnObjects: true })) 
                    ? (t('projects.taptune.features', { returnObjects: true }) as string[]).map(
                        (feature: string, index: number) => (
                          <li key={index} className="mb-2">
                            • {feature}
                          </li>
                        )
                      )
                    : null
                  }
                </ul>
              </div>

              {/* 下载与源码 */}
              <div className="border-top pt-4">
                <h5 className="mb-3">📦 {t('projects.download')}</h5>
                <div className="d-flex gap-3">
                  <Button variant="success" className="d-flex align-items-center gap-2">
                    <FaDownload /> {t('projects.mac_store')}
                  </Button>
                  <Button variant="dark" className="d-flex align-items-center gap-2">
                    <FaGithub /> {t('projects.source_code')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default Projects;