import React, { useState, useEffect } from 'react';
import { Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, ThumbsUp, Send, Video, Download, Wifi, WifiOff, Smartphone } from 'lucide-react';

// PWA Hooks
const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setIsInstallable(false);
      setInstallPrompt(null);
    }
  };

  return { isInstallable, installApp };
};

const useOfflineStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
      
      // Queue for sync when online
      if (!isOnline) {
        const pendingSync = JSON.parse(localStorage.getItem('pendingSync') || '[]');
        pendingSync.push({ key, value: newValue, timestamp: Date.now() });
        localStorage.setItem('pendingSync', JSON.stringify(pendingSync));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [value, setStoredValue, isOnline];
};

const FitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [progressPhotos, setProgressPhotos] = useOfflineStorage('progressPhotos', []);
  const [workouts, setWorkouts] = useOfflineStorage('workouts', []);
  const [goals, setGoals] = useOfflineStorage('goals', []);
  const [habits, setHabits] = useOfflineStorage('habits', [
    { id: 1, name: 'Drink 8 glasses of water', streak: 5, completed: true, category: 'hydration' },
    { id: 2, name: '10,000 steps daily', streak: 3, completed: false, category: 'activity' },
    { id: 3, name: '8 hours of sleep', streak: 2, completed: true, category: 'recovery' }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: 'You',
    username: '@yourfit',
    bio: 'On a journey to become my best self! 💪',
    avatar: '🔥',
    followers: 45,
    following: 67,
    workoutsCompleted: workouts.length,
    goalsAchieved: goals.filter(g => g.progress === 100).length,
    currentStreak: 7,
    longestStreak: 15
  });

  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', message: "Hi! I'm your AI fitness coach. I'm here to help you reach your goals! What would you like to work on today?" }
  ]);
  const [chatInput, setChatInput] = useState('');

  // PWA functionality
  const { isInstallable, installApp } = usePWA();
  const isOnline = navigator.onLine;

  const addWorkout = (workout) => {
    const newWorkout = { ...workout, id: Date.now(), date: new Date().toLocaleDateString() };
    setWorkouts([...workouts, newWorkout]);
  };

  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, id: Date.now(), progress: 0, created: new Date().toLocaleDateString() }]);
  };

  const toggleHabit = (habitId) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? Math.max(0, habit.streak - 1) : habit.streak + 1 }
        : habit
    ));
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = { type: 'user', message: chatInput };
      const aiResponse = { type: 'ai', message: "Thanks for your message! I'm here to help with your fitness journey." };
      setChatMessages([...chatMessages, userMessage, aiResponse]);
      setChatInput('');
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Workouts</h3>
              <p className="text-2xl font-bold text-amber-300">{workouts.length}</p>
            </div>
            <Dumbbell className="h-10 w-10 text-amber-300" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Streak</h3>
              <p className="text-2xl font-bold">{userProfile.currentStreak}</p>
            </div>
            <Zap className="h-10 w-10" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Goals</h3>
              <p className="text-2xl font-bold">{goals.length}</p>
            </div>
            <Trophy className="h-10 w-10" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Habits</h3>
              <p className="text-2xl font-bold">{habits.filter(h => h.completed).length}</p>
            </div>
            <Award className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* PWA Features Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Smartphone className="mr-2 h-6 w-6" />
              Your Fitness App is Ready!
            </h3>
            <p className="text-sm opacity-90 mt-1">
              ✓ Works offline  ✓ Install as app  ✓ Track everything
            </p>
            <div className="flex items-center mt-2">
              {isOnline ? (
                <><Wifi className="h-4 w-4 mr-1" /><span className="text-sm">Online & Ready</span></>
              ) : (
                <><WifiOff className="h-4 w-4 mr-1" /><span className="text-sm">Offline Mode</span></>
              )}
            </div>
          </div>
          {isInstallable && (
            <button
              onClick={installApp}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Install App
            </button>
          )}
        </div>
      </div>

      {/* Today's Habits */}
      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-xl font-bold mb-4 flex items-center text-slate-800">
          <CheckCircle className="mr-2 text-emerald-600" />
          Today's Habits
        </h3>
        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => toggleHabit(habit.id)}
                  className={`mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    habit.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-emerald-400'
                  }`}
                >
                  {habit.completed && <CheckCircle className="h-4 w-4" />}
                </button>
                <div>
                  <p className={`font-medium text-slate-700 ${habit.completed ? 'line-through text-slate-500' : ''}`}>
                    {habit.name}
                  </p>
                  <p className="text-xs text-slate-500">{habit.streak} day streak</p>
                </div>
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-semibold text-slate-700">{habit.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const WorkoutView = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
      name: '',
      type: 'Strength',
      duration: '',
      exercises: '',
      notes: ''
    });

    const handleAddWorkout = () => {
      if (newWorkout.name && newWorkout.duration) {
        addWorkout(newWorkout);
        setNewWorkout({ name: '', type: 'Strength', duration: '', exercises: '', notes: '' });
        setShowAddForm(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            Workouts
            {!isOnline && <span className="ml-2 text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded">Saved Offline</span>}
          </h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Log Workout
          </button>
        </div>

        {showAddForm && (
          <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Log New Workout</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Workout name"
                value={newWorkout.name}
                onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              />
              <select
                value={newWorkout.type}
                onChange={(e) => setNewWorkout({...newWorkout, type: e.target.value})}
                className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              >
                <option value="Strength">Strength Training</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility/Yoga</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={newWorkout.duration}
                onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
                className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Key exercises"
                value={newWorkout.exercises}
                onChange={(e) => setNewWorkout({...newWorkout, exercises: e.target.value})}
                className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Notes (optional)"
              value={newWorkout.notes}
              onChange={(e) => setNewWorkout({...newWorkout, notes: e.target.value})}
              className="w-full border border-stone-300 rounded-lg p-3 mt-4 bg-white focus:border-slate-500 focus:outline-none"
              rows="3"
            />
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleAddWorkout}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {isOnline ? 'Save Workout' : 'Save Offline'}
              </button>
              <button 
                onClick={() => setShowAddForm(false)}
                className="bg-stone-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-stone-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-slate-800">{workout.name}</h3>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full border">
                  {workout.type}
                </span>
              </div>
              <div className="space-y-2">
                <p className="flex items-center text-slate-600">
                  <Clock className="mr-2 h-4 w-4" />
                  {workout.duration} minutes
                </p>
                {workout.exercises && (
                  <p className="text-slate-600">
                    <strong>Exercises:</strong> {workout.exercises}
                  </p>
                )}
                {workout.notes && (
                  <p className="text-slate-600">
                    <strong>Notes:</strong> {workout.notes}
                  </p>
                )}
                <p className="text-sm text-slate-500">{workout.date}</p>
              </div>
            </div>
          ))}
        </div>

        {workouts.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Dumbbell className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No workouts logged yet</h3>
            <p className="text-slate-500">Start logging your workouts - they'll be saved even when offline!</p>
          </div>
        )}
      </div>
    );
  };

  const AICoachView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-stone-50 rounded-xl shadow-lg h-96 flex flex-col border border-stone-200">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 rounded-t-xl">
          <h2 className="text-xl font-bold flex items-center">
            <MessageCircle className="mr-2" />
            AI Fitness Coach
          </h2>
          <p className="text-stone-200 text-sm">Get personalized tips and motivation!</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-stone-100 text-slate-800 border border-stone-200'
              }`}>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-stone-200 bg-white rounded-b-xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about workouts, habits, or fitness tips..."
              className="flex-1 border border-stone-300 rounded-lg px-3 py-2 bg-white focus:border-slate-500 focus:outline-none"
            />
            <button 
              onClick={sendMessage}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'workouts', name: 'Workouts', icon: Dumbbell },
    { id: 'coach', name: 'AI Coach', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              FitTrack Social PWA
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="h-5 w-5 text-emerald-400" />
                ) : (
                  <WifiOff className="h-5 w-5 text-amber-400" />
                )}
                <Zap className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-semibold text-stone-200">{userProfile.currentStreak} day streak</span>
              </div>
              <span className="text-2xl">{userProfile.avatar}</span>
              <div className="text-sm">
                <p className="font-semibold text-white">{userProfile.name}</p>
                <p className="text-stone-300">{userProfile.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-1 mb-6 bg-white rounded-lg p-1 shadow-lg overflow-x-auto border border-stone-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'workouts' && <WorkoutView />}
          {activeTab === 'coach' && <AICoachView />}
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;