import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import CustomSelect from "../../components/CustomeSelect/CustomSelect";
import "./home.css";

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [options, setOptions] = useState({
    city: [],
    confStartDate: [],
    entryType: [
      { value: "paid", label: "paid" },
      { value: "free", label: "free" },
    ],
    country: [],
  });

  const [selection, setSelection] = useState({
    city: "",
    confStartDate: "",
    entryType: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  const handleSelectionChange = (val, type) => {
    setSelection((prev) => ({ ...prev, [type]: val }));
    setFilteredData(() =>
      filteredData.filter((item) =>
        item[type].toLowerCase().includes(val.value)
      )
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
        );
        const data = res.data.paid;
        setLoading(false);
        setData(data);
        setFilteredData(data);
        const countrySet = new Set(
          data.map((item) => ({
            label: item.country,
            value: item.country.toLowerCase(),
          }))
        );
        const citySet = new Set(
          data.map((item) => ({
            label: item.city,
            value: item.city.toLowerCase(),
          }))
        );
        const monthSet = new Set(
          data.map((item) => ({
            label: item.confStartDate,
            value: item.confStartDate.toLowerCase(),
          }))
        );
        setOptions((option) => ({
          ...option,
          country: [...countrySet],
          city: [...citySet],
          confStartDate: [...monthSet],
        }));
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
    setFilteredData(() =>
      data.filter(
        (item) =>
          item.city.toLowerCase().includes(textValue.toLowerCase()) ||
          item.searchTerms.toLowerCase().includes(textValue.toLowerCase())
      )
    );
  }, [textValue]);

  return (
    <div className="home">
      <h1>Application</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Location / Name"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="inputForLocation"
        />
        <CustomSelect
          options={options.city}
          placeholder="City"
          handleSelection={(val) => handleSelectionChange(val, "city")}
          value={selection.city}
          name="city"
          haveBorder
        />
        <CustomSelect
          options={options.confStartDate}
          placeholder="Month"
          handleSelection={(val) => handleSelectionChange(val, "confStartDate")}
          value={selection.confStartDate}
          name="month"
          haveBorder
        />
        <CustomSelect
          options={options.entryType}
          placeholder="Free/Paid"
          handleSelection={(val) => handleSelectionChange(val, "entryType")}
          value={selection.city}
          name="entryType"
          haveBorder
        />
        <CustomSelect
          options={options.country}
          placeholder="Country"
          handleSelection={(val) => handleSelectionChange(val, "country")}
          value={selection.country}
          name="country"
          haveBorder
        />
        <button
          className="reset-filter"
          onClick={() => {
            setSelection({
              city: "",
              confStartDate: "",
              paid: "",
              country: "",
            });
            setFilteredData(data);
          }}
        >
          Reset Filters
        </button>
      </div>
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
        {!loading && filteredData.length === 0 && (
          <div>No such data available</div>
        )}
      </div>
    </div>
  );
}

export default Home;
