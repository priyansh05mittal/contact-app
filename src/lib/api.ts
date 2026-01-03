const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export const api = {
    async createContact(contact: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'>) {
        const response = await fetch(`${API_BASE_URL}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create contact');
        }

        return response.json() as Promise<ApiResponse<Contact>>;
    },

    async getContacts() {
        const response = await fetch(`${API_BASE_URL}/contacts`);

        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }

        return response.json() as Promise<ApiResponse<Contact[]>>;
    },

    async deleteContact(id: string) {
        const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete contact');
        }

        return response.json() as Promise<ApiResponse<Contact>>;
    },
};
