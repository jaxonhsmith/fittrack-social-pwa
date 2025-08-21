import React, { useState } from 'react';
import { Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, Send, Home, Compass, PlusSquare, MoreHorizontal, Filter, Mic, Image, MapPin, Hash } from 'lucide-react';

const FitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('people');

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
          duration: '45 min'
        },
        tags: ['deadlift', 'strength', 'pr', 'powerlifting']
      },
      likes: 847,
      comments: 92,
      shares: 23,
      timeAgo: '3h',
      isLiked: false,
      gym: 'Iron Temple Gym'
    },
    {
      id: 2,
      user: { name: 'Maya Chen', username: '@mayaruns', avatar: '🏃‍♀️', followers: 8900, verified: false },
      type: 'progress',
      content: {
        text: "6 months transformation update! Down 25lbs and feeling stronger than ever. The journey isn't always linear but every step counts 💫",
        achievement: '6 Month Transformation',
        stats: { weight: '-25 lbs', bf: '-8%', muscle: '+3 lbs' }
      },
      likes: 1204,
      comments: 156,
      shares: 67,
      timeAgo: '8h',
      isLiked: true,
      gym: null
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
          exercises: ['Sun Salutation A', 'Warrior I', 'Downward Dog', 'Child\'s Pose']
        },
        tags: ['yoga', 'morning', 'flexibility', 'mindfulness']
      },
      likes: 523,
      comments: 34,
      shares: 89,
      timeAgo: '12h',
      isLiked: false,
      gym: 'Home Practice'
    }
  ]);

  const [searchResults, setSearchResults] = useState({
    people: [
      { id: 1, name: 'Sarah Williams', username: '@sarahlifts', avatar: '💪', followers: 24500, verified: true, bio: 'Powerlifter | Coach | Mindset' },
      { id: 2, name: 'David Park', username: '@davetrains', avatar: '🏋️‍♂️', followers: 18200, verified: false, bio: 'Personal Trainer | Nutrition' },
      { id: 3, name: 'Lisa Thompson', username: '@lisaruns', avatar: '🏃‍♀️', followers: 31800, verified: true, bio: 'Marathon Runner | Health Coach' }
    ],
    creators: [
      { id: 4, name: 'FitLife Academy', username: '@fitlifeacademy', avatar: '🎓', followers: 156000, verified: true, bio: 'Evidence-based fitness education' },
      { id: 5, name: 'Strength Society', username: '@strengthsoc', avatar: '⚡', followers: 89400, verified: true, bio: 'Building stronger humans' }
    ],
    workouts: [
      { id: 1, name: 'Ultimate Push Day', creator: '@alexfits', difficulty: 'Advanced', duration: '75 min', likes: 2400 },
      { id: 2, name: 'Beginner Full Body', creator: '@sarahlifts', difficulty: 'Beginner', duration: '45 min', likes: 1800 }
    ]
  });

  const [newPost, setNewPost] = useState({
    text: '',
    type: 'general',
    workout: { exercise: '', weight: '', sets: '', reps: '', duration: '' },
    tags: '',
    location: ''
  });

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.text.trim()) {
      const post = {
        id: Date.now(),
        user: { name: 'You', username: '@you', avatar: '🔥', followers: 0, verified: false },
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
        gym: newPost.location
      };
      setPosts([post, ...posts]);
      setNewPost({ text: '', type: 'general', workout: { exercise: '', weight: '', sets: '', reps: '', duration: '' }, tags: '', location: '' });
      setShowPostModal(false);
    }
  };

  // Feed View
  const FeedView = () => (
    <div className="max-w-2xl mx-auto">
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
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
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

  // Search View
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
            { id: 'workouts', label: 'Workouts' }
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

      {/* Search Results */}
      {activeSearchTab === 'people' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchResults.people.map((person) => (
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

      {activeSearchTab === 'creators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchResults.creators.map((creator) => (
            <div key={creator.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-semibold">
                    {creator.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-black">{creator.name}</h3>
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{creator.username}</p>
                    <p className="text-gray-600 text-sm font-medium">{creator.followers.toLocaleString()} followers</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">{creator.bio}</p>
              <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      )}

      {activeSearchTab === 'workouts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchResults.workouts.map((workout) => (
            <div key={workout.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-black text-lg mb-2">{workout.name}</h3>
                  <p className="text-gray-500 text-sm">by {workout.creator}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {workout.duration}
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {workout.difficulty}
                    </span>
                  </div>
                </div>
                <Dumbbell className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {workout.likes.toLocaleString()} likes
                </span>
                <button className="bg-black text-white px-6 py-2 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Profile View
  const ProfileView = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <div className="flex items-start space-x-6 mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl font-semibold">
            🔥
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-black">Your Name</h1>
              <button className="text-gray-600 hover:text-black">
                <Settings className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-500 mb-3">@yourusername</p>
            <p className="text-gray-700 mb-4">Fitness enthusiast on a journey to become the best version of myself 💪</p>
            <div className="flex items-center space-x-6 text-sm">
              <span><strong className="text-black">156</strong> <span className="text-gray-600">posts</span></span>
              <span><strong className="text-black">1,247</strong> <span className="text-gray-600">followers</span></span>
              <span><strong className="text-black">892</strong> <span className="text-gray-600">following</span></span>
            </div>
          </div>
        </div>
        <button className="w-full bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
          Edit Profile
        </button>
      </div>

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
    </div>
  );

  // Post Modal
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
                ✕
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
                  { id: 'progress', label: 'Progress', icon: TrendingUp }
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
                <input
                  type="text"
                  placeholder="Duration (e.g., 45 min)"
                  value={newPost.workout.duration}
                  onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, duration: e.target.value}})}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
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
            <button 
              onClick={() => setShowPostModal(true)}
              className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Post</span>
            </button>
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

      {/* Post Modal */}
      <PostModal />
    </div>
  );
};

export default FitnessTracker;
