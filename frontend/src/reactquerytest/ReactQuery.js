import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const fetchUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};

const ReactQuery = () => {
  const { data, isError, error, isLoading } = useQuery("get-user", fetchUsers);

  if (isLoading) return <>Loading...</>
  if (isError) return <>{error.message}</>

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

export default ReactQuery
