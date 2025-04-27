export interface BackendResponse {
    status: 'incomplete' | 'complete';
    questions?: { field: string; question: string }[];
    previewUrl?: string;
    downloadToken?: string;
  }
  