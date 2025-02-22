import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { admin } from '../lib/admin';

export function middleware(request: NextRequest) {
  if (admin?.isAdmin) {
    return NextResponse.redirect(
      new URL('/employee-list-card-view', request.url),
    );
  } else {
    return NextResponse.redirect(
      new URL('/employee-list-card-view', request.url),
    );
  }
}

export const config = {
  matcher: '/',
};
