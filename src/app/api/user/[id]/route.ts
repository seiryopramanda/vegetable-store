import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  const id = params.params.id;
  return NextResponse.json(
    {
      success: true,
      message: `Get Detail User by Id ${id}`,
      data: [
        {
          id,
          name: "Taufan Fadhilah",
          email: "qyI9y@example.com",
        },
      ],
    },
    {
      status: 200,
    }
  );
}
