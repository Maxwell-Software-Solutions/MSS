import { NextResponse } from 'next/server';

/**
 * This endpoint has been intentionally disabled.
 * Application code no longer submits to it, but we keep the stub
 * to avoid broken builds if legacy clients attempt to call it.
 */
export function POST(): NextResponse {
  return NextResponse.json(
    {
      success: false,
      message: 'The contact email endpoint has been disabled. Please use an alternative delivery channel.',
    },
    { status: 501 }
  );
}

export function OPTIONS(): NextResponse {
  return NextResponse.json({}, { status: 200, headers: { Allow: 'POST' } });
}
