import PDFParser from 'pdf2json';

export async function extractPdfText(file: File): Promise<string> {
  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create PDF parser instance
    const pdfParser = new PDFParser(null, true);
    
    // Wrap event-based API in a Promise
    const text = await new Promise<string>((resolve, reject) => {
      // Handle successful parsing
      pdfParser.on('pdfParser_dataReady', () => {
        try {
          const rawText = pdfParser.getRawTextContent();
          resolve(rawText);
        } catch (error) {
          reject(error);
        }
      });
      
      // Handle parsing errors
      pdfParser.on('pdfParser_dataError', (errorData) => {
        const error = errorData instanceof Error ? errorData : errorData?.parserError;
        reject(error || new Error('PDF parsing failed'));
      });
      
      // Start parsing the buffer
      pdfParser.parseBuffer(buffer);
    });
    
    return text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.');
  }
}

export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'File must be a PDF' };
  }
  
  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  // Check file size is not 0
  if (file.size === 0) {
    return { valid: false, error: 'File cannot be empty' };
  }
  
  return { valid: true };
}
