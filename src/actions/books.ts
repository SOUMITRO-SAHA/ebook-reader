"use server";

import { db } from "@/lib/db";
import { Book } from "@prisma/client";

// Define the return type for the getAllBooks function
interface GetAllBooksResponse {
  data: Book[] | null;
  error: unknown | null;
  success: boolean;
}

// Function to get all books from the database
export const getAllBooks = async (): Promise<GetAllBooksResponse> => {
  try {
    const books = await db.book.findMany();
    return { data: books, success: true, error: null };
  } catch (error) {
    console.error(error);
    return { error, success: false, data: null };
  }
};
