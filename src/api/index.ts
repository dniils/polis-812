import { AlbumInterface } from '../types/AlbumInterface'
import { PhotoInterface } from '../types/PhotoInterface'
import { PostInterface } from '../types/PostInterface'
import { UserInterface } from '../types/UserInterface'
import { BASE_URL } from '../constants/api'

async function fetchUsers(): Promise<UserInterface[]> {
  const f = await fetch(`${BASE_URL}/users`)
  const data = f.json()
  return data
}

async function fetchUser(userId: number): Promise<UserInterface[]> {
  const f = await fetch(`${BASE_URL}/users?id=${userId}`)
  const data = f.json()
  return data
}

async function fetchUserAlbums(userId: number): Promise<AlbumInterface[]> {
  const f = await fetch(`${BASE_URL}/users/${userId}/albums`)
  const data = f.json()
  return data
}

async function fetchUserPosts(userId: number): Promise<PostInterface[]> {
  const f = await fetch(`${BASE_URL}/users/${userId}/posts`)
  const data = f.json()
  return data
}

async function fetchPhotosFromAlbum(
  albumId: number
): Promise<PhotoInterface[]> {
  const f = await fetch(`${BASE_URL}/albums/${albumId}/photos`)
  const data = f.json()
  return data
}

export {
  fetchUsers,
  fetchUser,
  fetchUserAlbums,
  fetchUserPosts,
  fetchPhotosFromAlbum,
}
