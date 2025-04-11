
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MessageBoardProps {
  listId: string;
}

const MessageBoard = ({ listId }: MessageBoardProps) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!listId) return;
      
      setIsLoading(true);
      try {
        // In a real app, this would call the API
        // const messagesData = await getMessages(listId, activeTab);
        // For demo, we'll use empty data
        setMessages([]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
      setIsLoading(false);
    };
    
    fetchMessages();
  }, [listId, activeTab]);

  return (
    <div>
      <div className="bg-gradient-to-r from-proz-purple to-proz-purpleLight text-white px-4 py-3 flex items-center rounded-t-md shadow-sm">
        <div className="flex-1 flex items-center">
          <span className="mr-2">✉</span>
          <span className="font-medium">Message Board (0)</span>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            size="icon"
            variant="ghost"
            className="h-7 w-7 rounded-full bg-white/10 text-white hover:bg-white/20"
            disabled
          >
            <ChevronLeft size={16} />
          </Button>
          <Button 
            size="icon"
            variant="ghost"
            className="h-7 w-7 rounded-full bg-white/10 text-white hover:bg-white/20"
            disabled
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-b-md bg-white shadow-sm">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'inbox' ? 'border-b-2 border-proz-purple text-proz-purple' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('inbox')}
          >
            <span className="mr-1">✉</span> Inbox
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'sent' ? 'border-b-2 border-proz-purple text-proz-purple' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('sent')}
          >
            <span className="mr-1">→</span> Sent
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'archived' ? 'border-b-2 border-proz-purple text-proz-purple' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab('archived')}
          >
            <span className="mr-1">📁</span> Archived
          </button>
        </div>
        
        <div className="p-4 h-64 flex flex-col items-center justify-center">
          <div className="text-gray-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </div>
          <p className="text-gray-600">There are no messages for this list.</p>
          <Button 
            variant="outline" 
            className="mt-4 text-blue-600 hover:bg-blue-50 border-blue-200"
          >
            <Send size={16} className="mr-2" /> Compose New Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageBoard;
