
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import AddToListDialog from './AddToListDialog';

const AddToListDemo = () => {
  const [showDialog, setShowDialog] = useState(false);

  // Sample data
  const vendorName = "John Smith";
  const vendorLists = [
    { id: "123", name: "Spanish Translators" },
    { id: "456", name: "Preferred Vendors" }
  ];
  const notes = [
    { 
      id: "1", 
      text: "Great translator, worked with us on the XYZ project", 
      time_added: "04/10/2025, 10:23 AM" 
    },
    { 
      id: "2", 
      text: "Always delivers on time. Specializes in technical content.", 
      time_added: "04/09/2025, 2:45 PM" 
    }
  ];

  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Vendor List Management Demo</h2>
      
      <Button onClick={() => setShowDialog(true)}>
        Show "Add to List" Dialog
      </Button>
      
      <AddToListDialog 
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        vendorName={vendorName}
        vendorLists={vendorLists}
        notes={notes}
      />
    </div>
  );
};

export default AddToListDemo;
