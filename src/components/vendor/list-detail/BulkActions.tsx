
import React from 'react';
import { Send, Trash2, MoveRight, CheckCircle, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Search } from 'lucide-react';

interface BulkActionsProps {
  folders: Array<{ id: string; name: string }>;
  onMoveToFolder: (folderId: string) => void;
  onSendMessage: (subject: string, body: string) => void;
  listName: string;
}

const BulkActions = ({ folders, onMoveToFolder, onSendMessage, listName }: BulkActionsProps) => {
  const [movePopoverOpen, setMovePopoverOpen] = React.useState(false);
  const [folderSearchQuery, setFolderSearchQuery] = React.useState('');
  const [composeDrawerOpen, setComposeDrawerOpen] = React.useState(false);
  const [messageSubject, setMessageSubject] = React.useState('');
  const [messageBody, setMessageBody] = React.useState('');

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(folderSearchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    onSendMessage(messageSubject, messageBody);
    setMessageSubject('');
    setMessageBody('');
    setComposeDrawerOpen(false);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-gray-700">Select talents and...</span>
        <Drawer open={composeDrawerOpen} onOpenChange={setComposeDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              <Send size={14} className="mr-1" /> Send message
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-6">
            <DrawerHeader className="px-0">
              <DrawerTitle className="text-xl">Compose New Message</DrawerTitle>
              <DrawerDescription>
                Send a message to vendors in {listName}
              </DrawerDescription>
            </DrawerHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input 
                  id="subject" 
                  placeholder="Message subject" 
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Write your message here..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                />
              </div>
            </div>
            <DrawerFooter className="px-0">
              <Button onClick={handleSendMessage}>Send Message</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
          <Trash2 size={14} className="mr-1" /> Remove
        </Button>
        <Popover open={movePopoverOpen} onOpenChange={setMovePopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              <MoveRight size={14} className="mr-1" /> Move <span className="ml-1">▼</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h3 className="font-medium">Move to Folder</h3>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search folders..."
                  className="pl-8"
                  value={folderSearchQuery}
                  onChange={(e) => setFolderSearchQuery(e.target.value)}
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredFolders.length > 0 ? (
                  <div className="space-y-2">
                    {filteredFolders.map((folder) => (
                      <div
                        key={folder.id}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => onMoveToFolder(folder.id)}
                      >
                        <span>{folder.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm py-2 text-center">No folders found</p>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
          <CheckCircle size={14} className="mr-1" /> Post a Job
        </Button>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-3 rounded-md flex items-start">
        <div className="text-blue-600 mr-3 mt-1 flex-shrink-0">
          <Info size={16} />
        </div>
        <div className="text-blue-700 text-sm">
          Click "Add talent" above to add people to this list.
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
