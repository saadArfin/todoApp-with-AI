import { useState } from "react";
import axios from "axios";

export default function AskAI() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      // Make a request to your API route
      const result = await axios.post("/api/askaii", { prompt: prompt });

      setResponse(result.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("An error occurred while fetching the response.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Ask AI</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>
      {response && (
        <div>
          <h2>Response from AI:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
