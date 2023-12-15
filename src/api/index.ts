import { UserInterface } from '../types/UserInterface'

async function getUsers(): Promise<UserInterface[]> {
  const f = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = f.json()
  return data
}

export { getUsers }
