# Android APP 打包指南

本指南将帮助你把产品追踪器 web 应用打包成 Android APK。

## 前置要求

确保已安装以下工具：

```bash
# 检查 Node.js 版本（需要 v18+）
node -v

# 检查 npm 版本
npm -v

# 安装 pnpm（推荐）
npm install -g pnpm
```

## 打包步骤

### 第一步：安装 Capacitor

```bash
# 进入项目目录
cd /

# 安装 Capacitor 核心包和 CLI
pnpm add @capacitor/core @capacitor/cli

# 安装 Android 平台支持
pnpm add @capacitor/android

# 安装状态栏和启动屏插件
pnpm add @capacitor/status-bar @capacitor/splash-screen
```

### 第二步：初始化 Capacitor

```bash
# 初始化 Capacitor（按提示输入信息）
npx cap init

# 输入信息：
# - App name: 产品追踪器
# - Package ID: com.producttracker.app
```

### 第三步：添加 Android 平台

```bash
# 添加 Android 平台
npx cap add android
```

### 第四步：构建 Web 应用

```bash
# 构建生产版本
pnpm run build
```

### 第五步：同步到 Android 项目

```bash
# 同步 Web 资源到 Android 项目
npx cap sync android
```

### 第六步：使用 Android Studio 打包 APK

#### 方法一：Android Studio

1. 打开 Android Studio
2. 选择 "Open an existing project"
3. 导航到 `/android` 目录，点击 "Open"
4. 等待 Gradle 同步完成
5. 点击菜单 "Build" → "Build Bundle(s) / APK(s)" → "Build APK(s)"
6. APK 生成位置：`android/app/build/outputs/apk/debug/app-debug.apk`

#### 方法二：命令行打包

```bash
# 进入 Android 项目目录
cd android

# 构建 Debug APK
./gradlew assembleDebug

# 构建 Release APK（需要签名配置）
./gradlew assembleRelease
```

## APK 输出位置

| 类型 | 路径 |
|------|------|
| Debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` |
| Release APK | `android/app/build/outputs/apk/release/app-release.apk` |

## 安装到手机测试

### 方法一：通过 ADB 安装

```bash
# 连接手机（需要开启开发者模式和 USB 调试）
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### 方法二：直接传输 APK

1. 将 `app-debug.apk` 文件复制到手机
2. 在手机上点击 APK 文件安装
3. 如果提示"禁止安装未知来源应用"，需要在设置中开启权限

## 发布到应用商店

### 生成签名密钥

```bash
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### 配置 Gradle 签名

在 `android/app/build.gradle` 中添加：

```groovy
android {
    signingConfigs {
        release {
            storeFile file('my-release-key.jks')
            storePassword '密码'
            keyAlias 'my-key-alias'
            keyPassword '密码'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 构建 Release APK

```bash
cd android
./gradlew assembleRelease
```

## 常见问题

### Q: 打包后页面空白？

检查 `capacitor.config.ts` 中的 `webDir` 是否指向正确的构建输出目录。

### Q: 页面无法访问？

这是因为应用需要服务器运行。解决方案：
1. 配置 `capacitor.config.ts` 中的 `server.url` 为你的服务器地址
2. 或者将应用改为离线模式，使用本地存储

### Q: 原生功能不工作？

确保已安装对应的 Capacitor 插件，并运行 `npx cap sync`。

### Q: 如何更新已安装的 APP？

每次代码更新后，执行：

```bash
pnpm run build
npx cap sync android
# 然后重新安装 APK
```

## 离线使用配置

如果需要 APP 能在没有网络时使用，需要修改 `App.jsx`，将数据存储从 localStorage 改为使用 `Capacitor Storage` 插件：

```bash
pnpm add @capacitor/storage
```

然后修改代码中的存储逻辑。
