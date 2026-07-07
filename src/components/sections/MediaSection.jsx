import React, { useState, useEffect } from 'react';
import './MediaSection.css';

const FALLBACK_YOUTUBE = [
  {
    id: "550IwuUkNas",
    title: "Least Squares Explained: How Gauss Found Ceres (Official Blues-Metal)",
    viewsText: "9 views",
    url: "https://www.youtube.com/watch?v=550IwuUkNas",
    thumbnail: "https://i.ytimg.com/vi/550IwuUkNas/hqdefault.jpg"
  },
  {
    id: "TYNfjfAtjaQ",
    title: "Correlation & Deviation Explained: Galton's Legacy (Official Rock)",
    viewsText: "3 views",
    url: "https://www.youtube.com/watch?v=TYNfjfAtjaQ",
    thumbnail: "https://i.ytimg.com/vi/TYNfjfAtjaQ/hqdefault.jpg"
  },
  {
    id: "LI4Oh8Bt0lE",
    title: "Machine Minds Ignite – The Evolution of AI (Official Cyber-Metal / Rap-Metal)",
    viewsText: "15 views",
    url: "https://www.youtube.com/shorts/LI4Oh8Bt0lE",
    thumbnail: "https://i.ytimg.com/vi/LI4Oh8Bt0lE/hqdefault.jpg"
  }
];

const FALLBACK_NEWSLETTER = [
  {
    title: "Algorhythm Chronicles: Issue #2 – The Weight of Everything",
    link: "https://www.linkedin.com/pulse/algorhythm-chronicles-issue-2-weight-everything-rishav-saigal-cag5f",
    date: "July 2026"
  },
  {
    title: "The Boy Who Found a Star in the Noise",
    link: "https://www.linkedin.com/pulse/boy-who-found-star-noise-rishav-saigal-qpgbf",
    date: "July 2026"
  },
  {
    title: "The $1.5 Million Difference: Why Benchmarks are Only 10% of the AI Agent Story",
    link: "https://www.linkedin.com/pulse/15-million-difference-why-benchmarks-only-10-ai-agent-rishav-saigal-ao4jc",
    date: "March 2026"
  }
];

