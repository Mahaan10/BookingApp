import { NextResponse } from "next/server";

// You can use the global fetch API in Vercel’s Node runtime.
const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_ID = process.env.JSONBIN_BIN_ID;
const baseUrl = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export async function GET() {
  // Retrieve the current data from JSONbin.io
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await response.json();
  return NextResponse.json(data.record);
}

export async function POST(req) {
  // Parse the new post from the request body
  const newPost = await req.json();

  // Retrieve current bin data
  const getResponse = await fetch(baseUrl, {
    method: "GET",
    headers: { "X-Master-Key": API_KEY },
  });
  const binData = await getResponse.json();

  // Assuming your bin data is in the form { posts: [] }
  const updatedPosts = [...(binData.record.posts || []), newPost];

  // Update the bin with the new posts array
  const putResponse = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify({ posts: updatedPosts }),
  });
  const updatedBin = await putResponse.json();

  return NextResponse.json(updatedBin.record);
}

export async function DELETE(req) {
  // For DELETE, we assume an id is passed as a query parameter, e.g., /api/posts?id=123
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "ID is required for deletion" },
      { status: 400 }
    );
  }

  // Retrieve current bin data
  const getResponse = await fetch(baseUrl, {
    method: "GET",
    headers: { "X-Master-Key": API_KEY },
  });
  const binData = await getResponse.json();

  // Filter out the post with the given id (assuming each post has an "id" property)
  const updatedPosts = (binData.record.posts || []).filter(
    (post) => post.id != id
  );

  // Update the bin with the new posts array
  const putResponse = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify({ posts: updatedPosts }),
  });
  const updatedBin = await putResponse.json();

  return NextResponse.json(updatedBin.record);
}
