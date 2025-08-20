import React, { useState } from 'react';
import { Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, Send, Home, Compass, PlusSquare, MoreHorizontal, Grid, List, Bell, Map, Coffee } from 'lucide-react';

const FitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [workouts, setWorkouts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const [socialFeed, setSocialFeed] = useState([
    {
      id: 1,
      user: { name: 'Alex Thunder', username: 'alexthunder', avatar: '⚡', level: 'Elite', streak: 15 },
      type: 'challenge_complete',
      content: {
        challenge: '30-Day Push-up Challenge',
        achievement: 'Completed 1,500 push-ups this month!',
        progress: 100,
        badge: '🏆'
      },
      energy: 95,
      cheers: 234,
      comments: 67,
      timeAgo: '2h',
      isCheered: false
    },
    {
      id: 2,
      user: { name: 'Maya Flow', username: 'mayaflow', avatar: '🌸', level: 'Warrior', streak: 8 },
      type: 'workout_session',
      content: {
        workout: 'Sunrise Yoga Flow',
        duration: '45 min',
        intensity: 'Medium',
        mood: 'Zen',
        location: 'Beach Pier'
      },
      energy: 78,
      cheers: 156,
      comments: 23,
      timeAgo: '4h',
      isCheered: true
    },
    {
      id: 3,
      user: { name: 'Rico Beast', username: 'ricobeast', avatar: '🔥', level: 'Champion', streak: 22 },
      type: 'personal_record',
      content: {
        exercise: 'Deadlift',
        newRecord: '315 lbs',
        improvement: '+25 lbs',
        celebration: '🎉'
      },
      energy: 120,
      cheers: 389,
      comments: 91,
      timeAgo: '6h',
      isCheered: false
    }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: 'You',
    username: 'yourjourney',
    avatar: '🚀',
    level: 'Rising Star',
    streak: 12,
    energy: 85,
    tribe: 127,
    following: 89,
    challenges: 5
  });

  const [quickActions, setQuickActions] = useState([
    { id: 1, name: 'Log Workout', icon: Dumbbell, color: 'from-orange-400 to-red-500', action: 'workout' },
    { id: 2, name: 'Join Challenge', icon: Trophy, color: 'from-purple-400 to-pink-500', action: 'challenge' },
    { id: 3, name: 'Find Buddy', icon: Users, color: 'from-green-400 to-blue-500', action: 'buddy' },
    { id: 4, name: 'Share Win', icon: Star, color: 'from-yellow-400 to-orange-500', action: 'share' }
  ]);

  const toggleCheer = (postId) => {
    setSocialFeed(socialFeed.map(post => 
      post.id === postId 
        ? { ...post, cheers: post.isCheered ? post.cheers - 1 : post.cheers + 1, isCheered: !post.isCheered }
        : post
    ));
  };

  // Main Feed View
  const FeedView = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                FitTribe
              </h1>
              <p className="text-sm text-gray-500">Your fitness community</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-purple-600 flex items-center justify-center text-white font-bold">
                {userProfile.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button key={action.id} className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
              <action.icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-semibold">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Filters */}
      <div className="max-w-2xl mx-auto px-4 mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['all', 'workouts', 'challenges', 'records', 'buddies'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Posts */}
      <div className="max-w-2xl mx-auto px-4 space-y-6 pb-8">
        {socialFeed.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-purple-600 flex items-center justify-center text-white text-xl">
                      {post.user.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-xs">🔥</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{post.user.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-purple-600 font-medium">{post.user.level}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-orange-500">🔥 {post.user.streak} day streak</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">{post.energy}</div>
                  <div className="text-xs text-gray-500">Energy</div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6">
              {post.type === 'challenge_complete' && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800">{post.content.challenge}</h4>
                    <span className="text-2xl">{post.content.badge}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{post.content.achievement}</p>
                  <div className="bg-white rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                      style={{ width: `${post.content.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {post.type === 'workout_session' && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-2">{post.content.workout}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-700">{post.content.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center">
                      <Zap className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-700">{post.content.intensity}</div>
                      <div className="text-xs text-gray-500">Intensity</div>
                    </div>
                    <div className="text-center">
                      <Map className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-700">{post.content.location}</div>
                      <div className="text-xs text-gray-500">Location</div>
                    </div>
                  </div>
                </div>
              )}

              {post.type === 'personal_record' && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 border border-red-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800">New Personal Record!</h4>
                    <span className="text-2xl">{post.content.celebration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-red-600">{post.content.newRecord}</div>
                      <div className="text-sm text-gray-600">{post.content.exercise}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{post.content.improvement}</div>
                      <div className="text-xs text-gray-500">Improvement</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="p-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => toggleCheer(post.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                      post.isCheered 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
                    }`}
                  >
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">{post.cheers}</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-purple-100">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">{post.timeAgo} ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Tribe View (Community)
  const TribeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Fitness Tribe</h2>
        
        {/* Tribe Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-purple-600">{userProfile.tribe}</div>
            <div className="text-sm text-gray-600">Tribe Members</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-orange-600">{userProfile.challenges}</div>
            <div className="text-sm text-gray-600">Active Challenges</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">{userProfile.energy}</div>
            <div className="text-sm text-gray-600">Energy Level</div>
          </div>
        </div>

        {/* Find Workout Buddies */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Find Workout Buddies</h3>
          <div className="space-y-4">
            {[
              { name: 'Jenny Power', activity: 'Running', distance: '0.5 miles away', avatar: '🏃‍♀️', level: 'Warrior' },
              { name: 'Marcus Strong', activity: 'Weight Training', distance: '1.2 miles away', avatar: '💪', level: 'Champion' },
              { name: 'Luna Zen', activity: 'Yoga', distance: '0.8 miles away', avatar: '🧘‍♀️', level: 'Elite' }
            ].map((buddy, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-xl">
                    {buddy.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{buddy.name}</h4>
                    <p className="text-sm text-purple-600">{buddy.level} • {buddy.activity}</p>
                    <p className="text-xs text-gray-500">{buddy.distance}</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Challenges View
  const ChallengesView = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fitness Challenges</h2>
        
        <div className="space-y-6">
          {[
            { 
              name: 'Summer Shred Challenge', 
              participants: 2847, 
              daysLeft: 12, 
              reward: '🏆 Championship Badge',
              gradient: 'from-yellow-400 to-orange-500',
              progress: 65
            },
            { 
              name: '10K Steps Daily', 
              participants: 1523, 
              daysLeft: 5, 
              reward: '👟 Walker Badge',
              gradient: 'from-green-400 to-blue-500',
              progress: 80
            },
            { 
              name: 'Mindful Movement', 
              participants: 856, 
              daysLeft: 18, 
              reward: '🧘‍♀️ Zen Master Badge',
              gradient: 'from-purple-400 to-pink-500',
              progress: 45
            }
          ].map((challenge, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${challenge.gradient} p-6 text-white`}>
                <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">{challenge.participants.toLocaleString()} participants</span>
                  <span className="text-sm font-medium">{challenge.daysLeft} days left</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Your Progress</span>
                    <span className="text-sm font-bold text-gray-800">{challenge.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${challenge.gradient} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reward: {challenge.reward}</span>
                  <button className={`bg-gradient-to-r ${challenge.gradient} text-white px-6 py-2 rounded-full text-sm font-medium`}>
                    Join Challenge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Profile View
  const ProfileView = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-orange-400 to-purple-600 flex items-center justify-center text-white text-4xl mb-4">
              {userProfile.avatar}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
            <p className="text-purple-600 font-medium">{userProfile.level}</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="text-orange-500">🔥</span>
              <span className="text-sm text-gray-600">{userProfile.streak} day streak</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">{userProfile.energy}</div>
              <div className="text-sm text-gray-600">Energy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{userProfile.tribe}</div>
              <div className="text-sm text-gray-600">Tribe</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{userProfile.challenges}</div>
              <div className="text-sm text-gray-600">Challenges</div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-2 gap-4">
            {['🏆 Challenge Winner', '💪 Strength Master', '🔥 Streak Champion', '⭐ Rising Star'].map((achievement, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 text-center border border-yellow-200">
                <div className="text-2xl mb-2">{achievement.split(' ')[0]}</div>
                <div className="text-sm font-medium text-gray-700">{achievement.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'feed', name: 'Feed', icon: Home, color: 'text-orange-500' },
    { id: 'tribe', name: 'Tribe', icon: Users, color: 'text-purple-500' },
    { id: 'challenges', name: 'Challenges', icon: Trophy, color: 'text-green-500' },
    { id: 'profile', name: 'Profile', icon: User, color: 'text-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pb-20">
        {activeTab === 'feed' && <FeedView />}
        {activeTab === 'tribe' && <TribeView />}
        {activeTab === 'challenges' && <ChallengesView />}
        {activeTab === 'profile' && <ProfileView />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-around py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center py-2 px-4 transition-all ${
                    activeTab === tab.id ? 'transform scale-110' : ''
                  }`}
                >
                  <Icon 
                    className={`h-6 w-6 ${
                      activeTab === tab.id 
                        ? tab.color
                        : 'text-gray-400'
                    }`}
                  />
                  <span className={`text-xs mt-1 font-medium ${
                    activeTab === tab.id 
                      ? tab.color
                      : 'text-gray-400'
                  }`}>
                    {tab.name}
                  </span>
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
