import React, { useState, useEffect } from 'react';
import { 
  Camera, Dumbbell, Target, MessageCircle, Plus, Calendar, TrendingUp, Award, Clock, 
  User, Users, Heart, Share2, Search, UserPlus, Settings, Eye, Copy, Trophy, Zap, 
  BarChart3, Play, CheckCircle, MessageSquare, Bookmark, Star, Send, Home, Compass, 
  PlusSquare, MoreHorizontal, Filter, Mic, Image, MapPin, Hash, Bell, Flame, Brain, 
  Activity, ChevronRight, X, ThumbsUp, Cpu, LineChart, PieChart, BookOpen, Lightbulb,
  MessageSquareText, UserCheck, Video, Phone, Smile, Paperclip
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
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hello! I'm your AI fitness coach. I'm here to help you with evidence-based training advice, nutrition guidance, and workout optimization. What would you like to know?",
      timestamp: '9:00 AM'
    }
  ]);
  const [aiQuestion, setAiQuestion] = useState('');
  
  const [currentUser, setCurrentUser] = useState({
    id: 'user1',
    name: 'Alex Thompson',
    username: '@alexthompson',
    avatar: '🔥',
    followers: 1247,
    following: 892,
    posts: 156,
    level: 'Intermediate',
    streak: 12,
    totalWorkouts: 89,
    following_list: ['user2', 'user3']
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
        { id: 3, sender: 'Alex Rodriguez', message: 'That\'s amazing! 🔥 What\'s your next goal?', timestamp: '11:00 AM', isOwn: false },
        { id: 4, sender: 'Alex Rodriguez', message: 'Great workout today! How did your deadlifts go?', timestamp: '2:15 PM', isOwn: false }
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
        { id: 3, sender: 'You', message: 'Same time tomorrow?', timestamp: '8:00 AM', isOwn: true },
        { id: 4, sender: 'Alex Rodriguez', message: 'Absolutely! Let\'s keep this streak going', timestamp: '8:15 AM', isOwn: false },
        { id: 5, sender: 'Maya Chen', message: 'Anyone up for a 6am session tomorrow?', timestamp: '12:30 PM', isOwn: false }
      ]
    },
    {
      id: 3,
      type: 'private',
      name: 'Maya Chen',
      avatar: '🏃‍♀️',
      lastMessage: 'Thanks for the nutrition tips!',
      timestamp: '1d',
      unread: 0,
      messages: [
        { id: 1, sender: 'Maya Chen', message: 'Hey! Could you share that protein smoothie recipe?', timestamp: 'Yesterday 3:00 PM', isOwn: false },
        { id: 2, sender: 'You', message: 'Sure! 1 banana, 1 scoop whey, 1 cup almond milk, 1 tbsp peanut butter, handful of spinach', timestamp: 'Yesterday 3:15 PM', isOwn: true },
        { id: 3, sender: 'Maya Chen', message: 'Thanks for the nutrition tips!', timestamp: 'Yesterday 4:00 PM', isOwn: false }
      ]
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  // AI Fitness Knowledge Base
  const handleAiQuestion = async () => {
    if (!aiQuestion.trim()) return;

    // Add user question to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: aiQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatHistory(prev => [...prev, userMessage]);

    // Generate AI response based on fitness science
    let aiResponse = generateFitnessResponse(aiQuestion.toLowerCase());

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

  const generateFitnessResponse = (question) => {
    // Comprehensive fitness science responses
    if (question.includes('protein') || question.includes('nutrition')) {
      return "For optimal muscle protein synthesis, aim for 1.6-2.2g protein per kg body weight daily. Research shows consuming 20-40g high-quality protein within 2 hours post-workout maximizes recovery. Leucine-rich sources like whey, chicken, or eggs are particularly effective at triggering mTOR pathway activation.";
    }
    
    if (question.includes('muscle') || question.includes('hypertrophy') || question.includes('gain')) {
      return "Muscle hypertrophy occurs through mechanical tension, metabolic stress, and muscle damage. Train in the 6-20 rep range with 65-85% 1RM. Progressive overload is crucial - increase weight, reps, or volume weekly. Rest 48-72 hours between training same muscle groups for optimal protein synthesis.";
    }
    
    if (question.includes('strength') || question.includes('powerlifting')) {
      return "Strength gains are primarily neurological in first 6-8 weeks, then structural. Train heavy (85-95% 1RM) for 1-6 reps to improve motor unit recruitment and firing frequency. Focus on compound movements: squat, deadlift, bench press. Allow 2-5 minutes rest between sets for full ATP-PC system recovery.";
    }
    
    if (question.includes('cardio') || question.includes('endurance') || question.includes('running')) {
      return "Cardiovascular adaptations include increased stroke volume, mitochondrial biogenesis, and capillarization. For fat loss, maintain 65-75% max heart rate (Zone 2). HIIT protocols like 4x4 minutes at 85-95% max HR improve VO2 max efficiently. Polarized training (80% easy, 20% hard) optimizes endurance gains.";
    }
    
    if (question.includes('fat loss') || question.includes('weight loss') || question.includes('cutting')) {
      return "Fat loss requires a caloric deficit of 500-750 calories daily for 1-1.5 lbs/week loss. Maintain protein at 2.3-3.1g/kg during cuts to preserve muscle mass. Combine resistance training with moderate cardio. Avoid extreme deficits that compromise metabolism and muscle retention.";
    }
    
    if (question.includes('rest') || question.includes('recovery') || question.includes('sleep')) {
      return "Recovery is when adaptation occurs! Aim for 7-9 hours quality sleep for optimal growth hormone release and protein synthesis. Active recovery (light movement) enhances blood flow and metabolite clearance. Manage training stress through periodization - vary intensity and volume systematically.";
    }
    
    if (question.includes('form') || question.includes('technique')) {
      return "Proper form maximizes muscle activation while minimizing injury risk. Focus on controlled eccentric (lowering) phase - it causes more muscle damage and growth stimulus. Maintain neutral spine, engage core, and move through full range of motion. Quality over quantity always wins.";
    }
    
    if (question.includes('supplement') || question.includes('creatine')) {
      return "Evidence-based supplements: Creatine monohydrate (3-5g daily) increases phosphocreatine stores for power output. Caffeine (3-6mg/kg) 30-60 minutes pre-workout enhances performance. Whey protein post-workout. Most other supplements lack strong scientific support - focus on whole foods first.";
    }
    
    if (question.includes('plateau') || question.includes('stuck')) {
      return "Plateaus indicate adaptation! Strategies: 1) Progressive overload variation (add weight, reps, sets), 2) Exercise variation to target muscles differently, 3) Periodization - planned changes in volume/intensity, 4) Deload weeks (reduce volume 40-60%), 5) Address recovery and nutrition gaps.";
    }
    
    if (question.includes('beginner') || question.includes('start')) {
      return "As a beginner, focus on compound movements and progressive overload. Start with 3 full-body workouts per week, mastering squat, deadlift, bench press, and rows. Linear progression works well initially - add 2.5-5lbs weekly. Prioritize form over weight. Expect rapid strength gains in first 3 months due to neural adaptations.";
    }
    
    // Default response for other questions
    return "That's a great question! Based on current exercise science research, I'd recommend focusing on progressive overload, adequate protein intake (1.6-2.2g/kg), and proper recovery. Could you be more specific about your goals? I can provide more targeted, evidence-based advice for strength, hypertrophy, endurance, or fat loss.";
  };

  const [aiInsights, setAiInsights] = useState({
    weeklyProgress: '+15%',
    recommendation: 'Focus on lower body strength this week',
    nextWorkout: 'Leg Day - Squats & Deadlifts',
    formTip: 'Keep your core tight during deadlifts',
    motivationalMessage: 'You\'re on fire! 🔥 12-day streak!',
    predictedPR: 'Deadlift PR predicted: 425lbs by next month'
  });

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
          calories: 320,
          difficulty: 'Advanced'
        },
        tags: ['deadlift', 'strength', 'pr', 'powerlifting']
      },
      likes: 847,
      comments: [
        { id: 1, user: 'Maya Chen', username: '@mayaruns', text: 'Incredible lift! My PR is 315lbs, working towards 350!', timeAgo: '2h', likes: 12 },
        { id: 2, user: 'Jordan Kim', username: '@jordanyoga', text: 'Beast mode! 💪 Form looked perfect', timeAgo: '1h', likes: 8 }
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
        stats: { weight: '-25 lbs', bf: '-8%', muscle: '+3 lbs' },
        progress: {
          startWeight: 185,
          currentWeight: 160,
          startBF: 28,
          currentBF: 20,
          muscleGain: 3
        }
      },
      likes: 1204,
      comments: [
        { id: 3, user: 'Alex Rodriguez', username: '@alexfits', text: 'Incredible transformation! What was your nutrition strategy?', timeAgo: '4h', likes: 15 }
      ],
      shares: 67,
      timeAgo: '8h',
      isLiked: true,
      isBookmarked: true,
      gym: null
    },
    {
      id: 3,
      user: { 
        id: 'user4',
        name: 'Jordan Kim', 
        username: '@jordanyoga', 
        avatar: '🧘‍♀️', 
        followers: 15600, 
        verified: true,
        level: 'Expert'
      },
      type: 'routine',
      content: {
        text: "Morning flow to start the day right ☀️ 20 minutes that change everything. Swipe for the full sequence!",
        routine: {
          name: 'Morning Sun Salutation',
          duration: '20 min',
          difficulty: 'Beginner',
          exercises: ['Sun Salutation A', 'Warrior I', 'Downward Dog', 'Child\'s Pose'],
          calories: 85,
          focus: 'Flexibility & Mindfulness'
        },
        tags: ['yoga', 'morning', 'flexibility', 'mindfulness']
      },
      likes: 523,
      comments: [
        { id: 4, user: 'Alex Thompson', username: '@alexthompson', text: 'Perfect way to start the day! Adding this to my routine', timeAgo: '6h', likes: 5 }
      ],
      shares: 89,
      timeAgo: '12h',
      isLiked: false,
      isBookmarked: false,
      gym: 'Home Practice'
    }
  ]);

  const [workoutHistory, setWorkoutHistory] = useState([
    { date: '2024-08-21', exercise: 'Deadlift', weight: 385, reps: 5, sets: 5 },
    { date: '2024-08-19', exercise: 'Squat', weight: 315, reps: 8, sets: 4 },
    { date: '2024-08-17', exercise: 'Bench Press', weight: 225, reps: 10, sets: 4 },
    { date: '2024-08-15', exercise: 'Deadlift', weight: 375, reps: 5, sets: 5 },
    { date: '2024-08-13', exercise: 'Squat', weight: 305, reps: 8, sets: 4 }
  ]);

  const [searchResults, setSearchResults] = useState({
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
      },
      { 
        id: 'search3', 
        name: 'Lisa Thompson', 
        username: '@lisaruns', 
        avatar: '🏃‍♀️', 
        followers: 31800, 
        verified: true, 
        bio: 'Marathon Runner | Health Coach',
        level: 'Expert',
        isFollowing: false
      }
    ],
    creators: [
      { id: 4, name: 'FitLife Academy', username: '@fitlifeacademy', avatar: '🎓', followers: 156000, verified: true, bio: 'Evidence-based fitness education', isFollowing: false },
      { id: 5, name: 'Strength Society', username: '@strengthsoc', avatar: '⚡', followers: 89400, verified: true, bio: 'Building stronger humans', isFollowing: true }
    ],
    workouts: [
      { id: 1, name: 'Ultimate Push Day', creator: '@alexfits', difficulty: 'Advanced', duration: '75 min', likes: 2400, exercises: 8 },
      { id: 2, name: 'Beginner Full Body', creator: '@sarahlifts', difficulty: 'Beginner', duration: '45 min', likes: 1800, exercises: 6 },
      { id: 3, name: 'HIIT Cardio Blast', creator: '@mayaruns', difficulty: 'Intermediate', duration: '30 min', likes: 1200, exercises: 10 }
    ]
  });

  const [newPost, setNewPost] = useState({
    text: '',
    type: 'general',
    workout: { exercise: '', weight: '', sets: '', reps: '', duration: '', calories: '' },
    tags: '',
    location: ''
  });

  const [newComment, setNewComment] = useState('');

  // Message functions
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

  const toggleFollow = (userId) => {
    setSearchResults(prev => ({
      ...prev,
      people: prev.people.map(person =>
        person.id === userId
          ? { ...person, isFollowing: !person.isFollowing, followers: person.isFollowing ? person.followers - 1 : person.followers + 1 }
          : person
      )
    }));
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
      
      setCurrentUser(prev => ({ ...prev, posts: prev.posts + 1 }));
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

      {/* Chat Interface */}
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
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              'Muscle building tips',
              'Fat loss strategies', 
              'Strength training',
              'Recovery protocols',
              'Supplement science'
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setAiQuestion(`Tell me about ${topic.toLowerCase()}`)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700 transition-colors"
              >
                {topic}
              </button>
            ))}
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
        {/* Chat List */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                {[
                  { id: 'chats', label: 'All Chats' },
                  { id: 'groups', label: 'Groups' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveChatTab(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      activeChatTab === tab.id 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
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
                      {chat.type === 'group' && (
                        <p className="text-xs text-gray-500">{chat.members.length} members</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      {selectedChat.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-black">{selectedChat.name}</h3>
                      {selectedChat.type === 'group' ? (
                        <p className="text-sm text-gray-600">{selectedChat.members.join(', ')}</p>
                      ) : (
                        <p className="text-sm text-gray-600">Active now</p>
                      )}
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

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {selectedChat.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isOwn 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-black'
                    }`}>
                      {!message.isOwn && selectedChat.type === 'group' && (
                        <p className="font-semibold text-xs mb-1 text-gray-500">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-gray-300' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Smile className="h-5 w-5 text-gray-600" />
                  </button>
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

  // Analytics View
  const AnalyticsView = () => (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <p className="text-xl opacity-90 mb-6">{aiInsights.motivationalMessage}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <p className="text-sm opacity-75">Weekly Progress</p>
            <p className="text-2xl font-bold">{aiInsights.weeklyProgress}</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <p className="text-sm opacity-75">Current Streak</p>
            <p className="text-2xl font-bold">{currentUser.streak} days</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-4">
            <p className="text-sm opacity-75">Total Workouts</p>
            <p className="text-2xl font-bold">{currentUser.totalWorkouts}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <LineChart className="h-6 w-6" />
            <h2 className="text-xl font-bold">Strength Progress</h2>
          </div>
          <div className="space-y-4">
            {workoutHistory.slice(0, 5).map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold">{workout.exercise}</p>
                  <p className="text-sm text-gray-600">{workout.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{workout.weight}lbs</p>
                  <p className="text-sm text-gray-600">{workout.sets}×{workout.reps}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <PieChart className="h-6 w-6" />
            <h2 className="text-xl font-bold">Workout Distribution</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Strength Training</span>
              <span className="font-semibold">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-black h-2 rounded-full" style={{width: '45%'}}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cardio</span>
              <span className="font-semibold">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{width: '30%'}}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Flexibility</span>
              <span className="font-semibold">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-400 h-2 rounded-full" style={{width: '25%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Feed View (simplified, removed AI tips from here)
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
                        🔥 {post.content.routine.calories} cal
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
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{person.level}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">{person.bio}</p>
              <button 
                onClick={() => toggleFollow(person.id)}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  person.isFollowing 
                    ? 'bg-gray-100 text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {person.isFollowing ? 'Following' : 'Follow'}
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
              <button 
                onClick={() => toggleFollow(creator.id)}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  creator.isFollowing 
                    ? 'bg-gray-100 text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {creator.isFollowing ? 'Following' : 'Follow'}
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
                    <span className="flex items-center">
                      <Dumbbell className="w-4 h-4 mr-1" />
                      {workout.exercises} exercises
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <Trophy className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <h3 className="font-bold text-black text-lg">Personal Records</h3>
          <p className="text-gray-600 text-sm">Deadlift: 385lbs</p>
          <p className="text-gray-600 text-sm">Squat: 315lbs</p>
          <p className="text-gray-600 text-sm">Bench: 225lbs</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <Target className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <h3 className="font-bold text-black text-lg">Current Goals</h3>
          <p className="text-gray-600 text-sm">400lb Deadlift</p>
          <p className="text-gray-600 text-sm">Body Weight -10lbs</p>
          <p className="text-gray-600 text-sm">5K Run &lt;20min</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <Award className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <h3 className="font-bold text-black text-lg">Achievements</h3>
          <p className="text-gray-600 text-sm">30-Day Streak</p>
          <p className="text-gray-600 text-sm">100 Workouts</p>
          <p className="text-gray-600 text-sm">First PR</p>
        </div>
      </div>

      <div className="text-center text-gray-500 py-12">
        <Camera className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold mb-2">Share your fitness journey!</h3>
        <p className="mb-4">Post your workouts and connect with the community</p>
        <button 
          onClick={() => setShowPostModal(true)}
          className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          Create Post
        </button>
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
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Duration (e.g., 45 min)"
                    value={newPost.workout.duration}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, duration: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Calories burned"
                    value={newPost.workout.calories}
                    onChange={(e) => setNewPost({...newPost, workout: {...newPost.workout, calories: e.target.value}})}
                    className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            )}

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
