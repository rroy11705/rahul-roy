export enum PageSource {
  HOME = 'HOME',
  CONTACT = 'CONTACT',
  ABOUT_US = 'ABOUT_US',
  SERVICES = 'SERVICES',
  PROJECTS = 'PROJECTS'
}

export interface ContactFormData {
  name: string
  email: string
  countryCode: string
  phone: string
  message: string
  pageSource: PageSource
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
  pageSource?: string
}

export interface ContactAPIResponse {
  success: boolean
  message: string
  data?: {
    id: number
    createdAt: string
  }
  errors?: ContactFormErrors
}