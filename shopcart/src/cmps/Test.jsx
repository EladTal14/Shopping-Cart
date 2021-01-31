import React, { useEffect, useState } from 'react'
import { httpService } from '../services/httpService'

export default function Test() {
  const [xs, setState] = useState(null)
  async function x() {
    const items = await httpService.get(`item`)
    console.log(items);
    setState(items)
  }
  useEffect(() => {
    x()
  }, [])
  console.log(xs);
  if (!xs) return <div>loading</div>

  return (
    <div>
      <h1>dhhdfg</h1>
      {xs.map(item => <p key={item._id}>{item.name}</p>)}
    </div>
  )
}
