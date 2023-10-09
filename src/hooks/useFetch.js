import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([{
    id: 1,
    name: 'initial'
  }]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [url]);
  return data;
};

export default useFetch;
