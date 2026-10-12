const API_BASE = '/api';

function getAuthHeader() {
  const token = localStorage.getItem('tdc_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || 'Network request failed');
  }

  return json;
}

export const api = {
  auth: {
    login: (credentials) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    getMe: () => request('/auth/me'),
    getMatchmakers: () => request('/auth/matchmakers')
  },

  clients: {
    list: (params = {}) => {
      const qs = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          qs.append(k, v);
        }
      });
      return request(`/clients?${qs.toString()}`);
    },
    getDetail: (id) => request(`/clients/${id}`),
    updateStage: (id, journeyStage) => request(`/clients/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ journeyStage })
    }),
    addNote: (id, noteData) => request(`/clients/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify(noteData)
    }),
    deleteNote: (noteId) => request(`/clients/notes/${noteId}`, {
      method: 'DELETE'
    })
  },

  matching: {
    getRanked: (customerId, filters = {}) => {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          qs.append(k, v);
        }
      });
      return request(`/matching/customer/${customerId}?${qs.toString()}`);
    },
    generatePitch: (customerId, candidateId, tone = 'warm_concierge') =>
      request(`/matching/customer/${customerId}/candidate/${candidateId}/pitch`, {
        method: 'POST',
        body: JSON.stringify({ tone })
      }),
    getReasoning: (customerId, candidateId) =>
      request(`/matching/customer/${customerId}/candidate/${candidateId}/reasoning`),
    sendMatch: (customerId, candidateId, matchPayload) =>
      request(`/matching/customer/${customerId}/candidate/${candidateId}/send`, {
        method: 'POST',
        body: JSON.stringify(matchPayload)
      })
  },

  stats: {
    getOverview: () => request('/stats')
  }
};
