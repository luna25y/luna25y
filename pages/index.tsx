import React, { useState, useEffect }  from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import styles from '../styles/index.module.css';
import { CiLocationOn } from 'react-icons/ci';
import { FiDownload } from 'react-icons/fi';
import { GB, JP, CN } from 'country-flag-icons/react/3x2';
import { useRouter } from 'next/router';
import Head from 'next/head';

// 定义时间轴条目的接口
interface TimelineEntry {
  period: string;
  duration?: string;
  type?: string;
  title: string;
  institution?: string;
  location?: string;
  description?: string[];
  position?: string;
  skills?: string[];
  subEntries?: TimelineEntry[];
}

// 从 period 字符串中提取起始年月，匹配 "Month YYYY" 格式
const extractStartYearMonth = (period: string): string => {
  const match = period.match(/\b([A-Za-z]+ \d{4})\b/);
  return match ? match[0] : '';
};

// 从 period 字符串中提取结束年月，匹配 "Month YYYY" 格式
const extractEndYearMonth = (period: string): string => {
  const matches = period.match(/\b([A-Za-z]+ \d{4})\b/g); 
  // 如果没有匹配项或者只有一项，返回 "Now"
  if (!matches || matches.length === 1) {
    return 'Now';
  }
  return matches[matches.length - 1];
};

