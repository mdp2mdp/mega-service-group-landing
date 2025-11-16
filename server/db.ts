// Database layer simplified - all data stored in localStorage on client side
// This file is kept for compatibility but contains no database operations

export async function getDb() {
  return null;
}

export async function upsertUser() {
  console.warn("[Database] User operations disabled - using OAuth only");
}

export async function getUserByOpenId() {
  return undefined;
}

export async function saveFormSubmission() {
  console.warn("[Database] Form submissions stored in localStorage only");
}

export async function getAllFormSubmissions() {
  return [];
}
