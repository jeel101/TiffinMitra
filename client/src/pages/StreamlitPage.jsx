import React from 'react';

const StreamlitPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Streamlit Dashboard</h1>
      <iframe
        src="http://localhost:8501"
        width="100%"
        height="600px"
        frameBorder="0"
        title="Streamlit App"
      />
    </div>
  );
};

export default StreamlitPage;
