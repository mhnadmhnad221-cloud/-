import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authType, setAuthType] = useState('phone');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [username, setUsername] = useState('الإء');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(username);

  const [likes, setLikes] = useState(9750);
  const [isLiked, setIsLiked] = useState(false);
  const [giftsOpen, setGiftsOpen] = useState(false);
  
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([
    { id: '1', text: 'فيديو رائع جداً وتصميم مرتب ✨', user: 'أحمد' },
    { id: '2', text: 'استمر يا مبدع ابداع بلا حدود 🔥', user: 'علي' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [musicSearchOpen, setMusicSearchOpen] = useState(false);
  const [musicQuery, setMusicQuery] = useState('');
  const [selectedMusic, setSelectedMusic] = useState('البحث • شاشة سوداء للتصميم');
  const musicList = [
    'أغاني حزينة هادئة - تصميم خاص',
    'موسيقى ريمكس حماسية - روشا',
    'شاشة سوداء رومانسي - تأثيرات صافية',
    'موسيقى تركية هادئة للمونتاج'
  ];

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const addOrUpdateComment = () => {
    if (!newComment.trim()) return;
    if (editingCommentId) {
      setComments(comments.map(c => c.id === editingCommentId ? { ...c, text: newComment } : c));
      setEditingCommentId(null);
    } else {
      setComments([...comments, { id: Date.now().toString(), text: newComment, user: username }]);
    }
    setNewComment('');
  };

  const deleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.authContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.appLogoBox}>
          <Text style={styles.appLogoText}>R</Text>
        </View>
        <Text style={styles.appName}>ROSHA ✨ روشا</Text>
        <Text style={styles.appSubTitle}>منصتك المفضلة للفيديوهات والموسيقى والدعم</Text>

        <View style={styles.tabRow}>
          <TouchableOpacity style={[styles.tabButton, authType === 'phone' && styles.activeTab]} onPress={() => setAuthType('phone')}>
            <Text style={[styles.tabText, authType === 'phone' && styles.activeTabText]}>رقم الهاتف</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, authType === 'email' && styles.activeTab]} onPress={() => setAuthType('email')}>
            <Text style={[styles.tabText, authType === 'email' && styles.activeTabText]}>البريد الإلكتروني</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={authType === 'phone' ? "أدخل رقم الهاتف (مثال: 07xxxxxxxxx)" : "أدخل البريد الإلكتروني"}
            placeholderTextColor="#888"
            keyboardType={authType === 'phone' ? 'phone-pad' : 'email-address'}
            value={identifier}
            onChangeText={setIdentifier}
          />
          <TextInput
            style={styles.input}
            placeholder="كلمة المرور"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.loginButton} onPress={() => setIsLoggedIn(true)}>
            <Text style={styles.loginButtonText}>دخول / إنشاء حساب</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.videoContainer}>
        <View style={styles.mockVideoContent}>
          <Text style={styles.videoPlaceholderText}>شاشة عرض فيديو روشا (سلسة جداً)</Text>
        </View>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMusicSearchOpen(true)}>
            <Text style={styles.headerTitle}>🎵 اختر موسيقى</Text>
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ROSHA ✨</Text>
        </View>

        <View style={styles.topProfileContainer}>
          <TouchableOpacity onPress={() => setIsEditingProfile(true)}>
            <View style={styles.profileWrapper}>
              <Animated.View style={[styles.laserDotContainer, { transform: [{ rotate: spin }] }]}>
                <View style={styles.laserDot} />
              </Animated.View>
              
              <View style={styles.goldBorderRing}>
                <Image source={{ uri: profileImage }} style={styles.largeProfileImage} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileNameText}>{username}</Text>
        </View>

        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarButton} onPress={handleLike}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={36} color={isLiked ? "#ff3b30" : "#fff"} />
            <Text style={styles.sidebarText}>{likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarButton} onPress={() => setCommentsOpen(true)}>
            <Ionicons name="chatbubble-ellipses-outline" size={34} color="#fff" />
            <Text style={styles.sidebarText}>{comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.sidebarButton, styles.goldGlowButton]} onPress={() => setGiftsOpen(true)}>
            <FontAwesome5 name="gift" size={30} color="#FFD700" />
            <Text style={styles.goldText}>هدية</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarButton}>
            <Ionicons name="share-social-outline" size={32} color="#fff" />
            <Text style={styles.sidebarText}>873</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.userInfoRow}>
            <Text style={styles.username}>{username} • روشا</Text>
          </View>
          <Text style={styles.videoDescription}>
            تطبيق روشا المتكامل للفيديوهات والموسيقى 🔥 #روشا #اغاني #فيديو_ستار
          </Text>
          
          <View style={styles.musicRow}>
            <MaterialIcons name="music-note" size={16} color="#FFD700" />
            <Text style={styles.musicText}>{selectedMusic}</Text>
          </View>
        </View>

        {isEditingProfile && (
          <View style={styles.giftsModal}>
            <Text style={styles.modalTitle}>تعديل الملف الشخصي 👤</Text>
            <TextInput
              style={styles.inputModal}
              placeholder="تعديل اسم المستخدم"
              placeholderTextColor="#888"
              value={tempName}
              onChangeText={setTempName}
            />
            <TextInput
              style={styles.inputModal}
              placeholder="رابط الصورة الشخصية الجديدة (URL)"
              placeholderTextColor="#888"
              value={profileImage}
              onChangeText={setProfileImage}
            />
            <TouchableOpacity style={styles.chargeButton} onPress={() => { setUsername(tempName); setIsEditingProfile(false); }}>
              <Text style={styles.chargeButtonText}>حفظ التغييرات</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditingProfile(false)}>
              <Text style={styles.closeModalText}>إلغاء</Text>
            </TouchableOpacity>
          </View>
        )}

        {commentsOpen && (
          <View style={styles.commentsModal}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>التعليقات ({comments.length})</Text>
              <TouchableOpacity onPress={() => setCommentsOpen(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.commentUser}>{item.user}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                  <View style={styles.commentActions}>
                    <TouchableOpacity onPress={() => { setNewComment(item.text); setEditingCommentId(item.id); }}>
                      <Ionicons name="create-outline" size={18} color="#FFD700" style={{ marginLeft: 12 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteComment(item.id)}>
                      <Ionicons name="trash-outline" size={18} color="#ff3b30" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              style={{ flex: 1, marginVertical: 10 }}
            />

            <View style={styles.commentInputRow}>
              <TextInput
                style={styles.commentInput}
                placeholder={editingCommentId ? "تعديل التعليق..." : "أضف تعليقاً..."}
                placeholderTextColor="#888"
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity style={styles.sendCommentBtn} onPress={addOrUpdateComment}>
                <Ionicons name="send" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {musicSearchOpen && (
          <View style={styles.commentsModal}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>بحث واختيار الموسيقى 🎶</Text>
              <TouchableOpacity onPress={() => setMusicSearchOpen(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.inputModal}
              placeholder="ابحث عن اسم الأغنية أو التأثير..."
              placeholderTextColor="#888"
              value={musicQuery}
              onChangeText={setMusicQuery}
            />
            <FlatList
              data={musicList.filter(m => m.includes(musicQuery))}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.musicItemRow} onPress={() => { setSelectedMusic(item); setMusicSearchOpen(false); }}>
                  <MaterialIcons name="audiotrack" size={18} color="#FFD700" />
                  <Text style={styles.musicItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {giftsOpen && (
          <View style={styles.giftsModal}>
            <Text style={styles.modalTitle}>متجر هدايا روشا الذهبي 🎁</Text>
            <Text style={styles.modalSubText}>شحن الرصيد لدعم صناع المحتوى عبر المحافظ الإلكترونية</Text>
            <TouchableOpacity style={styles.chargeButton}>
              <Text style={styles.chargeButtonText}>شحن الرصيد (زين كاش / بطاقات)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setGiftsOpen(false)}>
              <Text style={styles.closeModalText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  authContainer: { flex: 1, backgroundColor: '#0d0d0d', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  appLogoBox: { width: 90, height: 90, backgroundColor: '#B22222', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFD700', marginBottom: 15 },
  appLogoText: { color: '#FFD700', fontSize: 50, fontWeight: 'bold' },
  appName: { color: '#FFD700', fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  appSubTitle: { color: '#888', fontSize: 14, marginBottom: 30, textAlign: 'center' },
  tabRow: { flexDirection: 'row', width: '100%', backgroundColor: '#1a1a1a', borderRadius: 10, marginBottom: 20, padding: 4 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#B22222' },
  tabText: { color: '#aaa', fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
  inputContainer: { width: '100%' },
  input: { backgroundColor: '#1a1a1a', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#333', textAlign: 'right' },
  loginButton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  videoContainer: { flex: 1, backgroundColor: '#111', justifyContent: 'flex-end' },
  mockVideoContent: { ...StyleSheet.absoluteFillObject, backgroundColor: '#0b0b0b', justifyContent: 'center', alignItems: 'center' },
  videoPlaceholderText: { color: '#444', fontSize: 14, textAlign: 'center' },
  header: { position: 'absolute', top: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', zIndex: 10 },
  headerTitle: { color: '#FFD700', fontSize: 16, fontWeight: 'bold' },
  brandTitle: { color: '#FFD700', fontSize: 20, fontWeight: '900', letterSpacing: 1.5 },
  topProfileContainer: { position: 'absolute', top: 65, left: 20, alignItems: 'center', zIndex: 10 },
  profileWrapper: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  laserDotContainer: { position: 'absolute', width: 80, height: 80, justifyContent: 'flex-start', alignItems: 'center' },
  laserDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFD700', shadowColor: '#FFD700', shadowRadius: 8, shadowOpacity: 1, elevation: 10 },
  goldBorderRing: { width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: '#FFD700', padding: 2, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  largeProfileImage: { width: '100%', height: '100%', borderRadius: 30 },
  profileNameText: { color: '#fff', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  sidebar: { position: 'absolute', right: 15, bottom: 110, alignItems: 'center' },
  sidebarButton: { alignItems: 'center', marginBottom: 20 },
  sidebarText: { color: '#fff', fontSize: 12, marginTop: 4, fontWeight: '600' },
  goldGlowButton: { backgroundColor: 'rgba(255, 215, 0, 0.15)', padding: 8, borderRadius: 25, borderWidth: 1, borderColor: '#FFD700' },
  goldText: { color: '#FFD700', fontSize: 11, fontWeight: 'bold', marginTop: 2 },
  footer: { padding: 15, paddingBottom: 25, backgroundColor: 'rgba(0,0,0,0.4)' },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  username: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  videoDescription: { color: '#ddd', fontSize: 13, marginBottom: 10, textAlign: 'right' },
  musicRow: { flexDirection: 'row', alignItems: 'center' },
  musicText: { color: '#FFD700', fontSize: 12, marginLeft: 6 },
  giftsModal: { position: 'absolute', bottom: 0, width: '100%', height: 280, backgroundColor: '#1a1a1a', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, alignItems: 'center', borderTopWidth: 2, borderColor: '#FFD700', zIndex: 100 },
  commentsModal: { position: 'absolute', bottom: 0, width: '100%', height: 400, backgroundColor: '#1a1a1a', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, borderTopWidth: 2, borderColor: '#FFD700', zIndex: 100 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { color: '#FFD700', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalSubText: { color: '#aaa', fontSize: 13, marginBottom: 20, textAlign: 'center' },
  inputModal: { width: '100%', backgroundColor: '#222', color: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#444', textAlign: 'right' },
  chargeButton: { backgroundColor: '#FFD700', width: '100%', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  chargeButtonText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  closeModalButton: { padding: 10 },
  closeModalText: { color: '#fff', fontSize: 14, textAlign: 'center' },
  commentItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: 10, borderRadius: 8, marginBottom: 8 },
  commentUser: { color: '#FFD700', fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  commentText: { color: '#fff', fontSize: 13 },
  commentActions: { flexDirection: 'row', alignItems: 'center' },
  commentInputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  commentInput: { flex: 1, backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#444', textAlign: 'right', marginLeft: 8 },
  sendCommentBtn: { backgroundColor: '#FFD700', padding: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  musicItemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#222', padding: 12, borderRadius: 8, marginBottom: 8 },
  musicItemText: { color: '#fff', fontSize: 13, marginRight: 10 }
});
