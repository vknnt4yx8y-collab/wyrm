import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    if (!res.ok) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json({ user: data.user });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
