import { useContext } from "react";
import { Link } from "react-router-dom";
import { DiscussionContext } from "../context/DiscussionContext";
import "../styles/Home.css";

const Home = () => {
  const { discussions, loading, sortOrder, searchQuery, updateSortOrder, updateSearchQuery } = useContext(DiscussionContext);

  return (
    <div className="home-container">
      <h1 className="home-title">Forum</h1>

      <div className="filters">
        {/* Sorteringsdropdown */}
        <select className="sort-dropdown" onChange={(e) => updateSortOrder(e.target.value)} value={sortOrder}>
          <option value="newest">Nyaste först</option>
          <option value="oldest">Äldsta först</option>
        </select>

        {/* Sökfält */}
        <input
          type="text"
          className="search-input"
          placeholder="Sök diskussioner..."
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
        />
      </div>

      <Link to="/create" className="create-btn">Skapa ny diskussion</Link>

      {loading ? (
        <p>Laddar diskussioner...</p>
      ) : (
        <div className="discussion-list">
          {discussions.length === 0 ? (
            <p>Inga diskussioner hittades.</p>
          ) : (
            <ul>
              {discussions.map((d) => (
                <li key={d.id} className="discussion-item">
                  <Link to={`/discussion/${d.id}`}>{d.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;