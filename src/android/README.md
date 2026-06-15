# Android 项目配置

此目录由 Capacitor 自动生成。

## 重要配置

### 1. 修改应用名称

编辑 `app/src/main/res/values/strings.xml`：

```xml
<resources>
    <string name="app_name">产品追踪器</string>
</resources>
```

### 2. 修改应用图标

替换以下目录中的应用图标：
- `app/src/main/res/mipmap-hdpi/ic_launcher.png`
- `app/src/main/res/mipmap-mdpi/ic_launcher.png`
- `app/src/main/res/mipmap-xhdpi/ic_launcher.png`
- `app/src/main/res/mipmap-xxhdpi/ic_launcher.png`
- `app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`

建议尺寸：
- mdpi: 48x48
- hdpi: 72x72
- xhdpi: 96x96
- xxhdpi: 144x144
- xxxhdpi: 192x192

### 3. 修改启动屏

编辑 `app/src/main/res/drawable/splash.xml` 或替换启动图。

### 4. 修改应用主题色

编辑 `app/src/main/res/values/styles.xml`：

```xml
<style name="AppTheme" parent="AppTheme.Base">
    <item name="colorPrimary">#3B82F6</item>
    <item name="colorPrimaryDark">#2563EB</item>
    <item name="colorAccent">#F97316</item>
</style>
```

### 5. 配置权限

编辑 `app/src/main/AndroidManifest.xml` 添加权限：

```xml
<!-- 相机权限（扫码功能） -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- 网络权限 -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- 存储权限（可选） -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- 麦克风权限（语音输入） -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />

<!-- 振动权限 -->
<uses-permission android:name="android.permission.VIBRATE" />
```

## 构建命令

```bash
# Debug 构建
./gradlew assembleDebug

# Release 构建
./gradlew assembleRelease

# 清理构建
./gradlew clean

# 查看所有可用任务
./gradlew tasks
```

## 调试

1. 在 Android Studio 中打开项目
2. 连接手机或启动模拟器
3. 点击 "Run" → "Debug"
4. 使用 Chrome DevTools 调试：
   - 在 Chrome 地址栏输入 `chrome://inspect`
   - 选择你的设备和应用
