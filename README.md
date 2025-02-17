# FiveM Weather Menu  

A powerful client-side weather and time control menu originally developed for Calsky State Roleplay. This menu allows players to dynamically control weather, time, wind, and blackout settings with smooth transitions and performance optimizations.  

## 🌟 Features  
✅ Dynamic weather control  
✅ Time management with freeze option  
✅ Wind speed and direction adjustments  
✅ Blackout functionality  
✅ Smooth weather transitions  
✅ Optimized for performance  
✅ Client-side only (changes are not synced between players)  

## 🛠️ Built With  
- **React** (for UI)  
- **TypeScript**  
- **Tailwind CSS**  
- **Vite**  
- **Lucide Icons**  
- **ox_lib notifications**  
- **Lua**  

## 📥 Installation  

1. **Download** the latest release.  
2. **Extract** it to your FiveM `resources` folder.  
3. **Ensure dependencies** in your `server.cfg` in this order:  

   ```ini
   ensure ox_lib
   ensure weather-menu
   ```

### ⚠️ Dependencies  
- **ox_lib** (Required for notifications)  

## 🔑 Permissions  

This script uses **ACE permissions** for command access, which can be enabled or disabled in the config.  

For restricted access (e.g., donators only), add this to your `server.cfg`:  

```ini
add_ace group.donator command.weather allow
add_principal identifier.steam:XXXXXXXXXXXXX group.donator
```

## 🎮 Usage  

- **Command:** `/weather`  
- **Menu Controls:**  
  - Change **weather types**  
  - Adjust **time settings**  
  - Configure **wind parameters**  
  - Toggle **blackout mode**  

## 📜 Credits  

- **UI & Frontend Development** (React, TypeScript, Tailwind CSS, Vite) by **LuxLife** *(251201582102872067)*  
- **Lua codebase** partially adapted from **[Renewed-Scripts/Renewed-Weathersync](https://github.com/Renewed-Scripts/Renewed-Weathersync)**  
- **Weather sync functionality** inspired by **Renewed-Weathersync**  

## 📄 License & Attribution  

This resource contains Lua code adapted from **[Renewed-Scripts/Renewed-Weathersync](https://github.com/Renewed-Scripts/Renewed-Weathersync)**. All credit for the original Lua implementation goes to them. If you use or modify this resource, please ensure proper attribution to both projects.  
