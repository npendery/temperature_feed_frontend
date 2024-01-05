import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
function App() {
    const GET_CURRENT_TEMPERATURE = gql`
      query CurrentTemperature {
        currentTemperature {
          timestamp
          value
        }
      }
    `;

  function DisplayCurrentTemperature() {
    const { loading, error, data } = useQuery(GET_CURRENT_TEMPERATURE);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    const date = new Date(data.currentTemperature.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-US');

    
    return (
      <div>
        <p>
          The most recent temperature reading is {data.currentTemperature.value.toFixed(0)}°F on{' '}
          {formattedDate} at {formattedTime}.
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <DisplayCurrentTemperature />
      </header>
    </div>
  );
}

export default App;
