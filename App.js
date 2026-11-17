import React, { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  StatusBar, Image, Alert, ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const RED = "#8E1018";
const GOLD = "#E8BE62";
const DARK = "#120D0E";

export default function App() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  async function openLibrary() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("إذن المكتبة", "اسمح لروشا بالوصول إلى الصور والفيديوهات من إعدادات الهاتف.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      quality: 0.9
    });
    if (!result.canceled && result.assets?.length) setSelectedMedia(result.assets[0]);
  }

  async function openCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("إذن الكاميرا", "اسمح لروشا باستخدام الكاميرا من إعدادات الهاتف.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 0.9,
      videoMaxDuration: 60
    });
    if (!result.canceled && result.assets?.length) setSelectedMedia(result.assets[0]);
  }

  function addContent() {
    Alert.alert("إنشاء محتوى", "اختر طريقة الإضافة", [
      { text: "فتح الكاميرا", onPress: openCamera },
      { text: "اختيار من المكتبة", onPress: openLibrary },
      { text: "إلغاء", style: "cancel" }
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={DARK} />
      <View style={styles.header}>
        <Text style={styles.logo}>R</Text>
        <Text style={styles.brand}>ROSHA</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => Alert.alert("روشا", "سيتم تفعيل الإشعارات عند ربط الخادم.")}>
          <Text style={styles.headerIcon}>♧</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feed}>
        {selectedMedia ? (
          <ScrollView contentContainerStyle={styles.preview}>
            {selectedMedia.type === "video" ? (
              <View style={styles.videoPlaceholder}>
                <Text style={styles.play}>▶</Text>
                <Text style={styles.previewText}>تم اختيار فيديو بنجاح</Text>
              </View>
            ) : (
              <Image source={{ uri: selectedMedia.uri }} style={styles.previewImage} resizeMode="contain" />
            )}
            <Text style={styles.previewText}>معاينة المحتوى المختار</Text>
            <TouchableOpacity style={styles.goldButton} onPress={() => Alert.alert("النشر", "واجهة النشر جاهزة. يلزم ربط التخزين والخادم قبل نشر المحتوى للعالم.")}>
              <Text style={styles.goldButtonText}>متابعة إلى النشر</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedMedia(null)}>
              <Text style={styles.cancelText}>إلغاء المعاينة</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View style={styles.emptyFeed}>
            <View style={styles.watermark}><Text style={styles.watermarkR}>R</Text></View>
            <Text style={styles.welcome}>مرحباً بك في روشا</Text>
            <Text style={styles.sub}>مساحتك لمشاهدة وصناعة الفيديوهات القصيرة</Text>
            <TouchableOpacity style={styles.addButton} onPress={addContent}>
              <Text style={styles.plus}>＋</Text>
            </TouchableOpacity>
            <Text style={styles.addHint}>ابدأ بإضافة صورة أو فيديو</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => Alert.alert("الإعجاب", "سيتم تفعيل الإعجابات بعد ربط الحسابات والخادم.")}>
          <Text style={styles.actionIcon}>♡</Text><Text style={styles.actionLabel}>إعجاب</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => Alert.alert("التعليقات", "ستظهر التعليقات هنا بعد ربط الخادم.")}>
          <Text style={styles.actionIcon}>▢</Text><Text style={styles.actionLabel}>تعليق</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => Alert.alert("المشاركة", "ستتوفر المشاركة عند نشر الفيديوهات.")}>
          <Text style={styles.actionIcon}>↗</Text><Text style={styles.actionLabel}>مشاركة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => Alert.alert("الحفظ", "ستتوفر قائمة المحفوظات مع حساب المستخدم.")}>
          <Text style={styles.actionIcon}>▱</Text><Text style={styles.actionLabel}>حفظ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => setActiveTab("home")}><Text style={[styles.tab, activeTab==="home" && styles.tabActive]}>الرئيسية</Text></TouchableOpacity>
        <TouchableOpacity onPress={addContent}><Text style={styles.tabPlus}>＋</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("profile")}><Text style={[styles.tab, activeTab==="profile" && styles.tabActive]}>حسابي</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:DARK},
  header:{height:62,backgroundColor:RED,flexDirection:"row",alignItems:"center",paddingHorizontal:18,borderBottomWidth:1,borderBottomColor:"#B58B43"},
  logo:{fontSize:38,fontWeight:"900",color:GOLD,marginRight:9,fontStyle:"italic"},
  brand:{fontSize:19,fontWeight:"900",letterSpacing:3,color:GOLD,flex:1},
  headerButton:{padding:8},
  headerIcon:{fontSize:25,color:GOLD},
  feed:{flex:1,justifyContent:"center"},
  emptyFeed:{flex:1,alignItems:"center",justifyContent:"center",padding:25},
  watermark:{position:"absolute",opacity:0.08},
  watermarkR:{fontSize:260,fontWeight:"900",color:GOLD},
  welcome:{fontSize:25,fontWeight:"bold",color:GOLD,marginBottom:10},
  sub:{fontSize:14,color:"#D5C9B7",textAlign:"center",marginBottom:28},
  addButton:{width:76,height:76,borderRadius:22,backgroundColor:RED,borderWidth:2,borderColor:GOLD,alignItems:"center",justifyContent:"center"},
  plus:{fontSize:48,color:GOLD,lineHeight:55},
  addHint:{color:"#D5C9B7",marginTop:12,fontSize:13},
  preview:{flexGrow:1,alignItems:"center",justifyContent:"center",padding:16},
  previewImage:{width:"100%",height:390,borderRadius:14,backgroundColor:"#21191A"},
  videoPlaceholder:{height:300,width:"100%",backgroundColor:"#24191A",alignItems:"center",justifyContent:"center",borderRadius:14},
  play:{fontSize:50,color:GOLD},
  previewText:{color:GOLD,fontSize:15,margin:14},
  goldButton:{backgroundColor:GOLD,borderRadius:12,paddingVertical:14,paddingHorizontal:35,marginTop:10},
  goldButtonText:{color:"#271A0C",fontWeight:"bold",fontSize:16},
  cancelText:{color:"#D7C6A5",marginTop:18},
  actions:{height:72,flexDirection:"row",justifyContent:"space-around",alignItems:"center",borderTopWidth:1,borderBottomWidth:1,borderColor:"#453235"},
  action:{alignItems:"center",minWidth:55},
  actionIcon:{fontSize:25,color:GOLD},
  actionLabel:{fontSize:11,color:"#E7D9C6",marginTop:2},
  bottom:{height:62,backgroundColor:RED,flexDirection:"row",alignItems:"center",justifyContent:"space-around"},
  tab:{color:"#E9D9B8",fontSize:14},
  tabActive:{color:GOLD,fontWeight:"bold"},
  tabPlus:{color:GOLD,fontSize:34,fontWeight:"bold"}
});
