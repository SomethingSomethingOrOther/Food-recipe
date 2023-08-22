import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [foodRecipe, setFoodRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchRandomRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setFoodRecipe(responseData.meals[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Food Recipe App</h1>
      </header>
      <main>
        <button onClick={fetchRandomRecipe} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Random Food'}
        </button>
        {error && <p className="error">{error}</p>}
        {foodRecipe && (
          <div className="recipe-card">
            <h2>{foodRecipe.strMeal}</h2>
            <img src={foodRecipe.strMealThumb} alt={foodRecipe.strMeal} />
            <button onClick={openModal}>View Details</button>
          </div>
        )}
      </main>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>{foodRecipe.strMeal}</h3>
            <img src={foodRecipe.strMealThumb} alt={foodRecipe.strMeal} />
            <h4>Ingredients</h4>
            <ul>
              {Object.entries(foodRecipe)
                .filter(([key, value]) => key.startsWith('strIngredient') && value)
                .map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
            </ul>
            <h4>Instructions</h4>
            <p>{foodRecipe.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
