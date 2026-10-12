import { NextRequest, NextResponse } from 'next/server';
import { contactMessageSchema } from '@/lib/validation/demoSchema';
import { submitContactMessage } from '@/lib/adapters/submissionAdapter';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parseResult = contactMessageSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          status: 'validation_error',
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Server-side honeypot check
    if (parseResult.data.website && parseResult.data.website.trim().length > 0) {
      return NextResponse.json(
        {
          success: false,
          status: 'spam_detected',
          message: 'Submission rejected by anti-abuse validation.',
        },
        { status: 400 }
      );
    }

    const result = await submitContactMessage(parseResult.data);
    const statusCode = result.status === 'delivered' ? 200 : result.status === 'unconfigured' ? 501 : 502;

    return NextResponse.json(result, { status: statusCode });
  } catch {
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        message: 'Invalid payload received.',
      },
      { status: 400 }
    );
  }
}
