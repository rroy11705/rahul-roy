import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'pageSource', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'message'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      minLength: 2,
      admin: {
        description: 'Full name of the person contacting',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address for contact',
      },
    },
    {
      name: 'countryCode',
      type: 'text',
      required: true,
      admin: {
        description: 'Country code for phone number (e.g., +1, +91)',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'Phone number without country code',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      minLength: 10,
      admin: {
        description: 'Message content from the contact form',
      },
    },
    {
      name: 'pageSource',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Home',
          value: 'HOME',
        },
        {
          label: 'Contact',
          value: 'CONTACT',
        },
        {
          label: 'About Us',
          value: 'ABOUT_US',
        },
        {
          label: 'Services',
          value: 'SERVICES',
        },
        {
          label: 'Projects',
          value: 'PROJECTS',
        },
      ],
      admin: {
        description: 'Page from which the contact form was submitted',
      },
    },
  ],
  timestamps: true,
}