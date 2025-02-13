// Sidebar

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { RiMoonClearLine, RiHomeHeartLine, RiArrowDropDownLine, RiMenu2Fill } from 'react-icons/ri';
import { ImBlog } from 'react-icons/im';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { CiLocationOn } from 'react-icons/ci';
import { LuMailPlus } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [showEmailToast, setShowEmailToast] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  const copyEmail = (event: React.MouseEvent) => {
    navigator.clipboard.writeText('lunayang025@gmail.com');
    // 获取鼠标位置
    setTooltipPosition({
      x: event.clientX + 10, // 向右偏移10px
      y: event.clientY - 30  // 向上偏移30px
    });
    setShowEmailToast(true);
    setTimeout(() => setShowEmailToast(false), 2000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 添加关闭菜单的处理函数
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="sidebar-wrapper">
      {/* 修改 sidebar-container 的类名 */}
      <div className={`sidebar-container ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {showEmailToast && (
          <div 
            className="email-toast" 
            style={{
              position: 'fixed',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
          >
            <span>{t('alert.email_copied')}</span>
          </div>
        )}
        {/* 头像 */}
        <div className="text-center nav-head">
          <div className="avatar mb-3">
            <img
              src="/avatar.png"
              alt="Avatar"
              className="img-fluid rounded-circle"
              style={{ width: '120px', height: '120px'}}
            />
          </div>
          {/* 姓名 */}
          <p className="mb-2">{t('name')}</p>

          <div className="nav-profile-slogan">
                {t('about.slogan')}
          </div>

          <div className="nav-profile-location">
                <CiLocationOn className="nav-profile-location-icon" />
                {t('about.contact.location')}
          </div>
          
          {/* 社媒 */}
          <div className="d-flex justify-content-center gap-1 mb-4">
            <a 
              href="https://www.linkedin.com/in/rujie-yang-7a5868268/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              <FaLinkedin className="nav-icon-s" style={{ color: "#0092ca"}} />
            </a>
            <a 
              href="https://github.com/luna25y" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              <FaGithub className="nav-icon-s" style={{ color: "#3e3636"}} />
            </a>
            <a 
              href="https://x.com/luna25y_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              <FaXTwitter className="nav-icon-s" style={{ color: "#000000"}} />
            </a>
            <button 
              onClick={copyEmail}
              className="nav-link border-0 bg-transparent"
              style={{ cursor: 'pointer' }}
            >
              <LuMailPlus className="nav-icon-s" style={{ color: "#226089"}} />
            </button>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="sidebar-nav">
          <ul className="nav flex-column">
            {/* 一级菜单 - 关于 */}
            <li className="nav-item mb-2">
              <Link href="/" locale={router.locale} className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                <RiMoonClearLine className="nav-icon"/>
                {t('nav.about')}
              </Link>
            </li>
            {/* 一级菜单 - 项目 
            <li className="nav-item mb-2">
              <Link href="/projects" locale={router.locale} className={`nav-link ${router.pathname === '/projects' ? 'active' : ''}`}>
                <RiHomeHeartLine className='nav-icon'/>
                {t('nav.projects')}
              </Link>
            </li>
            */}
            {/* 一级菜单 - 博客 
            <li className="nav-item mb-2">
              <Link 
                href="/blog" 
                locale={router.locale} 
                className={`nav-link ${router.pathname.startsWith('/blog') ? 'active' : ''}`}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsBlogDropdownOpen(false);
                  }
                }}
              >
                <div className="nav-link-content">
                  <ImBlog className='nav-icon'/>
                  <span>{t('nav.blog')}</span>
                </div>
                <RiArrowDropDownLine 
                  className={`dropdown-icon ${isBlogDropdownOpen ? 'open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsBlogDropdownOpen(!isBlogDropdownOpen);
                  }}
                />
              </Link>
                
              {isBlogDropdownOpen && (
                <div className="nav-dropdown-menu">
                  <Link 
                    href="/blog/codeMind" 
                    className={`dropdown-item ${router.pathname === '/blog/codeMind' ? 'active' : ''}`}
                  >
                  <span>{t('blog.codeMind')}</span>
                  </Link>

                  <Link 
                    href="/blog/flowFortune" 
                    className={`dropdown-item ${router.pathname === '/blog/flowFortune' ? 'active' : ''}`}
                  >
                  <span>{t('blog.flowFortune')}</span>
                  </Link>
                    
                  <Link 
                    href="/blog/wanderWonder" 
                    className={`dropdown-item ${router.pathname === '/blog/wanderWonder' ? 'active' : ''}`}
                  >
                  <span>{t('blog.wanderWonder')}</span>
                  </Link>
                </div>
              )}
            </li>
            */}

            {/* 一级菜单 - 友链 */}
            <li className="nav-item mb-2">
              <Link href="/friends" locale={router.locale} className={`nav-link ${router.pathname === '/friends' ? 'active' : ''}`}>
                <LiaUserFriendsSolid className='nav-icon'/>
                {t('nav.friends')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* 添加遮罩层 */}
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu} />
      )}

      {/* 移动端悬浮按钮 */}
      <div className="mobile-float-button">
        <button onClick={toggleMobileMenu} className="mobile-menu-toggle">
          <img
            src="/avatar.png"
            alt="Avatar"
            className="mobile-avatar"
          />
          <span className="mobile-name">{t('name')}</span>
          {isMobileMenuOpen ? (
            <IoMdClose className="mobile-menu-icon" />
          ) : (
            <RiMenu2Fill className="mobile-menu-icon" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
