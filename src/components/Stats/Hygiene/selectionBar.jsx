import { useEffect, useState } from 'react';
import DropDownButton from './dropdownbtn';
import { BarChart } from './BarChart';


function SelectionBar() {
  const [chartData, setChartData] = useState([]);
  const [Year, setYear] = useState("Year");
  const [Service, setService] = useState("Service");
  const [Surface, setSurface] = useState("Surface");
  const [Disinfectant, setDisinfectant] = useState("Disinfectant");
  const [Data, setData] = useState({});
  
  useEffect(() => {
    const getLists = async () => {
      try {
        const response = await fetch("http://localhost:8080/utilizations/Lists");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getLists();
  }, []);

  const handleGenerate = async () => {
    console.log({ Year, Service, Surface, Disinfectant });
    console.log(Year);
    console.log(Service);
    console.log(Surface);
    console.log(Disinfectant);
    try {
      const response = await fetch(
        `http://localhost:8080/utilizations?disinf=${Disinfectant}&year=${Year}&service=${Service}&surface=${Surface}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data); 
      const transformed = data.map(([name, quantity]) => ({"name": name, "quantity": quantity}));
      console.log("Transformed :", transformed);
      if (transformed.length === 0)
        {
          alert("Invalid Input or no data is available !");
          return;
        }
      setChartData(transformed);
      
      setYear("Year");
      setService("Service");
      setSurface("Surface");
      setDisinfectant("Disinfectant");
    
      
      console.log("Updated chartData:", transformed); 
    } catch (err) {
      console.log('Fetch error:', err.message);
    }
  };
  return (
    
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
          <DropDownButton label={Year} items={Data.years || []} setState={setYear} />
          <DropDownButton label={Disinfectant} items={Data.disinfectants || []} setState={setDisinfectant} />
          <DropDownButton label={Service} items={Data.services || []} setState={setService} />
          <DropDownButton label={Surface} items={Data.surfaces || []} setState={setSurface} />
          <button type="button" className="btn btn-outline-success" onClick={handleGenerate}>
            Generate
          </button>
        </div>
        {console.log("chartData before render:", chartData)} {/* Add this */}
        {chartData.length > 0 && (
          <BarChart
            data={chartData}
            year={Year}
            service={Service}
            surface={Surface}
            disinfectant={Disinfectant}
          />
        )}
      </>
    );

}

export default SelectionBar;
