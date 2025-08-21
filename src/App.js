import React, { useState, useEffect } from 'react';
import { Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, Send, Home, Compass, PlusSquare, MoreHorizontal, Filter, Mic, Image, MapPin, Hash, Brain, Activity, ChevronRight, ChevronDown, X, Edit3, ThumbsUp, Bot, LineChart, PieChart, Flame, Medal } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('people');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState(false);

  // User data and progress
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    username: '@alexfits',
    avatar: '🔥',
    followers: 1247,
    following: 892,
    posts: 156,
    bio: 'Fitness enthusiast on a journey to become the best version of myself 💪',
    level: 12,
    streak: 15,
    totalWorkouts: 89,
    weeklyGoal: 5,
    currentWeekWorkouts: 3
  });

  const [workoutStats, setWorkoutStats] = useState({
    thisWeek: 3,
    lastWeek: 5,
    totalWorkouts: 89,
    favoriteExercise: 'Deadlifts',
    currentStreak: 15,
    personalRecords: 12,
    totalVolume: '125,000 lbs'
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Consistency King', description: '15 day workout streak', icon: '🔥', earned: true, date: '2 days ago' },
    { id: 2, title: 'Strength Warrior', description: 'Hit 10 personal records', icon: '💪', earned: true, date: '1 week ago' },
    { id: 3, title: 'Social Butterfly', description: 'Get 100 followers', icon: '🦋', earned: true, date: '2 weeks ago' },
    { id: 4, title: 'Century Club', description: 'Complete 100 workouts', icon: '💯', earned: false, progress: 89 },
    { id: 5, title: 'Mentor', description: 'Help 5 people reach their goals', icon: '🎯', earned: false, progress: 3 }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Alex Rodriguez', username: '@alexfits', avatar: '💪', followers: 12400, verified: true },
      type: 'workout',
      content: {
        text: "Absolutely crushed today's deadlift session! New PR: 405lbs 🔥 Consistency and progressive overload are everything. What's your current PR?",
        workout: {
          exercise: 'Deadlifts',
          weight: '405 lbs',
          sets: 5,
          reps: 3,
          duration: '45 min',
          bodyPart: 'Back',
          difficulty: 'Advanced'
        },
        tags: ['deadlift', 'strength', 'pr', 'powerlifting']
      },
      likes: 847,
      comments: 92,
      shares: 23,
      timeAgo: '3h',
      isLiked: false,
      gym: 'Iron Temple Gym',
      aiInsight: 'Great form focus! Consider adding Romanian deadlifts for posterior chain development.'
    },
    {
      id: 2,
      user: { name: 'Maya Chen', username: '@mayaruns', avatar: '🏃‍♀️', followers: 8900, verified: false },
      type: 'progress',
      content: {
        text: "6 months transformation update! Down 25lbs and feeling stronger than ever. The journey isn't always linear but every step counts 💫",
        achievement: '6 Month Transformation',
        stats: { weight: '-25 lbs', bf: '-8%', muscle: '+3 lbs' },
        beforeAfter: true
      },
      likes: 1204,
      comments: 156,
      shares: 67,
      timeAgo: '8h',
      isLiked: true,
      gym: null,
      aiInsight: 'Amazing progress! Your consistency is showing. Consider adding resistance training to preserve muscle mass.'
    },
    {
      id: 3,
      user: { name: 'Jordan Kim', username: '@jordanyoga', avatar: '🧘‍♀️', followers: 15600, verified: true },
      type: 'routine',
      content: {
        text: "Morning flow to start the day right ☀️ 20 minutes that change everything. Swipe for the full sequence!",
        routine: {
          name: 'Morning Sun Salutation',
          duration: '20 min',
          difficulty: 'Beginner',
          exercises: ['Sun Salutation A', 'Warrior I', 'Downward Dog', 'Child\'s Pose'],
          calories: 85
        },
        tags: ['yoga', 'morning', 'flexibility', 'mindfulness']
      },
      likes: 523,
      comments: 34,
      shares: 89,
      timeAgo: '12h',
      isLiked: false,
      gym: 'Home Practice',
      aiInsight: 'Perfect for mobility! Try adding hip flexor stretches for better morning movement patterns.'
    }
  ]);

  const [comments, setComments] = useState({
    1: [
      { id: 1, user: 'Sarah M.', avatar: '💪', text: 'Incredible PR! What\'s your training split?', timeAgo: '2h', likes: 12 },
      { id: 2, user: 'Mike T.', avatar: '🏋️‍♂️', text: 'Form looks solid! Great depth on those reps.', timeAgo: '1h', likes: 8 }
    ],
    2: [
      { id: 3, user: 'Lisa R.', avatar: '🌟', text: 'You\'re an inspiration! Keep it up!', timeAgo: '5h', likes: 24 },
      { id: 4, user: 'David P.', avatar: '🔥', text: 'What was your biggest game changer?', timeAgo: '4h', likes: 15 }
    ]
  });

  const [aiRecommendations, setAIRecommendations] = useState([
    {
      id: 1,
      type: 'workout',
      title: 'Upper Body Power Day',
      description: 'Based on your recent lower body focus, time to balance with upper body strength',
      exercises: ['Bench Press', 'Pull-ups', 'Overhead Press', 'Barbell Rows'],
      duration: '60 min',
      difficulty: 'Intermediate',
      reason: 'You\'ve done 3 leg workouts this week. Balance is key!',
      confidence: 95
    },
    {
      id: 2,
      type: 'recovery',
      title: 'Active Recovery Session',
      description: 'Light movement to promote recovery after yesterday\'s intense session',
      exercises: ['Walking', 'Yoga Flow', 'Foam Rolling', 'Meditation'],
      duration: '30 min',
      difficulty: 'Easy',
      reason: 'Your previous workout intensity suggests you need recovery',
      confidence: 88
    },
    {
      id: 3,
      type: 'nutrition',
      title: 'Post-Workout Nutrition',
      description: 'Optimize your recovery with proper nutrition timing',
      recommendations: ['25g Protein within 30min', 'Complex carbs', 'Stay hydrated'],
      reason: 'Your workout intensity requires proper recovery nutrition',
      confidence: 92
    }
  ]);

  const [newPost, setNewPost] = useState({
    text: '',
    type: 'general',
    workout: { exercise: '', weight: '', sets: '', reps: '', duration: '', bodyPart: '', difficulty: 'Beginner' },
    tags: '',
    location: ''
  });

  const [newComment, setNewComment] = useState('');

  // AI Coach responses
  const [aiCoachMessages, setAICoachMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Hey Alex! I\'ve analyzed your workout patterns. You\'re crushing it with consistency! 🔥',
      timestamp: '2 min ago'
    },
    {
      id: 2,
      type: 'ai', 
      text: 'I noticed you\'ve been focusing on lower body lately. Want me to suggest an upper body routine to balance things out?',
      timestamp: '2 min ago'
    }
  ]);

  const [aiInput, setAIInput] = useState('');

  // Toggle functions
  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const toggleComments = (post) => {
    setSelectedPost(post);
    setShowComments(!showComments);
  };

  const addComment = () => {
    if (newComment.trim() && selectedPost) {
      const comment = {
        id: Date.now(),
        user: userData.name,
        avatar: userData.avatar,
        text: newComment,
        timeAgo: 'now',
        likes: 0
      };
      
      setComments(prev => ({
        ...prev,
        [selectedPost.id]: [...(prev[selectedPost.id] || []), comment]
      }));
      
      setPosts(posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, comments: post.comments + 1 }
          : post
      ));
      
      setNewComment('');
    }
  };

  const handleCreatePost = () => {
    if (newPost.text.trim()) {
      const post = {
        id: Date.now(),
        user: { name: userData.name, username: userData.username, avatar: userData.avatar, followers: userData.followers, verified: false },
        type: newPost.type,
        content: {
          text: newPost.text,
          ...(newPost.type === 'workout' && { workout: newPost.workout }),
          tags: newPost.tags.split(' ').filter(tag => tag.startsWith('#'))
        },
        likes: 0,
        comments: 0,
        shares: 0,
        timeAgo: 'now',
        isLiked: false,
        gym: newPost.location,
        aiInsight: 'Great work! Keep building those healthy habits! 💪'
      };
      
      setPosts([post, ...posts]);
      
      // Update user stats
      if (newPost.type === 'workout') {
        setWorkoutStats(prev => ({
          ...prev,
          thisWeek: prev.thisWeek + 1,
          totalWorkouts: prev.totalWorkouts + 1
        }));
        
        setUserData(prev => ({
          ...prev,
          posts: prev.posts + 1,
          totalWorkouts: prev.totalWorkouts + 1,
          currentWeekWorkouts: prev.currentWeekWorkouts + 1
        }));
      }
      
      setNewPost({ text: '', type: 'general', workout: { exercise: '', weight: '', sets: '', reps: '', duration: '', bodyPart: '', difficulty: 'Beginner' }, tags: '', location: '' });
      setShowPostModal(false);
    }
  };

  const sendAIMessage = () => {
    if (aiInput.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        type: 'user',
        text: aiInput,
        timestamp: 'now'
      };
      
      setAICoachMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponses = [
          "Great question! Based on your progress, I'd recommend focusing on compound movements like squats and deadlifts.",
          "I see you're making excellent progress! Your consistency is really showing in your results.",
          "Let's work on your form. Try slowing down the eccentric portion of your lifts for better muscle activation.",
          "Consider adding some mobility work to your routine. Your movement patterns could benefit from improved flexibility.",
          "Your nutrition timing looks good! Try adding some complex carbs post-workout for better recovery."
        ];
        
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          timestamp: 'now'
        };
        
        setAICoachMessages(prev => [...prev, aiMessage]);
      }, 1000);
      
      setAIInput('');
    }
  };

  // Feed View with enhanced functionality
  const FeedView = () => (
    <div className="max-w-2xl mx-auto">
      {/* AI Insights Banner */}
      <div className="mb-6 px-6">
        <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Brain className="h-6 w-6" />
              <h3 className="font-bold">AI Insights</h3>
            </div>
            <button 
              onClick={() => setShowAICoach(true)}
              className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition-colors"
            >
              View All
            </button>
          </div>
          <p className="text-gray-200 mb-3">You're on a 15-day streak! Your consistency is paying off. Consider adding upper body work to balance your recent lower body focus.</p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center">
              <Flame className="h-4 w-4 mr-1 text-orange-400" />
              15 day streak
            </span>
            <span className="flex items-center">
              <Trophy className="h-4 w-4 mr-1 text-yellow-400" />
              Level {userData.level}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-6 px-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-black">{workoutStats.thisWeek}</div>
            <div className="text-sm text-gray-500">This Week</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-black">{workoutStats.currentStreak}</div>
            <div className="text-sm text-gray-500">Day Streak</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-black">{workoutStats.personalRecords}</div>
            <div className="text-sm text-gray-500">PRs</div>
          </div>
        </div>
      </div>

      {/* Feed Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Feed</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setShowPostModal(true)}
              className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-8 px-6 pb-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-semibold">
                    {post.user.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-black">{post.user.name}</h3>
                      {post.user.verified && (
                        <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{post.user.username}</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                      {post.gym && (
                        <>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {post.gym}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              <p className="text-gray-900 leading-relaxed mb-4">{post.content.text}</p>

              {/* Workout Details */}
              {post.type === 'workout' && post.content.workout && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-black">Workout Details</h4>
                    <Dumbbell className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 block">Exercise</span>
                      <span className="font-semibold text-black">{post.content.workout.exercise}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Weight</span>
                      <span className="font-semibold text-black">{post.content.workout.weight}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Sets × Reps</span>
                      <span className="font-semibold text-black">{post.content.workout.sets} × {post.content.workout.reps}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Duration</span>
                      <span className="font-semibold text-black">{post.content.workout.duration}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Stats */}
              {post.type === 'progress' && post.content.stats && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-black">{post.content.achievement}</h4>
                    <Trophy className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <span className="text-gray-500 block">Weight</span>
                      <span className="font-bold text-black text-lg">{post.content.stats.weight}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 block">Body Fat</span>
                      <span className="font-bold text-black text-lg">{post.content.stats.bf}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 block">Muscle</span>
                      <span className="font-bold text-black text-lg">{post.content.stats.muscle}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Routine Details */}
              {post.type === 'routine' && post.content.routine && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-black">{post.content.routine.name}</h4>
                    <Play className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex items-center space-x-6 text-sm mb-3">
                    <span className="text-gray-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {post.content.routine.duration}
                    </span>
                    <span className="text-gray-600">
                      <Target className="w-4 h-4 inline mr-1" />
                      {post.content.routine.difficulty}
                    </span>
                    {post.content.routine.calories && (
                      <span className="text-gray-600">
                        <Flame className="w-4 h-4 inline mr-1" />
                        {post.content.routine.calories} cal
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.content.routine.exercises.map((exercise, index) => (
                      <span key={index} className="bg-white border border-gray-300 px-3 py-1 rounded-full text-xs">
                        {exercise}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insight */}
              {post.aiInsight && (
                <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-xl p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <Bot className="h-4 w-4 mt-0.5 text-gray-300" />
                    <div>
                      <div className="text-xs text-gray-300 mb-1">AI Coach</div>
                      <p className="text-sm">{post.aiInsight}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.content.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.content.tags.map((tag, index) => (
                    <span key={index} className="text-gray-500 text-sm hover:text-black cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-black text-black' : ''}`} />
                    <span className="font-medium">{post.likes.toLocaleString()}</span>
                  </button>
                  <button 
                    onClick={() => toggleComments(post)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>
                <button className="text-gray-600 hover:text-black transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  // Enhanced Search View
  const SearchView = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-6">Discover</h1>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search people, creators, workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        
        {/* Search Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          {[
            { id: 'people', label: 'People' },
            { id: 'creators', label: 'Creators' },
            { id: 'workouts', label: 'Workouts' },
            { id: 'challenges', label: 'Challenges' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSearchTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeSearchTab === tab.id 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      {activeSearchTab === 'people' && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">Trending Now</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {['#MondayMotivation', '#PRChallenge', '#HealthyRecipes', '#YogaFlow', '#StrengthTraining'].map((tag) => (
              <div key={tag} className="bg-white border border-gray-200 rounded-xl px-4 py-3 whitespace-nowrap hover:shadow-md transition-shadow cursor-pointer">
                <span className="font-medium text-black">{tag}</span>
                <div className="text-sm text-gray-500">{Math.floor(Math.random() * 5000) + 1000} posts</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {activeSearchTab === 'people' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 1, name: 'Sarah Williams', username: '@sarahlifts', avatar: '💪', followers: 24500, verified: true, bio: 'Powerlifter | Coach | Mindset', mutualFollowers: 12 },
            { id: 2, name: 'David Park', username: '@davetrains', avatar: '🏋️‍♂️', followers: 18200, verified: false, bio: 'Personal Trainer | Nutrition Expert', mutualFollowers: 8 },
            { id: 3, name: 'Lisa Thompson', username: '@lisaruns', avatar: '🏃‍♀️', followers: 31800, verified: true, bio: 'Marathon Runner | Health Coach', mutualFollowers: 15 }
          ].map((person) => (
            <div key={person.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-semibold">
                    {person.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-black">{person.name}</h3>
                      {person.verified && (
                        <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{person.username}</p>
                    <p className="text-gray-600 text-sm font-medium">{person.followers.toLocaleString()} followers</p>
                    {person.mutualFollowers > 0 && (
                      <p className="text-gray-500 text-xs">Followed by {person.mutualFollowers} people you follow</p>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">{person.bio}</p>
              <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      )}

      {activeSearchTab === 'challenges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 1, name: '30-Day Push-Up Challenge', participants: 15000, duration: '30 days', difficulty: 'Beginner', reward: 'Champion Badge' },
            { id: 2, name: 'Summer Shred Challenge', participants: 8500, duration: '12 weeks', difficulty: 'Intermediate', reward: 'Transformation Trophy' },
            { id: 3, name: 'Flexibility Master', participants: 3200, duration: '21 days', difficulty: 'All Levels', reward: 'Flexibility Badge' }
          ].map((challenge) => (
            <div key={challenge.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-black text-lg mb-2">{challenge.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {challenge.participants.toLocaleString()} joined
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {challenge.duration}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{challenge.difficulty}</span>
                  </div>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">🏆 {challenge.reward}</span>
                <button className="bg-black text-white px-6 py-2 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Enhanced Profile View
  const ProfileView = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <div className="flex items-start space-x-6 mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl font-semibold">
            {userData.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-black">{userData.name}</h1>
              <div className="bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
                Level {userData.level}
              </div>
              <button className="text-gray-600 hover:text-black">
                <Settings className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-500 mb-3">{userData.username}</p>
            <p className="text-gray-700 mb-4">{userData.bio}</p>
            <div className="flex items-center space-x-6 text-sm">
              <span><strong className="text-black">{userData.posts}</strong> <span className="text-gray-600">posts</span></span>
              <span><strong className="text-black">{userData.followers.toLocaleString()}</strong> <span className="text-gray-600">followers</span></span>
              <span><strong className="text-black">{userData.following}</strong> <span className="text-gray-600">following</span></span>
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-black flex items-center justify-center">
              <Flame className="h-6 w-6 text-orange-500 mr-1" />
              {userData.streak}
            </div>
            <div className="text-sm text-gray-500">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{userData.totalWorkouts}</div>
            <div className="text-sm text-gray-500">Total Workouts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{userData.currentWeekWorkouts}/{userData.weeklyGoal}</div>
            <div className="text-sm text-gray-500">Weekly Goal</div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Edit Profile
          </button>
          <button 
            onClick={() => setShowAnalytics(true)}
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-black mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.slice(0, 4).map((achievement) => (
            <div key={achievement.id} className={`p-4 rounded-xl border-2 ${
              achievement.earned 
                ? 'border-yellow-200 bg-yellow-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-black">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {achievement.earned ? (
                    <p className="text-xs text-gray-500 mt-1">Earned {achievement.date}</p>
                  ) : (
                    <div className="mt-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{width: `${(achievement.progress / 100) * 100}%`}}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{achievement.progress}/100</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-black mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {posts.filter(post => post.user.name === userData.name).length > 0 ? (
            posts.filter(post => post.user.name === userData.name).slice(0, 3).map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {post.type === 'workout' ? '💪' : post.type === 'progress' ? '📈' : '💬'}
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-medium">{post.content.text.substring(0, 100)}...</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{post.timeAgo}</span>
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="mb-4">Share your first workout to get started!</p>
              <button 
                onClick={() => setShowPostModal(true)}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Create First Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // AI Coach Modal
  const AICoachModal = () => (
    showAICoach && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-black" />
                <h2 className="text-xl font-bold text-black">AI Fitness Coach</h2>
              </div>
              <button 
                onClick={() => setShowAICoach(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex h-[600px]">
            {/* Recommendations Sidebar */}
            <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
              <h3 className="font-bold text-black mb-4">Today's Recommendations</h3>
              <div className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-black">{rec.title}</h4>
                      <div className="text-xs bg-black text-white px-2 py-1 rounded-full">
                        {rec.confidence}% match
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <p className="text-xs text-gray-500">{rec.reason}</p>
                    {rec.duration && (
                      <div className="flex items-center text-xs text-gray-600 mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {rec.duration}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {aiCoachMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-2xl ${
                        message.type === 'user' 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-black'
                      }`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-2 mb-1">
                            <Bot className="h-4 w-4" />
                            <span className="text-xs font-medium">AI Coach</span>
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Ask me anything about fitness..."
                    value={aiInput}
                    onChange={(e) => setAIInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                    className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button 
                    onClick={sendAIMessage}
                    className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Analytics Modal
  const AnalyticsModal = () => (
    showAnalytics && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-6 w-6 text-black" />
                <h2 className="text-xl font-bold text-black">Fitness Analytics</h2>
              </div>
              <button 
                onClick={() => setShowAnalytics(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-black">{workoutStats.totalWorkouts}</div>
                <div className="text-sm text-gray-500">Total Workouts</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-black">{workoutStats.currentStreak}</div>
                <div className="text-sm text-gray-500">Current Streak</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-black">{workoutStats.personalRecords}</div>
                <div className="text-sm text-gray-500">Personal Records</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-black">{workoutStats.totalVolume}</div>
                <div className="text-sm text-gray-500">Total Volume</div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Weekly Progress */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-black mb-4">Weekly Progress</h3>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex items-center space-x-3">
                      <div className="w-8 text-sm text-gray-600">{day}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-black h-3 rounded-full" 
                          style={{width: `${Math.random() * 100}%`}}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">{Math.floor(Math.random() * 60) + 30}min</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Muscle Group Distribution */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-black mb-4">Muscle Group Focus</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Legs', percentage: 35 },
                    { name: 'Back', percentage: 25 },
                    { name: 'Chest', percentage: 20 },
                    { name: 'Arms', percentage: 15 },
                    { name: 'Core', percentage: 5 }
                  ].map((group) => (
                    <div key={group.name} className="flex items-center space-x-3">
                      <div className="w-12 text-sm text-gray-600">{group.name}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-black h-3 rounded-full" 
                          style={{width: `${group.percentage}%`}}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">{group.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="mt-8 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl p-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Strengths</h4>
                  <ul className="text-sm text-gray-200 space-y-1">
                    <li>• Excellent consistency (15-day streak)</li>
                    <li>• Strong lower body development</li>
                    <li>• Progressive overload pattern</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Recommendations</h4>
                  <ul className="text-sm text-gray-200 space-y-1">
                    <li>• Increase upper body volume</li>
                    <li>• Add mobility work</li>
                    <li>• Consider deload week soon</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Enhanced Post Modal
  const PostModal = () => (
    showPostModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Create Post</h2>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Post Type */}
            <div>
              <label className="block text-sm font-medium text-black mb-3">Post Type</label>
              <div className="flex space-x-3">
                {[
                  { id: 'general', label: 'General', icon: MessageCircle },
                  { id: 'workout', label: 'Workout', icon: Dumbbell },
                  { id: 'progress', label: 'Progress', icon: TrendingUp },
                  { id: 'routine', label: 'Routine', icon: Play }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setNewPost({...newPost, type: type.id})}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-colors ${
                      newPost.type === type.id 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-medium text-black mb-3">What's on your mind?</label>
              <textarea
                value={newPost.text}
                onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                placeholder="Share your fitness journey, tips, or achievements..."
                className="w-full border border-gray-300 rounded-xl p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Workout Details */}
            {newPost.type === 'workout' && (
              <div className="space-y-4">
                <h3 className="font-medium text-black">Workout Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Exercise"
                    value={newPost.workout.exercise}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, exercise: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Weight"
                    value={newPost.workout.weight}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, weight: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Sets"
                    value={newPost.workout.sets}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, sets: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={newPost.workout.reps}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, reps: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Duration (e.g., 45 min)"
                    value={newPost.workout.duration}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, duration: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <select
                    value={newPost.workout.bodyPart}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, bodyPart: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Body Part</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Legs">Legs</option>
                    <option value="Arms">Arms</option>
                    <option value="Core">Core</option>
                    <option value="Full Body">Full Body</option>
                  </select>
                </div>
                <select
                  value={newPost.workout.difficulty}
                  onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, difficulty: e.target.value}})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            )}

            {/* Tags and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Tags</label>
                <input
                  type="text"
                  placeholder="#fitness #strength #gains"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Your gym or location"
                  value={newPost.location}
                  onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowPostModal(false)}
                className="flex-1 bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePost}
                className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Comments Modal
  const CommentsModal = () => (
    showComments && selectedPost && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Comments</h2>
              <button 
                onClick={() => setShowComments(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="h-96 overflow-y-auto p-6">
            <div className="space-y-4">
              {comments[selectedPost.id]?.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <h4 className="font-semibold text-black text-sm">{comment.user}</h4>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{comment.timeAgo}</span>
                      <button className="hover:text-black">Like</button>
                      <button className="hover:text-black">Reply</button>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addComment()}
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button 
                onClick={addComment}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const tabs = [
    { id: 'feed', name: 'Feed', icon: Home },
    { id: 'search', name: 'Discover', icon: Search },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-black">FitSocial</h1>
              <div className="hidden md:flex space-x-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-gray-100 text-black' 
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAICoach(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="AI Coach"
              >
                <Brain className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setShowPostModal(true)}
                className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {activeTab === 'feed' && <FeedView />}
        {activeTab === 'search' && <SearchView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center py-3 px-4"
              >
                <Icon 
                  className={`h-6 w-6 ${
                    activeTab === tab.id ? 'text-black' : 'text-gray-400'
                  }`} 
                />
                <span className={`text-xs mt-1 ${
                  activeTab === tab.id ? 'text-black' : 'text-gray-400'
                }`}>
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <PostModal />
      <AICoachModal />
      <AnalyticsModal />
      <CommentsModal />
    </div>
  );
}

export default App;
