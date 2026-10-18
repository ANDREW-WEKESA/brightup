/**
 * API client for BrightUp server
 */

const BASE_URL = '/api';

export async function fetchUnits() {
  const response = await fetch(`${BASE_URL}/units`);
  if (!response.ok) {
    throw new Error('Failed to fetch units');
  }
  const data = await response.json();
  return data.units;
}

export async function fetchUnit(id) {
  const response = await fetch(`${BASE_URL}/units/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch unit');
  }
  return response.json();
}