const MediaSection = () => {
  const [youtubeVideos, setYoutubeVideos] = useState(FALLBACK_YOUTUBE);
  const [youtubeLoading, setYoutubeLoading] = useState(true);
  const [newsletterArticles, setNewsletterArticles] = useState(FALLBACK_NEWSLETTER);
  const [newsletterLoading, setNewsletterLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch YouTube Videos
    const fetchYouTube = async () => {
      try {
        const channelId = "UCh2FmsvvhBsu8L0HsJgh9-A";
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}&t=${Date.now()}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}&_=${Date.now()}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("YouTube fetch failed");
        
        const data = await response.json();
        const xmlText = data.contents;
        if (!xmlText) throw new Error("Empty YouTube XML contents");

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const entries = xmlDoc.getElementsByTagName("entry");
        const list = [];

        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const title = entry.getElementsByTagName("title")[0]?.textContent || "";
          const linkNode = entry.getElementsByTagName("link")[0];
          const url = linkNode ? linkNode.getAttribute("href") : "";
          
          let videoId = "";
          const videoIdNode = entry.getElementsByTagName("yt:videoId")[0] || entry.getElementsByTagName("videoId")[0];
          if (videoIdNode) {
            videoId = videoIdNode.textContent;
          } else {
            const urlMatch = url.match(/[?&]v=([^&#]+)/);
            if (urlMatch) videoId = urlMatch[1];
          }
          
          let viewsCount = 0;
          let viewsText = "0 views";
          const mediaGroup = entry.getElementsByTagName("media:group")[0] || entry.getElementsByTagName("group")[0];
          if (mediaGroup) {
            const community = mediaGroup.getElementsByTagName("media:community")[0] || mediaGroup.getElementsByTagName("community")[0];
            if (community) {
              const stats = community.getElementsByTagName("media:statistics")[0] || community.getElementsByTagName("statistics")[0];
              if (stats) {
                const views = stats.attribs ? stats.attribs.views : (stats.getAttribute("views") || "0");
                viewsCount = parseInt(views, 10) || 0;
                viewsText = `${viewsCount.toLocaleString()} views`;
              }
            }
          }
          
          if (title && url) {
            list.push({
              id: videoId,
              title: title.replace(/&amp;/g, '&'),
              viewsText: viewsText,
              viewsCount: viewsCount,
              url: url,
              thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
            });
          }
        }

        if (list.length > 0) {
          // Sort by viewsCount descending for "most viewed"
          const sorted = list.sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5);
          setYoutubeVideos(sorted);
        }
      } catch (err) {
        console.warn("YouTube real-time fetch failed, utilizing fallback data:", err);
      } finally {
        setYoutubeLoading(false);
      }
    };

    // 2. Fetch LinkedIn Newsletter Articles
    const fetchLinkedIn = async () => {
      const targetUrl = "https://www.linkedin.com/newsletters/algorhythm-chronicles-7480002909695438848/";
      
      const proxies = [
        (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url + '?t=' + Date.now())}&_=${Date.now()}`,
        (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url + '?t=' + Date.now())}`
      ];

      for (let i = 0; i < proxies.length; i++) {
        try {
          const proxyUrl = proxies[i](targetUrl);
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error(`Proxy ${i} returned status ${response.status}`);
          
          let htmlText = "";
          if (proxyUrl.includes("allorigins")) {
            const data = await response.json();
            htmlText = data.contents;
          } else {
            htmlText = await response.text();
          }

          if (!htmlText) throw new Error(`Empty response from proxy ${i}`);

          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, "text/html");
          const list = [];
          const seenUrls = new Set();
          
          const titleLinks = doc.querySelectorAll('.share-article__title-link, .base-card--link, a[href*="/pulse/"]');
          titleLinks.forEach(linkNode => {
            let url = linkNode.getAttribute('href') || '';
            if (url.includes('?')) {
              url = url.split('?')[0];
            }
            if (url.startsWith('http') && url.includes('/pulse/') && !seenUrls.has(url)) {
              seenUrls.add(url);
              
              let title = linkNode.textContent.trim().replace(/\s+/g, ' ');
              
              let date = "Latest Issue";
              const parentText = linkNode.parentElement?.textContent || '';
              const dateMatch = parentText.match(/\b\d+\s+(?:day|week|month|year)s?\s+ago\b/i);
              if (dateMatch) {
                date = dateMatch[0];
              }
              
              if (title && !title.includes('LinkedIn') && title.length > 5) {
                list.push({
                  title: title.replace(/&amp;/g, '&'),
                  link: url,
                  date
                });
              }
            }
          });

          if (list.length > 0) {
            setNewsletterArticles(list.slice(0, 5));
            setNewsletterLoading(false);
            return; // Success! Exit early.
          }
        } catch (err) {
          console.warn(`LinkedIn fetch via proxy ${i} failed:`, err);
        }
      }

      // If all proxies fail, load fallback data
      setNewsletterLoading(false);
    };

    fetchYouTube();
    fetchLinkedIn();
  }, []);

  return (
    <section id="media" className="media-section">
      <div className="media-container">
        <h2 className="section-title">Digital Channels</h2>
        <p className="section-subtitle">Real-time updates, tutorials, and mathematical narratives.</p>
        
        <div className="media-grid">
          {/* LinkedIn Card */}
          <div 
            className="media-card linkedin"
            onClick={() => window.open('https://www.linkedin.com/newsletters/algorhythm-chronicles-7480002909695438848/', '_blank', 'noopener,noreferrer')}
            role="button"
            tabIndex={0}
          >
            <div className="card-header">
              <div className="platform-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a66c2">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div>
                <span className="platform-name">LinkedIn Newsletter</span>
                <h3>Algorhythm Chronicles</h3>
              </div>
            </div>
            
            <p className="card-motto">
              "Algorhythm Chronicles: Discover the human stories behind data science, from historical mathematics to AI, told through original music."
            </p>
            
            <div className="media-list-container" onClick={(e) => e.stopPropagation()}>
              <div className="list-title">Latest Issues</div>
              
              {newsletterLoading ? (
                <div className="media-loading">
                  <div className="media-loading-spinner"></div>
                  <span>Scanning articles...</span>
                </div>
              ) : (
                <div className="media-list">
                  {newsletterArticles.map((art, idx) => (
                    <a 
                      key={idx}
                      href={art.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="media-item-row"
                    >
                      <div className="item-main">
                        <span className="item-title">{art.title}</span>
                        <span className="item-meta">{art.date}</span>
                      </div>
                      <span className="item-badge">Read</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            <button className="card-cta-btn">
              Subscribe on LinkedIn &rarr;
            </button>
          </div>

          {/* YouTube Card */}
          <div 
            className="media-card youtube"
            onClick={() => window.open('https://www.youtube.com/@rishavsaigal1996', '_blank', 'noopener,noreferrer')}
            role="button"
            tabIndex={0}
          >
            <div className="card-header">
              <div className="platform-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff0000">
                  <path d="M23.498 6.163c-.272-1.016-1.071-1.819-2.085-2.093-1.838-.493-9.213-.493-9.213-.493s-7.375 0-9.213.493c-1.014.274-1.813 1.077-2.085 2.093-.491 1.842-.491 5.688-.491 5.688s0 3.846.491 5.688c.272 1.016 1.071 1.819 2.085 2.093 1.838.493 9.213.493 9.213.493s7.375 0 9.213-.493c1.014-.274 1.813-1.077 2.085-2.093.491-1.842.491-5.688.491-5.688s0-3.846-.491-5.688zm-13.498 9.505v-7.336l6.388 3.668-6.388 3.668z"/>
                </svg>
              </div>
              <div>
                <span className="platform-name">YouTube Channel</span>
                <h3>Algorhythm Chronicles</h3>
              </div>
            </div>
            
            <p className="card-motto">
              "Algorhythm Chronicles: Discover the human stories behind data science, from historical mathematics to AI, told through original music."
            </p>
            
            <div className="media-list-container" onClick={(e) => e.stopPropagation()}>
              <div className="list-title">Most Viewed Videos</div>
              
              {youtubeLoading ? (
                <div className="media-loading">
                  <div className="media-loading-spinner"></div>
                  <span>Scanning channel...</span>
                </div>
              ) : (
                <div className="media-list">
                  {youtubeVideos.map((vid, idx) => (
                    <a 
                      key={idx}
                      href={vid.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="media-item-row"
                    >
                      <div className="item-main">
                        <span className="item-title">{vid.title}</span>
                        <span className="item-meta">{vid.viewsText}</span>
                      </div>
                      <span className="item-badge">Watch</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            <button className="card-cta-btn">
              Watch Videos on YouTube &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
