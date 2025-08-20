import React, { useState } from 'react';
import { Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, ThumbsUp, Send, Video, Download } from 'lucide-react';

const FitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [progressPhotos, setProgressPhotos] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 8 glasses of water', streak: 5, completed: true, category: 'hydration' },
    { id: 2, name: '10,000 steps daily', streak: 3, completed: false, category: 'activity' },
    { id: 3, name: '8 hours of sleep', streak: 2, completed: true, category: 'recovery' }
  ]);
  const [workoutTemplates, setWorkoutTemplates] = useState([
    {
      id: 1,
      name: 'Full Body HIIT',
      creator: 'Sarah Johnson',
      duration: 30,
      difficulty: 'Intermediate',
      exercises: [
        { name: 'Burpees', sets: 3, reps: 10, duration: 30 },
        { name: 'Jump Squats', sets: 3, reps: 15, duration: 45 },
        { name: 'Push-ups', sets: 3, reps: 12, duration: 30 },
        { name: 'Mountain Climbers', sets: 3, reps: 20, duration: 45 }
      ],
      tags: ['HIIT', 'Full Body', 'No Equipment'],
      likes: 24,
      uses: 156
    },
    {
      id: 2,
      name: 'Beginner Strength',
      creator: 'Mike Chen',
      duration: 45,
      difficulty: 'Beginner',
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: 12, duration: null },
        { name: 'Wall Push-ups', sets: 3, reps: 8, duration: null },
        { name: 'Planks', sets: 3, reps: null, duration: 30 },
        { name: 'Lunges', sets: 3, reps: 10, duration: null }
      ],
      tags: ['Beginner', 'Strength', 'Bodyweight'],
      likes: 18,
      uses: 89
    }
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

  // Analytics mock data
  const analyticsData = {
    weeklyWorkouts: [
      { week: 'Week 1', workouts: 3, duration: 120 },
      { week: 'Week 2', workouts: 4, duration: 150 },
      { week: 'Week 3', workouts: 5, duration: 180 },
      { week: 'Week 4', workouts: 4, duration: 160 },
    ],
    workoutTypes: [
      { type: 'Strength', count: 12, percentage: 40 },
      { type: 'Cardio', count: 9, percentage: 30 },
      { type: 'Flexibility', count: 6, percentage: 20 },
      { type: 'Sports', count: 3, percentage: 10 }
    ],
    progressMetrics: {
      totalWorkouts: workouts.length,
      totalHours: Math.round(workouts.reduce((sum, w) => sum + parseInt(w.duration || 0), 0) / 60),
      averagePerWeek: 4.2,
      consistencyScore: 85
    }
  };

  // Mock AI responses
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('challenge')) {
      return "Challenges are great for motivation! I see you're in the August Consistency Challenge. Try to maintain 4+ workouts per week. The plank challenge is also excellent for core strength - start with 30-second holds and build up!";
    } else if (lowerMessage.includes('habit')) {
      return "Building habits is key to long-term success! I notice you're doing well with hydration. For the 10K steps, try taking walking breaks every hour, parking farther away, or taking stairs. Small changes add up!";
    } else if (lowerMessage.includes('template')) {
      return "Workout templates are perfect for consistency! The 'Full Body HIIT' template is popular for good reason. Try it 2-3x per week with rest days between. You can also create your own templates based on exercises you enjoy!";
    } else if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return "Based on your goals, I recommend a mix of strength training and cardio. Try: 3x/week strength training (compound movements like squats, deadlifts, push-ups) and 2x/week cardio (20-30 min sessions). What's your current fitness level?";
    } else if (lowerMessage.includes('analytics') || lowerMessage.includes('progress')) {
      return "Your analytics show great consistency! You're averaging 4.2 workouts per week with an 85% consistency score. Focus on maintaining this rhythm. I notice strength training makes up 40% of your workouts - consider adding more variety for balanced fitness!";
    } else {
      return "That's a great question! I'm here to help with workouts, nutrition, goal setting, challenges, and motivation. Feel free to ask me anything about your fitness journey. What specific area would you like guidance on?";
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProgressPhotos([...progressPhotos, {
          id: Date.now(),
          src: e.target.result,
          date: new Date().toLocaleDateString(),
          notes: ''
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (workoutId) => {
    // Simulate video upload
    alert('Video uploaded! In a real app, this would process and attach the video to your workout.');
  };

  const addWorkout = (workout) => {
    const newWorkout = { ...workout, id: Date.now(), date: new Date().toLocaleDateString() };
    setWorkouts([...workouts, newWorkout]);
    
    // Auto-post to social feed
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
  };

  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, id: Date.now(), progress: 0, created: new Date().toLocaleDateString() }]);
  };

  const addWorkoutTemplate = (template) => {
    setWorkoutTemplates([...workoutTemplates, { ...template, id: Date.now(), creator: userProfile.name, likes: 0, uses: 0 }]);
  };

  const useTemplate = (template) => {
    setActiveTab('workouts');
    // Pre-fill workout form with template data
    alert(`Starting "${template.name}" workout! This would pre-fill the workout form with the template exercises.`);
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

  const AnalyticsView = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 text-center border border-stone-200">
          <BarChart3 className="h-8 w-8 text-slate-700 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-600">Total Workouts</h3>
          <p className="text-3xl font-bold text-slate-800">{analyticsData.progressMetrics.totalWorkouts}</p>
        </div>
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 text-center border border-stone-200">
          <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-600">Total Hours</h3>
          <p className="text-3xl font-bold text-emerald-600">{analyticsData.progressMetrics.totalHours}</p>
        </div>
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 text-center border border-stone-200">
          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-600">Weekly Average</h3>
          <p className="text-3xl font-bold text-purple-600">{analyticsData.progressMetrics.averagePerWeek}</p>
        </div>
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 text-center border border-stone-200">
          <Star className="h-8 w-8 text-amber-600 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-600">Consistency</h3>
          <p className="text-3xl font-bold text-amber-600">{analyticsData.progressMetrics.consistencyScore}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold mb-4 text-slate-800">Weekly Workout Trends</h3>
          <div className="space-y-3">
            {analyticsData.weeklyWorkouts.map((week, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{week.week}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Dumbbell className="h-4 w-4 text-slate-600 mr-1" />
                    <span className="text-sm text-slate-600">{week.workouts} workouts</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-sm text-slate-600">{week.duration} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold mb-4 text-slate-800">Workout Type Distribution</h3>
          <div className="space-y-4">
            {analyticsData.workoutTypes.map((type, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">{type.type}</span>
                  <span className="text-sm text-slate-600">{type.count} workouts ({type.percentage}%)</span>
                </div>
                <div className="bg-stone-200 rounded-full h-3">
                  <div 
                    className="bg-slate-700 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${type.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Progress Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">💪 Strength</h4>
            <p className="text-sm text-slate-700">You're consistently strong with 40% of workouts being strength training. Consider adding more compound movements for better results.</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">❤️ Cardio</h4>
            <p className="text-sm text-emerald-700">Your cardio consistency is good at 30%. Try adding one more cardio session per week to boost heart health.</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">🧘 Recovery</h4>
            <p className="text-sm text-purple-700">Great job including flexibility work! Recovery is key for long-term progress and injury prevention.</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2">🎯 Recommendation</h4>
            <p className="text-sm text-amber-700">Based on your data, try the "Full Body HIIT" template twice a week to maximize your time and results.</p>
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

      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Habit Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">💧 Hydration</h4>
            <p className="text-sm text-blue-700">Stay hydrated for better performance and recovery</p>
            <div className="mt-2 text-lg font-bold text-blue-600">
              {habits.filter(h => h.category === 'hydration').length} habits
            </div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">🏃 Activity</h4>
            <p className="text-sm text-emerald-700">Keep moving throughout the day</p>
            <div className="mt-2 text-lg font-bold text-emerald-600">
              {habits.filter(h => h.category === 'activity').length} habits
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">😴 Recovery</h4>
            <p className="text-sm text-purple-700">Rest and recovery are essential for progress</p>
            <div className="mt-2 text-lg font-bold text-purple-600">
              {habits.filter(h => h.category === 'recovery').length} habits
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TemplatesView = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
      name: '',
      duration: '',
      difficulty: 'Beginner',
      exercises: [{ name: '', sets: '', reps: '', duration: '' }],
      tags: ''
    });

    const addExercise = () => {
      setNewTemplate({
        ...newTemplate,
        exercises: [...newTemplate.exercises, { name: '', sets: '', reps: '', duration: '' }]
      });
    };

    const updateExercise = (index, field, value) => {
      const updatedExercises = newTemplate.exercises.map((exercise, i) => 
        i === index ? { ...exercise, [field]: value } : exercise
      );
      setNewTemplate({ ...newTemplate, exercises: updatedExercises });
    };

    const handleCreateTemplate = () => {
      if (newTemplate.name && newTemplate.exercises.some(e => e.name)) {
        const template = {
          ...newTemplate,
          tags: newTemplate.tags.split(',').map(tag => tag.trim()),
          exercises: newTemplate.exercises.filter(e => e.name)
        };
        addWorkoutTemplate(template);
        setNewTemplate({
          name: '',
          duration: '',
          difficulty: 'Beginner',
          exercises: [{ name: '', sets: '', reps: '', duration: '' }],
          tags: ''
        });
        setShowCreateForm(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Workout Templates</h2>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Create New Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Template name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={newTemplate.duration}
                onChange={(e) => setNewTemplate({...newTemplate, duration: e.target.value})}
                className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              />
              <select
                value={newTemplate.difficulty}
                onChange={(e) => setNewTemplate({...newTemplate, difficulty: e.target.value})}
                className="border border-stone-300 rounded-lg p-3 bg-white focus:border-slate-500 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-slate-700">Exercises</h4>
              {newTemplate.exercises.map((exercise, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Exercise name"
                    value={exercise.name}
                    onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    className="border border-stone-300 rounded p-2 bg-white focus:border-slate-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Sets"
                    value={exercise.sets}
                    onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                    className="border border-stone-300 rounded p-2 bg-white focus:border-slate-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                    className="border border-stone-300 rounded p-2 bg-white focus:border-slate-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Duration (sec)"
                    value={exercise.duration}
                    onChange={(e) => updateExercise(index, 'duration', e.target.value)}
                    className="border border-stone-300 rounded p-2 bg-white focus:border-slate-500 focus:outline-none"
                  />
                </div>
              ))}
              <button 
                onClick={addExercise}
                className="text-slate-600 hover:text-slate-800 text-sm"
              >
                + Add Exercise
              </button>
            </div>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newTemplate.tags}
              onChange={(e) => setNewTemplate({...newTemplate, tags: e.target.value})}
              className="w-full border border-stone-300 rounded-lg p-3 mb-4 bg-white focus:border-slate-500 focus:outline-none"
            />

            <div className="flex gap-3">
              <button 
                onClick={handleCreateTemplate}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Create Template
              </button>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="bg-stone-300 text-slate-700 px-6 py-2 rounded-lg hover:bg-stone-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workoutTemplates.map((template) => (
            <div key={template.id} className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{template.name}</h3>
                  <p className="text-slate-600">by {template.creator}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    template.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                    template.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {template.difficulty}
                  </span>
                  <button className="text-slate-400 hover:text-slate-600">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-slate-600">
                  <Clock className="mr-2 h-4 w-4" />
                  {template.duration} minutes
                </div>
                <div className="space-y-2">
                  {template.exercises.slice(0, 3).map((exercise, index) => (
                    <div key={index} className="text-sm bg-white rounded p-2 border border-stone-200">
                      <span className="font-medium text-slate-700">{exercise.name}</span>
                      {exercise.sets && exercise.reps && (
                        <span className="text-slate-600 ml-2">
                          {exercise.sets} sets × {exercise.reps} reps
                        </span>
                      )}
                      {exercise.duration && (
                        <span className="text-slate-600 ml-2">
                          {exercise.duration}s
                        </span>
                      )}
                    </div>
                  ))}
                  {template.exercises.length > 3 && (
                    <div className="text-sm text-slate-500">
                      +{template.exercises.length - 3} more exercises
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.map((tag, index) => (
                  <span key={index} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded border">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {template.likes}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {template.uses} uses
                  </span>
                </div>
                <button 
                  onClick={() => useTemplate(template)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {workoutTemplates.length === 0 && !showCreateForm && (
          <div className="text-center py-12">
            <Bookmark className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No templates created yet</h3>
            <p className="text-slate-500">Create your first workout template to share with the community!</p>
          </div>
        )}
      </div>
    );
  };

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
                      onClick={() => useTemplate(post.content)}
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

  // Keep existing views with minor updates
  const ProfileView = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <div className="flex items-center space-x-6 mb-6">
          <div className="text-6xl">{userProfile.avatar}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800">{userProfile.name}</h2>
            <p className="text-slate-600">{userProfile.username}</p>
            <p className="text-slate-700 mt-2">{userProfile.bio}</p>
          </div>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
        </div>
        
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-700">{userProfile.workoutsCompleted}</p>
            <p className="text-sm text-slate-600">Workouts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">{userProfile.goalsAchieved}</p>
            <p className="text-sm text-slate-600">Goals</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{userProfile.followers}</p>
            <p className="text-sm text-slate-600">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">{userProfile.following}</p>
            <p className="text-sm text-slate-600">Following</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-rose-600">{userProfile.currentStreak}</p>
            <p className="text-sm text-slate-600">Streak</p>
          </div>
        </div>
      </div>

      <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Recent Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.filter(a => a.earned).map((achievement) => (
            <div key={achievement.id} className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold text-sm text-slate-700">{achievement.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{achievement.date}</p>
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
                onClick={() => {}}
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
    </div>
  );

  const ProgressPhotosView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Progress Photos</h2>
        <label className="bg-slate-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Upload Photo
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        </label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {progressPhotos.map((photo) => (
          <div key={photo.id} className="bg-stone-50 rounded-xl shadow-lg overflow-hidden border border-stone-200">
            <img src={photo.src} alt="Progress" className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-slate-600 mb-2">{photo.date}</p>
              <textarea 
                placeholder="Add notes about this progress photo..."
                className="w-full text-sm border border-stone-300 rounded p-2 bg-white focus:border-slate-500 focus:outline-none"
                value={photo.notes}
                onChange={(e) => {
                  setProgressPhotos(progressPhotos.map(p => 
                    p.id === photo.id ? {...p, notes: e.target.value} : p
                  ));
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {progressPhotos.length === 0 && (
        <div className="text-center py-12">
          <Camera className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">No progress photos yet</h3>
          <p className="text-slate-500">Upload your first photo to start tracking your transformation!</p>
        </div>
      )}
    </div>
  );

  const WorkoutView = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newWorkout, setNewWorkout] = useState({
      name: '',
      type: 'Strength',
      duration: '',
      exercises: '',
      notes: '',
      hasVideo: false
    });

    const handleAddWorkout = () => {
      if (newWorkout.name && newWorkout.duration) {
        addWorkout(newWorkout);
        setNewWorkout({ name: '', type: 'Strength', duration: '', exercises: '', notes: '', hasVideo: false });
        setShowAddForm(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Workouts</h2>
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
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="hasVideo"
                checked={newWorkout.hasVideo}
                onChange={(e) => setNewWorkout({...newWorkout, hasVideo: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="hasVideo" className="text-sm text-slate-700">Include workout video</label>
            </div>
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
                <div className="flex items-center space-x-2">
                  <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full border">
                    {workout.type}
                  </span>
                  {workout.hasVideo && (
                    <Video className="h-4 w-4 text-rose-500" />
                  )}
                  <button 
                    onClick={() => handleVideoUpload(workout.id)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
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
              placeholder="Ask about workouts, habits, challenges, templates..."
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
    { id: 'challenges', name: 'Challenges', icon: Trophy },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'habits', name: 'Habits', icon: CheckCircle },
    { id: 'templates', name: 'Templates', icon: Bookmark },
    { id: 'workouts', name: 'Workouts', icon: Dumbbell },
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'friends', name: 'Friends', icon: UserPlus },
    { id: 'photos', name: 'Photos', icon: Camera },
    { id: 'coach', name: 'AI Coach', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              FitTrack Social
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
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
          {activeTab === 'challenges' && <ChallengesView />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'habits' && <HabitsView />}
          {activeTab === 'templates' && <TemplatesView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'friends' && <FriendsView />}
          {activeTab === 'workouts' && <WorkoutView />}
          {activeTab === 'goals' && <GoalsView />}
          {activeTab === 'photos' && <ProgressPhotosView />}
          {activeTab === 'coach' && <AICoachView />}
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;
