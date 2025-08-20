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

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      name: 'August Consistency Challenge',
      description: 'Work out at least 4 times per week for the entire month',
      participants: 1247,
      progress: 65,
      daysLeft: 12,
      prize: '🏆 Winner Badge + Feature on Main Feed',
      isJoined: true,
      category: 'consistency'
    },
    {
      id: 2,
      name: 'Plank Master Challenge', 
      description: 'Hold a plank for 2 minutes straight',
      participants: 892,
      progress: 40,
      daysLeft: 8,
      prize: '💪 Plank Master Badge',
      isJoined: false,
      category: 'strength'
    }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Workout', icon: '🌟', earned: true, date: '2024-08-01' },
    { id: 2, name: '7-Day Streak', icon: '🔥', earned: true, date: '2024-08-07' },
    { id: 3, name: 'Goal Crusher', icon: '🎯', earned: false, date: null },
    { id: 4, name: 'Social Butterfly', icon: '🦋', earned: true, date: '2024-08-15' },
    { id: 5, name: 'Consistency King', icon: '👑', earned: false, date: null }
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

  // Smart AI responses
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return "Based on your goals, I recommend a mix of strength training and cardio. Try: 3x/week strength training (compound movements like squats, deadlifts, push-ups) and 2x/week cardio (20-30 min sessions). What's your current fitness level?";
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
      return "Nutrition is key! Focus on: protein with every meal (0.8-1g per lb bodyweight), plenty of vegetables, complex carbs around workouts, and stay hydrated (half your bodyweight in ounces of water daily). What are your current eating habits?";
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('lose weight') || lowerMessage.includes('gain muscle')) {
      return "Great question! Setting SMART goals is crucial. Be specific, measurable, and realistic. For weight loss: aim for 1-2lbs per week. For muscle gain: focus on progressive overload and adequate protein. What's your main goal right now?";
    } else if (lowerMessage.includes('motivation') || lowerMessage.includes('stuck')) {
      return "I understand! Plateaus happen to everyone. Try: changing your routine, tracking measurements (not just weight), celebrating small wins, and remember why you started. Progress isn't always linear. What's been challenging you lately?";
    } else if (lowerMessage.includes('habit')) {
      return "Building habits is key to long-term success! I notice you're doing well with hydration. For the 10K steps, try taking walking breaks every hour, parking farther away, or taking stairs. Small changes add up!";
    } else if (lowerMessage.includes('challenge')) {
      return "Challenges are great for motivation! I see you're in the August Consistency Challenge. Try to maintain 4+ workouts per week. The plank challenge is also excellent for core strength - start with 30-second holds and build up!";
    } else if (lowerMessage.includes('offline') || lowerMessage.includes('pwa')) {
      return "Great question! This app works offline - you can log workouts, track habits, and view your data even without internet. Your data syncs automatically when you're back online!";
    } else if (lowerMessage.includes('install')) {
      return "You can install this app on your phone! Look for the 'Install App' button or use your browser's 'Add to Home Screen' option. It'll work just like a native app!";
    } else {
      return "That's a great question! I'm here to help with workouts, nutrition, goal setting, challenges, and motivation. Feel free to ask me anything about your fitness journey. What specific area would you like guidance on?";
    }
  };

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

  const joinChallenge = (challengeId) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isJoined: !challenge.isJoined, participants: challenge.isJoined ? challenge.participants - 1 : challenge.participants + 1 }
        : challenge
    ));
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = { type: 'user', message: chatInput };
      const aiResponse = { type: 'ai', message: getAIResponse(chatInput) };
      setChatMessages([...chatMessages, userMessage, aiResponse]);
      setChatInput('');
    }
  };

  const updateGoalProgress = (goalId, progress) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? {...goal, progress: Math.min(100, Math.max(0, progress))} : goal
    ));
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
              <h3 className="text-lg font-semibold">Challenges</h3>
              <p className="text-2xl font-bold">{challenges.filter(c => c.isJoined).length}</p>
            </div>
            <Trophy className="h-10 w-10" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Badges</h3>
              <p className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</p>
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
              App Features
            </h3>
            <p className="text-sm opacity-90 mt-1">
              ✓ Works offline  ✓ Install as app  ✓ Auto-sync data
            </p>
            <div className="flex items-center mt-2">
              {isOnline ? (
                <><Wifi className="h-4 w-4 mr-1" /><span className="text-sm">Online & Synced</span></>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        {/* Active Challenges */}
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold mb-4 flex items-center text-slate-800">
            <Trophy className="mr-2 text-amber-600" />
            Active Challenges
          </h3>
          <div className="space-y-4">
            {challenges.filter(c => c.isJoined).slice(0, 2).map((challenge) => (
              <div key={challenge.id} className="border-l-4 border-amber-500 pl-4">
                <h4 className="font-semibold text-sm text-slate-700">{challenge.name}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500">{challenge.daysLeft} days left</span>
                  <span className="text-xs font-semibold text-amber-600">{challenge.progress}%</span>
                </div>
                <div className="bg-stone-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold mb-4 flex items-center text-slate-800">
            <Award className="mr-2 text-purple-600" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {achievements.filter(a => a.earned).slice(-3).map((achievement) => (
              <div key={achievement.id} className="flex items-center">
                <span className="text-2xl mr-3">{achievement.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-slate-700">{achievement.name}</p>
                  <p className="text-xs text-slate-500">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ChallengesView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Fitness Challenges</h2>
          <div className="text-sm text-slate-600">
            {challenges.filter(c => c.isJoined).length} active challenges
          </div>
        </div>

        <div className="space-y-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border border-stone-200 rounded-lg p-6 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Trophy className="h-6 w-6 text-amber-500 mr-2" />
                    <h3 className="text-xl font-semibold text-slate-800">{challenge.name}</h3>
                    {challenge.isJoined && (
                      <span className="ml-3 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                        Joined
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-3">{challenge.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {challenge.participants} participants
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {challenge.daysLeft} days left
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => joinChallenge(challenge.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    challenge.isJoined 
                      ? 'bg-stone-200 text-slate-700 hover:bg-stone-300' 
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {challenge.isJoined ? 'Leave Challenge' : 'Join Challenge'}
                </button>
              </div>

              {challenge.isJoined && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Your Progress</span>
                    <span className="text-sm text-slate-600">{challenge.progress}%</span>
                  </div>
                  <div className="bg-stone-200 rounded-full h-3">
                    <div 
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="font-semibold text-amber-800">Prize: {challenge.prize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GoalsView = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
      title: '',
      description: '',
      target: '',
      deadline: ''
    });

    const handleAddGoal = () => {
      if (newGoal.title && newGoal.target) {
        addGoal(newGoal);
        setNewGoal({ title: '', description: '', target: '', deadline: '' });
        setShowAddForm(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Goals</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </button>
        </div>

        {showAddForm && (
          <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Create New Goal</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Goal title (e.g., Lose 20 pounds)"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="w-full border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              />
              <textarea
                placeholder="Description (optional)"
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                className="w-full border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
                rows="3"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Target (e.g., 150 lbs, 5K run)"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
                />
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleAddGoal}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Create Goal
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
          {goals.map((goal) => (
            <div key={goal.id} className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-800">{goal.title}</h3>
                {goal.progress === 100 && (
                  <Award className="h-6 w-6 text-amber-500" />
                )}
              </div>
              
              {goal.description && (
                <p className="text-slate-600 mb-4">{goal.description}</p>
              )}
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Target: {goal.target}</span>
                  {goal.deadline && (
                    <span className="text-slate-600">Due: {goal.deadline}</span>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Progress</span>
                    <span className="text-sm text-slate-600">{goal.progress}%</span>
                  </div>
                  <div className="bg-stone-200 rounded-full h-3">
                    <div 
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => updateGoalProgress(goal.id, goal.progress + 10)}
                    className="bg-emerald-600 text-white text-xs px-3 py-1 rounded hover:bg-emerald-700 transition-colors"
                  >
                    +10%
                  </button>
                  <button 
                    onClick={() => updateGoalProgress(goal.id, goal.progress - 10)}
                    className="bg-rose-600 text-white text-xs px-3 py-1 rounded hover:bg-rose-700 transition-colors"
                  >
                    -10%
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {goals.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Target className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No goals set yet</h3>
            <p className="text-slate-500">Create your first goal to start tracking your progress!</p>
          </div>
        )}
      </div>
    );
  };

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
            {!isOnline && <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Offline Mode</span>}
          </h2>
          <p className="text-stone-200 text-sm">Get personalized tips, workout suggestions, and motivation!</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-stone-100 text-slate-800 border border-stone-200'
              }`}>
                {msg.type === 'ai' && (
                  <div className="flex items-center mb-1">
                    <User className="h-4 w-4 mr-1 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-600">AI Coach</span>
                  </div>
                )}
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
              placeholder="Ask about workouts, nutrition, goals, motivation..."
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
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'challenges', name: 'Challenges', icon: Trophy },
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
          {activeTab === 'goals' && <GoalsView />}
          {activeTab === 'challenges' && <ChallengesView />}
          {activeTab === 'coach' && <AICoachView />}
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;
