'use client';

import React from 'react';
import Image from 'next/image';
import { blogPosts } from '@/data/blogs';
import { ArrowRight, Calendar } from 'lucide-react';

export const NewsBlogsSection: React.FC = () => {
  return (
    <section id="blogs" className="news-section">
      <div className="container">
        {/* Title Box */}
        <div className="title-box centered">
          <div className="subtitle">
            <span>recent blogs</span>
          </div>
          <div className="pattern-image">
            <Image 
              src="/images/icons/separator.svg" 
              alt="Separator" 
              width={120} 
              height={24} 
            />
          </div>
          <h2>Our News &amp; Blogs</h2>
        </div>

        {/* 3 Blog Blocks */}
        <div className="news-grid">
          {blogPosts.map((blog) => (
            <div key={blog.id} className="news-block">
              <div className="inner-box">
                <div className="image-box">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    width={400} 
                    height={240} 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="over-content">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <span className="cat">{blog.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} />
                      {blog.date}
                    </span>
                  </div>
                  <h4>
                    <a href="#reserve">{blog.title}</a>
                  </h4>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.5' }}>
                    {blog.excerpt}
                  </p>
                  <a
                    href="#reserve"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: '#075B35',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
