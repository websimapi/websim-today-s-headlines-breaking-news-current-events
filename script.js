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
        this.generateNewsData();
        this.setupEventListeners();
        this.renderNews();
        this.updateLastUpdated();
    }

    generateNewsData() {
        const categories = ['breaking', 'politics', 'technology', 'sports', 'business'];
        const sources = ['Reuters', 'AP News', 'BBC', 'CNN', 'The Guardian', 'WSJ', 'Tech Crunch', 'ESPN'];
        
        const newsTemplates = [
            {
                category: 'breaking',
                title: 'Global Climate Summit Reaches Historic Agreement',
                summary: 'World leaders unite on unprecedented climate action plan with binding commitments for 2030.',
                timeAgo: '15 minutes ago'
            },
            {
                category: 'technology',
                title: 'AI Breakthrough: New Model Achieves Human-Level Reasoning',
                summary: 'Revolutionary artificial intelligence system demonstrates unprecedented problem-solving capabilities across multiple domains.',
                timeAgo: '1 hour ago'
            },
            {
                category: 'politics',
                title: 'International Trade Relations Show Signs of Improvement',
                summary: 'Diplomatic efforts yield positive results as major economies move toward reducing trade barriers.',
                timeAgo: '2 hours ago'
            },
            {
                category: 'business',
                title: 'Tech Stocks Rally as Market Confidence Returns',
                summary: 'Major technology companies see significant gains following positive earnings reports and innovation announcements.',
                timeAgo: '3 hours ago'
            },
            {
                category: 'sports',
                title: 'Winter Olympics Preparations Enter Final Phase',
                summary: 'Athletes from around the world prepare for upcoming winter games as venues undergo final testing.',
                timeAgo: '4 hours ago'
            },
            {
                category: 'technology',
                title: 'Renewable Energy Storage Reaches New Efficiency Record',
                summary: 'Breakthrough in battery technology promises to revolutionize clean energy storage capabilities.',
                timeAgo: '5 hours ago'
            },
            {
                category: 'politics',
                title: 'Healthcare Reform Bill Advances Through Legislature',
                summary: 'Bipartisan support emerges for comprehensive healthcare improvements affecting millions.',
                timeAgo: '6 hours ago'
            },
            {
                category: 'business',
                title: 'Cryptocurrency Market Stabilizes After Recent Volatility',
                summary: 'Digital currencies show renewed stability as regulatory frameworks become clearer worldwide.',
                timeAgo: '7 hours ago'
            },
            {
                category: 'breaking',
                title: 'Space Mission Successfully Reaches Mars Orbit',
                summary: 'International space collaboration achieves major milestone in Mars exploration program.',
                timeAgo: '8 hours ago'
            },
            {
                category: 'sports',
                title: 'Championship Series Enters Decisive Final Games',
                summary: 'Athletic competition reaches climax as teams battle for ultimate victory in thrilling finale.',
                timeAgo: '9 hours ago'
            },
            {
                category: 'technology',
                title: 'Quantum Computing Milestone Achieved by Research Team',
                summary: 'Scientists demonstrate practical quantum advantage in real-world problem solving.',
                timeAgo: '10 hours ago'
            },
            {
                category: 'business',
                title: 'Global Supply Chain Networks Show Resilience Recovery',
                summary: 'International trade flows normalize as logistics innovations improve efficiency.',
                timeAgo: '11 hours ago'
            }
        ];

        this.allNews = newsTemplates.map((template, index) => ({
            id: index + 1,
            ...template,
            source: sources[Math.floor(Math.random() * sources.length)],
            featured: index < 2 // First two articles are featured
        }));
    }

    setupEventListeners() {
        // Category navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.currentPage = 1;
                this.renderNews();
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchNews(e.target.value);
        });

        // Load more button
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.currentPage++;
            this.renderNews(true);
        });

        // News card clicks
        document.addEventListener('click', (e) => {
            const newsCard = e.target.closest('.news-card');
            if (newsCard) {
                this.openNewsDetail(newsCard.dataset.newsId);
            }
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
            news.summary.toLowerCase().includes(query.toLowerCase())
        );

        this.renderFilteredNews(filteredNews);
    }

    renderFilteredNews(newsArray) {
        const newsGrid = document.getElementById('newsGrid');
        newsGrid.innerHTML = '';

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

        // Show/hide load more button
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
        card.dataset.newsId = news.id;

        card.innerHTML = `
            <div class="news-image"></div>
            <div class="news-content">
                <span class="category-tag ${news.category}">${news.category}</span>
                <h2 class="news-title">${news.title}</h2>
                <p class="news-summary">${news.summary}</p>
                <div class="news-meta">
                    <div class="news-time">
                        <i class="fas fa-clock"></i>
                        <span>${news.timeAgo}</span>
                    </div>
                    <span class="news-source">${news.source}</span>
                </div>
            </div>
        `;

        return card;
    }

    openNewsDetail(newsId) {
        const news = this.allNews.find(n => n.id == newsId);
        if (news) {
            // Create a simple modal or alert for demo purposes
            alert(`Opening full article: "${news.title}"\n\nSource: ${news.source}\nCategory: ${news.category}\n\n${news.summary}\n\n[In a real app, this would open the full article]`);
        }
    }

    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
        
        // Update every minute
        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
        }, 60000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewsApp();
});

// Add some dynamic effects
document.addEventListener('DOMContentLoaded', () => {
    // Animate news cards on scroll
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

    // Observe news cards
    const observeNewsCards = () => {
        document.querySelectorAll('.news-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    };

    // Initial observation
    setTimeout(observeNewsCards, 100);

    // Re-observe when new content is added
    const originalRenderNews = NewsApp.prototype.renderNews;
    NewsApp.prototype.renderNews = function(...args) {
        originalRenderNews.apply(this, args);
        setTimeout(observeNewsCards, 100);
    };
});

