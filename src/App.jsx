import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

/**
 * Returns an array of 10 elements for the star states:
 * "full", "half", or "empty" (handles decimal scores).
 */
function getStarStates(score) {
  const val = Math.max(0, Math.min(10, parseFloat(score) || 0));
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    if (val >= i) {
      stars.push("full");
    } else if (val >= i - 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return stars;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [sortedSuperheroes, setSortedSuperheroes] = useState([]);
  const [newSuperheroes, setNewSuperheroes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    superpower: "",
    humilityScore: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch initial sorted data
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/superheroes`)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => b.humilityScore - a.humilityScore
        );
        setSortedSuperheroes(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  // Socket.IO for new heroes
  useEffect(() => {
    const socket = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
    });
    socket.on("newSuperhero", (hero) => {
      setNewSuperheroes((prev) => [hero, ...prev]);
    });
    return () => socket.disconnect();
  }, []);

  // Input changes + basic validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "humilityScore") {
      const val = parseFloat(value);
      if (val < 1 || val > 10) {
        setErrorMessage(
          "Humility score must be between 1 and 10 (decimals allowed)."
        );
      } else {
        setErrorMessage("");
      }
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, superpower, humilityScore } = formData;
    const scoreVal = parseFloat(humilityScore);

    if (scoreVal < 1 || scoreVal > 10) {
      setErrorMessage("Humility score must be between 1 and 10.");
      return;
    }

    const payload = { name, superpower, humilityScore: scoreVal };
    axios
      .post(`${API_BASE_URL}/superheroes`, payload)
      .then(() => {
        // Clear form
        setFormData({ name: "", superpower: "", humilityScore: "" });
        // Re-fetch sorted data after a short delay (optional)
        setTimeout(() => {
          axios
            .get(`${API_BASE_URL}/superheroes`)
            .then((res) => {
              const sorted = res.data.sort(
                (a, b) => b.humilityScore - a.humilityScore
              );
              setSortedSuperheroes(sorted);
            })
            .catch((err) => console.error(err));
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error adding superhero. Check console for details.");
      });
  };

  return (
    <div className="container">
      <h1>🦸Humble Superhero API</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter superhero name"
            value={formData.name}
            onChange={handleChange}
            required
            title="Enter the superhero's name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="superpower">Superpower:</label>
          <input
            id="superpower"
            name="superpower"
            type="text"
            placeholder="Enter superhero superpower"
            value={formData.superpower}
            onChange={handleChange}
            required
            title="Enter the superhero's superpower"
          />
        </div>
        <div className="form-group">
          <label htmlFor="humilityScore">Humility Score:</label>
          <input
            id="humilityScore"
            name="humilityScore"
            type="number"
            step="0.1"
            placeholder="1 to 10 (decimals allowed)"
            value={formData.humilityScore}
            onChange={handleChange}
            required
            title="Enter a humility score (1–10)"
          />
        </div>
        <button type="submit">Add Superhero</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Superhero Leaderboard (sorted) */}
      <h2>Superhero Leaderboard</h2>
      {sortedSuperheroes.length === 0 ? (
        <p className="no-data">No superheroes in the sorted list.</p>
      ) : (
        <table className="superheroes-table leaderboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Superpower</th>
              <th>Score</th>
              <th>Rating (10 Stars)</th>
            </tr>
          </thead>
          <tbody>
            {sortedSuperheroes.map((hero) => {
              const starStates = getStarStates(hero.humilityScore);
              return (
                <tr key={hero.id || hero.name}>
                  <td>{hero.name}</td>
                  <td>{hero.superpower}</td>
                  <td>{hero.humilityScore}</td>
                  <td>
                    <div className="star-ratings">
                      {starStates.map((s, idx) => (
                        <span key={idx} className={`star ${s}`} />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* New Real-Time Heroes */}
      <h2>New Real-Time Heroes</h2>
      {newSuperheroes.length === 0 ? (
        <p className="no-data">No new heroes added.</p>
      ) : (
        <table className="superheroes-table realtime-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Superpower</th>
              <th>Score</th>
              <th>Rating (10 Stars)</th>
            </tr>
          </thead>
          <tbody>
            {newSuperheroes.map((hero) => {
              const starStates = getStarStates(hero.humilityScore);
              return (
                <tr key={hero.id || hero.name}>
                  <td>{hero.name}</td>
                  <td>{hero.superpower}</td>
                  <td>{hero.humilityScore}</td>
                  <td>
                    <div className="star-ratings">
                      {starStates.map((s, idx) => (
                        <span key={idx} className={`star ${s}`} />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
