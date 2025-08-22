import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Plus, User, Home, X, Send, Dumbbell, MapPin, MoreHorizontal, Brain, Bot } from 'lucide-react';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// AI Coach System Prompt
const FITNESS_COACH_PROMPT = `You are Alex, an expert fitness coach and nutritionist with 10+ years of experience. You specialize in:

- Personalized workout recommendations
- Form correction and technique tips  
- Nutrition advice and meal planning
- Injury prevention and recovery
- Motivation and goal setting
- Progress tracking analysis

Your personality:
- Encouraging but realistic
- Uses fitness emojis appropriately 💪🔥
- Gives specific, actionable advice
- Always prioritizes safety
- Asks follow-up questions to personalize advice

Keep responses concise but helpful (2-3 sentences max unless asked for detailed plans).

Current user context: {userContext}

Always end responses with a relevant question to keep the conversation going.`;

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);

  // User data
  const [userData] = useState({
    name: 'Alex Johnson',
    username: '@alexfits',
    avatar: '🔥',
    bio: 'Fitness enthusiast testing this awesome app!',
    level: 'Intermediate',
    streak: 5,
    weeklyGoal: 4
  });

  // Posts with AI insights
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
      gym: 'Local Gym',
      aiInsight: 'Excellent form focus! Consider adding Romanian deadlifts next week for posterior chain development. How did your lower back feel? 💪'
    }
  ]);

  // AI Coach Messages
  const [aiMessages, setAIMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hey Alex! I'm your AI fitness coach! 💪 I've analyzed your recent activity and I'm here to help you crush your goals. What's on your mind today?",
      timestamp: new Date().toISOString()
    }
  ]);

  const [aiInput, setAIInput] = useState('');
  const [aiLoading, setAILoading] = useState(false);

  const [newPost, setNewPost] = useState({
    text: '',
    type: 'workout',
    workout: { exercise: '', weight: '', sets: '', reps: '', duration: '' },
    location: ''
  });

  // Generate AI insight for posts
  const generateAIInsight = async (postContent) => {
    const prompt = `
    Analyze this fitness post and provide a helpful, encouraging insight in 1-2 sentences:
    
    Post: "${postContent.text}"
    Workout: ${postContent.workout ? `${postContent.workout.exercise} ${postContent.workout.sets}x${postContent.workout.reps}` : 'None'}
    
    Provide a brief, encouraging comment with a specific tip or observation. Be supportive and include relevant emojis.
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an encouraging fitness coach providing brief, helpful insights on workout posts."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 100,
        temperature: 0.7
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI insight error:', error);
      return "Great work! Keep building those healthy habits! 💪";
    }
  };

  // Generate user context for AI coach
  const generateUserContext = () => {
    const recentWorkouts = posts.filter(p => p.user.name === userData.name && p.type === 'workout');
    return `
    User Stats:
    - Recent workouts: ${recentWorkouts.length} this week
    - Favorite exercises: ${recentWorkouts.map(w => w.content.workout?.exercise).filter(Boolean).join(', ') || 'None logged'}
    - Fitness level: ${userData.level}
    - Current streak: ${userData.streak} days
    - Weekly goal: ${userData.weeklyGoal} workouts
    
    Recent activity: ${recentWorkouts.slice(0, 3).map(w => 
      w.content.workout ? `${w.content.workout.exercise} - ${w.content.workout.sets}x${w.content.workout.reps}` : w.content.text
    ).join(', ') || 'No recent workouts'}
    `;
  };

  // Send message to AI coach
  const sendAIMessage = async () => {
    if (!aiInput.trim() || aiLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: aiInput,
      timestamp: new Date().toISOString()
    };

    setAIMessages(prev => [...prev, userMessage]);
    setAIInput('');
    setAILoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: FITNESS_COACH_PROMPT.replace('{userContext}', generateUserContext())
          },
          ...aiMessages.slice(-10).map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          {
            role: "user",
            content: aiInput
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: response.choices[0].message.content,
        timestamp: new Date().toISOString()
      };

      setAIMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Coach error:', error);
      
      const fallbackMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: "Sorry, I'm having trouble connecting right now. But I'm here to help! Try asking me about your workout plan or nutrition tips. 💪",
        timestamp: new Date().toISOString()
      };
      
      setAIMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setAILoading(false);
    }
  };

  // Handle post creation with AI insight
  const handleCreatePost = async () => {
    if (newPost.text.trim()) {
      const postContent = {
        text: newPost.text,
        ...(newPost.type === 'workout' && { workout: newPost.workout })
      };

      // Generate AI insight for the post
      const aiInsight = await generateAIInsight(postContent);

      const post = {
        id: Date.now(),
        user: { name: userData.name, username: userData.username, avatar: userData.avatar },
        type: newPost.type,
        content: postContent,
        likes: 0,
        comments: 0,
        timeAgo: 'now',
        isLiked: false,
        gym: newPost.location,
        aiInsight: aiInsight
      };
      
      setPosts([post, ...posts]);
      setNewPost({ text: '', type: 'workout', workout: { exercise: '', weight: '', sets: '', reps: '', duration: '' }, location: '' });
      setShowPostModal(false);
    }
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  // Feed View
  const FeedView = () => (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* AI Coach Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              AI Coach Ready! 🤖
            </h2>
            <p className="text-gray-200">Get personalized workout advice and form tips.</p>
          </div>
          <button 
            onClick={() => setShowAICoach(true)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
          >
            Chat Now
          </button>
        </div>
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

  // Profile View
  const ProfileView = () => (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          {userData.avatar}
        </div>
        <h1 className="text-xl font-bold text-black mb-2">{userData.name}</h1>
        <p className="text-gray-500 mb-4">{userData.username}</p>
        <p className="text-gray-700 mb-6">{userData.bio}</p>
        
        {/* AI Stats */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-black mb-3">AI Insights</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-lg font-bold text-black">{userData.streak}</div>
              <div className="text-gray-500">Day Streak</div>
            </div>
            <div>
              <div className="text-lg font-bold text-black">{userData.level}</div>
              <div className="text-gray-500">Level</div>
            </div>
            <div>
              <div className="text-lg font-bold text-black">{userData.weeklyGoal}</div>
              <div className="text-gray-500">Weekly Goal</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-8 text-sm">
          <span><strong className="text-black">{posts.filter(p => p.user.name === userData.name).length}</strong> <span className="text-gray-600">posts</span></span>
          <span><strong className="text-black">0</strong> <span className="text-gray-600">followers</span></span>
          <span><strong className="text-black">0</strong> <span className="text-gray-600">following</span></span>
        </div>
      </div>
    </div>
  );

  // AI Coach Modal
  const AICoachModal = () => (
    showAICoach && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
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
          
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6">
            <div className="space-y-4">
              {aiMessages.map((message) => (
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
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
              
              {aiLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-black p-3 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">AI Coach</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAIInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                placeholder="Ask about workouts, nutrition, form tips..."
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                disabled={aiLoading}
              />
              <button 
                onClick={sendAIMessage}
                disabled={aiLoading || !aiInput.trim()}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Post Modal
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
            <div>
              <label className="block text-sm font-medium text-black mb-2">What did you do today?</label>
              <textarea
                value={newPost.text}
                onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                placeholder="Share your workout, how you felt, or any fitness wins!"
                className="w-full border border-gray-300 rounded-xl p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

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
            <h1 className="text-xl font-bold text-black">FitSocial AI</h1>
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
                className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
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

      {/* Modals */}
      <PostModal />
      <AICoachModal />
    </div>
  );
}

export default App;
