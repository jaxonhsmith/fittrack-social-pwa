import React, { useState } from 'react';
import { Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, Send } from 'lucide-react';

const FitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 8 glasses of water', streak: 5, completed: true },
    { id: 2, name: '10,000 steps daily', streak: 3, completed: false },
    { id: 3, name: '8 hours of sleep', streak: 2, completed: true }
  ]);

  const [workoutTemplates, setWorkoutTemplates] = useState([
    {
      id: 1,
      name: 'Full Body HIIT',
      creator: 'Sarah Johnson',
      duration: 30,
      difficulty: 'Intermediate',
      exercises: [
        { name: 'Burpees', sets: 3, reps: 10 },
        { name: 'Jump Squats', sets: 3, reps: 15 },
        { name: 'Push-ups', sets: 3, reps: 12 },
        { name: 'Mountain Climbers', sets: 3, reps: 20 }
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
        { name: 'Bodyweight Squats', sets: 3, reps: 12 },
        { name: 'Wall Push-ups', sets: 3, reps: 8 },
        { name: 'Planks', sets: 3, duration: 30 },
        { name: 'Lunges', sets: 3, reps: 10 }
      ],
      tags: ['Beginner', 'Strength', 'Bodyweight'],
      likes: 18,
      uses: 89
    }
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
        notes: 'Great for burning calories! 30 sec work, 15 sec rest.'
      },
      likes: 12,
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
      timeAgo: 'just now',
      isLiked: false
    };
    setSocialFeed([socialPost, ...socialFeed]);
  };

  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, id: Date.now(), progress: 0, created: new Date().toLocaleDateString() }]);
  };

  // FIXED: Renamed from "useTemplate" to "startTemplate" (no "use" prefix!)
  const startTemplate = (template) => {
    setActiveTab('workouts');
    alert(`Starting "${template.name}" workout! This would pre-fill the workout form with the template exercises.`);
  };

  const toggleHabit = (habitId) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak - 1 : habit.streak + 1 }
        : habit
    ));
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const userMessage = { type: 'user', message: chatInput };
      const aiResponse = { type: 'ai', message: "Great question! I'm here to help with your fitness journey. Keep up the amazing work!" };
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

  const DashboardView = () => (
    <div className="space-y-6">
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
            <Target className="h-10 w-10" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Friends</h3>
              <p className="text-2xl font-bold">{friends.filter(f => f.isFollowing).length}</p>
            </div>
            <Users className="h-10 w-10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold mb-4 flex items-center text-slate-800">
            <TrendingUp className="mr-2 text-blue-600" />
            Activity Feed
          </h3>
          {socialFeed.slice(0, 3).map((post) => (
            <div key={post.id} className="border-l-4 border-blue-500 pl-4 mb-4 last:mb-0">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{post.user.avatar}</span>
                <div>
                  <h4 className="font-semibold text-sm">{post.user.name}</h4>
                  <p className="text-xs text-gray-500">{post.timeAgo}</p>
                </div>
              </div>
              {post.type === 'workout' ? (
                <div>
                  <p className="font-medium">{post.content.name}</p>
                  <p className="text-sm text-gray-600">{post.content.type} • {post.content.duration} min</p>
                </div>
              ) : (
                <p className="text-sm">{post.content.text}</p>
              )}
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Heart className="h-3 w-3 mr-1" />
                {post.likes} likes
              </div>
            </div>
          ))}
        </div>

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
                    <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full border">
                      {post.content.type}
                    </span>
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
                  <button 
                    onClick={() => startTemplate(post.content)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors mt-3 flex items-center"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Try This Workout
                  </button>
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
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 ${post.isLiked ? 'text-rose-500' : 'text-slate-500'} hover:text-rose-500 transition-colors`}
                >
                  <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes} likes</span>
                </button>
                <span className="text-slate-500 text-sm">Share workout</span>
              </div>
            </div>
          ))}
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
    </div>
  );

  const TemplatesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Workout Templates</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workoutTemplates.map((template) => (
          <div key={template.id} className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">{template.name}</h3>
                <p className="text-slate-600">by {template.creator}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                template.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                template.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {template.difficulty}
              </span>
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
                onClick={() => startTemplate(template)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
              >
                <Play className="mr-2 h-4 w-4" />
                Use Template
              </button>
            </div>
          </div>
        ))}
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
              <button className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                friend.isFollowing 
                  ? 'bg-stone-200 text-slate-700 hover:bg-stone-300' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}>
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
        <h3 className="text-xl font-bold mb-4 text-slate-800">Recent Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workouts.slice(-4).map((workout) => (
            <div key={workout.id} className="border border-slate-200 rounded-lg p-4 bg-white">
              <h4 className="font-semibold">{workout.name}</h4>
              <p className="text-sm text-slate-600">{workout.type} • {workout.duration} min</p>
              <p className="text-xs text-slate-500">{workout.date}</p>
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
              placeholder="Ask about workouts, nutrition, goals, or templates..."
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
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'templates', name: 'Templates', icon: Bookmark },
    { id: 'workouts', name: 'Workouts', icon: Dumbbell },
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'friends', name: 'Friends', icon: UserPlus },
    { id: 'profile', name: 'Profile', icon: User },
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
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'templates' && <TemplatesView />}
          {activeTab === 'workouts' && <WorkoutView />}
          {activeTab === 'goals' && <GoalsView />}
          {activeTab === 'friends' && <FriendsView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'coach' && <AICoachView />}
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;
