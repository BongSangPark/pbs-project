import React, { useEffect, useState } from 'react';
import axios from "axios";

const AxiosQuery = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        setData(res);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setIsLoading(false);
      })
  }, [])

  if (isLoading) return <>Loading...</>

  if (error) return <h2>{error}</h2>

  return (
    <div>
      <ul>
        {data && data.data?.map(user => (
          <li key={user.id}>
            {user.name} / {user.username}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AxiosQuery
