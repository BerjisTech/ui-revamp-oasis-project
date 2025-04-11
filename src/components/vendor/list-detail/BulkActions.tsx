
import React from 'react';
import { Send, Trash2, MoveRight, CheckCircle, Info, Users } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserSearchForm from "@/components/user-directory/UserSearchForm";
import { toast } from "sonner";

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
  const [searchDrawerOpen, setSearchDrawerOpen] = React.useState(false);

  const filteredFolders = folders.filter(folder => 
    folder.name.toLowerCase().includes(folderSearchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    onSendMessage(messageSubject, messageBody);
    setMessageSubject('');
    setMessageBody('');
    setComposeDrawerOpen(false);
  };

  const handleAddUsersToList = (selectedUsers: any[]) => {
    // In a real implementation, this would add the selected users to the list
    toast.success(`${selectedUsers.length || 'Multiple'} users added to list`);
    setSearchDrawerOpen(false);
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Sheet open={searchDrawerOpen} onOpenChange={setSearchDrawerOpen}>
          <SheetTrigger asChild>
            <span className="text-gray-700 cursor-pointer hover:text-gray-900 flex items-center gap-1">
              Select talents and...
            </span>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Search & Add Talents</SheetTitle>
              <SheetDescription>
                Search for talents to add to {listName}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <UserSearchForm 
                showAddButton={true}
                onAddToList={handleAddUsersToList}
              />
            </div>
          </SheetContent>
        </Sheet>
        
        <TooltipProvider>
          <Drawer open={composeDrawerOpen} onOpenChange={setComposeDrawerOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                    <Send size={16} />
                  </Button>
                </DrawerTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
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
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                <Trash2 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Popover open={movePopoverOpen} onOpenChange={setMovePopoverOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                    <MoveRight size={16} />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Move to folder</p>
              </TooltipContent>
            </Tooltip>
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
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                <CheckCircle size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Post a Job</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
