import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import "./home.css";

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
        );
        setLoading(false);
        setData(res.data.paid);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (textValue.length <= 3) {
      setFilteredData(data);
      return;
    }
    console.log(textValue);
    setFilteredData(() =>
      data.filter((item) =>
        item.city.toLowerCase().includes(textValue.toLowerCase())
      )
    );
  }, [textValue]);
  return (
    <div className="home">
      <h1>Application</h1>
      <input
        type="text"
        placeholder="searh for location"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        className="inputForLocation"
      />
      {loading && <div>Loading...</div>}
      <div className="card_container">
        {filteredData.map((item, id) => {
          return (
            <Card
              key={id}
              image={item.imageURL}
              title={item.confName}
              location={item.city}
              description={item.confStartDate}
              Venue={item.venue}
              confUrl={item.confUrl}
              entryType={item.entryType}
            />
          );
        })}
      </div>

      {/* <Card
        image="https://2e4efd3ddd5ec0b50028-7d521b783d142fa14612a0034dea730a.ssl.cf2.rackcdn.com/gallery/2008/08/3190854_1316217600_gallery_image_3072799.jpg"
        title="Design & React Meetup"
        location="Downtown, Seattle WA"
        description="Designers react to JavaScript. Join us in our monthly meetup where designers gather to share newbie React knowledge."
      /> */}
    </div>
  );
}

export default Home;
