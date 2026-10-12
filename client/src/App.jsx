import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './api/client';
import { Navbar } from './components/Navbar';
import { LoginView } from './components/LoginView';
import { MetricsSummary } from './components/MetricsSummary';
import { CustomerList } from './components/CustomerList';
import { CustomerDetail } from './components/CustomerDetail';
import { MatchingStudio } from './components/MatchingStudio';
import { SendMatchModal } from './components/SendMatchModal';
import { AddNoteModal } from './components/AddNoteModal';
import { ViewPitchModal } from './components/ViewPitchModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const { isAuthenticated, loading: authLoading, matchmaker } = useAuth();

  // Navigation State
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' | 'detail' | 'matching'
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Data States
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(120);
  const [stats, setStats] = useState(null);

  // Filtering for Client List
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [assignedOnly, setAssignedOnly] = useState(true);

  // Matching Studio State
  const [matches, setMatches] = useState([]);
  const [matchesLoading, setMatchesLoading] = useState(false);
  const [matchFilters, setMatchFilters] = useState({ city: '', minAge: '', maxAge: '', maritalStatus: '' });

  // Modal States
  const [activeSendMatch, setActiveSendMatch] = useState(null);
  const [activeViewPitch, setActiveViewPitch] = useState(null);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Fetch Stats on mount / after match sent
  const loadStats = async () => {
    try {
      const res = await api.stats.getOverview();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch stats:', err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  // 2. Fetch Client Roster
  const loadClients = async () => {
    if (!isAuthenticated) return;
    setClientsLoading(true);

    try {
      const params = {
        search: search.trim() || undefined,
        journeyStage: filterStage || undefined,
        gender: filterGender || undefined,
        matchmakerId: assignedOnly && matchmaker ? matchmaker.id : 'all',
        limit: 120
      };

      const res = await api.clients.list(params);
      if (res.success) {
        setClients(res.data);
        setTotalCount(res.meta ? res.meta.total : res.data.length);
      }
    } catch (err) {
      console.error('Failed to load clients:', err);
    } finally {
      setClientsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadClients();
    }, 200);
    return () => clearTimeout(timer);
  }, [isAuthenticated, search, filterStage, filterGender, assignedOnly, matchmaker]);

  // 3. Fetch Full Customer Detail (when selected)
  const handleSelectCustomer = async (clientSummary) => {
    try {
      const res = await api.clients.getDetail(clientSummary.id);
      if (res.success) {
        setSelectedCustomer(res.data);
        setActiveTab('detail');
      }
    } catch (err) {
      alert('Error fetching customer detail: ' + err.message);
    }
  };

  // 4. Update Journey Stage
  const handleUpdateStage = async (newStage) => {
    if (!selectedCustomer) return;
    try {
      const res = await api.clients.updateStage(selectedCustomer.id, newStage);
      if (res.success) {
        // Refresh customer detail
        const refreshed = await api.clients.getDetail(selectedCustomer.id);
        if (refreshed.success) {
          setSelectedCustomer(refreshed.data);
        }
        loadClients();
        loadStats();
        showToast(`Journey stage updated to "${newStage.replace('_', ' ').toUpperCase()}"`);
      }
    } catch (err) {
      alert('Failed to update stage: ' + err.message);
    }
  };

  // 5. Add Note
  const handleAddNote = async (clientId, noteData) => {
    const res = await api.clients.addNote(clientId, noteData);
    if (res.success) {
      // Refresh customer detail
      const refreshed = await api.clients.getDetail(clientId);
      if (refreshed.success) {
        setSelectedCustomer(refreshed.data);
      }
      showToast('Matchmaker note successfully logged to timeline');
    }
    return res;
  };

  // 6. Delete Note
  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Delete this note from client timeline?')) return;
    try {
      const res = await api.clients.deleteNote(noteId);
      if (res.success && selectedCustomer) {
        const refreshed = await api.clients.getDetail(selectedCustomer.id);
        if (refreshed.success) {
          setSelectedCustomer(refreshed.data);
        }
        showToast('Note deleted');
      }
    } catch (err) {
      alert('Failed to delete note: ' + err.message);
    }
  };

  // 7. Load Ranked Matches for Matching Studio
  const loadMatches = async (customerId, currentFilters) => {
    setMatchesLoading(true);
    try {
      const res = await api.matching.getRanked(customerId, currentFilters);
      if (res.success) {
        setMatches(res.data.matches);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setMatchesLoading(false);
    }
  };

  // Navigate to Matching Studio
  const handleGoToMatching = () => {
    if (!selectedCustomer) return;
    setActiveTab('matching');
    loadMatches(selectedCustomer.id, matchFilters);
  };

  // Filter change in Matching Studio
  const handleMatchFilterChange = (newFilters) => {
    setMatchFilters(newFilters);
    if (selectedCustomer) {
      loadMatches(selectedCustomer.id, newFilters);
    }
  };

  // Match Sent Callback
  const handleMatchSentCallback = ({ candidateName }) => {
    showToast(`Curated match profile of ${candidateName} successfully dispatched!`);
    loadStats();
    if (selectedCustomer) {
      loadMatches(selectedCustomer.id, matchFilters);
      // Also refresh customer to show new note in timeline
      api.clients.getDetail(selectedCustomer.id).then(r => {
        if (r.success) setSelectedCustomer(r.data);
      });
    }
  };

  // Unauthenticated View
  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--tdc-cream)' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--tdc-green-800)' }}>
          Loading The Date Crew Studio...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        selectedCustomer={selectedCustomer}
        onClearCustomer={() => {
          setSelectedCustomer(null);
          setActiveTab('clients');
        }}
      />

      {/* Main Workspace Body */}
      <main style={{ flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '24px 24px 48px' }}>
        {/* Tab 1: Customer Roster */}
        {activeTab === 'clients' && (
          <div>
            <MetricsSummary stats={stats} />
            <CustomerList
              clients={clients}
              loading={clientsLoading}
              selectedId={selectedCustomer ? selectedCustomer.id : null}
              onSelectCustomer={handleSelectCustomer}
              search={search}
              onSearchChange={setSearch}
              filterStage={filterStage}
              onStageChange={setFilterStage}
              filterGender={filterGender}
              onGenderChange={setFilterGender}
              assignedOnly={assignedOnly}
              onAssignedOnlyChange={setAssignedOnly}
              totalCount={totalCount}
            />
          </div>
        )}

        {/* Tab 2: Selected Customer Full Biodata & Notes */}
        {activeTab === 'detail' && selectedCustomer && (
          <CustomerDetail
            customer={selectedCustomer}
            onUpdateStage={handleUpdateStage}
            onOpenAddNote={() => setIsAddNoteOpen(true)}
            onDeleteNote={handleDeleteNote}
            onGoToMatching={handleGoToMatching}
          />
        )}

        {/* Tab 3: Algorithmic Matchmaking Studio */}
        {activeTab === 'matching' && selectedCustomer && (
          <MatchingStudio
            customer={selectedCustomer}
            matches={matches}
            loading={matchesLoading}
            filters={matchFilters}
            onFilterChange={handleMatchFilterChange}
            onBackToCustomer={() => setActiveTab('detail')}
            onOpenSendMatch={(match) => setActiveSendMatch(match)}
            onViewPitch={(match) => setActiveViewPitch(match)}
          />
        )}
      </main>

      {/* Send Match Modal */}
      {activeSendMatch && selectedCustomer && (
        <SendMatchModal
          customer={selectedCustomer}
          match={activeSendMatch}
          onClose={() => setActiveSendMatch(null)}
          onMatchSent={handleMatchSentCallback}
        />
      )}

      {/* Add Call / Meeting Note Modal */}
      {isAddNoteOpen && selectedCustomer && (
        <AddNoteModal
          customer={selectedCustomer}
          onClose={() => setIsAddNoteOpen(false)}
          onNoteAdded={handleAddNote}
        />
      )}

      {/* View Dispatched Pitch Modal */}
      {activeViewPitch && selectedCustomer && (
        <ViewPitchModal
          match={activeViewPitch}
          customer={selectedCustomer}
          onClose={() => setActiveViewPitch(null)}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle2 size={18} color="#fef08a" />
          <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
