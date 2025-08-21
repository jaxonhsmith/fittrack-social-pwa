import React, { useState } from 'react';
import { 
  Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, 
  User, Users, Heart, Share2, Search, Settings, Trophy, Zap, 
  BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Send, Home, 
  MoreHorizontal, Filter, MapPin, Bell, Flame, Brain, 
  X, Cpu, LineChart, PieChart, BookOpen, Lightbulb,
  MessageSquareText, Video, Phone, Smile, Paperclip
} from 'lucide-react';

const FitnessTracker = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchTab, setActiveSearchTab] = useState('people');
  const [activeChatTab, setActiveChatTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newComment, setNewComment] = useState('');

  const [aiChatHistory, setAiChatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hello! I'm your AI fitness coach. I'm here to help you with evidence-based training advice, nutrition guidance, and workout optimization. What would you like to know?",
      timestamp: '9:00 AM'
    }
  ]);
  
  const [currentUser] = useState({
    id: 'user1',
    name: 'Alex Thompson',
    username: '@alexthompson',
    avatar: '🔥',
    followers: 1247,
    following: 892,
    posts: 156,
    level: 'Intermediate',
    streak: 12,
    totalWorkouts: 89
  });

  const [chats, setChats] = useState([
    {
      id: 1,
      type: 'private',
      name: 'Alex Rodriguez',
      avatar: '💪',
      lastMessage: 'Great workout today! How did your deadlifts go?',
      timestamp: '2h',
      unread: 2,
      messages: [
        { id: 1, sender: 'Alex Rodriguez', message: 'Hey! How was your workout today?', timestamp: '10:30 AM', isOwn: false },
        { id: 2, sender: 'You', message: 'Crushed it! Hit a new PR on deadlifts - 385lbs!', timestamp: '10:45 AM', isOwn: true },
        { id: 3, sender: 'Alex Rodriguez', message: 'That\'s amazing! 🔥 What\'s your next goal?', timestamp: '11:00 AM', isOwn: false }
      ]
    },
    {
      id: 2,
      type: 'group',
      name: 'Morning Workout Crew',
      avatar: '🏋️‍♂️',
      lastMessage: 'Maya: Anyone up for a 6am session tomorrow?',
      timestamp: '5h',
      unread: 5,
      members: ['Alex Rodriguez', 'Maya Chen', 'Jordan Kim', 'You'],
      messages: [
        { id: 1, sender: 'Maya Chen', message: 'Great session today everyone!', timestamp: '7:30 AM', isOwn: false },
        { id: 2, sender: 'Jordan Kim', message: 'Thanks for the motivation! 💪', timestamp: '7:45 AM', isOwn: false },
        { id: 3, sender: 'You', message: 'Same time tomorrow?', timestamp: '8:00 AM', isOwn: true }
      ]
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { 
        id: 'user2',
        name: 'Alex Rodriguez', 
        username: '@alexfits', 
        avatar: '💪', 
        followers: 12400, 
        verified: true,
        level: 'Advanced'
      },
      type: 'workout',
      content: {
        text: "Absolutely crushed today's deadlift session! New PR: 405lbs 🔥 Consistency and progressive overload are everything. What's your current PR?",
        workout: {
          exercise: 'Deadlifts',
          weight: '405 lbs',
          sets: 5,
          reps: 3,
          duration: '45 min',
          calories: 320
        },
        tags: ['deadlift', 'strength', 'pr', 'powerlifting']
      },
      likes: 847,
      comments: [
        { id: 1, user: 'Maya Chen', username: '@mayaruns', text: 'Incredible lift! My PR is 315lbs, working towards 350!', timeAgo: '2h', likes: 12 }
      ],
      shares: 23,
      timeAgo: '3h',
      isLiked: false,
      isBookmarked: false,
      gym: 'Iron Temple Gym'
    },
    {
      id: 2,
      user: { 
        id: 'user3',
        name: 'Maya Chen', 
        username: '@mayaruns', 
        avatar: '🏃‍♀️', 
        followers: 8900, 
        verified: false,
        level: 'Intermediate'
      },
      type: 'progress',
      content: {
        text: "6 months transformation update! Down 25lbs and feeling stronger than ever. The journey isn't always linear but every step counts 💫",
        achievement: '6 Month Transformation',
        stats: { weight: '-25 lbs', bf: '-8%', muscle: '+3 lbs' }
      },
      likes: 1204,
      comments: [],
      shares: 67,
      timeAgo: '8h',
      isLiked: true,
      isBookmarked: true,
      gym: null
    }
  ]);

  const [searchResults] = useState({
    people: [
      { 
        id: 'search1', 
        name: 'Sarah Williams', 
        username: '@sarahlifts', 
        avatar: '💪', 
        followers: 24500, 
        verified: true, 
        bio: 'Powerlifter | Coach | Mindset',
        level: 'Expert',
        isFollowing: false
      },
      { 
        id: 'search2', 
        name: 'David Park', 
        username: '@davetrains', 
        avatar: '🏋️‍♂️', 
        followers: 18200, 
        verified: false, 
        bio: 'Personal Trainer | Nutrition',
        level: 'Advanced',
        isFollowing: true
      }
    ],
    workouts: [
      { id: 1, name: 'Ultimate Push Day', creator: '@alexfits', difficulty: 'Advanced', duration: '75 min', likes: 2400 },
      { id: 2, name: 'Beginner Full Body', creator: '@sarahlifts', difficulty: 'Beginner', duration: '45 min', likes: 1800 }
    ]
  });

  const [newPost, setNewPost] = useState({
    text: '',
    type: 'general',
    workout: { exercise: '', weight: '', sets: '', reps: '', duration: '', calories: '' },
    tags: '',
    location: ''
  });

  const generateFitnessResponse = (question) => {
    if (question.includes('protein') || question.includes('nutrition')) {
      return "For optimal muscle protein synthesis, aim for 1.6-2.2g protein per kg body weight daily. Research shows consuming 20-40g high-quality protein within 2 hours post-workout maximizes recovery.";
    }
    
    if (question.includes('muscle') || question.includes('hypertrophy')) {
      return "Muscle hypertrophy occurs through mechanical tension, metabolic stress, and muscle damage. Train in the 6-20 rep range with 65-85% 1RM. Progressive overload is crucial - increase weight, reps, or volume weekly.";
    }
    
    if (question.includes('strength') || question.includes('powerlifting')) {
      return "Strength gains are primarily neurological in first 6-8 weeks, then structural. Train heavy (85-95% 1RM) for 1-6 reps to improve motor unit recruitment. Focus on compound movements: squat, deadlift, bench press.";
    }
    
    return "That's a great question! Based on current exercise science research, I'd recommend focusing on progressive overload, adequate protein intake (1.6-2.2g/kg), and proper recovery. Could you be more specific about your goals?";
  };

  const handleAiQuestion = () => {
    if (!aiQuestion.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: aiQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatHistory(prev => [...prev, userMessage]);

    const aiResponse = generateFitnessResponse(aiQuestion.toLowerCase());

    const aiMessage = {
      id: Date.now() + 1,
      type: 'ai',
      message: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setAiChatHistory(prev => [...prev, aiMessage]);
    }, 1000);

    setAiQuestion('');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, messages: [...chat.messages, message], lastMessage: newMessage, timestamp: 'now' }
        : chat
    ));

    setNewMessage('');
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const toggleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedPost) {
      const comment = {
        id: Date.now(),
        user: currentUser.name,
        username: currentUser.username,
        text: newComment,
        timeAgo: 'now',
        likes: 0
      };
      
      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ));
      
      setNewComment('');
      setShowCommentModal(false);
    }
  };

  const handleCreatePost = () => {
    if (newPost.text.trim()) {
      const post = {
        id: Date.now(),
        user: { 
          id: currentUser.id,
          name: currentUser.name, 
          username: currentUser.username, 
          avatar: currentUser.avatar, 
          followers: currentUser.followers, 
          verified: false,
          level: currentUser.level
        },
        type: newPost.type,
        content: {
          text: newPost.text,
          ...(newPost.type === 'workout' && { workout: newPost.workout }),
          tags: newPost.tags.split(' ').filter(tag => tag.startsWith('#'))
        },
        likes: 0,
        comments: [],
        shares: 0,
        timeAgo: 'now',
        isLiked: false,
        isBookmarked: false,
        gym: newPost.location
      };
      setPosts([post, ...posts]);
      setNewPost({ text: '', type: 'general', workout: { exercise: '', weight: '', sets: '', reps: '', duration: '', calories: '' }, tags: '', location: '' });
      setShowPostModal(false);
    }
  };

  // AI Coach View
  const AiCoachView = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-8 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-8 w-8" />
          <h1 className="text-3xl font-bold">AI Fitness Coach</h1>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Science-Based</span>
        </div>
        <p className="text-xl opacity-90">Ask me anything about exercise science, nutrition, training methodology, or fitness optimization!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-6 w-6 text-black" />
            <h3 className="font-bold text-black">Exercise Science</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Ask about muscle hypertrophy, strength training, biomechanics, and movement patterns.</p>
          <button 
            onClick={() => setAiQuestion('How does progressive overload work for muscle growth?')}
            className="text-black text-sm hover:underline"
          >
            Example: Progressive overload principles →
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-black" />
            <h3 className="font-bold text-black">Nutrition Science</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Learn about protein synthesis, macro distribution, meal timing, and supplementation.</p>
          <button 
            onClick={() => setAiQuestion('What is the optimal protein intake for muscle building?')}
            className="text-black text-sm hover:underline"
          >
            Example: Protein requirements →
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-black" />
            <h3 className="font-bold text-black">Training Methods</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Discover periodization, recovery protocols, and program design principles.</p>
          <button 
            onClick={() => setAiQuestion('How should I structure my training for strength gains?')}
            className="text-black text-sm hover:underline"
          >
            Example: Strength programming →
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-black">Chat with AI Coach</h2>
          <p className="text-sm text-gray-600">Get evidence-based answers to your fitness questions</p>
        </div>
        
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {aiChatHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                msg.type === 'user' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-black'
              }`}>
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Ask about exercise science, nutrition, training..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAiQuestion()}
            />
            <button 
              onClick={handleAiQuestion}
              className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Chats View
  const ChatsView = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">Messages</h1>
        <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveChatTab('chats')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeChatTab === 'chats' 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  All Chats
                </button>
                <button
                  onClick={() => setActiveChatTab('groups')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeChatTab === 'groups' 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Groups
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {chats.filter(chat => activeChatTab === 'chats' || chat.type === 'group').map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                    selectedChat?.id === chat.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                        {chat.avatar}
                      </div>
                      {chat.type === 'group' && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-black truncate">{chat.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{chat.timestamp}</span>
                          {chat.unread > 0 && (
                            <span className="bg-black text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedChat ? (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      {selectedChat.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-black">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-600">Active now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <Video className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {selectedChat.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isOwn 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-black'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-gray-300' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-black text-white p-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <MessageSquareText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-black mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Feed View
  const FeedView = () => (
    <div className="max-w-2xl mx-auto">
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

      <div className="space-y-8 px-6 pb-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{post.user.level}</span>
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

            <div className="px-6 pb-4">
              <p className="text-gray-900 leading-relaxed mb-4">{post.content.text}</p>

              {post.type === 'workout' && post.content.workout && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-black">Workout Details</h4>
                    <Dumbbell className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
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
                  {post.content.workout.calories && (
                    <div className="text-sm text-gray-600">
                      🔥 {post.content.workout.calories} calories burned
                    </div>
                  )}
                </div>
              )}

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
                    onClick={() => {setSelectedPost(post); setShowCommentModal(true);}}
                    className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>
                <button 
                  onClick={() => toggleBookmark(post.id)}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <Bookmark className={`h-5 w-5 ${post.isBookmarked ? 'fill-black text-black' : ''}`} />
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
      </div>

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
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{person.level}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-4">{person.bio}</p>
            <button className={`w-full py-3 rounded-xl font-medium transition-colors ${
              person.isFollowing 
                ? 'bg-gray-100 text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}>
              {person.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Analytics View
  const AnalyticsView = () => (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <p className="text-xl opacity-90 mb-6">You're on fire! 🔥 12-day streak!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <p className="text-sm opacity-75">Weekly Progress</p>
            <p className="text-2xl font-bold">+15%</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <p className="text-sm opacity-75">Current Streak</p>
            <p className="text-2xl font-bold">12 days</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <p className="text-sm opacity-75">Total Workouts</p>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile View
  const ProfileView = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <div className="flex items-start space-x-6 mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl font-semibold">
            {currentUser.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-black">{currentUser.name}</h1>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{currentUser.level}</span>
              <button className="text-gray-600 hover:text-black">
                <Settings className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-500 mb-3">{currentUser.username}</p>
            <p className="text-gray-700 mb-4">Fitness enthusiast on a journey to become the best version of myself 💪</p>
            <div className="flex items-center space-x-6 text-sm mb-4">
              <span><strong className="text-black">{currentUser.posts}</strong> <span className="text-gray-600">posts</span></span>
              <span><strong className="text-black">{currentUser.followers.toLocaleString()}</strong> <span className="text-gray-600">followers</span></span>
              <span><strong className="text-black">{currentUser.following}</strong> <span className="text-gray-600">following</span></span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <Flame className="w-4 h-4 mr-1 text-orange-500" />
                <strong>{currentUser.streak}</strong> day streak
              </span>
              <span className="flex items-center">
                <Dumbbell className="w-4 h-4 mr-1" />
                <strong>{currentUser.totalWorkouts}</strong> workouts
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gray-100 text-black py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Edit Profile
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className="bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );

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
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
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

            <div>
              <label className="block text-sm font-medium text-black mb-3">What's on your mind?</label>
              <textarea
                value={newPost.text}
                onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                placeholder="Share your fitness journey, tips, or achievements..."
                className="w-full border border-gray-300 rounded-xl p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

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
              </div>
            )}
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

  const CommentModal = () => (
    showCommentModal && selectedPost && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Comments</h2>
              <button 
                onClick={() => setShowCommentModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {selectedPost.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    👤
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{comment.user}</span>
                      <span className="text-gray-500 text-xs">{comment.timeAgo}</span>
                    </div>
                    <p className="text-gray-900 text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button 
                onClick={handleAddComment}
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
    { id: 'aicoach', name: 'AI Coach', icon: Brain },
    { id: 'chats', name: 'Chats', icon: MessageSquare },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
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

      <main className="py-8">
        {activeTab === 'feed' && <FeedView />}
        {activeTab === 'search' && <SearchView />}
        {activeTab === 'aicoach' && <AiCoachView />}
        {activeTab === 'chats' && <ChatsView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-2">
          {tabs.slice(0, 5).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center py-3 px-2"
              >
                <Icon 
                  className={`h-5 w-5 ${
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

      <PostModal />
      <CommentModal />
    </div>
  );
};

export default FitnessTracker;
