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

const MediaSection = () => {
  const [youtubeVideos, setYoutubeVideos] = useState(FALLBACK_YOUTUBE);
  const [youtubeLoading, setYoutubeLoading] = useState(true);
  const [activeWave, setActiveWave] = useState('idle'); // 'idle' | 'linkedin' | 'youtube'
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    // Fetch YouTube Videos via proxy chain
    const fetchYouTube = async () => {
      const channelId = "UCh2FmsvvhBsu8L0HsJgh9-A";
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}&t=${Date.now()}`;
      
      const proxies = [
        (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}&_=${Date.now()}`,
        (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
      ];

      for (let i = 0; i < proxies.length; i++) {
        try {
          const proxyUrl = proxies[i](rssUrl);
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error(`Proxy ${i} returned status ${response.status}`);
          
          let xmlText = "";
          if (proxyUrl.includes("allorigins")) {
            const data = await response.json();
            xmlText = data.contents;
          } else {
            xmlText = await response.text();
          }

          if (!xmlText) throw new Error(`Empty response from proxy ${i}`);

          // Use regex-based parsing instead of DOM-based to reliably handle
          // XML namespace prefixes (media:statistics, yt:videoId, etc.) which
          // getElementsByTagName handles inconsistently across browsers.
          const entryMatches = [...xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
          const list = [];

          for (const match of entryMatches) {
            const entryXml = match[1];

            // Title (strips CDATA if present)
            const titleMatch = entryXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
            const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').trim() : '';

            // Video ID from yt:videoId tag
            const videoIdMatch = entryXml.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/);
            const videoId = videoIdMatch ? videoIdMatch[1].trim() : '';

            // URL from link href
            const urlMatch = entryXml.match(/<link[^>]+href="([^"]+)"/);
            const url = urlMatch ? urlMatch[1] : (videoId ? `https://www.youtube.com/watch?v=${videoId}` : '');

            // View count from media:statistics views="N" — regex handles namespace prefix reliably
            const viewsMatch = entryXml.match(/media:statistics[^>]+views="(\d+)"/);
            const viewsCount = viewsMatch ? parseInt(viewsMatch[1], 10) : 0;
            const viewsText = `${viewsCount.toLocaleString()} views`;

            if (title && videoId) {
              list.push({
                id: videoId,
                title,
                viewsText,
                viewsCount,
                url,
                thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
              });
            }
          }

          if (list.length > 0) {
            // Sort by viewsCount descending so most-watched videos appear first
            const sorted = list.sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5);
            setYoutubeVideos(sorted);
            setYoutubeLoading(false);
            return; // Success — exit proxy loop early.
          }
        } catch (err) {
          console.warn(`YouTube fetch via proxy ${i} failed:`, err);
        }
      }

      setYoutubeLoading(false);
    };

    fetchYouTube();
  }, []);

  return (
    <section id="media" className="media-section">
      <div className="media-container">
        
        {/* Motto Centerpiece */}
        <div className="motto-container">
          <p className="motto-text">
            Algorhythm Chronicles: Discover the human stories behind data science, from historical mathematics to AI, told through original music.
          </p>
        </div>

        <div className="media-grid">
          {/* LinkedIn Subscribe Card */}
          <div 
            className="media-interactive-card linkedin"
            onMouseEnter={() => setActiveWave('linkedin')}
            onMouseLeave={() => setActiveWave('idle')}
            onClick={() => window.open('https://www.linkedin.com/newsletters/algorhythm-chronicles-7480002909695438848/', '_blank', 'noopener,noreferrer')}
            role="button"
            tabIndex={0}
          >
            <div className="media-header">
              <div className="media-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a66c2">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div>
                <span className="media-meta-tag">Newsletter</span>
                <h3>Algorhythm Chronicles</h3>
              </div>
            </div>
            
            <p className="subscribe-desc">
              Subscribe on LinkedIn to receive bi-weekly narratives uncovering the mathematical breakthroughs, historical characters, and core concepts of AI and machine learning, brought to life with original thematic soundtracks.
            </p>
            
            <button className="subscribe-cta-btn">
              Subscribe on LinkedIn &rarr;
            </button>
          </div>

          {/* YouTube Video List Card */}
          <div 
            className="media-interactive-card youtube"
            onMouseEnter={() => setActiveWave('youtube')}
            onMouseLeave={() => setActiveWave('idle')}
          >
            <div className="media-header">
              <div className="media-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff0000">
                  <path d="M23.498 6.163c-.272-1.016-1.071-1.819-2.085-2.093-1.838-.493-9.213-.493-9.213-.493s-7.375 0-9.213.493c-1.014.274-1.813 1.077-2.085 2.093-.491 1.842-.491 5.688-.491 5.688s0 3.846.491 5.688c.272 1.016 1.071 1.819 2.085 2.093 1.838.493 9.213.493 9.213.493s7.375 0 9.213-.493c1.014-.274 1.813-1.077 2.085-2.093.491-1.842.491-5.688.491-5.688s0-3.846-.491-5.688zm-13.498 9.505v-7.336l6.388 3.668-6.388 3.668z"/>
                </svg>
              </div>
              <div>
                <span className="media-meta-tag">YouTube Channel</span>
                <h3>Algorhythm Chronicles</h3>
              </div>
            </div>
            
            <div className="youtube-list-title">Featured Videos</div>
            
            {youtubeLoading ? (
              <div className="media-loading">
                <div className="media-loading-spinner"></div>
                <span>Syncing videos...</span>
              </div>
            ) : (
              <div className="youtube-videos-list">
                {youtubeVideos.map((vid, idx) => (
                  <div 
                    key={idx}
                    className="yt-video-row"
                    onClick={() => setSelectedVideoId(vid.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="video-info">
                      <span className="video-title">{vid.title}</span>
                      <span className="video-views">{vid.viewsText}</span>
                    </div>
                    <span className="play-badge">Play Video</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SVG Soundwave Visualizer */}
      <div className="waveform-section-divider">
        <svg className={`waveform-svg ${activeWave}`} viewBox="0 0 1440 120" preserveAspectRatio="none">
          {/* Main wave */}
          <path 
            className="wave-path wave-path-1" 
            d="M0,60 C180,10 360,110 540,60 C720,10 900,110 1080,60 C1260,10 1440,110 1620,60 C1800,10 1980,110 2160,60" 
          />
          {/* Layer 2 */}
          <path 
            className="wave-path wave-path-2" 
            d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 C1680,110 1920,10 2160,60" 
          />
          {/* Layer 3 */}
          <path 
            className="wave-path wave-path-3" 
            d="M0,60 C120,40 240,80 360,60 C480,40 600,80 720,60 C840,40 960,80 1080,60 C1200,40 1320,80 1440,60 C1560,40 1680,80 1800,60" 
          />
        </svg>
      </div>

      {/* Fullscreen Video Player Modal */}
      <div className={`theatre-modal ${selectedVideoId ? 'active' : ''}`} onClick={() => setSelectedVideoId(null)}>
        {selectedVideoId && (
          <div className="theatre-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-theatre-btn" onClick={() => setSelectedVideoId(null)}>
              <span>[ ESC_CLOSE ]</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <iframe 
              className="theatre-iframe"
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

    </section>
  );
};

export default MediaSection;
