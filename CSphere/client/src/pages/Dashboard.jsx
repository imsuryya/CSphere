import React, { useState } from 'react';
import SearchBar from '../components/search-bar';
import AgentCard from '../components/agent-card';
import ProfileDropdown from '../components/profile-dropdown';
import { agentData, filterAgents } from '../agents';

const Dashboard = () => {
  const [filteredAgents, setFilteredAgents] = useState(agentData);

  const handleSearch = (term) => {
    setFilteredAgents(filterAgents(term));
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-orange-600">CSphere</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <SearchBar onSearch={handleSearch} />
            <ProfileDropdown onLogout={handleLogout} />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
