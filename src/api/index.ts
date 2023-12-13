import { UserInterface } from '../types/UserInterface'

async function getUsers(): Promise<UserInterface[]> {
  const f = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = f.json()
  console.log(data)

  return data
}

export { getUsers }
