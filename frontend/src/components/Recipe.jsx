import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import "../public/style.css";
import "../public/style.css";
const Recipe = () => {
    const { id } = useParams(); // Get recipe ID from URL
    const navigate = useNavigate(); // Initialize useNavigate
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                );
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
                setError("Failed to fetch recipe details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (isLoading) {
        return <div className="has-text-centered">Loading...</div>;
    }

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    if (!recipe) {
        return <div className="notification is-warning">Recipe not found.</div>;
    }

    return (
        <div className="container">
            {/* Back to Explore Button on the Left */}
            <div className="has-text-left my-5">
                <button
                    className="button sage-button is-medium"
                    onClick={() => navigate("/explore")} // Navigate back to Explore
                >
                    Back to Explore
                </button>
            </div>

            <h1 className="title is-1 has-text-centered mt-5">{recipe.title}</h1>

            <div className="columns">
                {/* Recipe Image */}
                <div className="column is-half">
                    <figure className="image is-4by3">
                        <img src={recipe.image} alt={recipe.title} />
                    </figure>
                </div>

                {/* Recipe Description */}
                <div className="column is-half">
                    <div className="content">
                        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                    </div>
                </div>
            </div>

            {/* Ingredients */}
            <div className="content">
                <h2 className="title is-3">Ingredients</h2>
                <ul>
                    {recipe.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
            </div>

            {/* Steps */}
            <div className="content">
                <h2 className="title is-3">Steps</h2>
                <ol>
                    {recipe.analyzedInstructions[0]?.steps.map((step) => (
                        <li key={step.number}>{step.step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Recipe;