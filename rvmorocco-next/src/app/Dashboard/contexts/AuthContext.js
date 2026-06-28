'use client';

// Re-export from the root AuthContext so there's a single source of truth.
// All Dashboard components that import from this path get the same context.
export { AuthProvider, useAuth } from '../../contexts/AuthContext';
