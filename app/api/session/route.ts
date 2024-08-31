import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
): Promise<
  NextResponse<{
    success: boolean;
    errorMessage?: string;
  }>
> => {
  const cookies = req.headers.get('cookie') || '';


  return NextResponse.json({ success: true });
};