import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, User, Home, X, Send, Dumbbell, MapPin, MoreHorizontal } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showPostModal, setShowPostModal] = useState(false);

  // Simplified user data
  const [userData] = useState({
    name: 'Alex Johnson',
    username: '@alexfits',
    avatar: '🔥',
    bio: 'Fitness enthusiast testing this awesome app!'
  });

  // Sample posts with persistence
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Sarah M.', username: '@sarahfits', avatar: '💪' },
      type: 'workout',
      content: {
        text: "Just completed my first deadlift session! Feeling strong 💪",
        workout: {
          exercise: 'Deadlifts',
          weight: '135 lbs',
          sets: 3,
          reps: 8,
          duration: '30 min'
        }
      },
      likes: 12,
      comments: 3,
      timeAgo: '2h',
      isLiked: false,
      gym: 'Local Gym'
    },
    {
      id: 2,
      user: { name: 'Mike T.', username: '@miketrains', avatar: '🏋️‍♂️' },
      type: 'general',
      content: {
        text: "Rest day = meal prep day! Consistency is key 🥗"
      },
      likes: 8,
      comments: 1,
      timeAgo: '5h',
      isLiked: true,
      gym: null
    }
  ]);

  const [newPost, setNewPost] = useState({
    text: '',
    type: 'workout',
    workout: { exercise: '', weight: '', sets: '', reps: '', duration: '' },
    location: ''
  });

  // Simple like functionality
  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  // Simple post creation
  const handleCreatePost = () => {
    if (newPost.text.trim()) {
      const post = {
        id: Date.now(),
        user: { name: userData.name, username: userData.username, avatar: userData.avatar },
        type: newPost.type,
        content: {
          text: newPost.text,
          ...(newPost.type === 'workout' && { workout: newPost.workout })
        },
        likes: 0,
        comments: 0,
        timeAgo: 'now',
        isLiked: false,
        gym: newPost.location
      };
      
      setPosts([post, ...posts]);
      setNewPost({ text: '', type: 'workout', workout: { exercise: '', weight: '', sets: '', reps: '', duration: '' }, location: '' });
      setShowPostModal(false);
    }
  };

  // Feed View - Simplified
  const FeedView = () => (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-2">Welcome to FitSocial MVP! 🚀</h2>
        <p className="text-gray-200">Share your workouts and connect with fitness enthusiasts.</p>
      </div>

      {/* Create Post Button */}
      <div className="mb-8">
        <button 
          onClick={() => setShowPostModal(true)}
          className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-left text-gray-500 hover:bg-gray-50 transition-colors"
        >
          What's your workout today, {userData.name.split(' ')[0]}?
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                  {post.user.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-black">{post.user.name}</h3>
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
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Post Content */}
            <p className="text-gray-900 mb-4">{post.content.text}</p>

            {/* Workout Details */}
            {post.type === 'workout' && post.content.workout && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-black">Workout Details</h4>
                  <Dumbbell className="h-4 w-4 text-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
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

            {/* Post Actions */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                >
                  <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-black text-black' : ''}`} />
                  <span className="font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  // Profile View - Simplified
  const ProfileView = () => (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          {userData.avatar}
        </div>
        <h1 className="text-xl font-bold text-black mb-2">{userData.name}</h1>
        <p className="text-gray-500 mb-4">{userData.username}</p>
        <p className="text-gray-700 mb-6">{userData.bio}</p>
        <div className="flex justify-center space-x-8 text-sm">
          <span><strong className="text-black">{posts.filter(p => p.user.name === userData.name).length}</strong> <span className="text-gray-600">posts</span></span>
          <span><strong className="text-black">0</strong> <span className="text-gray-600">followers</span></span>
          <span><strong className="text-black">0</strong> <span className="text-gray-600">following</span></span>
        </div>
      </div>
    </div>
  );

  // Post Modal - Simplified
  const PostModal = () => (
    showPostModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">Share Your Workout</h2>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Post Content */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">What did you do today?</label>
              <textarea
                value={newPost.text}
                onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                placeholder="Share your workout, how you felt, or any fitness wins!"
                className="w-full border border-gray-300 rounded-xl p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Workout Details */}
            <div className="space-y-3">
              <h3 className="font-medium text-black">Workout Details (Optional)</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Exercise"
                  value={newPost.workout.exercise}
                  onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, exercise: e.target.value}})}
                  className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Weight"
                  value={newPost.workout.weight}
                  onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, weight: e.target.value}})}
                  className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Sets"
                  value={newPost.workout.sets}
                  onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, sets: e.target.value}})}
                  className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Reps"
                  value={newPost.workout.reps}
                  onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, reps: e.target.value}})}
                  className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <input
                type="text"
                placeholder="Duration (e.g., 30 min)"
                value={newPost.workout.duration}
                onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, duration: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Gym/Location"
                value={newPost.location}
                onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
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
    { id: 'profile', name: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-black">FitSocial MVP</h1>
            <button 
              onClick={() => setShowPostModal(true)}
              className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Post</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-black text-black' 
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {activeTab === 'feed' && <FeedView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Post Modal */}
      <PostModal />
    </div>
  );
}

export default App;
