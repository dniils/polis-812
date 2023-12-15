import { UserInterface } from '../types/UserInterface'

async function getUsers(): Promise<UserInterface[]> {
  const f = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = f.json()
  return data
}

async function getUser(id: number): Promise<UserInterface[]> {
  const f = await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
  const data = f.json()
  return data
}

export { getUsers, getUser }