const About: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [expandedSkills, setExpandedSkills] = useState<{ 
    [key: string]: boolean  // 改用字符串键以支持子条目
  }>({});

  // 添加默认显示标签数量的常量
  const DEFAULT_VISIBLE_TAGS = 4;

  // 添加一个检查是否为移动端的状态
  const [isMobile, setIsMobile] = useState(false);

  // 添加检测屏幕宽度的效果
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // 初始检查
    checkMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
    
    // 清理监听器
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const changeLanguage = (lng: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      email, 
      message, 
    };

    // 发送邮件
    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Message sent, thank you!');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error - sending message:', error);
      alert('There was a problem, please try again later');
    }
  };

  // 修改切换函数以支持子条目
  const toggleSkills = (mainIndex: number, subIndex?: number) => {
    const key = subIndex !== undefined ? `${mainIndex}-${subIndex}` : `${mainIndex}`;
    setExpandedSkills(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 从语言包中读取时间轴数据
  const timeline = (t('about.timeline.entries', { returnObjects: true }) as unknown) as TimelineEntry[];

  return (
      <div className={styles.container}>

        {/* profile card */}
        <div className={styles.profileCard}>
          <div className={styles.profileContent}>
            <div className={styles.profileText}>
              <h2 className={styles.profileTitle}>{t('about.text')}</h2>
              <p className={styles.profileDescription}>{t('about.myDescription')}
              </p>
            </div>
            <div className={styles.profileActions}>
      <a 
          href="/files/Rujie Yang (Luna).pdf" 
          download
          className={styles.downloadButton}
      >
          <FiDownload className={styles.downloadIcon} />
          {t('about.downloadResume')}
      </a>
      {/*
      <button 
          className={styles.contactButton}
          onClick={() => setShowContactForm(true)}
      >
          {t('about.sendMessage')}
      </button>
      */}
          </div>

          </div>
        </div>

        {/* 联系表单模态框 */}
        {showContactForm && (
          <div className={styles.modalOverlay}>
            <div className={styles.contactModal}>
              <h3>{t('about.contactForm.title')}</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setShowContactForm(false)}
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>{t('about.contactForm.email')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t('about.contactForm.message')}</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  {t('about.contactForm.send')}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 语言切换器 */}
        <div className="language-switcher-container">
          <button
            className={`language-btn ${router.locale === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            <GB className="flag-icon" />
            <span>{t('language.english')}</span>
          </button>
          <button
            className={`language-btn ${router.locale === 'zh' ? 'active' : ''}`}
            onClick={() => changeLanguage('zh')}
          >
            <CN className="flag-icon" />
            <span>{t('language.chinese')}</span>
          </button>
          <button
            className={`language-btn ${router.locale === 'ja' ? 'active' : ''}`}
            onClick={() => changeLanguage('ja')}
          >
            <JP className="flag-icon" />
            <span>{t('language.japanese')}</span>
          </button>
        </div>

        {/* 下方时间轴（保持不变） */}
        <div className={styles.timeline}>
          {/* 全局竖线，放在 marker 和卡片之间 */}
          <div className={styles.verticalLine} />
          {timeline.map((entry, index) => {
            const startYear = extractStartYearMonth(entry.period);
            const endYear = extractEndYearMonth(entry.period);
            // 根据 type 属性决定卡片背景样式
            const cardClass = [
              styles.card,
              entry.type?.toLowerCase() === 'education' ? styles.education :
              entry.type?.toLowerCase() === 'work' ? styles.work :
              styles.otherExperience
            ].filter(Boolean).join(' ');
            
            return (
              <div key={index} className={styles.timelineItem}>
                {/* Marker 列：显示开始和结束时间 */}
                <div className={styles.markerColumn}>
                  <div className={styles.endMarker}>{endYear}</div>
                  <div className={styles.startMarker}>{startYear}</div>
                </div>
                {/* 经历卡片 */}
                <div className={styles.cardColumn}>
                  <div className={cardClass}>  
                    {/* 右上角经验分类标签 */}
                    <div className={styles.cardLabel}>
                      {entry.type?.toLowerCase() === 'education'
                        ? 'Education'
                        : entry.type?.toLowerCase() === 'work'
                        ? 'Professional Experience'
                        : 'Other Experience'}
                    </div>
                    {entry.duration && (
                      <div className={styles.cardDuration}>
                        {t('about.duration', 'Duration')}: {entry.duration}
                      </div>
                    )}
                    {entry.institution && (
                      <div className={styles.cardInstitution}>{entry.institution}</div>
                    )}
                    {entry.position && (
                      <div className={styles.cardPosition}>{entry.position}</div>
                    )}
                    {entry.location && (
                      <div className={styles.cardLocation}>
                        <CiLocationOn className={styles.locationIcon} />
                        {entry.location}
                      </div>
                    )}
                    {entry.description && entry.description.length > 0 && (
                      <div className={styles.cardDescription}>
                        {entry.description.map((desc, idx) => (
                          <span key={idx}>
                            {desc} <br/>
                          </span>
                        ))}
                      </div>
                    )}
                    {/* 主条目的技能标签 */}
                    {entry.skills && entry.skills.length > 0 && (
                      <div className={styles.skillsContainer}>
                        {entry.skills
                          .slice(0, isMobile && !expandedSkills[`${index}`] ? DEFAULT_VISIBLE_TAGS : undefined)
                          .map((skill, idx) => (
                            <span key={idx} className={styles.skillTag}>
                              {skill}
                            </span>
                        ))}
                        {isMobile && entry.skills.length > DEFAULT_VISIBLE_TAGS && (
                          <button 
                            className={styles.expandSkillsButton}
                            onClick={() => toggleSkills(index)}
                          >
                            {expandedSkills[`${index}`] ? 
                              t('about.skills.showLess') : 
                              t('about.skills.showMore', { count: entry.skills.length - DEFAULT_VISIBLE_TAGS })}
                          </button>
                        )}
                      </div>
                    )}
                    {entry.subEntries && entry.subEntries.length > 0 && (
                      <div className={styles.subEntries}>
                        {entry.subEntries.map((subEntry, subIndex) => (
                          <div key={subIndex} className={styles.subEntry}>
                            <span className={styles.cardPeriod}>{subEntry.period}</span>
                            <h3 className={styles.cardSubTitle}>{subEntry.title}</h3>
                            {subEntry.institution && (
                              <div className={styles.cardInstitution}>{subEntry.institution}</div>
                            )}
                            {subEntry.location && (
                              <div className={styles.cardLocation}>
                                <CiLocationOn className={styles.locationIcon} />
                                {subEntry.location}
                              </div>
                            )}
                            {subEntry.description && subEntry.description.length > 0 && (
                              <div className={styles.cardDescription}>
                                {subEntry.description.map((desc, idx) => (
                                  <span key={idx}>
                                    {desc} <br/>
                                  </span>
                                ))}
                              </div>
                            )}
                            {/* 子条目的技能标签 */}
                            {subEntry.skills && subEntry.skills.length > 0 && (
                              <div className={styles.skillsContainer}>
                                {subEntry.skills
                                  .slice(0, isMobile && !expandedSkills[`${index}-${subIndex}`] ? DEFAULT_VISIBLE_TAGS : undefined)
                                  .map((skill, sidx) => (
                                    <span key={sidx} className={styles.skillTag}>
                                      {skill}
                                    </span>
                                  ))}
                                {isMobile && subEntry.skills.length > DEFAULT_VISIBLE_TAGS && (
                                  <button 
                                    className={styles.expandSkillsButton}
                                    onClick={() => toggleSkills(index, subIndex)}
                                  >
                                    {expandedSkills[`${index}-${subIndex}`] ? 
                                      t('about.skills.showLess') : 
                                      t('about.skills.showMore', { count: subEntry.skills.length - DEFAULT_VISIBLE_TAGS })}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default About;
