import React from 'react';

const StreamlitPage = () => {
  return (
    <div className="text-center">
      <iframe
        src="http://localhost:8501"
        width="100%"
        height="800px"
        frameBorder="0"
        title="Streamlit App"
      />
      <noscript>
        <p className="text-red-500 mt-4">
          Please enable JavaScript to view the Streamlit dashboard.
        </p>
      </noscript>
    </div>
  );
};

export default StreamlitPage;
