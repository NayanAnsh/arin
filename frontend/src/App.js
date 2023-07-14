import Nav from "./components/Root.jsx";
import './App.css';
import Dashboard from "./components/dashboard.jsx";
import Footer from "./components/footer.jsx";
import Card from "./components/Card.jsx"

function App() {
  const handleCardClick = () => {
    console.log('Card clicked!');
    // Add your logic here for handling card click
  };
  return (
    <>
    <Nav/>
    <Dashboard/>
    <div>
      <Card
        title="Card Title 1"
        description="This is the description for Card 1."
        imageSrc="https://example.com/image1.jpg"
        tags={['Tag1', 'Tag2', 'Tag3']}
        onClick={handleCardClick}
      />
      <Card
        title="Card Title 2"
        description="This is the description for Card 2."
        imageSrc="https://example.com/image2.jpg"
        tags={['Tag4', 'Tag5']}
        onClick={handleCardClick}
      />
      <Card
        title="Card Title 3"
        description="This is the description for Card 3."
        imageSrc="https://example.com/image3.jpg"
        tags={['Tag6']}
        onClick={handleCardClick}
      />
    </div>
    <Footer/>
    </>
  );
}

export default App;
