const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL as string;

export async function submitFormToGoogleSheets(formData: FormData): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    console.error('Google Script URL is not defined in environment variables');
    throw new Error('Missing Google Script URL configuration');
  }

  // Convert FormData to URL params
  const params = new URLSearchParams();
  
  // Add each form field to params
  params.append('name', formData.get('name') as string);
  params.append('email', formData.get('email') as string);
  params.append('subject', formData.get('subject') as string || '');
  params.append('message', formData.get('message') as string);
  
  try {
    // Using no-cors means we can't check the status of the response
    // This will almost never throw an exception due to the no-cors mode
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: params,
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // If we get here, we didn't get a network error
    // With no-cors, this is the best we can do to determine "success"
    return;
  } catch (error) {
    console.error('Network error submitting form to Google Sheets:', error);
    throw error;
  }
}