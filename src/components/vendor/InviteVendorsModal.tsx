
import React, { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface InviteVendorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  listId: string;
}

const InviteVendorsModal = ({ isOpen, onClose, listId }: InviteVendorsModalProps) => {
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFileName('');
      return;
    }

    if (file.type !== 'text/csv') {
      toast.error('Please select a CSV file');
      setFileName('');
      return;
    }

    setFileName(file.name);
    
    // In a real app, we would process the CSV file here
    // For demo, we'll just show the file name
    toast.success(`File ${file.name} selected`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emails.trim() && !fileName) {
      toast.error('Please enter email addresses or upload a CSV file');
      return;
    }

    // Validate emails
    const emailList = emails.split(',').map(email => email.trim()).filter(Boolean);
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
    const validEmails = emailList.filter(email => emailRegex.test(email));
    
    if (emailList.length > 0 && validEmails.length === 0) {
      toast.error('Please enter valid email addresses');
      return;
    }

    // In a real app, we would send the invitation here
    // For demo, we'll just show a success message
    toast.success('Invitations sent successfully');
    onClose();
    setEmails('');
    setMessage('');
    setFileName('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-proz-purple">Invite Vendors</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="emails" className="text-sm font-medium">
              Email Addresses
            </label>
            <textarea
              id="emails"
              className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proz-purple/50"
              placeholder="Enter email addresses separated by commas"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Add email addresses separated by commas to invite multiple vendors
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message (optional)
            </label>
            <textarea
              id="message"
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-proz-purple/50"
              placeholder="Add a personal message to your invitation"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-sm font-bold">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start border-dashed border-2 text-gray-700"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="mr-2">📎</span>
              Import CSV file (optional)
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileSelect}
            />
            {fileName && (
              <div className="text-sm p-2 bg-blue-50 text-blue-700 rounded">
                Selected file: {fileName}
              </div>
            )}
          </div>
          
          <SheetFooter className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-proz-purple hover:bg-proz-purple/90">
              Send Invitations
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default InviteVendorsModal;
