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
    },
    {
      id: 3,
      name: '10K Steps Daily',
      description: 'Hit 10,000 steps every day this week',
      participants: 2156,
      progress: 85,
      daysLeft: 3,
      prize: '👟 Step Champion Badge',
      isJoined: true,
      category: 'cardio'
    }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Workout', icon: '🌟', earned: true, date: '2024-08-01' },
    { id: 2, name: '7-Day Streak', icon: '🔥', earned: true, date: '2024-08-07' },
    { id: 3, name: 'Goal Crusher', icon: '🎯', earned: false, date: null },
    { id: 4, name: 'Social Butterfly', icon: '🦋', earned: true, date: '2024-08-15' },
    { id: 5, name: 'Consistency King', icon: '👑', earned: false, date: null }
  ]);

  const [friends, setFriends] = useState([
    { id: 1, name: 'Sarah Johnson', username: '@sarahfit', avatar: '👩‍💪', followers: 234, following: 156, isFollowing: true },
    { id: 2, name: 'Mike Chen', username: '@mikelifts', avatar: '💪', followers: 189, following: 203, isFollowing: true },
    { id: 3, name: 'Emma Davis', username: '@emmarunner', avatar: '🏃‍♀️', followers: 456, following: 234, isFollowing: false }
  ]);

  const [socialFeed, setSocialFeed] = useState([
    {
      id: 1,
      user: { name: 'Sarah Johnson', username: '@sarahfit', avatar: '👩‍💪' },
      type: 'workout',
      content: {
        name: 'HIIT Cardio Blast',
        type: 'Cardio',
        duration: 25,
        exercises: 'Burpees, Mountain Climbers, Jump Squats',
        notes: 'Great for burning calories! 30 sec work, 15 sec rest.',
        hasVideo: true
      },
      likes: 12,
      comments: [
        { id: 1, user: 'Mike Chen', text: 'This looks intense! Definitely trying tomorrow 💪', timeAgo: '1h ago' },
        { id: 2, user: 'Emma Davis', text: 'Love the energy! How did you feel after?', timeAgo: '45m ago' },
        { id: 3, user: 'You', text: 'Amazing workout! The burpees killed me 😅', timeAgo: '30m ago' }
      ],
      timeAgo: '2h ago',
      isLiked: false
    },
    {
      id: 2,
      user: { name: 'Mike Chen', username: '@mikelifts', avatar: '💪' },
      type: 'progress',
      content: {
        text: 'Hit a new PR today! 225lb deadlift! 💪 Consistency pays off!',
        achievement: 'New Personal Record'
      },
      likes: 23,
      comments: [
        { id: 1, user: 'Sarah Johnson', text: 'Incredible! So proud of you! 🎉', timeAgo: '2h ago' },
        { id: 2, user: 'You', text: 'Beast mode! What\'s your next goal?', timeAgo: '1h ago' }
      ],
      timeAgo: '4h ago',
      isLiked: true
    }
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});

  // PWA functionality
  const { isInstallable, installApp } = usePWA();
  const isOnline = navigator.onLine;

  // Mock AI responses
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('challenge')) {
      return "Challenges are great for motivation! I see you're in the August Consistency Challenge. Try to maintain 4+ workouts per week. The plank challenge is also excellent for core strength - start with 30-second holds and build up!";
    } else if (lowerMessage.includes('habit')) {
      return "Building habits is key to long-term success! I notice you're doing well with hydration. For the 10K steps, try taking walking breaks every hour, parking farther away, or taking stairs. Small changes add up!";
    } else if (lowerMessage.includes('friends') || lowerMessage.includes('social')) {
      return "Having workout buddies is amazing for motivation! Try sharing your workouts with friends, join group challenges, or find an accountability partner. Social support increases your chance of success by 95%!";
    } else if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return "Based on your goals, I recommend a mix of strength training and cardio. Try: 3x/week strength training (compound movements like squats, deadlifts, push-ups) and 2x/week cardio (20-30 min sessions). What's your current fitness level?";
    } else {
      return "That's a great question! I'm here to help with workouts, nutrition, goal setting, challenges, and motivation. Feel free to ask me anything about your fitness journey. What specific area would you like guidance on?";
    }
  };

  const addWorkout = (workout) => {
    const newWorkout = { ...workout, id: Date.now(), date: new Date().toLocaleDateString() };
    setWorkouts([...workouts, newWorkout]);
    
    // Auto-post to social feed
    if (isOnline) {
      const socialPost = {
        id: Date.now() + 1,
        user: userProfile,
        type: 'workout',
        content: newWorkout,
        likes: 0,
        comments: [],
        timeAgo: 'just now',
        isLiked: false
      };
      setSocialFeed([socialPost, ...socialFeed]);
    }
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

  const toggleLike = (postId) => {
    setSocialFeed(socialFeed.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const followFriend = (friendId) => {
    setFriends(friends.map(friend => 
      friend.id === friendId 
        ? { ...friend, isFollowing: !friend.isFollowing, followers: friend.isFollowing ? friend.followers - 1 : friend.followers + 1 }
        : friend
    ));
  };

  const addComment = (postId) => {
    const commentText = newComment[postId];
    if (commentText && commentText.trim()) {
      setSocialFeed(socialFeed.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, { 
                id: Date.now(), 
                user: userProfile.name, 
                text: commentText, 
                timeAgo: 'just now' 
              }] 
            }
          : post
      ));
      setNewComment({ ...newComment, [postId]: '' });
    }
  };

  const toggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const tryWorkout = (workout) => {
    setActiveTab('workouts');
    alert(`Starting "${workout.name}" workout! This would pre-fill the workout form with the template exercises.`);
  };

  // PWA Install Banner Component
  const PWAInstallBanner = () => {
    if (!isInstallable) return null;

    return (
      <div className="fixed bottom-4 left-4 right-4 bg-slate-800 text-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between">
        <div className="flex items-center">
          <Smartphone className="h-6 w-6 mr-3 text-amber-400" />
          <div>
            <p className="font-semibold">Install FitTrack</p>
            <p className="text-sm text-stone-300">Get the full app experience!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsInstallable(false)}
            className="px-3 py-1 text-sm bg-stone-600 rounded hover:bg-stone-500"
          >
            Later
          </button>
          <button
            onClick={installApp}
            className="px-3 py-1 text-sm bg-amber-600 rounded hover:bg-amber-500"
          >
            Install
          </button>
        </div>
      </div>
    );
  };

  // Offline Indicator Component
  const OfflineIndicator = () => {
    if (isOnline) return null;

    return (
      <div className="fixed top-16 left-4 right-4 bg-amber-500 text-white p-3 rounded-lg shadow-lg z-40 flex items-center">
        <WifiOff className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">You're offline. Data will sync when connection is restored.</span>
      </div>
    );
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
              <h3 className="text-lg font-semibold">Friends</h3>
              <p className="text-2xl font-bold">{friends.filter(f => f.isFollowing).length}</p>
            </div>
            <Users className="h-10 w-10" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Challenges</h3>
              <p className="text-2xl font-bold">{challenges.filter(c => c.isJoined).length}</p>
            </div>
            <Trophy className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* PWA Features Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <Smartphone className="mr-2 h-6 w-6" />
              FitTrack Social
            </h3>
            <p className="text-sm opacity-90 mt-1">
              ✓ Works offline  ✓ Social features  ✓ Challenge friends
            </p>
            <div className="flex items-center mt-2">
              {isOnline ? (
                <><Wifi className="h-4 w-4 mr-1" /><span className="text-sm">Online & Connected</span></>
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

        {/* Friend Activity */}
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold mb-4 flex items-center text-slate-800">
            <Users className="mr-2 text-rose-600" />
            Friend Activity
          </h3>
          <div className="space-y-3">
            {friends.filter(f => f.isFollowing).slice(0, 3).map((friend) => (
              <div key={friend.id} className="flex items-center">
                <span className="text-2xl mr-3">{friend.avatar}</span>
                <div>
                  <p className="font-semibold text-sm text-slate-700">{friend.name}</p>
                  <p className="text-xs text-slate-500">completed a workout</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SocialView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Social Feed</h2>
        
        <div className="space-y-6">
          {socialFeed.map((post) => (
            <div key={post.id} className="border border-stone-200 rounded-lg p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{post.user.avatar}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">{post.user.name}</h4>
                    <p className="text-sm text-slate-500">{post.user.username} • {post.timeAgo}</p>
                  </div>
                </div>
                <Share2 className="h-5 w-5 text-slate-400 cursor-pointer hover:text-slate-600" />
              </div>
              
              {post.type === 'workout' ? (
                <div className="bg-stone-50 rounded-lg p-4 mb-4 border border-stone-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-800">{post.content.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full border">
                        {post.content.type}
                      </span>
                      {post.content.hasVideo && (
                        <Video className="h-4 w-4 text-rose-500" />
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center text-slate-600">
                      <Clock className="mr-2 h-4 w-4" />
                      {post.content.duration} minutes
                    </p>
                    {post.content.exercises && (
                      <p className="text-slate-600">
                        <strong>Exercises:</strong> {post.content.exercises}
                      </p>
                    )}
                    {post.content.notes && (
                      <p className="text-slate-600">
                        <strong>Notes:</strong> {post.content.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => tryWorkout(post.content)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Try This Workout
                    </button>
                    {post.content.hasVideo && (
                      <button className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center">
                        <Video className="mr-2 h-4 w-4" />
                        Watch Video
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-slate-800">{post.content.text}</p>
                  {post.content.achievement && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-amber-600 mr-2" />
                        <span className="font-semibold text-amber-800">{post.content.achievement}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-2 ${post.isLiked ? 'text-rose-500' : 'text-slate-500'} hover:text-rose-500 transition-colors`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes} likes</span>
                  </button>
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-2 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>{post.comments.length} comments</span>
                  </button>
                </div>
              </div>

              {showComments[post.id] && (
                <div className="mt-4 pt-4 border-t border-stone-200">
                  <div className="space-y-3 mb-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-stone-50 rounded-lg p-3 border border-stone-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-sm text-slate-700">{comment.user}</span>
                            <p className="text-sm mt-1 text-slate-600">{comment.text}</p>
                          </div>
                          <span className="text-xs text-slate-500">{comment.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                      className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm bg-white focus:border-slate-500 focus:outline-none"
                    />
                    <button 
                      onClick={() => addComment(post.id)}
                      className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FriendsView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Find Friends</h2>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-stone-300 rounded-lg px-3 py-2 bg-white focus:border-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between p-4 border border-stone-200 rounded-lg bg-white">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{friend.avatar}</span>
                <div>
                  <h3 className="font-semibold text-slate-800">{friend.name}</h3>
                  <p className="text-slate-600">{friend.username}</p>
                  <p className="text-sm text-slate-500">
                    {friend.followers} followers • {friend.following} following
                  </p>
                </div>
              </div>
              <button 
                onClick={() => followFriend(friend.id)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  friend.isFollowing 
                    ? 'bg-stone-200 text-slate-700 hover:bg-stone-300' 
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {friend.isFollowing ? (
                  <>
                    <Users className="mr-2 h-4 w-4" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Follow
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Your Network</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-2xl font-bold text-emerald-600">{friends.filter(f => f.isFollowing).length}</p>
            <p className="text-sm text-emerald-700">Following</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-2xl font-bold text-amber-600">{userProfile.followers}</p>
            <p className="text-sm text-amber-700">Followers</p>
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

      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Your Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`text-center p-4 rounded-lg border-2 ${
              achievement.earned 
                ? 'border-amber-300 bg-amber-50' 
                : 'border-stone-200 bg-stone-100 opacity-50'
            }`}>
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold text-sm text-slate-700">{achievement.name}</h4>
              {achievement.earned && achievement.date && (
                <p className="text-xs text-slate-500 mt-1">{achievement.date}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const HabitsView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Daily Habits</h2>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Habit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-50 rounded-lg p-4 text-center border border-emerald-200">
            <div className="text-3xl font-bold text-emerald-600">{habits.filter(h => h.completed).length}</div>
            <div className="text-sm text-emerald-700">Completed Today</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-200">
            <div className="text-3xl font-bold text-amber-600">{Math.max(...habits.map(h => h.streak))}</div>
            <div className="text-sm text-amber-700">Longest Streak</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
            <div className="text-3xl font-bold text-purple-600">{Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length)}</div>
            <div className="text-sm text-purple-700">Average Streak</div>
          </div>
        </div>

        <div className="space-y-4">
          {habits.map((habit) => (
            <div key={habit.id} className="border border-stone-200 rounded-lg p-6 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={() => toggleHabit(habit.id)}
                    className={`mr-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      habit.completed 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-stone-300 hover:border-emerald-400'
                    }`}
                  >
                    {habit.completed && <CheckCircle className="h-5 w-5" />}
                  </button>
                  <div>
                    <h3 className={`text-lg font-semibold ${habit.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                      {habit.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Zap className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-sm text-slate-600">{habit.streak} day streak</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    habit.category === 'hydration' ? 'text-blue-600' :
                    habit.category === 'activity' ? 'text-emerald-600' : 'text-purple-600'
                  }`}>
                    {habit.streak}
                  </div>
                  <div className="text-xs text-slate-500 capitalize">{habit.category}</div>
                </div>
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
                Save & Share Workout
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
            <p className="text-slate-500">Start logging your workouts to share with friends!</p>
          </div>
        )}
      </div>
    );
  };

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

    const updateGoalProgress = (goalId, progress) => {
      setGoals(goals.map(goal => 
        goal.id === goalId ? {...goal, progress: Math.min(100, Math.max(0, progress))} : goal
      ));
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

  const AICoachView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-stone-50 rounded-xl shadow-lg h-96 flex flex-col border border-stone-200">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 rounded-t-xl">
          <h2 className="text-xl font-bold flex items-center">
            <MessageCircle className="mr-2" />
            AI Fitness Coach
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
              placeholder="Ask about workouts, habits, challenges, social features..."
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
    { id: 'social', name: 'Social', icon: Users },
    { id: 'workouts', name: 'Workouts', icon: Dumbbell },
    { id: 'friends', name: 'Friends', icon: UserPlus },
    { id: 'challenges', name: 'Challenges', icon: Trophy },
    { id: 'habits', name: 'Habits', icon: CheckCircle },
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'coach', name: 'AI Coach', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200">
      <OfflineIndicator />
      <PWAInstallBanner />
      
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              FitTrack Social
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
          {activeTab === 'social' && <SocialView />}
          {activeTab === 'workouts' && <WorkoutView />}
          {activeTab === 'friends' && <FriendsView />}
          {activeTab === 'challenges' && <ChallengesView />}
          {activeTab === 'habits' && <HabitsView />}
          {activeTab === 'goals' && <GoalsView />}
          {activeTab === 'coach' && <AICoachView />}
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;
