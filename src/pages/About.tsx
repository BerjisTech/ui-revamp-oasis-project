
import React from 'react';
import { Button } from "@/components/ui/button";

const About = () => {
  const showTutorial = () => {
    // In a real implementation, this would show a tutorial modal
    console.log('Show tutorial');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-6 pb-12">
        <div className="container mx-auto p-4 sm:p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-proz-purple">Vendor Management Lists</h1>
            <p className="text-gray-700 mb-6">
              Search, organize, and communicate with language professionals at ProZ.com.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 md:pl-8">
              <h3 className="text-2xl font-semibold mb-4">About Lists</h3>

              <p className="mb-4">
                Lists is a ProZ.com application to manage recruitment of linguists and other localization professionals.
                It simplifies your recruitment initiatives by allowing you to select,
                organize and communicate with candidates in one workspace.
                The application is integrated with the ProZ.com directory and uses its real-time data.
              </p>

              <p className="mb-4">
                You collect names of candidates in cloud-based live mini databases - ProZ.com lists - with links to their profiles.
                You can start a list for specific projects, language pairs,
                and any category that helps you to organize your recruitment process and data.
              </p>

              <p className="mb-4">
                In each list,
                you can create folders to sort the candidates by different steps of your recruitment workflow,
                or other relevant organization criteria.
              </p>

              <p className="mb-6">
                Lists allows you to email the talents in a list,
                either each one individually or in groups.
                Messages sent and received are organized per list for easy reference and tracking.
                You can share a list with your collaborators and project managers who will use those lists to outsource jobs.
              </p>

              <Button onClick={showTutorial}>
                Take a tour
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
