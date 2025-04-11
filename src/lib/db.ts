
/**
 * Database Utility for ProZ.com Frontend
 * This module provides interfaces to the backend database operations
 * using the existing DB connection process.
 */

// This is a frontend wrapper for the backend DB connection process
// In a real implementation, we would call API endpoints that use this DB connection

interface MemCachedOptions {
  useCache: boolean;
  ttl?: number;
  purgeCache?: boolean;
}

export interface QueryResult {
  rows: any[];
  metadata?: any;
}

// This function would typically make an API call to the backend
// which would then use the DB connection process described in the requirements
export const executeQuery = async (
  endpoint: string,
  queryParams: Record<string, any> = {},
  options: { 
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    useCache?: boolean
  } = { method: 'GET', useCache: false }
): Promise<QueryResult> => {
  try {
    // In a real implementation, this would call the backend API
    // which would use the DB connection process
    
    const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
    const url = `${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
      },
      // If it's not a GET request and there are params, include them in the body
      body: options.method !== 'GET' && Object.keys(queryParams).length > 0 
        ? JSON.stringify(queryParams) 
        : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    return { rows: [] };
  }
};

// Helper function to get vendors/talents
export const getVendors = async (listId: string): Promise<any[]> => {
  const result = await executeQuery(`/api/vendors/${listId}`, {}, { useCache: true });
  return result.rows;
};

// Helper function to add a vendor/talent
export const addVendor = async (listId: string, vendorData: any): Promise<any> => {
  const result = await executeQuery(`/api/vendors/${listId}`, vendorData, { method: 'POST' });
  return result;
};

// Helper function to remove a vendor/talent
export const removeVendor = async (listId: string, vendorId: string): Promise<any> => {
  const result = await executeQuery(`/api/vendors/${listId}/${vendorId}`, {}, { method: 'DELETE' });
  return result;
};

// Helper function to get vendor lists
export const getVendorLists = async (): Promise<any[]> => {
  const result = await executeQuery('/api/vendor-lists', {}, { useCache: true });
  return result.rows;
};

// Helper function to create a vendor list
export const createVendorList = async (listData: any): Promise<any> => {
  const result = await executeQuery('/api/vendor-lists', listData, { method: 'POST' });
  return result;
};
