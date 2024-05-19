import React,{useState} from 'react'
import "../styles/loader.css";
export function FileLoader() {
  const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({});
  
    const getRandomQuote = () => {
      setLoading(true);
      fetch('https://api.quotable.io/random')
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setQuote(data);
        });
    };
    return (
      <div className="container">
        {loading ? (
          <div className="container laptopPos">
            <div><i class="fas fa-desktop fa-5x"></i></div>
            <div className='file'><i class="fas fa-stream fa-5x"></i></div>
            <div><i class="fas fa-desktop fa-5x"></i></div>
          </div>
        ) : (
          <div className="main-content">
            <h1>Hello World!</h1>
            <p>
              This is a demo Project to show how to add animated loading with
              React.
            </p>
            <div className="buttons">
            
              <button className="btn">
                <a href="/">Read Article</a>
              </button>
              <button className="btn get-quote" onClick={getRandomQuote}>
                Generate Quote
              </button>
            </div>
            <div className="quote-section">
              <blockquote className="quote">{quote.content}</blockquote>-{' '}
              <span className="author">{quote.author}</span>
            </div>
          </div>
        )}
      </div>
    )
}
