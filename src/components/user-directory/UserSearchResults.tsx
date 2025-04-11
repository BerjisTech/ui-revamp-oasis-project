
import React from 'react';

const UserSearchResults = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h2 className="text-center font-medium text-lg mb-4">Welcome to the LWA search page!</h2>
        
        <div className="text-sm mb-6">
          <p className="mb-2">On this page you can search for translators and interpreters in the ProZ.com directory.</p>
          
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To start a search, enter the criteria that will narrow down the results to the right search for your project.</li>
            <li>Drag and drop the selected talents from your search results into one of your lists in the List Board (right).</li>
            <li>To go back to the main page, just click the link you are working on.</li>
            <li>If you want to save the search parameters for future reference, give your search a descriptive name, and press "Enter". The search will then be available in the Saved Searches folder.</li>
          </ul>
          
          <p className="text-center mb-4">
            <strong>Happy searching!</strong>
          </p>
          
          <p className="text-center text-sm text-gray-600">
            Please consider providing your feedback below, so we can make this service even better. Thanks!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSearchResults;
