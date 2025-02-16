// IngredientInfo.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface IngredientInfoData {
  category: string;
  description: string;
  foodScience: string;
  nutrition: Record<string, number>;
  alternatives: { title: string; details: string }[];
  preservation: { title: string; details: string }[];
}

const IngredientInfo: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [info, setInfo] = useState<IngredientInfoData | null>(null);
  const [error, setError] = useState<string>('');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    // Adjust URL & query parameters as needed
    fetch('http://127.0.0.1:5000/get-ingredient-info', {
        body: JSON.stringify({ ingredient: name }),
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error(`Error fetching ingredient info: ${response.statusText}`);
        }

        return response.clone().json();
      })
      .then((data) => {
        const info = JSON.parse(data)
        setInfo(info);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error:', err);
      })
  }, [name]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
            Back
        </button>
        <h1>{name}</h1>
        <p><strong>Category:</strong> {info.category}</p>
        <p><strong>Description:</strong> {info.description}</p>
        <p><strong>Food Science:</strong> {info.foodScience}</p>
        
        <h3>Nutrition</h3>
        {info.nutrition ? (
            <ul>
                {Object.entries(info.nutrition).map(([key, value]) => (
                <li key={key}>
                    <strong>{key}:</strong> {value}
                </li>
                ))}
            </ul>
        ) : (
            <p>No nutrition information available.</p>
        )}
      
        <h3>Alternatives</h3>
        <ul>
            {info.alternatives?.map((alt, idx) => (
                <li key={idx}>
                <strong>{alt.title}:</strong> {alt.details}
                </li>
            )) || <p>No alternatives available.</p>}
        </ul>
      
        <h3>Preservation</h3>
        <ul>
            {info.preservation?.map((pres, idx) => (
                <li key={idx}>
                <strong>{pres.title}:</strong> {pres.details}
                </li>
            )) || <p>No preservation details available.</p>}
        </ul>
        </div>
     );
};

export default IngredientInfo;