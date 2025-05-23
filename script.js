class NewsApp {
    constructor() {
        this.currentCategory = 'all';
        this.displayedNews = [];
        this.allNews = [];
        this.newsPerPage = 6;
        this.currentPage = 1;
        
        this.init();
    }

    init() {
        this.generateRealisticNewsData();
        this.setupEventListeners();
        this.renderNews();
        this.updateLastUpdated();
        this.showDataDisclaimer();
    }

    generateRealisticNewsData() {
        this.allNews = [
            {
                id: 1,
                category: 'breaking',
                title: 'OpenAI Launches GPT-4 Turbo with Enhanced Capabilities',
                summary: 'The new model features improved reasoning, longer context windows, and reduced costs for developers building AI applications.',
                timeAgo: '2 hours ago',
                source: 'TechCrunch',
                url: 'https://techcrunch.com/2024/11/06/openai-launches-gpt-4-turbo-enhanced-capabilities',
                imageAlt: 'OpenAI logo and AI visualization',
                featured: true,
                readTime: '4 min read'
            },
            {
                id: 2,
                category: 'politics',
                title: 'Climate Summit 2024: Nations Commit to Ambitious Carbon Reduction Targets',
                summary: 'COP29 conference concludes with unprecedented agreements on renewable energy transition and climate finance.',
                timeAgo: '4 hours ago',
                source: 'Reuters',
                url: 'https://www.reuters.com/sustainability/climate/climate-summit-2024-nations-commit-carbon-reduction-2024-11-06',
                imageAlt: 'Climate summit meeting hall',
                featured: true,
                readTime: '6 min read'
            },
            {
                id: 3,
                category: 'technology',
                title: 'Microsoft Announces Major AI Integration Across Office Suite',
                summary: 'Copilot AI assistant now available in Word, Excel, and PowerPoint with advanced document generation capabilities.',
                timeAgo: '6 hours ago',
                source: 'The Verge',
                url: 'https://www.theverge.com/2024/11/6/microsoft-office-copilot-ai-integration-announcement',
                imageAlt: 'Microsoft Office applications with AI icons',
                readTime: '3 min read'
            },
            {
                id: 4,
                category: 'business',
                title: 'Tesla Stock Surges Following Record Q4 Delivery Numbers',
                summary: 'Electric vehicle manufacturer reports 40% increase in deliveries compared to previous quarter, beating analyst expectations.',
                timeAgo: '8 hours ago',
                source: 'Bloomberg',
                url: 'https://www.bloomberg.com/news/articles/2024-11-06/tesla-stock-surges-record-q4-delivery-numbers',
                imageAlt: 'Tesla vehicles at delivery center',
                readTime: '5 min read'
            },
            {
                id: 5,
                category: 'sports',
                title: 'FIFA World Cup 2026 Venue Selection Finalized',
                summary: 'Joint hosting by USA, Canada, and Mexico confirmed with 16 cities selected for the expanded 48-team tournament.',
                timeAgo: '10 hours ago',
                source: 'ESPN',
                url: 'https://www.espn.com/soccer/story/fifa-world-cup-2026-venue-selection-finalized',
                imageAlt: 'FIFA World Cup trophy and stadium',
                readTime: '4 min read'
            },
            {
                id: 6,
                category: 'technology',
                title: 'Apple Vision Pro Gets Major Software Update with New Features',
                summary: 'VisionOS 2.0 introduces improved hand tracking, new productivity apps, and enhanced spatial computing capabilities.',
                timeAgo: '12 hours ago',
                source: 'MacRumors',
                url: 'https://www.macrumors.com/2024/11/06/apple-vision-pro-visionos-2-0-update',
                imageAlt: 'Apple Vision Pro headset',
                readTime: '3 min read'
            },
            {
                id: 7,
                category: 'breaking',
                title: 'Major Breakthrough in Quantum Computing Achieved by Google',
                summary: 'Researchers demonstrate quantum advantage in practical applications, marking significant milestone in computing evolution.',
                timeAgo: '14 hours ago',
                source: 'Nature',
                url: 'https://www.nature.com/articles/google-quantum-computing-breakthrough-2024',
                imageAlt: 'Quantum computer components',
                readTime: '7 min read'
            },
            {
                id: 8,
                category: 'business',
                title: 'Amazon Announces Expansion of Same-Day Delivery to 100 New Cities',
                summary: 'E-commerce giant continues logistics investment with AI-powered delivery optimization and drone technology.',
                timeAgo: '16 hours ago',
                source: 'Wall Street Journal',
                url: 'https://www.wsj.com/articles/amazon-same-day-delivery-expansion-100-cities',
                imageAlt: 'Amazon delivery truck and drone',
                readTime: '4 min read'
            },
            {
                id: 9,
                category: 'politics',
                title: 'EU Passes Comprehensive AI Regulation Act',
                summary: 'European Parliament approves landmark legislation setting global standards for artificial intelligence development and deployment.',
                timeAgo: '18 hours ago',
                source: 'BBC News',
                url: 'https://www.bbc.com/news/technology/eu-ai-regulation-act-passed-2024',
                imageAlt: 'European Parliament building',
                readTime: '5 min read'
            },
            {
                id: 10,
                category: 'sports',
                title: 'NBA Season Tips Off with Record-Breaking Viewership',
                summary: 'Opening night games draw largest television audience in league history, driven by international star power and new broadcast deals.',
                timeAgo: '20 hours ago',
                source: 'Sports Illustrated',
                url: 'https://www.si.com/nba/2024/11/05/season-tipoff-record-viewership',
                imageAlt: 'NBA basketball court with players',
                readTime: '3 min read'
            },
            {
                id: 11,
                category: 'technology',
                title: 'Meta Unveils Next-Generation AR Glasses Prototype',
                summary: 'Mark Zuckerberg demonstrates lightweight augmented reality glasses with full-day battery life and neural interface controls.',
                timeAgo: '22 hours ago',
                source: 'Ars Technica',
                url: 'https://arstechnica.com/gadgets/2024/11/05/meta-ar-glasses-prototype-neural-interface',
                imageAlt: 'Meta AR glasses prototype',
                readTime: '6 min read'
            },
            {
                id: 12,
                category: 'business',
                title: 'Renewable Energy Investment Reaches $2 Trillion Milestone',
                summary: 'Global clean energy spending accelerates as solar and wind projects become more cost-effective than fossil fuels.',
                timeAgo: '1 day ago',
                source: 'Financial Times',
                url: 'https://www.ft.com/content/renewable-energy-investment-2-trillion-milestone',
                imageAlt: 'Solar panels and wind turbines',
                readTime: '5 min read'
            }
        ];
    }

    showDataDisclaimer() {
        const disclaimer = document.createElement('div');
        disclaimer.className = 'data-disclaimer';
        disclaimer.innerHTML = `
            <div class="disclaimer-content">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Demo Notice:</strong> This application demonstrates realistic news integration structure. 
                    URLs and content are examples for demonstration purposes. 
                    <a href="#" id="learnMoreBtn">Learn about real implementation</a>
                </div>
                <button id="dismissDisclaimer" class="dismiss-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(disclaimer);
        
        document.getElementById('dismissDisclaimer').addEventListener('click', () => {
            disclaimer.remove();
        });
        
        document.getElementById('learnMoreBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showImplementationInfo();
        });
    }

    showImplementationInfo() {
        const modal = document.createElement('div');
        modal.className = 'info-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-code"></i> Real News Integration Guide</h3>
                    <button id="closeModal" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <h4>To implement with real news data:</h4>
                    <ul>
                        <li><strong>News APIs:</strong> Integrate with NewsAPI, Guardian API, or Reuters API</li>
                        <li><strong>Real URLs:</strong> Fetch actual article URLs from news sources</li>
                        <li><strong>Live Updates:</strong> Implement WebSocket connections for real-time news</li>
                        <li><strong>Images:</strong> Use article thumbnail URLs from news providers</li>
                        <li><strong>Search:</strong> Connect to news search engines for dynamic content</li>
                    </ul>
                    <h4>Recommended APIs:</h4>
                    <div class="api-list">
                        <span class="api-tag">NewsAPI.org</span>
                        <span class="api-tag">Guardian Open Platform</span>
                        <span class="api-tag">Reuters Connect</span>
                        <span class="api-tag">Associated Press API</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closeModal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    setupEventListeners() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.currentPage = 1;
                this.renderNews();
            });
        });

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchNews(e.target.value);
        });

        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.currentPage++;
            this.renderNews(true);
        });
    }

    filterNews() {
        if (this.currentCategory === 'all') {
            return this.allNews;
        }
        return this.allNews.filter(news => news.category === this.currentCategory);
    }

    searchNews(query) {
        if (!query.trim()) {
            this.renderNews();
            return;
        }

        const filteredNews = this.allNews.filter(news => 
            news.title.toLowerCase().includes(query.toLowerCase()) ||
            news.summary.toLowerCase().includes(query.toLowerCase()) ||
            news.source.toLowerCase().includes(query.toLowerCase())
        );

        this.renderFilteredNews(filteredNews);
    }

    renderFilteredNews(newsArray) {
        const newsGrid = document.getElementById('newsGrid');
        newsGrid.innerHTML = '';

        if (newsArray.length === 0) {
            newsGrid.innerHTML = '<div class="no-results">No articles found matching your search.</div>';
            document.getElementById('loadMoreBtn').style.display = 'none';
            return;
        }

        newsArray.forEach(news => {
            const newsCard = this.createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });

        document.getElementById('loadMoreBtn').style.display = 'none';
    }

    renderNews(append = false) {
        const filteredNews = this.filterNews();
        const newsToShow = filteredNews.slice(0, this.currentPage * this.newsPerPage);
        
        const newsGrid = document.getElementById('newsGrid');
        
        if (!append) {
            newsGrid.innerHTML = '';
        }

        const startIndex = append ? (this.currentPage - 1) * this.newsPerPage : 0;
        const newsSlice = newsToShow.slice(startIndex);

        newsSlice.forEach(news => {
            const newsCard = this.createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });

        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (newsToShow.length >= filteredNews.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    createNewsCard(news) {
        const card = document.createElement('div');
        card.className = `news-card ${news.featured ? 'featured' : ''}`;

        card.innerHTML = `
            <div class="news-image">
                <div class="image-placeholder">
                    <i class="fas fa-image"></i>
                    <span>Image: ${news.imageAlt}</span>
                </div>
            </div>
            <div class="news-content">
                <span class="category-tag ${news.category}">${news.category}</span>
                <h2 class="news-title">${news.title}</h2>
                <p class="news-summary">${news.summary}</p>
                <div class="news-meta">
                    <div class="news-time">
                        <i class="fas fa-clock"></i>
                        <span>${news.timeAgo}</span>
                        <span class="read-time">• ${news.readTime}</span>
                    </div>
                    <span class="news-source">${news.source}</span>
                </div>
                <div class="news-actions">
                    <a href="${news.url}" target="_blank" rel="noopener noreferrer" class="read-article-btn">
                        <i class="fas fa-external-link-alt"></i>
                        Read Full Article
                    </a>
                    <button class="share-btn" data-news-id="${news.id}">
                        <i class="fas fa-share-alt"></i>
                        Share
                    </button>
                </div>
            </div>
        `;

        const shareBtn = card.querySelector('.share-btn');
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.shareArticle(news);
        });

        return card;
    }

    shareArticle(news) {
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: news.summary,
                url: news.url
            });
        } else {
            navigator.clipboard.writeText(`${news.title}\n${news.url}`).then(() => {
                this.showToast('Article link copied to clipboard!');
            });
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
        
        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
        }, 60000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NewsApp();
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const observeNewsCards = () => {
        document.querySelectorAll('.news-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    };

    setTimeout(observeNewsCards, 100);

    const originalRenderNews = NewsApp.prototype.renderNews;
    NewsApp.prototype.renderNews = function(...args) {
        originalRenderNews.apply(this, args);
        setTimeout(observeNewsCards, 100);
    };
});