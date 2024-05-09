document.addEventListener('DOMContentLoaded', () => {
    const sportBtn = document.getElementById('sport-btn');
    const scienceTechBtn = document.getElementById('science-tech-btn');
    const mainNewsBtn = document.getElementById('main-news-btn');
    const rssTitle = document.getElementById('rss-title');
    const articlesList = document.getElementById('articles-list');

    let currentRSS = 'https://www.irozhlas.cz/rss/irozhlas/section/sport';

    const fetchRSS = async (url) => {
        try {
            const response = await fetch(url);
            const xml = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            articlesList.innerHTML = '';

            items.forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                const description = item.querySelector('description').textContent;
                const imgSrc = item.querySelector('enclosure') ? item.querySelector('enclosure').getAttribute('url') : null;

                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="article">
                        ${imgSrc ? `<img src="${imgSrc}" alt="${title}" class="article-image">` : ''}
                        <div class="article-content">
                            <h2><a href="${link}" target="_blank">${title}</a></h2>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                articlesList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching RSS:', error);
        }
    };

    const updateRSS = () => {
        fetchRSS(currentRSS);
    };

    sportBtn.addEventListener('click', () => {
        currentRSS = 'https://www.irozhlas.cz/rss/irozhlas/section/sport';
        rssTitle.textContent = 'Články z RSS kanálu - Sport';
        updateRSS();
    });

    scienceTechBtn.addEventListener('click', () => {
        currentRSS = 'https://www.irozhlas.cz/rss/irozhlas/section/veda-technologie';
        rssTitle.textContent = 'Články z RSS kanálu - Věda a technologie';
        updateRSS();
    });

    mainNewsBtn.addEventListener('click', () => {
        currentRSS = 'https://ct24.ceskatelevize.cz/rss/tema/hlavni-zpravy-84313';
        rssTitle.textContent = 'Články z RSS kanálu - Hlavní zprávy';
        updateRSS();
    });

    // Načti výchozí kanál (Sport)
    updateRSS();

    // Aktualizuj články každých 5 minut
    setInterval(updateRSS, 5 * 60 * 1000);
});