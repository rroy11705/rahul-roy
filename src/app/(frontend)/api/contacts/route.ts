import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { ContactFormData, ContactFormErrors, PageSource } from '@/types/contact'

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

function validateContactForm(data: unknown): { isValid: boolean; errors: ContactFormErrors } {
  const errors: ContactFormErrors = {}

  // Type guard to ensure data is an object
  if (!data || typeof data !== 'object') {
    errors.message = 'Invalid form data'
    return { isValid: false, errors }
  }

  const formData = data as Record<string, unknown>

  // Validate name
  if (!formData.name || typeof formData.name !== 'string') {
    errors.name = 'Name is required'
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  // Validate email
  if (!formData.email || typeof formData.email !== 'string') {
    errors.email = 'Email is required'
  } else if (!validateEmail(formData.email.trim())) {
    errors.email = 'Please enter a valid email address'
  }

  // Validate phone
  if (!formData.phone || typeof formData.phone !== 'string') {
    errors.phone = 'Phone number is required'
  } else if (!validatePhone(formData.phone.trim())) {
    errors.phone = 'Please enter a valid phone number'
  }

  // Validate message
  if (!formData.message || typeof formData.message !== 'string') {
    errors.message = 'Message is required'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  // Validate country code
  if (!formData.countryCode || typeof formData.countryCode !== 'string') {
    errors.phone = 'Country code is required'
  }

  // Validate page source
  if (!formData.pageSource || !Object.values(PageSource).includes(formData.pageSource as PageSource)) {
    errors.pageSource = 'Invalid page source'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

function createEmailTemplate(data: ContactFormData): string {
  const pageSourceDisplay = data.pageSource.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #E64C27; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; padding: 10px; background-color: white; border-radius: 4px; border-left: 4px solid #E64C27; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Contact Form Submission</h1>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.name}</div>
        </div>
        
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${data.email}</div>
        </div>
        
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">${data.countryCode} ${data.phone}</div>
        </div>
        
        <div class="field">
          <div class="label">Message:</div>
          <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="field">
          <div class="label">Submitted from:</div>
          <div class="value">${pageSourceDisplay} Page</div>
        </div>
        
        <div class="footer">
          <p>This email was sent from your website contact form.</p>
          <p>Submitted at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const { isValid, errors } = validateContactForm(body)
    
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors
        },
        { status: 400 }
      )
    }

    const formData = body as Record<string, unknown>
    
    const contactData: ContactFormData = {
      name: (formData.name as string).trim(),
      email: (formData.email as string).trim().toLowerCase(),
      countryCode: formData.countryCode as string,
      phone: (formData.phone as string).trim(),
      message: (formData.message as string).trim(),
      pageSource: formData.pageSource as PageSource
    }

    // Get PayloadCMS instance
    const payload = await getPayload({ config })

    // Save to PayloadCMS
    const contact = await payload.create({
      collection: 'contacts',
      data: contactData,
    })

    // Send email using PayloadCMS's email adapter
    const emailHtml = createEmailTemplate(contactData)
    
    try {
      await payload.sendEmail({
        from: 'Contact Form <noreply@trymblink.com>',
        to: 'rahul@trymblink.com',
        subject: `New Contact Form Submission from ${contactData.name}`,
        html: emailHtml
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Still return success since the data was saved, but log the email error
      return NextResponse.json({
        success: true,
        message: 'Contact saved successfully, but email notification failed',
        data: {
          id: contact.id,
          createdAt: contact.createdAt
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact.id,
        createdAt: contact.createdAt
      }
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.'
      },
      { status: 500 }
    )
  }
}