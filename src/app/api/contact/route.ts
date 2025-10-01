import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing: EMAIL_USER or EMAIL_PASS not set');
      return NextResponse.json(
        { error: 'Email service configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Debug configuration (without exposing sensitive data)
    console.log('Email configuration:', {
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: parseInt(process.env.SMTP_PORT || '465') === 465,
      user: process.env.EMAIL_USER,
      passwordLength: process.env.EMAIL_PASS?.length || 0,
      passwordPrefix: process.env.EMAIL_PASS?.substring(0, 4) + '****'
    });

    // Create transporter with environment variables
    // Try multiple configurations for better Zoho compatibility
    const smtpConfig: any = {
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: parseInt(process.env.SMTP_PORT || '465') === 465, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // Must be complete email address
        pass: process.env.EMAIL_PASS, // Must be app-specific password from Zoho
      },
      // Enhanced Zoho compatibility settings
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
      // Additional settings that help with Zoho
      pool: false, // Disable connection pooling
      maxConnections: 1, // Use single connection
      maxMessages: 1, // Send one message per connection
    };

    // For port 587, add STARTTLS settings
    if (parseInt(process.env.SMTP_PORT || '465') === 587) {
      smtpConfig.requireTLS = true;
      smtpConfig.tls = {
        rejectUnauthorized: false
      };
    }

    const transporter = nodemailer.createTransport(smtpConfig);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
        </div>
      `,
      // Add plain text fallback
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        Reply to: ${email}
      `,
    };

    // Send email directly (verification removed to prevent connection issues)
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any).code,
      command: (error as any).command,
      response: (error as any).response,
      responseCode: (error as any).responseCode
    });
    
    // Provide more specific error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('authentication') || error.message.includes('535')) {
        return NextResponse.json(
          { error: 'Email authentication failed. Please contact the administrator.' },
          { status: 500 }
        );
      } else if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Email service timeout. Please try again later.' },
          { status: 500 }
        );
      } else if (error.message.includes('SSL') || error.message.includes('TLS') || (error as any).code === 'ESOCKET') {
        return NextResponse.json(
          { error: 'Email service connection error. Please contact the administrator.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later or contact us directly.' },
      { status: 500 }
    );
  }
}