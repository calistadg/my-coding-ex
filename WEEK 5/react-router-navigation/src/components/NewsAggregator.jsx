import { useEffect, useState } from "react";

function NewsAggregator() {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [source, setSource] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const mediastackKey = import.meta.env.VITE_MEDIASTACK_KEY;
    const nytKey = import.meta.env.VITE_NYT_KEY;

    useEffect(() => {
        async function fetchNews() {
            try {
                setLoading(true);
                setError("");

                // =============================
                // 1. CHECK CACHE
                // =============================

                const cachedNews = localStorage.getItem("newsCache");

                if (cachedNews) {
                    const cache = JSON.parse(cachedNews);

                    // Cache for 5 minutes
                    if (Date.now() - cache.time < 5 * 60 * 1000) {
                        setArticles(cache.articles);
                        setLoading(false);
                        return;
                    }
                }

                // =============================
                // 2. FETCH MEDIASTACK
                // =============================

                const mediaResponse = await fetch(
                    `https://api.mediastack.com/v1/news?access_key=${mediastackKey}&languages=en&limit=10`
                );

                // =============================
                // 3. FETCH NEW YORK TIMES
                // =============================

                const nytResponse = await fetch(
                    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&sort=newest&api-key=${nytKey}`
                );

                // =============================
                // 4. RATE LIMIT CHECK
                // =============================

                if (
                    mediaResponse.status === 429 ||
                    nytResponse.status === 429
                ) {
                    throw new Error(
                        "API rate limit reached. Please try again later."
                    );
                }

                // Other API errors
                if (!mediaResponse.ok || !nytResponse.ok) {
                    throw new Error(
                        "Unable to retrieve news from the APIs."
                    );
                }

                const mediaData = await mediaResponse.json();
                const nytData = await nytResponse.json();

                // =============================
                // 5. MEDIASTACK FORMAT
                // =============================

                const mediaArticles = mediaData.data.map((article) => ({
                    id: `media-${article.url}`,
                    title: article.title,
                    description: article.description || "",
                    source: "Mediastack",
                    url: article.url,
                    date: article.published_at,
                }));

                // =============================
                // 6. NYT FORMAT
                // =============================

                const nytArticles = nytData.response.docs.map((article) => ({
                    id: `nyt-${article._id}`,
                    title: article.headline.main,
                    description:
                        article.abstract ||
                        article.snippet ||
                        "",
                    source: "New York Times",
                    url: article.web_url,
                    date: article.pub_date,
                }));

                // =============================
                // 7. COMBINE BOTH APIs
                // =============================

                const allArticles = [
                    ...mediaArticles,
                    ...nytArticles,
                ];

                setArticles(allArticles);

                // =============================
                // 8. SAVE CACHE
                // =============================

                localStorage.setItem(
                    "newsCache",
                    JSON.stringify({
                        time: Date.now(),
                        articles: allArticles,
                    })
                );

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, [mediastackKey, nytKey]);

    // =============================
    // 9. SEARCH + FILTER
    // =============================

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            article.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            article.description
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesSource =
            source === "All" ||
            article.source === source;

        return matchesSearch && matchesSource;
    });

    // =============================
    // 10. DISPLAY
    // =============================

    return (
        <div>
            <h2>Latest News</h2>

            {/* Search */}
            <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Filter */}
            <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
            >
                <option value="All">
                    All Sources
                </option>

                <option value="Mediastack">
                    Mediastack
                </option>

                <option value="New York Times">
                    New York Times
                </option>
            </select>

            {/* Loading */}
            {loading && <p>Loading news...</p>}

            {/* Error */}
            {error && <p>{error}</p>}

            {/* Articles */}
            {!loading && !error && (
                <ul>
                    {filteredArticles.map((article) => (
                        <li key={article.id}>
                            <h3>{article.title}</h3>

                            <p>
                                Source: {article.source}
                            </p>

                            <p>
                                {article.description}
                            </p>

                            <a
                                href={article.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Read Article
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NewsAggregator;