import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

interface InquiryData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  teamMembers: TeamMember[];
  projectTitle: string;
  projectDescription: string;
  projectType: string;
  paymentPlan: string;
  totalAmount: string;
  deadline: string;
  additionalNotes?: string;
  files?: File[];
}

export async function POST(request: Request) {
  try {
    // Parse the FormData
    const formData = await request.formData();
    const data: Partial<InquiryData> = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      university: formData.get('university') as string,
      teamMembers: JSON.parse(formData.get('teamMembers') as string),
      projectTitle: formData.get('projectTitle') as string,
      projectDescription: formData.get('projectDescription') as string,
      projectType: formData.get('projectType') as string,
      paymentPlan: formData.get('paymentPlan') as string,
      totalAmount: formData.get('totalAmount') as string,
      deadline: formData.get('deadline') as string,
      additionalNotes: formData.get('additionalNotes') as string
    };

    // Get files and validate them
    const files = formData.getAll('files') as File[];
    
    // Validate file sizes (max 10MB per file)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds the maximum size limit of 10MB` },
          { status: 400 }
        );
      }
    }

    // Validate total number of files
    if (files.length > 5) {
      return NextResponse.json(
        { error: 'Maximum 5 files can be uploaded' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'university', 'projectTitle', 'projectDescription', 'projectType', 'paymentPlan', 'totalAmount', 'deadline'];
    const missingFields = requiredFields.filter(field => !data[field as keyof typeof data]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate team members
    if (!data.teamMembers || data.teamMembers.length < 1) {
      return NextResponse.json(
        { error: 'At least one team member is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email!)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Check email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { error: 'Email service configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Create SMTP configuration with better timeout handling
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 20000, // 20 seconds
      debug: true,
      logger: true
    };

    // Log SMTP configuration (without sensitive data)
    console.log('SMTP Configuration:', {
      ...smtpConfig,
      auth: {
        user: process.env.EMAIL_USER,
        pass: '******'
      }
    });

    // Create transporter with proper type
    const transporter = nodemailer.createTransport(smtpConfig);

    // Skip verification and try sending directly
    // Verification can be unreliable with some SMTP servers
    console.log('Attempting to send email without verification...');

    // Format team members for email
    const teamMembersHtml = data.teamMembers
      .map((member, index) => `
        <div style="margin: 10px 0;">
          <p><strong>Member ${index + 1}:</strong></p>
          <p>Name: ${member.name}</p>
          <p>Email: ${member.email}</p>
          <p>Phone: ${member.phone}</p>
        </div>
      `)
      .join('');

    // Process files for attachments
    const attachments = [];
    for (const file of files) {
      try {
        const buffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(buffer),
          contentType: file.type
        });
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        return NextResponse.json(
          { error: `Error processing file ${file.name}. Please try again.` },
          { status: 500 }
        );
      }
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Capstone Project Inquiry: ${data.projectTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Capstone Project Inquiry
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Primary Contact Information:</h3>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>University:</strong> ${data.university}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
            <h3>Team Members:</h3>
            ${teamMembersHtml}
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Project Details:</h3>
            <p><strong>Title:</strong> ${data.projectTitle}</p>
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Deadline:</strong> ${data.deadline}</p>
            <h4>Project Description:</h4>
            <p style="white-space: pre-wrap;">${data.projectDescription}</p>
            ${data.additionalNotes ? `<h4>Additional Notes:</h4><p style="white-space: pre-wrap;">${data.additionalNotes}</p>` : ''}
          </div>

          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <h3>Payment Information:</h3>
            <p><strong>Payment Plan:</strong> ${data.paymentPlan}</p>
            <p><strong>Total Amount:</strong> ₹${data.totalAmount}</p>
          </div>

          ${files.length > 0 ? `
            <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3>Attached Files:</h3>
              <ul>
                ${files.map(file => `<li>${file.name} (${Math.round(file.size / 1024)}KB)</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Reply to:</strong> ${data.email}
            </p>
          </div>
        </div>
      `,
      attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Inquiry submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing inquiry:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      errorType: error?.constructor?.name,
      emailConfig: {
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: process.env.SMTP_PORT || '465',
        user: process.env.EMAIL_USER ? 'Set' : 'Not set',
        pass: process.env.EMAIL_PASS ? 'Set' : 'Not set',
      }
    });
    
    // Return more specific error message
    const errorMessage = error instanceof Error 
      ? error.message
      : 'Failed to submit inquiry. Please try again later.';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}