"use client";

import Image from 'next/image'
import { useGetAllUsersQuery } from '@/redux/services/userApi'

export default function Home() {
  const { isLoading, isFetching, data, error } = useGetAllUsersQuery(null);
  console.log(data)
  return (
  <div>Hello world</div>
  )
}
