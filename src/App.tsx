import { useState, useEffect } from 'react';
import { api, Contact } from './lib/api';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { BookUser } from 'lucide-react';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await api.getContacts();
      setContacts(response.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Failed to load contacts. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await api.deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete contact. Please try again.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookUser className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Contact Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your contacts efficiently and securely
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <ContactForm onContactAdded={fetchContacts} />
          </div>
          <div className="lg:row-span-2">
            <ContactList
              contacts={contacts}
              isLoading={isLoading}
              onDeleteContact={handleDeleteContact}
            />
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>Built with React, TypeScript, Tailwind CSS, and Supabase</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
