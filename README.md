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



If you need assistance with this script, you can add me on Discord at `luxlife` or join our Discord server and submit a general support ticket: [https://discord.gg/Mk5buvyBFb](https://discord.gg/Mk5buvyBFb).

![Screenshot 2025-02-17 053813](https://github.com/user-attachments/assets/f380b775-36f0-4077-8992-1552e82daf76)
![Screenshot 2025-02-17 053748](https://github.com/user-attachments/assets/bdc536b0-9f0c-4f7f-bff9-d6e0d7596c9b)
![Screenshot 2025-02-17 053731](https://github.com/user-attachments/assets/05f41a55-46d1-4766-bd04-eb3e4a10abf9)
![Screenshot 2025-02-17 053719](https://github.com/user-attachments/assets/f879afef-5f25-42fe-bd84-dd7618ef4b40)




