import { useState } from 'react';
import { Contact } from '../lib/api';
import { Trash2, Mail, Phone, MessageSquare, Users, Loader2 } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  isLoading: boolean;
  onDeleteContact: (id: string) => Promise<void>;
}

export default function ContactList({ contacts, isLoading, onDeleteContact }: ContactListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setDeletingId(id);
      try {
        await onDeleteContact(id);
      } catch (error) {
        console.error('Delete error:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center justify-center gap-4 text-gray-500">
          <Users className="w-16 h-16 text-gray-300" />
          <p className="text-lg font-medium">No contacts yet</p>
          <p className="text-sm">Add your first contact using the form above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            All Contacts ({contacts.length})
          </h2>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{contact.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    {contact.message ? (
                      <p className="text-sm text-gray-600 truncate">{contact.message}</p>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No message</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(contact.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(contact._id, contact.name)}
                    disabled={deletingId === contact._id}
                    className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
                    title="Delete contact"
                  >
                    {deletingId === contact._id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-200">
        {contacts.map((contact) => (
          <div key={contact._id} className="p-4 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-900">{contact.name}</h3>
              <button
                onClick={() => handleDelete(contact._id, contact.name)}
                disabled={deletingId === contact._id}
                className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
                title="Delete contact"
              >
                {deletingId === contact._id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm break-all">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              {contact.message && (
                <div className="flex items-start gap-2 text-gray-600">
                  <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{contact.message}</p>
                </div>
              )}
              <div className="text-xs text-gray-500 mt-3">
                {formatDate(contact.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
