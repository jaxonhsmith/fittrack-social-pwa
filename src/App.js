import React, { useState } from 'react';
import { Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, Send, Home, Compass, PlusSquare, MoreHorizontal, Grid, List } from 'lucide-react';

const FitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showStories, setShowStories] = useState(true);

  // Stories data
  const [stories, setStories] = useState([
    { id: 1, user: 'You', avatar: '🔥', hasNew: true, isYours: true },
    { id: 2, user: 'Sarah', avatar: '👩‍💪', hasNew: true, isYours: false },
    { id: 3, user: 'Mike', avatar: '💪', hasNew: true, isYours: false },
    { id: 4, user: 'Emma', avatar: '🏃‍♀️', hasNew: false, isYours: false },
    { id: 5, user: 'Alex', avatar: '🚴‍♂️', hasNew: true, isYours: false },
  ]);

  const [socialFeed, setSocialFeed] = useState([
    {
      id: 1,
      user: { name: 'Sarah Johnson', username: 'sarahfit', avatar: '👩‍💪', isVerified: true },
      type: 'workout',
      content: {
        image: '/api/placeholder/400/300',
        workout: 'Morning HIIT Session',
        duration: '25 min',
        calories: '340 cal',
        exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'Push-ups']
      },
      likes: 127,
      comments: 23,
      timeAgo: '2h',
      isLiked: false,
      location: 'Gold\'s Gym Downtown'
    },
    {
      id: 2,
      user: { name: 'Mike Chen', username: 'mikelifts', avatar: '💪', isVerified: false },
      type: 'progress',
      content: {
        image: '/api/placeholder/400/300',
        text: 'New PR! 225lb deadlift 💪 6 months of consistent training paying off!',
        achievement: 'Personal Record'
      },
      likes: 89,
      comments: 15,
      timeAgo: '4h',
      isLiked: true,
      location: 'Fitness First'
    },
    {
      id: 3,
      user: { name: 'Emma Davis', username: 'emmarunner', avatar: '🏃‍♀️', isVerified: true },
      type: 'workout',
      content: {
        image: '/api/placeholder/400/300',
        workout: '5K Morning Run',
        duration: '28 min',
        calories: '420 cal',
        exercises: ['5K Run', 'Cool Down Stretch']
      },
      likes: 156,
      comments: 31,
      timeAgo: '6h',
      isLiked: false,
      location: 'Central Park'
    }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: 'You',
    username: 'yourfitness',
    bio: 'Fitness enthusiast 💪 | Transform your body, transform your life ✨ | DM for workout tips 📩',
    avatar: '🔥',
    followers: 1247,
    following: 892,
    posts: 156,
    isVerified: false,
    website: 'linktr.ee/yourfitness'
  });

  const [friends, setFriends] = useState([
    { id: 1, name: 'Sarah Johnson', username: 'sarahfit', avatar: '👩‍💪', isVerified: true, mutualFriends: 12 },
    { id: 2, name: 'Mike Chen', username: 'mikelifts', avatar: '💪', isVerified: false, mutualFriends: 8 },
    { id: 3, name: 'Emma Davis', username: 'emmarunner', avatar: '🏃‍♀️', isVerified: true, mutualFriends: 15 }
  ]);

  const toggleLike = (postId) => {
    setSocialFeed(socialFeed.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  // Home Feed View (Instagram-style)
  const HomeView = () => (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            FitGram
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Heart className="h-6 w-6 text-gray-700" />
          <MessageCircle className="h-6 w-6 text-gray-700" />
        </div>
      </div>

      {/* Stories */}
      {showStories && (
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  story.hasNew ? 'bg-gradient-to-tr from-yellow-400 to-pink-600' : 'bg-gray-200'
                }`}>
                  <div className="w-full h-full bg-white rounded-full p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                      {story.avatar}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 max-w-[60px] truncate">
                  {story.isYours ? 'Your Story' : story.user}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="pb-20">
        {socialFeed.map((post) => (
          <div key={post.id} className="border-b border-gray-100">
            {/* Post Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                  {post.user.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm">{post.user.username}</span>
                    {post.user.isVerified && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-2 h-2 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  {post.location && (
                    <span className="text-xs text-gray-500">{post.location}</span>
                  )}
                </div>
              </div>
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </div>

            {/* Post Image */}
            <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              {post.type === 'workout' ? (
                <div className="text-center">
                  <Dumbbell className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.content.workout}</h3>
                  <div className="flex justify-center space-x-6">
                    <div className="text-center">
                      <Clock className="h-5 w-5 text-gray-600 mx-auto" />
                      <span className="text-sm text-gray-600">{post.content.duration}</span>
                    </div>
                    <div className="text-center">
                      <Zap className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-gray-600">{post.content.calories}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                  <div className="bg-yellow-100 px-4 py-2 rounded-full">
                    <span className="text-yellow-800 font-semibold">{post.content.achievement}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <button onClick={() => toggleLike(post.id)}>
                    <Heart className={`h-6 w-6 ${post.isLiked ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                  </button>
                  <MessageCircle className="h-6 w-6 text-gray-700" />
                  <Send className="h-6 w-6 text-gray-700" />
                </div>
                <Bookmark className="h-6 w-6 text-gray-700" />
              </div>

              {/* Likes */}
              <div className="mb-2">
                <span className="font-semibold text-sm">{post.likes.toLocaleString()} likes</span>
              </div>

              {/* Caption */}
              <div className="mb-2">
                <span className="font-semibold text-sm mr-2">{post.user.username}</span>
                <span className="text-sm">
                  {post.type === 'workout' 
                    ? `Crushed this ${post.content.workout.toLowerCase()}! ${post.content.exercises.slice(0, 3).join(', ')} 💪`
                    : post.content.text
                  }
                </span>
              </div>

              {/* Comments */}
              {post.comments > 0 && (
                <button className="text-gray-500 text-sm mb-2">
                  View all {post.comments} comments
                </button>
              )}

              {/* Time */}
              <div className="text-xs text-gray-500 uppercase">
                {post.timeAgo} ago
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Search/Explore View
  const ExploreView = () => (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search workouts, people, gyms..."
              className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="px-4 py-4">
        <h3 className="font-semibold mb-3">Trending Workouts</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'HIIT Training', posts: '1.2M', gradient: 'from-red-400 to-pink-600' },
            { name: 'Yoga Flow', posts: '890K', gradient: 'from-green-400 to-blue-500' },
            { name: 'Strength', posts: '2.1M', gradient: 'from-purple-400 to-pink-600' },
            { name: 'Running', posts: '1.8M', gradient: 'from-yellow-400 to-orange-600' }
          ].map((category, index) => (
            <div key={index} className={`bg-gradient-to-br ${category.gradient} rounded-lg p-4 text-white`}>
              <h4 className="font-semibold">{category.name}</h4>
              <span className="text-sm opacity-90">{category.posts} posts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested People */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Suggested for you</h3>
          <button className="text-blue-600 text-sm font-semibold">See All</button>
        </div>
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                {friend.avatar}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-sm">{friend.username}</span>
                  {friend.isVerified && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2 h-2 text-white fill-current" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500">Followed by {friend.mutualFriends} others</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Create Post View
  const CreateView = () => (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
        <button className="text-gray-600">Cancel</button>
        <h2 className="font-semibold">New Workout</h2>
        <button className="text-blue-600 font-semibold">Share</button>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Workout Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Quick HIIT', icon: Zap, color: 'from-red-400 to-pink-600' },
            { name: 'Strength', icon: Dumbbell, color: 'from-purple-400 to-purple-600' },
            { name: 'Cardio', icon: Heart, color: 'from-green-400 to-green-600' },
            { name: 'Yoga', icon: User, color: 'from-blue-400 to-blue-600' }
          ].map((workout, index) => (
            <button key={index} className={`bg-gradient-to-br ${workout.color} rounded-xl p-6 text-white text-center`}>
              <workout.icon className="h-8 w-8 mx-auto mb-2" />
              <span className="font-semibold">{workout.name}</span>
            </button>
          ))}
        </div>

        {/* Custom Workout Form */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Log Custom Workout</h3>
          <input 
            type="text" 
            placeholder="Workout name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
          />
          <textarea 
            placeholder="What did you do today? Share your wins! 💪"
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="number" 
              placeholder="Duration (min)"
              className="border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
            />
            <input 
              type="number" 
              placeholder="Calories burned"
              className="border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Profile View (Instagram-style)
  const ProfileView = () => (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">{userProfile.username}</span>
          {userProfile.isVerified && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white fill-current" />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <PlusSquare className="h-6 w-6 text-gray-700" />
          <Settings className="h-6 w-6 text-gray-700" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 p-0.5">
            <div className="w-full h-full bg-white rounded-full p-1">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                {userProfile.avatar}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold text-lg">{userProfile.posts}</div>
                <div className="text-gray-600 text-sm">Posts</div>
              </div>
              <div>
                <div className="font-bold text-lg">{userProfile.followers.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
              <div>
                <div className="font-bold text-lg">{userProfile.following}</div>
                <div className="text-gray-600 text-sm">Following</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="font-bold">{userProfile.name}</h2>
          <p className="text-gray-700 text-sm mt-1">{userProfile.bio}</p>
          {userProfile.website && (
            <a href="#" className="text-blue-600 text-sm">{userProfile.website}</a>
          )}
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-lg font-semibold text-sm">
            Edit Profile
          </button>
          <button className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-lg font-semibold text-sm">
            Share Profile
          </button>
        </div>
      </div>

      {/* Highlights */}
      <div className="px-4 pb-4">
        <div className="flex space-x-4 overflow-x-auto">
          {['Workouts', 'Progress', 'Nutrition'].map((highlight, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                <span className="text-2xl">
                  {index === 0 ? '💪' : index === 1 ? '📈' : '🥗'}
                </span>
              </div>
              <span className="text-xs text-gray-600">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Post Grid */}
      <div className="border-t border-gray-200">
        <div className="flex">
          <button className="flex-1 py-3 border-b-2 border-gray-900">
            <Grid className="h-6 w-6 mx-auto text-gray-900" />
          </button>
          <button className="flex-1 py-3 border-b-2 border-transparent">
            <List className="h-6 w-6 mx-auto text-gray-400" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <span className="text-2xl">
                {i % 3 === 0 ? '💪' : i % 3 === 1 ? '🏃‍♀️' : '🚴‍♂️'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Activity/Notifications View
  const ActivityView = () => (
    <div className="max-w-lg mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <h2 className="font-bold text-lg">Activity</h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {[
            { user: 'Sarah', action: 'liked your workout', time: '2m', avatar: '👩‍💪' },
            { user: 'Mike', action: 'started following you', time: '1h', avatar: '💪' },
            { user: 'Emma', action: 'commented on your post', time: '3h', avatar: '🏃‍♀️' },
            { user: 'Alex', action: 'shared your workout', time: '5h', avatar: '🚴‍♂️' }
          ].map((notification, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                {notification.avatar}
              </div>
              <div className="flex-1">
                <span className="text-sm">
                  <span className="font-semibold">{notification.user}</span> {notification.action}
                </span>
                <div className="text-xs text-gray-500">{notification.time}</div>
              </div>
              {notification.action.includes('following') ? (
                <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-semibold">
                  Follow Back
                </button>
              ) : (
                <Heart className="h-8 w-8 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'explore', name: 'Explore', icon: Compass },
    { id: 'create', name: 'Create', icon: PlusSquare },
    { id: 'activity', name: 'Activity', icon: Heart },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pb-16">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'explore' && <ExploreView />}
        {activeTab === 'create' && <CreateView />}
        {activeTab === 'activity' && <ActivityView />}
        {activeTab === 'profile' && <ProfileView />}
      </div>

      {/* Bottom Navigation (Instagram-style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center py-2 px-3"
                >
                  <Icon 
                    className={`h-6 w-6 ${
                      activeTab === tab.id 
                        ? 'text-gray-900' 
                        : 'text-gray-400'
                    }`} 
                    fill={activeTab === tab.id ? 'currentColor' : 'none'}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;
