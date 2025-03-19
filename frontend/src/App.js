import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, StreetViewPanorama } from "@react-google-maps/api";

const API_KEY = "AIzaSyALW-3ZnuZFLCH7xE_8WtM76C63zfObk_k"; // 🔹 Replace with your actual Google Maps API key

const containerStyle = {
    width: "100%",
    height: "500px"
};

function App() {
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/questions")
            .then(response => {
                // Load a random question from the JSON file
                const randomQuestion = response.data[Math.floor(Math.random() * response.data.length)];
                setQuestion(randomQuestion);
            })
            .catch(error => console.error("Error fetching questions:", error));
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option === question.correct_answer) {
            setMessage("✅ Correct!");
        } else {
            setMessage("❌ Wrong answer. Try again!");
        }
    };

    return (
        <div>
            <h1>Google Maps Quiz Game</h1>

            {question ? (
                <>
                    <h2>{question.question}</h2>
                    <p><strong>Latitude:</strong> {question.latitude}</p>
                    <p><strong>Longitude:</strong> {question.longitude}</p>

                    <LoadScript googleMapsApiKey={API_KEY}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{ lat: question.latitude, lng: question.longitude }}
                            zoom={15}
                        >
                            <StreetViewPanorama
                                position={{ lat: question.latitude, lng: question.longitude }}
                                visible={true}
                                options={{
                                    pov: { heading: 100, pitch: 0 },
                                    zoom: 1
                                }}
                            />
                        </GoogleMap>
                    </LoadScript>

                    <div>
                        {question.options.map((option, index) => (
                            <button key={index} onClick={() => handleOptionClick(option)}>
                                {option}
                            </button>
                        ))}
                    </div>

                    {selectedOption && <p>{message}</p>}
                </>
            ) : (
                <p>Loading question...</p>
            )}
        </div>
    );
}

export default App;
