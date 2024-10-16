import { useQuery } from '@tanstack/react-query';
import React from 'react'

const getUserData = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json());
}

const UserProfile = () => {
  const { data, isLoading, isError } = useQuery("user", getUserData());

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error...</>

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

export default UserProfile
