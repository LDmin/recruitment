
declare module '*.css';
declare module "*.png";

interface Window {
  AMap: any
}

interface Job {
  clientId: string
  fetchId: string
  id: string
  name: string
  company: string
  pay: string
  address: string
  location: [number, number]
}

interface City {
  id: number
  pid: number
  name: string
  py: string
  location?: [number, number]
}