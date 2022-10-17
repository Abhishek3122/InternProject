
import Axios from 'axios';
import {useEffect,useState} from 'react'
import Card from './components/Card';
function App() {
  const [data,setDate]=useState([])
  console.log({data});
  useEffect(() => {
    Axios.get('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences')
  .then(res=>{console.log("Getting from ::::",res.data)
  setDate(res.data.paid)}).catch(err=>console.log(err))
    
  }, [])
//   const arr=data.map((data,index)=>{
//     return(
// <tr>
//     <td>{data.emailid}</td>
//     <td>{data.city}</td>
    
//   </tr>
//     )
//   })
  return (
    <div className="App">
    {/* TEMPLATE CARD */}
    <h4>Empty component:</h4>
      <Card />

      {/* EXAMPLE CARD */}
      <h4>Component with passed attributes:</h4>
        <div className="card_container">
      {
        data.map(item=>{
          return  <Card
        image={item.imageURL}

        title={item.confName}
        location={item.city}
        description={item.confStartDate}
        Venue={item.venue}
        confUrl={item.confUrl}
        entryType={item.entryType}
      />

        })
      }
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

export default App;
