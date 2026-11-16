// ──────────────────────────────────────────────────────────────
// Marinara Desktop — a desktop-OS shell for Marinara Engine.
//
// Full-page Personal Extension. Marinara runs this file as the body of
// `async (marinara) => { ... }`, so top-level await and `return` work.
//
// How it works: Marinara's own React UI keeps running untouched. This
// extension only (1) restyles the shell regions through CSS variables and
// classes on <html>, (2) appends small chrome nodes (title bars, resize
// grips, a springboard on touch screens) to those regions, and (3) drives
// navigation by clicking Marinara's own (hidden) buttons. Disable the
// extension and everything is removed.
//
// Modes:
//   desktop — wide screens with a mouse: menu bar, Dock, floating windows,
//             and Home becomes the bare desktop with widgets.
//   touch   — phones and touch tablets (Marinara's own full-screen shell):
//             springboard home screen, iOS-style Dock and home indicator.
// ──────────────────────────────────────────────────────────────

const doc = document;
const html = doc.documentElement;
const IS_MAC = /mac|iphone|ipad/i.test(navigator.userAgentData?.platform || navigator.platform || "");
const KO = /^ko/i.test(html.lang || navigator.language || "");

const L = KO
  ? {
      home: "홈",
      desktopTitle: "데스크톱",
      chats: "채팅",
      characters: "캐릭터",
      personas: "페르소나",
      lorebooks: "로어북",
      presets: "프리셋",
      connections: "연결",
      agents: "에이전트",
      settings: "설정",
      search: "검색",
      launchpad: "런치패드",
      wallpaper: "배경화면",
      accent: "강조 색상",
      classic: "클래식 레이아웃",
      desktop: "데스크톱 모드",
      reload: "새로 고침",
      about: "Marinara Desktop에 관하여",
      aboutShort: "정보",
      view: "보기",
      window: "윈도우",
      dock: "Dock",
      help: "도움말",
      close: "닫기",
      minimize: "최소화",
      zoom: "확대/축소",
      tile: "창 정리",
      resetLayout: "창 배치 초기화",
      nextWindow: "다음 창",
      showDesktop: "데스크톱 보기",
      editor: "편집기",
      panel: "패널",
      magnify: "확대 효과",
      autohide: "Dock 자동 숨기기",
      recents: "Dock에 최근 채팅 보이기",
      bootSplash: "시작 화면 보이기",
      iconView: "캐릭터·페르소나 아이콘으로 보기",
      dockSize: "Dock 크기",
      customImage: "이미지 업로드",
      imageUrl: "이미지 주소 (https://…)",
      apply: "적용",
      docs: "Marinara 문서",
      shortcuts: "단축키",
      controlCenter: "제어 센터",
      tooLarge: "이미지가 너무 커요. 더 작은 이미지를 골라 주세요.",
      storageFull: "확장 저장 공간(1MB)이 거의 찼어요. 배경화면이나 사진·아이콘 이미지를 몇 개 지워 주세요.",
      badUrl: "https:// 로 시작하는 이미지 주소만 쓸 수 있어요.",
      themeWallpaper: "앱 테마",
      appearance: "모양",
      rpStyle: "롤플 화면",
      rpBook: "책 (종이)",
      rpNight: "책 (밤)",
      rpClean: "깔끔하게",
      convoStyle: "대화 화면",
      convoMessages: "메시지 앱",
      convoMarinara: "마리나라 기본",
      customize: "꾸미기",
      iconStyle: "아이콘 스타일",
      iconShape: "아이콘 모양",
      iconStyles: { gradient: "그라데이션", glass: "유리", pastel: "파스텔", tinted: "틴트", dark: "다크" },
      iconShapes: { squircle: "둥근 사각", circle: "동그라미", rounded: "각진 사각" },
      editIcons: "아이콘 편집…",
      editIcon: "아이콘 편집",
      editWidgets: "위젯 편집",
      addWidget: "위젯 추가",
      done: "완료",
      label: "이름",
      colors: "색상",
      image: "이미지",
      pickImage: "이미지 고르기",
      removeImage: "이미지 빼기",
      reset: "기본값으로",
      remove: "삭제",
      size: "크기",
      style: "스타일",
      sizes: { s: "작게", m: "보통", l: "크게" },
      wStyles: { glass: "유리", light: "밝게", dark: "어둡게", accent: "강조색", clear: "투명" },
      noteColor: "메모 색",
      title: "제목",
      date: "날짜",
      text: "내용",
      modes: ["대화", "롤플레이", "게임"],
      widgetNames: {
        launcher: "새 채팅",
        clock: "시계",
        analog: "아날로그 시계",
        calendar: "캘린더",
        photo: "사진",
        note: "메모",
        dday: "디데이",
        greeting: "인사말",
      },
      pickPhoto: "사진을 골라 주세요",
      notePlaceholder: "메모를 적어 보세요",
      ddayDefault: "최애 생일",
      performance: "성능",
      reduceTransparency: "투명 효과 줄이기",
      reduceMotion: "움직임 줄이기",
      recentChats: "최근 채팅",
      open: "열기",
      homeIndicator: "홈으로",
      newChat: "새 채팅",
      greeting: (hour) =>
        hour < 5 ? "늦은 밤이에요" : hour < 12 ? "좋은 아침이에요" : hour < 18 ? "좋은 오후예요" : "좋은 저녁이에요",
      shortcutList: [
        ["Ctrl + Alt + D", "데스크톱 ↔ 클래식 레이아웃"],
        ["Ctrl + Alt + L", "런치패드"],
        ["Ctrl + Alt + H", "데스크톱 보기"],
        ["Ctrl + Alt + M", "앞에 있는 창 최소화"],
        ["Ctrl + `", "다음 창으로"],
        ["Ctrl + K", "검색"],
        ["바탕화면 오른쪽 클릭", "위젯·배경화면·꾸미기 메뉴"],
        ["Dock 아이콘 오른쪽 클릭", "열기·닫기·아이콘 편집"],
        ["제목 표시줄 더블클릭", "확대/축소"],
        ["창을 화면 위/왼쪽/오른쪽 끝으로", "꽉 채우기 / 반쪽 배치"],
      ],
      aboutBody: "마리나라를 데스크톱처럼 쓰게 해 주는 확장이에요. 원래 화면으로 돌아가려면 Ctrl + Alt + D를 누르세요.",
    }
  : {
      home: "Home",
      desktopTitle: "Desktop",
      chats: "Chats",
      characters: "Characters",
      personas: "Personas",
      lorebooks: "Lorebooks",
      presets: "Presets",
      connections: "Connections",
      agents: "Agents",
      settings: "Settings",
      search: "Search",
      launchpad: "Launchpad",
      wallpaper: "Wallpaper",
      accent: "Accent colour",
      classic: "Classic layout",
      desktop: "Desktop mode",
      reload: "Reload",
      about: "About Marinara Desktop",
      aboutShort: "About",
      view: "View",
      window: "Window",
      dock: "Dock",
      help: "Help",
      close: "Close",
      minimize: "Minimize",
      zoom: "Zoom",
      tile: "Tile windows",
      resetLayout: "Reset window layout",
      nextWindow: "Next window",
      showDesktop: "Show desktop",
      editor: "Editor",
      panel: "Panel",
      magnify: "Magnification",
      autohide: "Automatically hide the Dock",
      recents: "Show recent chats in the Dock",
      bootSplash: "Show start-up screen",
      iconView: "Show characters & personas as icons",
      dockSize: "Dock size",
      customImage: "Upload image",
      imageUrl: "Image address (https://…)",
      apply: "Apply",
      docs: "Marinara documentation",
      shortcuts: "Shortcuts",
      controlCenter: "Control Center",
      tooLarge: "That image is too large. Please pick a smaller one.",
      storageFull: "Extension storage (1 MB) is nearly full. Remove a wallpaper, photo or icon image first.",
      badUrl: "Only image addresses starting with https:// are supported.",
      themeWallpaper: "App theme",
      appearance: "Appearance",
      rpStyle: "Roleplay view",
      rpBook: "Book (paper)",
      rpNight: "Book (night)",
      rpClean: "Clean",
      convoStyle: "Conversation view",
      convoMessages: "Messages app",
      convoMarinara: "Marinara default",
      customize: "Customize",
      iconStyle: "Icon style",
      iconShape: "Icon shape",
      iconStyles: { gradient: "Gradient", glass: "Glass", pastel: "Pastel", tinted: "Tinted", dark: "Dark" },
      iconShapes: { squircle: "Squircle", circle: "Circle", rounded: "Rounded" },
      editIcons: "Edit icons…",
      editIcon: "Edit icon",
      editWidgets: "Edit widgets",
      addWidget: "Add widget",
      done: "Done",
      label: "Name",
      colors: "Colours",
      image: "Image",
      pickImage: "Choose image",
      removeImage: "Remove image",
      reset: "Reset",
      remove: "Remove",
      size: "Size",
      style: "Style",
      sizes: { s: "Small", m: "Medium", l: "Large" },
      wStyles: { glass: "Glass", light: "Light", dark: "Dark", accent: "Accent", clear: "Clear" },
      noteColor: "Note colour",
      title: "Title",
      date: "Date",
      text: "Text",
      modes: ["Chat", "Roleplay", "Game"],
      widgetNames: {
        launcher: "New chat",
        clock: "Clock",
        analog: "Analog clock",
        calendar: "Calendar",
        photo: "Photo",
        note: "Note",
        dday: "Countdown",
        greeting: "Greeting",
      },
      pickPhoto: "Choose a photo",
      notePlaceholder: "Write a note",
      ddayDefault: "Bias birthday",
      performance: "Performance",
      reduceTransparency: "Reduce transparency",
      reduceMotion: "Reduce motion",
      recentChats: "Recent chats",
      open: "Open",
      homeIndicator: "Go home",
      newChat: "New chat",
      greeting: (hour) =>
        hour < 5 ? "Burning the midnight oil" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening",
      shortcutList: [
        ["Ctrl + Alt + D", "Desktop ↔ classic layout"],
        ["Ctrl + Alt + L", "Launchpad"],
        ["Ctrl + Alt + H", "Show desktop"],
        ["Ctrl + Alt + M", "Minimize the front window"],
        ["Ctrl + `", "Next window"],
        ["Ctrl + K", "Search"],
        ["Right-click the desktop", "Widgets, wallpaper, customize"],
        ["Right-click a Dock icon", "Open, close, edit icon"],
        ["Double-click a title bar", "Zoom"],
        ["Drag a window to the top/left/right edge", "Fill / half the screen"],
      ],
      aboutBody: "Use Marinara like a desktop. Press Ctrl + Alt + D to switch back to the classic layout at any time.",
    };

// ── Constants ─────────────────────────────────────────────────

const MENUBAR_H = 30;
const MIN_W = 300;
const MIN_H = 240;
const MIN_VIEWPORT = 768;
const SNAP_EDGE = 6;
const STORAGE_BUDGET = 900_000; // extension storage is capped at 1 MB of JSON

const SEL = {
  root: "#root",
  shell: '[data-component="AppShell"]',
  chats: '[data-component="ChatSidebarSlot"]',
  main: '[data-component="CenterContent"]',
  panel: '[data-component="RightPanelDesktopSlot"]',
  topbar: '[data-component="TopBar"]',
  hub: '[data-component="HomeBrowserHub"]',
  homePage: '[data-component="HomeBrowserHub.HomePage"]',
  homeTabs: '[data-component="HomeBrowserHub.TabList"] [role="tab"]',
  detail: '[data-component="DetailEditor"], [data-component="MobileDetailSheet"]',
  sheets: '[data-component="RightPanelMobile"], aside[data-component="ChatSidebarPanel"], [data-component="MobileDetailSheet"]',
  chatsBtn: '[data-tour="sidebar-toggle"]',
  homeBtn: '[data-topbar-hover-key="home"]',
  sideHeaders: ".mari-sidebar-header, .mari-right-panel-header",
  chatRows: '[data-component="ChatSidebar"] [data-drag-kind="chat"]',
};
const PANEL_IDS = ["characters", "personas", "lorebooks", "presets", "connections", "agents", "settings"];
const panelBtn = (id) => doc.querySelector(`[data-tour="panel-${id}"]`);

const WALLPAPERS = [
  {
    id: "dusk",
    name: KO ? "마리나라 노을" : "Marinara Dusk",
    css: "radial-gradient(110% 85% at 12% 8%, #ffb27a 0%, transparent 55%), radial-gradient(85% 75% at 88% 18%, #ff5d7d 0%, transparent 60%), radial-gradient(120% 110% at 50% 105%, #6a2c91 0%, #2b1242 72%)",
    dark: true,
  },
  {
    id: "basil",
    name: KO ? "바질 숲" : "Basil Grove",
    css: "radial-gradient(95% 75% at 18% 0%, #57d6a8 0%, transparent 55%), radial-gradient(90% 90% at 100% 65%, #2a8a63 0%, transparent 60%), linear-gradient(160deg, #11433a, #06201b)",
    dark: true,
  },
  {
    id: "mozzarella",
    name: KO ? "모차렐라" : "Mozzarella",
    css: "radial-gradient(90% 70% at 18% 10%, #fffaf0 0%, transparent 60%), radial-gradient(80% 80% at 92% 28%, #ffd3bd 0%, transparent 62%), radial-gradient(90% 80% at 40% 100%, #f2c6d8 0%, transparent 65%), linear-gradient(180deg, #f7efe3, #ead9c7)",
    dark: false,
  },
  {
    id: "aurora",
    name: KO ? "오로라" : "Aurora",
    css: "radial-gradient(75% 60% at 28% 18%, #6fe7f7 0%, transparent 55%), radial-gradient(70% 70% at 76% 32%, #a98bfb 0%, transparent 60%), radial-gradient(95% 85% at 50% 100%, #233f94 0%, #0a0f27 75%)",
    dark: true,
  },
  {
    id: "midnight",
    name: KO ? "한밤중" : "Midnight",
    css: "radial-gradient(55% 45% at 72% 18%, #3d4c80 0%, transparent 70%), radial-gradient(40% 35% at 15% 85%, #4b2a63 0%, transparent 70%), linear-gradient(180deg, #0d1020, #05060c)",
    dark: true,
  },
  {
    id: "theme",
    name: L.themeWallpaper,
    css: "var(--marinara-app-background-paint, var(--background))",
    dark: null,
  },
];

// "marinara" keeps the app's own accent; the rest replace it everywhere.
const ACCENTS = [
  { id: "blue", color: "#0a84ff", name: KO ? "파랑" : "Blue" },
  { id: "purple", color: "#a259e6", name: KO ? "보라" : "Purple" },
  { id: "pink", color: "#ec4b8f", name: KO ? "분홍" : "Pink" },
  { id: "red", color: "#ff453a", name: KO ? "빨강" : "Red" },
  { id: "orange", color: "#ff9500", name: KO ? "주황" : "Orange" },
  { id: "yellow", color: "#e6b800", name: KO ? "노랑" : "Yellow" },
  { id: "green", color: "#30b956", name: KO ? "초록" : "Green" },
  { id: "graphite", color: "#8e8e93", name: KO ? "흑연" : "Graphite" },
  { id: "marinara", color: null, name: "Marinara" },
];
const NOTE_COLORS = ["#ffe57a", "#ffc2d6", "#b8e4ff", "#c4f0b4", "#e2ccff", "#ffffff"];

// Icons: simple 24×24 strokes drawn for this extension.
const ICONS = {
  home: '<path d="M3.5 10.5 12 3.5l8.5 7V19a1.5 1.5 0 0 1-1.5 1.5h-4.5V15h-5v5.5H5A1.5 1.5 0 0 1 3.5 19z"/>',
  chat: '<path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L3.5 20l1.4-4.7a8 8 0 1 1 15.6-3.8z"/><path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01"/>',
  characters:
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.6 6.5-5.6s5.7 2 6.5 5.6"/><path d="M15.5 4.7a3.5 3.5 0 0 1 0 6.6"/><path d="M18.2 14.7c1.7.8 2.8 2.6 3.2 5.3"/>',
  personas:
    '<path d="M3.5 6.5c2.8 1.1 5.7 1.1 8.5 0 2.8 1.1 5.7 1.1 8.5 0v4.5c0 5-3.8 9-8.5 9s-8.5-4-8.5-9z"/><path d="M7.5 11.2h2.6M13.9 11.2h2.6"/><path d="M9.5 15.3c1.6 1 3.4 1 5 0"/>',
  lorebooks: '<path d="M4.5 19V5a2 2 0 0 1 2-2h13v15h-13a2 2 0 0 0 0 4h13"/><path d="M9 7.5h6M9 11h4"/>',
  presets:
    '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  connections:
    '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1"/>',
  agents:
    '<path d="M11 3.5 12.9 9l5.6 1.9-5.6 1.9L11 18.5l-1.9-5.7-5.6-1.9L9.1 9z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20.5 20.5 15.3 15.3"/>',
  launchpad:
    '<rect x="3.5" y="3.5" width="4.5" height="4.5" rx="1.2"/><rect x="9.75" y="3.5" width="4.5" height="4.5" rx="1.2"/><rect x="16" y="3.5" width="4.5" height="4.5" rx="1.2"/><rect x="3.5" y="9.75" width="4.5" height="4.5" rx="1.2"/><rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1.2"/><rect x="16" y="9.75" width="4.5" height="4.5" rx="1.2"/><rect x="3.5" y="16" width="4.5" height="4.5" rx="1.2"/><rect x="9.75" y="16" width="4.5" height="4.5" rx="1.2"/><rect x="16" y="16" width="4.5" height="4.5" rx="1.2"/>',
  wallpaper: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 9"/>',
  classic: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8.5h18M8.5 8.5V20M15.5 8.5V20"/>',
  reload: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.5"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6h.01"/>',
  sliders:
    '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  widgets: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="17" height="7" rx="2"/>',
  brush: '<path d="M14.5 4.5 19.5 9.5 11 18l-5-5z"/><path d="M6 13c-2 0-3 1.5-3 3.5S2 20 2 20s3.5.5 5-.5 2-2.5 2-3.5"/><path d="M16.5 2.5l5 5"/>',
  roleplay: '<path d="M3 5.5c3-1.3 6-1.3 9 .5 3-1.8 6-1.8 9-.5V19c-3-1.3-6-1.3-9 .5-3-1.8-6-1.8-9-.5z"/><path d="M12 6v13.5"/>',
  game: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><path d="M15.5 11.5h.01M18 13.5h.01"/>',
};
const svg = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.launchpad}</svg>`;
const LOGO =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13.6" r="7.9" fill="currentColor"/><path d="M12 6.2c-.9-1.9-2.8-2.6-4.4-2.1 1 .4 1.8 1.2 2.2 2.1-1.6-.3-2.9.2-3.7 1.1 1.8.2 3.6.1 5.9-1.2 2.3 1.3 4.1 1.4 5.9 1.2-.8-.9-2.1-1.4-3.7-1.1.4-.9 1.2-1.7 2.2-2.1-1.6-.5-3.5.2-4.4 2.1z" fill="#45c46f"/></svg>';
const LIGHT_GLYPHS = {
  close: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.6 3.6l4.8 4.8M8.4 3.6 3.6 8.4"/></svg>',
  minimize: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 6h6"/></svg>',
  zoom: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.4 8.6V4.9l3.7 3.7zM8.6 3.4v3.7L4.9 3.4z" fill="currentColor" stroke="none"/></svg>',
};

// label(): prefer Marinara's own (already localized) button title.
const hostLabel = (el, fallback) => el?.getAttribute("title") || el?.getAttribute("aria-label") || fallback;

const APPS = [
  { id: "home", icon: "home", g: ["#61b0ff", "#2f62f5"], label: () => hostLabel(doc.querySelector(SEL.homeBtn), L.home) },
  { id: "chats", icon: "chat", g: ["#6ef08d", "#17a84d"], label: () => hostLabel(doc.querySelector(SEL.chatsBtn), L.chats) },
  { id: "characters", icon: "characters", g: ["#ffb35c", "#f06a1d"], panel: true },
  { id: "personas", icon: "personas", g: ["#d48bff", "#8a3ff0"], panel: true },
  { id: "lorebooks", icon: "lorebooks", g: ["#f3c46b", "#b9772a"], panel: true },
  { id: "presets", icon: "presets", g: ["#5fe0d4", "#1b9a9a"], panel: true },
  { id: "connections", icon: "connections", g: ["#8a9bff", "#4651e0"], panel: true },
  { id: "agents", icon: "agents", g: ["#ff8fc4", "#e23f86"], panel: true },
  { id: "settings", icon: "settings", g: ["#b9bec9", "#6b7281"], panel: true },
];
const TAIL_APPS = [
  { id: "launchpad", icon: "launchpad", g: ["#ff9f7a", "#7b61ff"], label: () => L.launchpad },
  { id: "search", icon: "search", g: ["#9aa6bb", "#4f5a70"], label: () => L.search },
];
const EXTRA_APPS = [
  { id: "controlcenter", icon: "sliders", g: ["#8e9cff", "#4b5ae0"], label: () => L.controlCenter },
  { id: "widgets", icon: "widgets", g: ["#ffd36b", "#ff8a3d"], label: () => L.editWidgets },
  { id: "customize", icon: "brush", g: ["#ff9ad1", "#b25cff"], label: () => L.customize },
  { id: "wallpaper", icon: "wallpaper", g: ["#7ad7ff", "#ff7aa8"], label: () => L.wallpaper },
  { id: "classic", icon: "classic", g: ["#c9ced8", "#868d9b"], label: () => L.classic },
  { id: "about", icon: "info", g: ["#7fb6ff", "#4b7cf2"], label: () => L.aboutShort },
  { id: "reload", icon: "reload", g: ["#9be37b", "#3f9f46"], label: () => L.reload },
];
for (const app of APPS) {
  if (app.panel) app.label = () => hostLabel(panelBtn(app.id), L[app.id]);
}
// Marinara's Home tabs (Professor Mari, Noodle, …) become apps of their own.
const homeApps = () =>
  (state.homeApps || []).map((t) => ({
    id: `tab:${t.key}`,
    tab: t.key,
    img: t.img,
    g: ["#ffffff", "#e9e9ef"],
    label: () => t.label,
  }));
const allApps = () => [...APPS, ...homeApps(), ...TAIL_APPS, ...EXTRA_APPS];
const appById = (id) => allApps().find((a) => a.id === id);

// ── State ─────────────────────────────────────────────────────

const DEFAULTS = {
  enabled: true,
  wallpaper: "dusk",
  accent: "blue",
  dockSize: 54,
  magnify: true,
  dockAutohide: true,
  dockRecents: true,
  bootSplash: true,
  iconView: true,
  mainMinimized: false,
  windows: {},
  iconStyle: "gradient",
  iconShape: "squircle",
  icons: {},
  widgets: null,
  reduceTransparency: false,
  reduceMotion: false,
  rpStyle: "book",
  convoStyle: "messages",
  homeApps: [],
};
let stored = {};
try {
  stored = (await marinara.storage.get()) || {};
} catch (error) {
  marinara.log.warn("Could not read saved desktop state", error);
}
const state = { ...DEFAULTS, ...(stored.desktop && typeof stored.desktop === "object" ? stored.desktop : {}) };
state.windows = { ...(state.windows || {}) };
state.icons = { ...(state.icons || {}) };
// Images live under their own storage key so ordinary saves stay small.
const images = {
  wallpaper: "",
  icons: {},
  photos: {},
  ...(stored.desktopImages && typeof stored.desktopImages === "object" ? stored.desktopImages : {}),
};
if (state.wallpaperImage) {
  images.wallpaper = state.wallpaperImage;
  delete state.wallpaperImage;
}
let widgetSeq = Date.now();
const newId = () => `w${(widgetSeq++).toString(36)}`;
if (!Array.isArray(state.widgets)) {
  state.widgets = [
    { id: newId(), type: "launcher", size: "m", style: "glass", x: null, y: null },
    { id: newId(), type: "clock", size: "m", style: "glass", x: null, y: null },
    { id: newId(), type: "calendar", size: "s", style: "glass", x: null, y: null },
    { id: newId(), type: "dday", size: "s", style: "accent", title: L.ddayDefault, date: "", x: null, y: null },
  ];
  state.launcherSeeded = true;
}
// Older layouts had the New chat buttons in Marinara's greeting; add the
// launcher widget once at the top of the right column and restack around it.
if (!state.launcherSeeded) {
  if (!state.widgets.some((w) => w.type === "launcher")) {
    state.widgets.unshift({ id: newId(), type: "launcher", size: "m", style: "glass", x: null, y: null });
    for (const w of state.widgets) w.x = w.y = null;
  }
  state.launcherSeeded = true;
}

let saveTimer = 0;
function save() {
  marinara.clearTimeout(saveTimer);
  saveTimer = marinara.setTimeout(() => {
    marinara.storage.patch({ desktop: state }).catch((error) => marinara.log.warn("Could not save desktop state", error));
  }, 400);
}
let imageTimer = 0;
function saveImages() {
  marinara.clearTimeout(imageTimer);
  imageTimer = marinara.setTimeout(() => {
    marinara.storage
      .patch({ desktopImages: images })
      .catch((error) => marinara.log.warn("Could not save desktop images", error));
  }, 300);
}
const imagesSize = () => JSON.stringify(images).length + JSON.stringify(state).length;

// ── Small DOM helpers ─────────────────────────────────────────

const $ = (s, r = doc) => r.querySelector(s);
const $$ = (s, r = doc) => Array.from(r.querySelectorAll(s));
const disposers = [];
function on(target, type, fn, opts) {
  target.addEventListener(type, fn, opts);
  disposers.push(() => target.removeEventListener(type, fn, opts));
}
function h(tag, attrs = {}, ...kids) {
  const el = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "svg") el.innerHTML = v; // static icon markup defined above only
    else if (k === "text") el.textContent = v;
    else if (k === "style") el.style.cssText = v;
    else if (k === "value") el.value = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? "" : String(v));
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    el.append(kid instanceof Node ? kid : doc.createTextNode(String(kid)));
  }
  return el;
}
const setVar = (name, value) => {
  if (html.style.getPropertyValue(name) !== value) html.style.setProperty(name, value);
};
const setText = (el, text) => {
  if (el && el.textContent !== text) el.textContent = text;
};
const setAttr = (el, name, value) => {
  if (!el) return;
  if (value == null) {
    if (el.hasAttribute(name)) el.removeAttribute(name);
  } else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
};
const toggleClass = (cls, on) => {
  if (html.classList.contains(cls) !== !!on) html.classList.toggle(cls, !!on);
};
const reducedMotion = () => state.reduceMotion || matchMedia("(prefers-reduced-motion: reduce)").matches;
const raf = (fn) =>
  requestAnimationFrame(() => {
    if (!disposed) fn();
  });

// Downscale a picked image to a data URL that fits the storage budget.
async function fileToDataUrl(file, maxSide, maxBytes, square = false) {
  const bitmap = await createImageBitmap(file);
  let sx = 0;
  let sy = 0;
  let sw = bitmap.width;
  let sh = bitmap.height;
  if (square) {
    const side = Math.min(sw, sh);
    sx = (sw - side) / 2;
    sy = (sh - side) / 2;
    sw = sh = side;
  }
  const scale = Math.min(1, maxSide / Math.max(sw, sh));
  const canvas = doc.createElement("canvas");
  canvas.width = Math.round(sw * scale);
  canvas.height = Math.round(sh * scale);
  canvas.getContext("2d").drawImage(bitmap, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  let quality = 0.86;
  let type = "image/webp";
  let data = canvas.toDataURL(type, quality);
  if (!data.startsWith("data:image/webp")) {
    type = "image/jpeg";
    data = canvas.toDataURL(type, quality);
  }
  while (data.length > maxBytes && quality > 0.35) {
    quality -= 0.1;
    data = canvas.toDataURL(type, quality);
  }
  if (data.length > maxBytes) throw new Error("too large");
  return data;
}
function pickImage(onPicked, { maxSide, maxBytes, square }) {
  const input = h("input", { type: "file", accept: "image/*", hidden: true });
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    try {
      const data = await fileToDataUrl(file, maxSide, maxBytes, square);
      onPicked(data);
    } catch (error) {
      marinara.log.warn("Image upload failed", error);
      window.alert(L.tooLarge);
    }
  });
  doc.body.append(input);
  input.click();
}
// Store an image only if the whole extension storage stays under budget.
function storeImage(apply) {
  const backup = JSON.stringify(images);
  apply();
  if (imagesSize() > STORAGE_BUDGET) {
    Object.assign(images, JSON.parse(backup));
    window.alert(L.storageFull);
    return false;
  }
  saveImages();
  return true;
}

// ── Host state readers ────────────────────────────────────────

const isOpen = (sel) => {
  const el = $(sel);
  return !!el && el.getAttribute("aria-hidden") !== "true";
};
const chatsOpen = () => isOpen(SEL.chats);
const panelOpen = () => isOpen(SEL.panel);
const activePanelId = () => PANEL_IDS.find((id) => panelBtn(id)?.getAttribute("aria-pressed") === "true") || null;
const homeVisible = () => !!$(SEL.hub);
const homePageVisible = () => !!$(SEL.homePage) && !$(SEL.detail);
const click = (el) => {
  if (el) el.click();
  return !!el;
};

// ── Roots (our own nodes live outside #root) ──────────────────

const ui = h("div", { id: "mdos-ui", "data-mdos": "" });
const wallpaper = h("div", { id: "mdos-wallpaper", "aria-hidden": "true" });
const widgetLayer = h("div", { id: "mdos-widgets" });
const snapPreview = h("div", { id: "mdos-snap", "aria-hidden": "true" });
const hostRoot = $(SEL.root);
doc.body.prepend(wallpaper);
// The widget layer sits before #root so Marinara's windows paint above it.
if (hostRoot?.parentNode) hostRoot.parentNode.insertBefore(widgetLayer, hostRoot);
else doc.body.append(widgetLayer);
doc.body.append(ui);
ui.append(snapPreview);

// ── Mode ──────────────────────────────────────────────────────

let mode = "off"; // "desktop" | "touch" | "off"
function computeMode() {
  if (!state.enabled) return "off";
  const main = $(SEL.main);
  if (!main) return "off";
  if (main.getAttribute("data-shell-overlay-mode") === "true") return "touch";
  return innerWidth >= MIN_VIEWPORT ? "desktop" : "off";
}
const isDesktop = () => mode === "desktop";
const isTouch = () => mode === "touch";

// ── App icons ─────────────────────────────────────────────────

function appLabel(app) {
  return state.icons[app.id]?.label || app.label();
}
function appIcon(app) {
  const custom = state.icons[app.id] || {};
  const g1 = custom.g1 || app.g[0];
  const g2 = custom.g2 || app.g[1];
  const el = h("span", { class: "mdos-app-icon", style: `--g1:${g1};--g2:${g2}` });
  const image = images.icons[app.id];
  if (image) {
    el.classList.add("has-image");
    el.append(h("img", { src: image, alt: "", draggable: "false" }));
  } else if (app.img) {
    el.classList.add("has-host-image");
    el.append(h("img", { src: app.img, alt: "", draggable: "false" }));
  } else {
    el.innerHTML = svg(app.icon);
  }
  return el;
}

// ── Window manager (desktop) ──────────────────────────────────

const WIN_IDS = ["chats", "main", "panel"];
const WIN_SEL = { chats: SEL.chats, main: SEL.main, panel: SEL.panel };
let zOrder = ["chats", "panel", "main"];
let focused = "main";
const chrome = {};
let desktopHome = false;

function area() {
  const reserve = state.dockAutohide ? 10 : state.dockSize + 26;
  return { left: 8, top: MENUBAR_H + 8, right: innerWidth - 8, bottom: innerHeight - reserve };
}
function defaultRect(id) {
  const a = area();
  const height = a.bottom - a.top;
  const chatsW = Math.round(Math.min(320, Math.max(260, innerWidth * 0.2)));
  if (id === "chats") return { x: a.left + 4, y: a.top, w: chatsW, h: height };
  if (id === "main") {
    const x = a.left + 4 + chatsW + 10;
    return { x, y: a.top, w: Math.max(MIN_W, a.right - 4 - x), h: height };
  }
  if (activePanelId() === "settings") {
    // Wide enough for the two-pane Settings layout (layout.css, ≥ 620 px).
    const w = Math.round(Math.min(860, a.right - a.left - 40));
    const hh = Math.round(Math.min(680, height - 30));
    return { x: Math.round((innerWidth - w) / 2), y: a.top + 16, w, h: hh };
  }
  const w = Math.round(Math.min(460, Math.max(360, innerWidth * 0.3)));
  return { x: a.right - w - 18, y: a.top + 22, w, h: height - 34 };
}
// The panel window remembers a size per panel (Settings wide, libraries narrow).
const winKey = (id) => (id === "panel" ? `panel:${activePanelId() || "none"}` : id);
const savedRect = (id) => state.windows[winKey(id)];
function maxRect() {
  const a = area();
  return { x: a.left, y: a.top, w: a.right - a.left, h: a.bottom - a.top };
}
function halfRect(side) {
  const m = maxRect();
  const w = Math.round(m.w / 2) - 4;
  return { x: side === "left" ? m.x : m.x + m.w - w, y: m.y, w, h: m.h };
}
function clampRect(r) {
  const w = Math.min(Math.max(r.w, MIN_W), innerWidth - 8);
  const hh = Math.min(Math.max(r.h, MIN_H), innerHeight - MENUBAR_H - 8);
  const x = Math.min(Math.max(r.x, 120 - w), innerWidth - 120);
  const y = Math.min(Math.max(r.y, MENUBAR_H + 2), innerHeight - 64);
  return { x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(hh) };
}
const validRect = (r) => r && ["x", "y", "w", "h"].every((k) => Number.isFinite(r[k]));
function rectOf(id) {
  const saved = savedRect(id);
  if (saved?.snap === "max") return maxRect();
  if (saved?.snap === "left" || saved?.snap === "right") return halfRect(saved.snap);
  return clampRect(validRect(saved) ? saved : defaultRect(id));
}
function applyRect(id) {
  const r = rectOf(id);
  setVar(`--mdos-${id}-x`, `${r.x}px`);
  setVar(`--mdos-${id}-y`, `${r.y}px`);
  setVar(`--mdos-${id}-w`, `${r.w}px`);
  setVar(`--mdos-${id}-h`, `${r.h}px`);
}
const applyAllRects = () => WIN_IDS.forEach(applyRect);
function applyZ() {
  zOrder.forEach((id, i) => setVar(`--mdos-${id}-z`, String(10 + i)));
  for (const id of WIN_IDS) setAttr($(WIN_SEL[id]), "data-mdos-focused", focused === id ? "true" : null);
}
function windowVisible(id) {
  if (id === "chats") return chatsOpen();
  if (id === "panel") return panelOpen();
  return !state.mainMinimized && !desktopHome;
}
function focusWin(id) {
  if (!id) return;
  zOrder = zOrder.filter((x) => x !== id).concat(id);
  focused = id;
  applyZ();
  updateMenubar();
}
function focusTopVisible() {
  const next = [...zOrder].reverse().find((id) => windowVisible(id));
  focused = next || null;
  applyZ();
  updateMenubar();
}
function cycleWindows() {
  const visible = WIN_IDS.filter(windowVisible);
  if (visible.length < 2) return;
  // Bring the back-most visible window forward.
  const back = zOrder.find((id) => visible.includes(id) && id !== focused);
  focusWin(back);
}
function animateGeometry() {
  if (reducedMotion()) return;
  html.classList.add("mdos-animating");
  marinara.setTimeout(() => html.classList.remove("mdos-animating"), 320);
}
function zoomWin(id) {
  const saved = savedRect(id);
  if (saved?.snap) state.windows[winKey(id)] = { ...saved, snap: null };
  else state.windows[winKey(id)] = { ...rectOf(id), snap: "max" };
  animateGeometry();
  applyRect(id);
  save();
}
function setMainMinimized(min) {
  if (state.mainMinimized === min) return;
  state.mainMinimized = min;
  toggleClass("mdos-main-min", min);
  save();
  if (min) focusTopVisible();
  else focusWin("main");
  syncSoon();
}
function goHome() {
  closeOverlays();
  if (state.mainMinimized) setMainMinimized(false);
  // On touch screens Home stays mounted under open sheets; Marinara's Home
  // button also closes those sheets there.
  if (!homePageVisible() || (isTouch() && $(SEL.sheets))) click($(SEL.homeBtn));
}
function closeWin(id) {
  if (id === "chats") {
    if (chatsOpen()) click($(SEL.chatsBtn));
  } else if (id === "panel") {
    const active = activePanelId();
    if (active) click(panelBtn(active));
  } else {
    // Closing the document window shows the desktop (Home).
    click($(SEL.homeBtn));
  }
  marinara.setTimeout(focusTopVisible, 60);
}
function minimizeWin(id) {
  if (id === "main") setMainMinimized(true);
  else closeWin(id);
}
function showDesktop() {
  if (chatsOpen()) click($(SEL.chatsBtn));
  const active = activePanelId();
  if (active) click(panelBtn(active));
  goHome();
}

function windowTitle(id) {
  if (id === "chats") return appLabel(appById("chats"));
  if (id === "panel") {
    const active = activePanelId();
    return active ? appLabel(appById(active)) : L.panel;
  }
  if (desktopHome) return L.desktopTitle;
  if (homeVisible()) {
    const tab = $(`${SEL.homeTabs}[aria-selected="true"]`);
    return tab?.getAttribute("aria-label") || appLabel(appById("home"));
  }
  if ($(SEL.detail)) return L.editor;
  return "Marinara";
}

function makeTitlebar(id) {
  const lights = h(
    "div",
    { class: "mdos-lights" },
    ...["close", "minimize", "zoom"].map((act) =>
      h("button", {
        type: "button",
        class: `mdos-light mdos-light--${act}`,
        "aria-label": L[act],
        title: L[act],
        svg: LIGHT_GLYPHS[act],
        onclick: (event) => {
          event.stopPropagation();
          if (act === "close") closeWin(id);
          else if (act === "minimize") minimizeWin(id);
          else zoomWin(id);
        },
      }),
    ),
  );
  // Marinara's own header (top bar / sidebar header / panel header) is the
  // title bar; we only add the lights on its left edge.
  return h("div", { class: `mdos-titlebar mdos-titlebar--${id === "main" ? "main" : "side"}` }, lights);
}

function ensureChrome() {
  for (const id of WIN_IDS) {
    const host = $(WIN_SEL[id]);
    const current = chrome[id];
    if (!host) continue;
    if (current && current.host === host && current.bar.parentNode === host) continue;
    current?.nodes.forEach((n) => n.remove());
    const bar = makeTitlebar(id);
    const grips = ["n", "e", "s", "w", "ne", "nw", "se", "sw"].map((dir) =>
      h("div", { class: `mdos-grip mdos-grip--${dir}`, "data-mdos-grip": dir, "aria-hidden": "true" }),
    );
    host.append(bar, ...grips);
    host.setAttribute("data-mdos-win", id);
    chrome[id] = { host, bar, nodes: [bar, ...grips] };
  }
  applyZ();
}
function removeChrome() {
  for (const id of WIN_IDS) {
    chrome[id]?.nodes.forEach((n) => n.remove());
    const host = chrome[id]?.host;
    host?.removeAttribute("data-mdos-win");
    host?.removeAttribute("data-mdos-focused");
    delete chrome[id];
  }
}

// ── Pointer gestures: windows and widgets ─────────────────────

let gesture = null;
let gestureFrame = 0;
const INTERACTIVE =
  'button, a, input, textarea, select, label, summary, [role="button"], [role="slider"], [role="tab"], [role="menuitem"], [contenteditable=""], [contenteditable="true"]';
const isDragSurface = (target, id) =>
  !!target.closest(".mdos-titlebar") ||
  (!target.closest(INTERACTIVE) && !!target.closest(id === "main" ? SEL.topbar : SEL.sideHeaders));

function onPointerDown(event) {
  if (mode === "off") return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (openMenu && !target.closest(".mdos-menu, #mdos-menubar")) closeMenu();
  if (ccEl && !target.closest("#mdos-cc, [data-mdos-cc-toggle]")) closeCC();
  if (popEl && !target.closest(".mdos-pop")) closePop();
  if (event.button !== 0) return;

  // Widgets: drag in edit mode (desktop only).
  const widget = target.closest(".mdos-wg");
  if (widget && editMode && isDesktop() && !target.closest(".mdos-wg-badge, textarea, input")) {
    return startWidgetDrag(event, widget);
  }
  if (!isDesktop()) return;

  const host = target.closest("[data-mdos-win]");
  const id = host?.getAttribute("data-mdos-win");
  if (!id || !WIN_IDS.includes(id)) return;
  if (!(id === "main" && desktopHome)) focusWin(id);
  if (id === "main" && desktopHome) return;

  const grip = target.closest("[data-mdos-grip]");
  if (grip) return startGesture(event, id, grip.getAttribute("data-mdos-grip"));
  if (target.closest(".mdos-light")) return;
  if (isDragSurface(target, id)) startGesture(event, id, "move");
}

function startGesture(event, id, gmode) {
  event.preventDefault();
  const saved = savedRect(id);
  let start = rectOf(id);
  if (gmode === "move" && saved?.snap) {
    // Pull a snapped window off the edge at its remembered size, under the pointer.
    const restore = clampRect(validRect(saved) ? saved : defaultRect(id));
    const ratio = (event.clientX - start.x) / start.w;
    start = { ...restore, x: event.clientX - restore.w * ratio, y: start.y };
    state.windows[winKey(id)] = { ...start, snap: null };
    applyRect(id);
  }
  gesture = { kind: "window", id, mode: gmode, sx: event.clientX, sy: event.clientY, start, rect: start, moved: false, snap: null };
  html.classList.add("mdos-gesture");
  html.dataset.mdosGesture = gmode === "move" ? "move" : `${gmode}-resize`;
}

function startWidgetDrag(event, el) {
  event.preventDefault();
  const w = state.widgets.find((x) => x.id === el.dataset.wid);
  if (!w) return;
  const r = el.getBoundingClientRect();
  const layer = widgetLayer.getBoundingClientRect();
  gesture = {
    kind: "widget",
    el,
    w,
    sx: event.clientX,
    sy: event.clientY,
    start: { x: r.left - layer.left, y: r.top - layer.top },
    moved: false,
    dx: 0,
    dy: 0,
  };
  el.classList.add("is-dragging");
  html.classList.add("mdos-gesture");
}

function onPointerMove(event) {
  if (state.dockAutohide && isDesktop()) dockProximity(event);
  if (!gesture) return;
  const dx = event.clientX - gesture.sx;
  const dy = event.clientY - gesture.sy;
  if (!gesture.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
  gesture.moved = true;
  gesture.dx = dx;
  gesture.dy = dy;
  gesture.cx = event.clientX;
  gesture.cy = event.clientY;
  if (!gestureFrame) gestureFrame = raf(applyGestureFrame);
}

// One style write per frame. Moves use the compositor-only `translate`
// property; left/top are committed once when the pointer is released.
function applyGestureFrame() {
  gestureFrame = 0;
  const g = gesture;
  if (!g) return;
  if (g.kind === "widget") {
    g.el.style.translate = `${g.dx}px ${g.dy}px`;
    return;
  }
  const s = g.start;
  if (g.mode === "move") {
    setVar(`--mdos-${g.id}-tx`, `${g.dx}px`);
    setVar(`--mdos-${g.id}-ty`, `${Math.max(g.dy, MENUBAR_H + 2 - s.y)}px`);
    g.snap =
      g.cy <= MENUBAR_H + SNAP_EDGE ? "max" : g.cx <= SNAP_EDGE ? "left" : g.cx >= innerWidth - SNAP_EDGE ? "right" : null;
    showSnapPreview(g.snap);
    return;
  }
  let { x, y, w, h: hh } = s;
  const m = g.mode;
  if (m.includes("e")) w = Math.max(MIN_W, s.w + g.dx);
  if (m.includes("s")) hh = Math.max(MIN_H, s.h + g.dy);
  if (m.includes("w")) {
    w = Math.max(MIN_W, s.w - g.dx);
    x = s.x + s.w - w;
  }
  if (m.includes("n")) {
    hh = Math.max(MIN_H, s.h - g.dy);
    y = s.y + s.h - hh;
    if (y < MENUBAR_H + 2) {
      hh -= MENUBAR_H + 2 - y;
      y = MENUBAR_H + 2;
    }
  }
  g.rect = clampRect({ x, y, w, h: hh });
  state.windows[winKey(g.id)] = { ...g.rect, snap: null };
  applyRect(g.id);
}

function onPointerUp() {
  if (!gesture) return;
  const g = gesture;
  gesture = null;
  if (gestureFrame) {
    cancelAnimationFrame(gestureFrame);
    gestureFrame = 0;
  }
  html.classList.remove("mdos-gesture");
  delete html.dataset.mdosGesture;
  if (g.kind === "widget") {
    g.el.classList.remove("is-dragging");
    g.el.style.translate = "";
    if (g.moved) {
      const snap = (v) => Math.round(v / 8) * 8;
      g.w.x = snap(g.start.x + g.dx);
      g.w.y = snap(g.start.y + g.dy);
      clampWidget(g.w);
      placeWidget(g.el, g.w);
      save();
    }
    return;
  }
  if (g.mode === "move") {
    if (g.moved && g.snap) {
      state.windows[winKey(g.id)] = { ...g.start, snap: g.snap };
      animateGeometry();
    } else if (g.moved) {
      state.windows[winKey(g.id)] = clampRect({ ...g.start, x: g.start.x + g.dx, y: g.start.y + g.dy });
    }
    applyRect(g.id);
    setVar(`--mdos-${g.id}-tx`, "0px");
    setVar(`--mdos-${g.id}-ty`, "0px");
    showSnapPreview(null);
  }
  if (g.moved) save();
}

function onDoubleClick(event) {
  if (!isDesktop()) return;
  const target = event.target instanceof Element ? event.target : null;
  const host = target?.closest("[data-mdos-win]");
  const id = host?.getAttribute("data-mdos-win");
  if (!id || target.closest(".mdos-light") || (id === "main" && desktopHome)) return;
  if (isDragSurface(target, id)) zoomWin(id);
}

function showSnapPreview(snap) {
  if (!snap) {
    snapPreview.classList.remove("is-visible");
    return;
  }
  const r = snap === "max" ? maxRect() : halfRect(snap);
  snapPreview.style.cssText = `left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px`;
  snapPreview.classList.add("is-visible");
}

function tileWindows() {
  const a = area();
  const height = a.bottom - a.top;
  const chatsW = Math.round(Math.min(320, Math.max(260, innerWidth * 0.2)));
  const panelW = panelOpen() ? Math.round(Math.min(440, Math.max(360, innerWidth * 0.28))) : 0;
  const gap = 10;
  const mainX = a.left + 4 + (chatsOpen() ? chatsW + gap : 0);
  const mainRight = a.right - 4 - (panelW ? panelW + gap : 0);
  state.windows.chats = { x: a.left + 4, y: a.top, w: chatsW, h: height, snap: null };
  state.windows.main = { x: mainX, y: a.top, w: Math.max(MIN_W, mainRight - mainX), h: height, snap: null };
  if (panelW) state.windows[winKey("panel")] = { x: a.right - 4 - panelW, y: a.top, w: panelW, h: height, snap: null };
  if (state.mainMinimized) setMainMinimized(false);
  animateGeometry();
  applyAllRects();
  save();
}
function resetLayout() {
  state.windows = {};
  animateGeometry();
  applyAllRects();
  save();
}

// ── Menus (menu bar dropdowns and context menus) ──────────────

let openMenu = null;
function menuEl(items) {
  const el = h("div", { class: "mdos-menu", role: "menu" });
  for (const item of items) {
    if (item === "-") {
      el.append(h("div", { class: "mdos-menu-sep", role: "separator" }));
      continue;
    }
    el.append(
      h(
        "button",
        {
          type: "button",
          role: "menuitem",
          class: "mdos-menu-item",
          disabled: !!item.disabled,
          onclick: () => {
            closeMenu();
            item.action?.();
          },
        },
        h("span", { class: "mdos-menu-check", text: item.checked ? "✓" : "" }),
        h("span", { class: "mdos-menu-label", text: item.label }),
        h("span", { class: "mdos-menu-key", text: item.key || "" }),
      ),
    );
  }
  return el;
}
function showMenu(id, anchor) {
  closeMenu();
  const el = menuEl(MENUS[id]());
  ui.append(el);
  const r = anchor.getBoundingClientRect();
  el.style.left = `${Math.max(6, Math.min(r.left, innerWidth - el.offsetWidth - 6))}px`;
  el.style.top = `${MENUBAR_H + 3}px`;
  anchor.classList.add("is-open");
  anchor.setAttribute("aria-expanded", "true");
  openMenu = { id, el, anchor };
}
function showMenuAt(items, x, y) {
  closeMenu();
  const el = menuEl(items);
  ui.append(el);
  el.style.left = `${Math.max(6, Math.min(x, innerWidth - el.offsetWidth - 6))}px`;
  el.style.top = `${Math.max(MENUBAR_H + 3, Math.min(y, innerHeight - el.offsetHeight - 6))}px`;
  openMenu = { id: "context", el, anchor: null };
}
function closeMenu() {
  if (!openMenu) return;
  openMenu.el.remove();
  openMenu.anchor?.classList.remove("is-open");
  openMenu.anchor?.removeAttribute("aria-expanded");
  openMenu = null;
}

// ── Menu bar ──────────────────────────────────────────────────

const menubar = h("div", { id: "mdos-menubar", role: "menubar", "aria-label": "Marinara Desktop" });
const mbLeft = h("div", { class: "mdos-mb-left" });
const mbRight = h("div", { class: "mdos-mb-right" });
const mbLogo = h("button", {
  type: "button",
  class: "mdos-mb-item mdos-mb-logo",
  "data-menu": "logo",
  "aria-label": "Marinara",
  "aria-haspopup": "menu",
  svg: LOGO,
});
const mbApp = h("button", { type: "button", class: "mdos-mb-item mdos-mb-app", "data-menu": "app", "aria-haspopup": "menu" });
const mbMenus = [
  ["view", L.view],
  ["window", L.window],
  ["dock", L.dock],
  ["help", L.help],
].map(([id, label]) =>
  h("button", { type: "button", class: "mdos-mb-item", "data-menu": id, "aria-haspopup": "menu", text: label }),
);
mbLeft.append(mbLogo, mbApp, ...mbMenus);
const mbClock = h("button", { type: "button", class: "mdos-mb-item mdos-mb-clock", "data-mdos-cc-toggle": "", onclick: () => toggleCC() });
mbRight.append(
  h("button", {
    type: "button",
    class: "mdos-mb-item mdos-mb-icon",
    "aria-label": L.search,
    title: L.search,
    svg: svg("search"),
    onclick: () => openSpotlight(),
  }),
  h("button", {
    type: "button",
    class: "mdos-mb-item mdos-mb-icon",
    "aria-label": L.controlCenter,
    title: L.controlCenter,
    "data-mdos-cc-toggle": "",
    svg: svg("sliders"),
    onclick: () => toggleCC(),
  }),
  mbClock,
);
menubar.append(mbLeft, mbRight);
ui.append(menubar);

function updateMenubar() {
  setText(mbApp, focused ? windowTitle(focused) : L.desktopTitle);
}

const MENUS = {
  logo: () => [
    { label: L.about, action: showAbout },
    "-",
    { label: `${appLabel(appById("settings"))}…`, action: () => launch("settings") },
    { label: `${L.controlCenter}…`, action: () => toggleCC(true) },
    { label: `${L.customize}…`, action: () => toggleCC(true, "customize") },
    "-",
    { label: L.classic, key: "Ctrl Alt D", action: () => setEnabled(false) },
    { label: L.reload, action: () => location.reload() },
  ],
  app: () => {
    const id = focused;
    const onDesk = id === "main" && desktopHome;
    return [
      { label: L.minimize, key: "Ctrl Alt M", disabled: !id || onDesk, action: () => minimizeWin(id) },
      { label: L.zoom, disabled: !id || onDesk, action: () => zoomWin(id) },
      { label: L.close, disabled: !id || onDesk, action: () => closeWin(id) },
    ];
  },
  view: () => [
    { label: L.showDesktop, key: "Ctrl Alt H", action: showDesktop },
    { label: L.editWidgets, action: () => setEditMode(true) },
    { label: L.launchpad, key: "Ctrl Alt L", action: toggleLaunchpad },
    "-",
    ...APPS.map((a) => ({ label: appLabel(a), checked: isAppRunning(a.id), action: () => launch(a.id) })),
    ...(homeApps().length ? ["-", ...homeApps().map((a) => ({ label: appLabel(a), action: () => launch(a.id) }))] : []),
  ],
  window: () => [
    { label: L.minimize, key: "Ctrl Alt M", disabled: !focused, action: () => minimizeWin(focused) },
    { label: L.zoom, disabled: !focused, action: () => zoomWin(focused) },
    { label: L.nextWindow, key: "Ctrl `", action: cycleWindows },
    "-",
    { label: L.tile, action: tileWindows },
    { label: L.resetLayout, action: resetLayout },
    "-",
    ...WIN_IDS.filter(windowVisible).map((id) => ({
      label: windowTitle(id),
      checked: focused === id,
      action: () => focusWin(id),
    })),
  ],
  dock: () => [
    { label: L.autohide, checked: state.dockAutohide, action: () => updateSetting("dockAutohide", !state.dockAutohide) },
    { label: L.magnify, checked: state.magnify, action: () => updateSetting("magnify", !state.magnify) },
    { label: L.recents, checked: state.dockRecents, action: () => updateSetting("dockRecents", !state.dockRecents) },
    "-",
    ...[
      [44, KO ? "작게" : "Small"],
      [54, KO ? "보통" : "Medium"],
      [66, KO ? "크게" : "Large"],
    ].map(([size, label]) => ({
      label: `${L.dockSize}: ${label}`,
      checked: state.dockSize === size,
      action: () => updateSetting("dockSize", size),
    })),
  ],
  help: () => [
    {
      label: L.docs,
      action: () => window.open("https://github.com/Pasta-Devs/Marinara-Engine/tree/main/docs", "_blank", "noopener"),
    },
    { label: L.shortcuts, action: showAbout },
  ],
};
on(mbLeft, "click", (event) => {
  const btn = event.target.closest("[data-menu]");
  if (!btn) return;
  if (openMenu?.anchor === btn) closeMenu();
  else showMenu(btn.dataset.menu, btn);
});
on(mbLeft, "mouseover", (event) => {
  const btn = event.target.closest("[data-menu]");
  if (btn && openMenu?.anchor && openMenu.anchor !== btn) showMenu(btn.dataset.menu, btn);
});

// Right-click on the bare desktop.
function desktopMenuItems() {
  return [
    { label: L.editWidgets, action: () => setEditMode(true) },
    { label: `${L.wallpaper}…`, action: () => toggleCC(true, "wallpaper") },
    { label: `${L.customize}…`, action: () => toggleCC(true, "customize") },
    "-",
    { label: L.showDesktop, action: showDesktop },
    { label: L.tile, action: tileWindows },
  ];
}
function onContextMenu(event) {
  if (mode === "off") return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  const dockItem = target.closest(".mdos-dock-item");
  if (dockItem) {
    event.preventDefault();
    return showMenuAt(dockMenuItems(dockItem.dataset.app), event.clientX, event.clientY - 10);
  }
  const onDesktop =
    target === doc.body ||
    target === html ||
    target === widgetLayer ||
    target === wallpaper ||
    target.id === "mdos-sb" ||
    (desktopHome && !target.closest(INTERACTIVE) && !!target.closest(SEL.main) && !target.closest(".mari-home-widget, .mlh-card, section"));
  const widget = target.closest(".mdos-wg");
  if (widget && !editMode) {
    event.preventDefault();
    const w = state.widgets.find((x) => x.id === widget.dataset.wid);
    return showMenuAt(
      [
        { label: L.editWidgets, action: () => setEditMode(true) },
        ...(w ? [{ label: `${L.style}…`, action: () => openWidgetEditor(w, widget) }] : []),
        ...(w ? [{ label: L.remove, action: () => removeWidget(w.id) }] : []),
      ],
      event.clientX,
      event.clientY,
    );
  }
  if (onDesktop && isDesktop()) {
    event.preventDefault();
    showMenuAt(desktopMenuItems(), event.clientX, event.clientY);
  }
}

// ── Dock ──────────────────────────────────────────────────────

const dock = h("nav", { id: "mdos-dock", "aria-label": "Dock" });
const dockInner = h("div", { class: "mdos-dock-inner" });
dock.append(dockInner);
ui.append(dock);
const dockItems = new Map();
let dockSignature = "";

// Recent chats: the first rows of Marinara's chat list (already sorted by recency).
function recentChats() {
  if (!state.dockRecents || !isDesktop()) return [];
  return $$(SEL.chatRows)
    .slice(0, 3)
    .map((row) => ({
      id: `chat:${row.getAttribute("data-chat-id")}`,
      chatId: row.getAttribute("data-chat-id"),
      // The row also carries the chat's background thumbnail; skip it for the avatar.
      img: $$("img", row).find((i) => !/\/backgrounds\//.test(i.getAttribute("src") || ""))?.getAttribute("src") || null,
      title: row.getAttribute("title") || "",
    }))
    .filter((c) => c.chatId);
}
const TOUCH_DOCK = ["chats", "characters", "personas", "settings"];

function dockItem(app) {
  const label = h("span", { class: "mdos-dock-label", text: appLabel(app) });
  const item = h(
    "button",
    {
      type: "button",
      class: "mdos-dock-item",
      "data-app": app.id,
      "data-touch": TOUCH_DOCK.includes(app.id) ? "1" : "0",
      "aria-label": appLabel(app),
      onclick: () => launch(app.id),
    },
    label,
    appIcon(app),
    h("span", { class: "mdos-dock-dot", "aria-hidden": "true" }),
  );
  dockItems.set(app.id, { item, label, app });
  return item;
}
function renderDock() {
  const recents = recentChats();
  const signature = JSON.stringify([
    state.icons,
    state.iconStyle,
    Object.keys(images.icons),
    recents.map((r) => [r.id, r.img, r.title]),
    APPS.map(appLabel),
  ]);
  if (signature === dockSignature) return;
  dockSignature = signature;
  dockItems.clear();
  const kids = APPS.map(dockItem);
  if (recents.length) {
    kids.push(h("div", { class: "mdos-dock-sep", "aria-hidden": "true" }));
    for (const chat of recents) {
      const app = {
        id: chat.id,
        chatId: chat.chatId,
        img: chat.img,
        icon: "chat",
        g: ["#6ef08d", "#17a84d"],
        label: () => chat.title,
      };
      const item = dockItem(app);
      item.classList.add("mdos-dock-item--recent");
      kids.push(item);
    }
  }
  kids.push(h("div", { class: "mdos-dock-sep", "aria-hidden": "true" }), ...TAIL_APPS.map(dockItem));
  dockInner.replaceChildren(...kids);
  dockCenters = null;
  updateDockState();
}
function updateDockState() {
  for (const [id, { item }] of dockItems) item.classList.toggle("is-running", isAppRunning(id));
}

let dockCenters = null;
let magnifyFrame = 0;
let magnifyX = 0;
on(dockInner, "mouseenter", () => {
  dockCenters = [...dockItems.values()].map(({ item }) => {
    const r = item.getBoundingClientRect();
    return r.left + r.width / 2;
  });
});
on(dockInner, "mousemove", (event) => {
  if (!state.magnify || reducedMotion() || !dockCenters) return;
  magnifyX = event.clientX;
  if (!magnifyFrame)
    magnifyFrame = raf(() => {
      magnifyFrame = 0;
      const range = state.dockSize * 2.6;
      [...dockItems.values()].forEach(({ item }, i) => {
        const d = Math.abs(magnifyX - dockCenters[i]);
        const s = d >= range ? 1 : 1 + 0.6 * Math.cos(((d / range) * Math.PI) / 2);
        item.style.setProperty("--mag", s.toFixed(3));
      });
    });
});
on(dockInner, "mouseleave", () => {
  dockCenters = null;
  for (const { item } of dockItems.values()) item.style.removeProperty("--mag");
});

// Auto-hide: the Dock slides in when the pointer nears the bottom edge.
let dockShown = false;
let dockHideTimer = 0;
function dockProximity(event) {
  const near = event.clientY >= innerHeight - 6;
  if (near) {
    marinara.clearTimeout(dockHideTimer);
    dockHideTimer = 0;
    if (!dockShown) {
      dockShown = true;
      dock.classList.add("is-peek");
    }
    return;
  }
  if (!dockShown || dockHideTimer) return;
  const inside = event.clientY >= innerHeight - (state.dockSize * 1.7 + 30) || openMenu?.id === "context";
  if (!inside) {
    dockHideTimer = marinara.setTimeout(() => {
      dockHideTimer = 0;
      dockShown = false;
      dock.classList.remove("is-peek");
    }, 350);
  }
}

function bounce(id) {
  const entry = dockItems.get(id);
  if (!entry || reducedMotion()) return;
  entry.item.classList.remove("is-bouncing");
  void entry.item.offsetWidth;
  entry.item.classList.add("is-bouncing");
  marinara.setTimeout(() => entry.item.classList.remove("is-bouncing"), 700);
}

function isAppRunning(id) {
  if (id === "home") return homePageVisible();
  if (id === "chats") return chatsOpen() || (isTouch() && !!$('aside[data-component="ChatSidebarPanel"]'));
  if (PANEL_IDS.includes(id)) return (panelOpen() || (isTouch() && !!$(SEL.sheets))) && activePanelId() === id;
  if (id.startsWith("chat:")) return !!$(`${SEL.chatRows}[data-chat-id="${CSS.escape(id.slice(5))}"][class~="bg-[var(--marinara-chat-chrome-highlight-bg)]"]`);
  return false;
}

function dockMenuItems(id) {
  const app = appById(id);
  const running = isAppRunning(id);
  const items = [];
  if (id.startsWith("chat:")) items.push({ label: L.open, action: () => launch(id) });
  else if (app) {
    items.push({ label: running && (id === "chats" || PANEL_IDS.includes(id)) ? L.close : L.open, action: () => launch(id, { toggle: true }) });
    items.push("-", { label: L.editIcon, action: () => openIconEditor(app) });
  }
  return items;
}

// Opening a panel or the chat list brings its window forward; if it is
// already in front, the Dock icon closes it again (like toggling the app).
function launch(id, { toggle = false } = {}) {
  closeMenu();
  closeLaunchpad();
  if (id === "home") {
    goHome();
    focusWin("main");
    bounce(id);
  } else if (id.startsWith("chat:")) {
    const row = $(`${SEL.chatRows}[data-chat-id="${CSS.escape(id.slice(5))}"]`);
    if (state.mainMinimized) setMainMinimized(false);
    click(row);
    focusWin("main");
  } else if (id.startsWith("tab:")) {
    openHomeTab(id.slice(4));
  } else if (id === "chats") {
    if (isTouch()) {
      if (!$('aside[data-component="ChatSidebarPanel"]')) click($(SEL.chatsBtn));
    } else if (chatsOpen()) {
      if (focused === "chats" || toggle) closeWin("chats");
      else focusWin("chats");
    } else {
      click($(SEL.chatsBtn));
      focusWin("chats");
      bounce(id);
    }
  } else if (PANEL_IDS.includes(id)) {
    const btn = panelBtn(id);
    if (!btn) return;
    if (isTouch()) {
      if (activePanelId() !== id || !$(SEL.sheets)) btn.click();
    } else if (panelOpen() && activePanelId() === id) {
      if (focused === "panel" || toggle) closeWin("panel");
      else focusWin("panel");
    } else {
      btn.click();
      focusWin("panel");
      bounce(id);
    }
  } else if (id === "launchpad") toggleLaunchpad();
  else if (id === "search") openSpotlight();
  else if (id === "controlcenter") toggleCC(true);
  else if (id === "widgets") setEditMode(true);
  else if (id === "customize") toggleCC(true, "customize");
  else if (id === "wallpaper") toggleCC(true, "wallpaper");
  else if (id === "classic") setEnabled(false);
  else if (id === "about") showAbout();
  else if (id === "reload") location.reload();
  syncSoon();
}

// Home tabs live inside Marinara's Home view; show Home first if needed.
function openHomeTab(key) {
  const find = () => $(`#marinara-home-tab-${CSS.escape(key)}`);
  if (state.mainMinimized) setMainMinimized(false);
  const tab = find();
  if (tab) {
    tab.click();
    focusWin("main");
    return;
  }
  click($(SEL.homeBtn));
  let tries = 0;
  const poll = () => {
    const t = find();
    if (t) {
      t.click();
      focusWin("main");
    } else if (++tries < 15) marinara.setTimeout(poll, 100);
  };
  marinara.setTimeout(poll, 100);
}
function readHomeApps() {
  const tabs = $$(SEL.homeTabs);
  if (!tabs.length) return;
  // Visible tab text ("Noodle"), not the aria-label ("Open Noodle") or an unread badge.
  const tabText = (t) => {
    const copy = t.cloneNode(true);
    copy.querySelectorAll('[data-component*="Badge"]').forEach((b) => b.remove());
    return copy.textContent.trim();
  };
  const list = tabs
    .map((t) => ({
      key: (t.id || "").replace(/^marinara-home-tab-/, ""),
      label: tabText(t) || t.getAttribute("aria-label"),
      img: t.querySelector("img")?.getAttribute("src") || null,
    }))
    .filter((t) => t.key && t.key !== "home" && t.label);
  if (JSON.stringify(list) !== JSON.stringify(state.homeApps)) {
    state.homeApps = list;
    save();
    if (sbEl) renderSpringboardApps();
  }
}

function openSpotlight() {
  closeMenu();
  closeLaunchpad();
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      ctrlKey: !IS_MAC,
      metaKey: IS_MAC,
      bubbles: true,
      cancelable: true,
    }),
  );
}

// ── Launchpad ─────────────────────────────────────────────────

let launchpadEl = null;
function toggleLaunchpad() {
  if (launchpadEl) closeLaunchpad();
  else openLaunchpad();
}
function launchpadApps() {
  return allApps().filter((a) => a.id !== "launchpad" && !(isTouch() && ["classic", "search"].includes(a.id)));
}
function appTile(a, i, onPick) {
  return h(
    "button",
    {
      type: "button",
      role: "listitem",
      class: "mdos-lp-app",
      style: `--i:${i}`,
      "data-app": a.id,
      onclick: () => onPick(a),
      oncontextmenu: (event) => {
        if (!isDesktop()) return;
        event.preventDefault();
        event.stopPropagation();
        showMenuAt([{ label: L.editIcon, action: () => openIconEditor(a) }], event.clientX, event.clientY);
      },
    },
    appIcon(a),
    h("span", { class: "mdos-lp-label", text: appLabel(a) }),
  );
}
function openLaunchpad() {
  closeMenu();
  closeCC();
  const apps = launchpadApps();
  const input = h("input", {
    type: "search",
    class: "mdos-lp-search",
    placeholder: L.search,
    "aria-label": L.search,
    autocomplete: "off",
  });
  const grid = h("div", { class: "mdos-lp-grid", role: "list" });
  const render = () => {
    const q = input.value.trim().toLowerCase();
    grid.replaceChildren(
      ...apps
        .filter((a) => !q || appLabel(a).toLowerCase().includes(q) || a.id.includes(q))
        .map((a, i) => appTile(a, i, (picked) => launch(picked.id))),
    );
  };
  input.addEventListener("input", render);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") grid.querySelector("button")?.click();
  });
  launchpadEl = h(
    "div",
    {
      id: "mdos-launchpad",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": L.launchpad,
      onclick: (event) => {
        if (event.target === launchpadEl || event.target === grid) closeLaunchpad();
      },
    },
    input,
    grid,
  );
  render();
  ui.append(launchpadEl);
  raf(() => {
    launchpadEl?.classList.add("is-open");
    if (isDesktop()) input.focus();
  });
}
function closeLaunchpad() {
  if (!launchpadEl) return;
  const el = launchpadEl;
  launchpadEl = null;
  el.classList.remove("is-open");
  marinara.setTimeout(() => el.remove(), reducedMotion() ? 0 : 220);
}

// ── Popovers (icon editor, widget editor, widget gallery) ─────

let popEl = null;
function openPop(content, anchor, { title, wide = false } = {}) {
  closePop();
  popEl = h(
    "div",
    { class: `mdos-pop${wide ? " mdos-pop--wide" : ""}`, role: "dialog", "aria-label": title || "" },
    title ? h("div", { class: "mdos-pop-head" }, h("h3", { text: title }), h("button", { type: "button", class: "mdos-pop-close", "aria-label": L.close, text: "×", onclick: () => closePop() })) : null,
    content,
  );
  ui.append(popEl);
  const r = anchor?.getBoundingClientRect?.();
  const pw = popEl.offsetWidth;
  const ph = popEl.offsetHeight;
  if (r && isDesktop()) {
    let left = r.left + r.width / 2 - pw / 2;
    let top = r.top - ph - 12;
    if (top < MENUBAR_H + 8) top = r.bottom + 12;
    left = Math.max(8, Math.min(left, innerWidth - pw - 8));
    top = Math.max(MENUBAR_H + 8, Math.min(top, innerHeight - ph - 8));
    popEl.style.left = `${left}px`;
    popEl.style.top = `${top}px`;
  } else {
    popEl.classList.add("is-centered");
  }
}
function closePop() {
  popEl?.remove();
  popEl = null;
}
function field(label, control) {
  // A div, not a label: several fields hold more than one button.
  if (control.matches?.("input, select, textarea")) control.setAttribute("aria-label", label);
  return h("div", { class: "mdos-field" }, h("span", { class: "mdos-field-label", text: label }), control);
}
function segmented(options, value, onChange) {
  const el = h("div", { class: "mdos-seg", role: "radiogroup" });
  for (const [id, label] of options) {
    el.append(
      h("button", {
        type: "button",
        role: "radio",
        class: "mdos-seg-btn",
        "aria-checked": String(value === id),
        text: label,
        onclick: () => {
          el.querySelectorAll(".mdos-seg-btn").forEach((b) => b.setAttribute("aria-checked", "false"));
          el.querySelector(`[data-v="${CSS.escape(id)}"]`)?.setAttribute("aria-checked", "true");
          onChange(id);
        },
        "data-v": id,
      }),
    );
  }
  return el;
}

function openIconEditor(app, anchor) {
  const custom = state.icons[app.id] || {};
  const preview = h("div", { class: "mdos-iconed-preview" });
  const refresh = () => {
    preview.replaceChildren(appIcon(app), h("span", { text: appLabel(app) }));
    dockSignature = "";
    renderDock();
    if (sbEl) renderSpringboardApps();
  };
  const commit = (patch) => {
    const next = { ...(state.icons[app.id] || {}), ...patch };
    for (const k of Object.keys(next)) if (next[k] === "" || next[k] == null) delete next[k];
    if (Object.keys(next).length) state.icons[app.id] = next;
    else delete state.icons[app.id];
    save();
    refresh();
  };
  const labelInput = h("input", {
    type: "text",
    class: "mdos-input",
    value: custom.label || "",
    placeholder: app.label(),
    maxlength: "24",
    oninput: (event) => commit({ label: event.target.value.trim() }),
  });
  const color1 = h("input", { type: "color", value: custom.g1 || app.g[0], oninput: (e) => commit({ g1: e.target.value }) });
  const color2 = h("input", { type: "color", value: custom.g2 || app.g[1], oninput: (e) => commit({ g2: e.target.value }) });
  const content = h(
    "div",
    { class: "mdos-pop-body" },
    preview,
    field(L.label, labelInput),
    field(L.colors, h("div", { class: "mdos-row" }, color1, color2)),
    h(
      "div",
      { class: "mdos-row" },
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.pickImage,
        onclick: () =>
          pickImage(
            (data) => {
              if (storeImage(() => (images.icons[app.id] = data))) refresh();
            },
            { maxSide: 160, maxBytes: 40_000, square: true },
          ),
      }),
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.removeImage,
        onclick: () => {
          delete images.icons[app.id];
          saveImages();
          refresh();
        },
      }),
    ),
    h("button", {
      type: "button",
      class: "mdos-btn mdos-btn--quiet",
      text: L.reset,
      onclick: () => {
        delete state.icons[app.id];
        delete images.icons[app.id];
        labelInput.value = "";
        color1.value = app.g[0];
        color2.value = app.g[1];
        save();
        saveImages();
        refresh();
      },
    }),
  );
  refresh();
  openPop(content, anchor || dockItems.get(app.id)?.item, { title: L.editIcon });
}

function openIconPicker() {
  const apps = [...APPS, ...homeApps(), ...TAIL_APPS, ...EXTRA_APPS];
  const grid = h("div", { class: "mdos-iconpick" }, ...apps.map((a, i) => appTile(a, i, (picked) => openIconEditor(picked))));
  openPop(grid, null, { title: L.editIcons.replace("…", ""), wide: true });
}

// ── Widgets ───────────────────────────────────────────────────

let editMode = false;
const WIDGET_TYPES = ["launcher", "clock", "analog", "calendar", "greeting", "dday", "note", "photo"];
// New chat launcher: the three buttons of Marinara's (hidden) Home greeting.
const LAUNCH_MODES = [
  { icon: "chat", g: ["#6ef08d", "#17a84d"] },
  { icon: "roleplay", g: ["#ffb35c", "#f06a1d"] },
  { icon: "game", g: ["#ff7ab0", "#7b5cff"] },
];
const heroButton = (n) => $(`.mari-home-hero .grid > button:nth-child(${n + 1})`);
function startChat(n) {
  const btn = heroButton(n);
  if (btn) return btn.click();
  goHome();
  let tries = 0;
  const poll = () => {
    const b = heroButton(n);
    if (b) b.click();
    else if (++tries < 15) marinara.setTimeout(poll, 100);
  };
  marinara.setTimeout(poll, 100);
}
// Matches home.css: small 160², medium 340×160, large 340² (the widget column width).
const WIDGET_SIZES = { s: [160, 160], m: [340, 160], l: [340, 340] };
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const dateLongFmt = new Intl.DateTimeFormat(undefined, { month: "long", day: "numeric", weekday: "long" });
const weekdayFmt = new Intl.DateTimeFormat(undefined, { weekday: "short" });
const monthFmt = new Intl.DateTimeFormat(undefined, { month: "long" });
const menubarDateFmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", weekday: "short" });
const shortDateFmt = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" });

function ddayText(dateStr) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr || "")) return "D-?";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = dateStr.split("-").map(Number);
  let target = new Date(y, m - 1, d);
  const diff = Math.round((target - today) / 86_400_000);
  return diff === 0 ? "D-DAY" : diff > 0 ? `D-${diff}` : `D+${-diff}`;
}
function calendarGrid(now) {
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const names = [];
  for (let i = 0; i < 7; i++) names.push(weekdayFmt.format(new Date(2024, 0, 7 + i)).slice(0, KO ? 1 : 1));
  const cells = [...names.map((n) => h("span", { class: "mdos-cal-head", text: n }))];
  for (let i = 0; i < first.getDay(); i++) cells.push(h("span"));
  for (let d = 1; d <= days; d++) cells.push(h("span", { class: d === now.getDate() ? "is-today" : "", text: String(d) }));
  return h("div", { class: "mdos-cal-grid" }, ...cells);
}

function widgetBody(w) {
  const now = new Date();
  switch (w.type) {
    case "launcher":
      return [
        h("div", { class: "mdos-wg-label", text: L.newChat }),
        h(
          "div",
          { class: "mdos-launcher" },
          ...LAUNCH_MODES.map((m, n) =>
            h(
              "button",
              {
                type: "button",
                class: "mdos-launch",
                onclick: (event) => {
                  event.stopPropagation();
                  if (!editMode) startChat(n);
                },
              },
              h("span", { class: "mdos-app-icon", style: `--g1:${m.g[0]};--g2:${m.g[1]}`, svg: svg(m.icon) }),
              // Marinara's own (localized) label when Home is mounted.
              h("span", { class: "mdos-launch-label", text: heroButton(n)?.textContent.trim() || L.modes[n] }),
            ),
          ),
        ),
      ];
    case "clock":
      return [
        h("div", { class: "mdos-wg-time", text: timeFmt.format(now) }),
        h("div", { class: "mdos-wg-sub", text: dateLongFmt.format(now) }),
      ];
    case "analog": {
      const hr = now.getHours() % 12;
      const min = now.getMinutes();
      const face = h("div", {
        class: "mdos-analog",
        style: `--h:${hr * 30 + min * 0.5}deg;--m:${min * 6}deg`,
      });
      for (let i = 0; i < 12; i++) face.append(h("i", { style: `--t:${i * 30}deg` }));
      face.append(h("b", { class: "mdos-analog-h" }), h("b", { class: "mdos-analog-m" }), h("em"));
      return [face];
    }
    case "calendar":
      if (w.size === "s")
        return [
          h("div", { class: "mdos-wg-weekday", text: weekdayFmt.format(now) }),
          h("div", { class: "mdos-wg-daynum", text: String(now.getDate()) }),
          h("div", { class: "mdos-wg-sub", text: monthFmt.format(now) }),
        ];
      return [
        h("div", { class: "mdos-wg-weekday", text: monthFmt.format(now) }),
        calendarGrid(now),
      ];
    case "greeting":
      return [
        h("div", { class: "mdos-wg-greet", text: L.greeting(now.getHours()) }),
        h("div", { class: "mdos-wg-time", text: timeFmt.format(now) }),
        h("div", { class: "mdos-wg-sub", text: dateLongFmt.format(now) }),
      ];
    case "dday":
      return [
        h("div", { class: "mdos-wg-sub mdos-wg-strong", text: w.title || L.ddayDefault }),
        h("div", { class: "mdos-wg-dday", text: ddayText(w.date) }),
        h("div", { class: "mdos-wg-sub", text: w.date ? shortDateFmt.format(new Date(`${w.date}T00:00`)) : L.date }),
      ];
    case "note": {
      const area = h("textarea", {
        class: "mdos-wg-note",
        placeholder: L.notePlaceholder,
        "aria-label": L.widgetNames.note,
        maxlength: "600",
        value: w.text || "",
      });
      area.addEventListener("input", () => {
        w.text = area.value;
        save();
      });
      return [area];
    }
    case "photo": {
      const src = images.photos[w.id];
      return src
        ? [h("img", { class: "mdos-wg-photo", src, alt: "", draggable: "false" })]
        : [h("div", { class: "mdos-wg-empty", text: L.pickPhoto })];
    }
    default:
      return [];
  }
}

function widgetEl(w) {
  const el = h("div", {
    class: `mdos-wg mdos-wg--${w.type} mdos-wg--${w.size} mdos-wg-style--${w.style || "glass"}`,
    "data-wid": w.id,
    style: w.type === "note" ? `--note:${w.color || NOTE_COLORS[0]}` : "",
  });
  el.append(
    h("div", { class: "mdos-wg-body" }, ...widgetBody(w)),
    h("button", {
      type: "button",
      class: "mdos-wg-badge mdos-wg-remove",
      "aria-label": L.remove,
      text: "−",
      onclick: (event) => {
        event.stopPropagation();
        removeWidget(w.id);
      },
    }),
    h("button", {
      type: "button",
      class: "mdos-wg-badge mdos-wg-edit",
      "aria-label": L.style,
      text: "i",
      onclick: (event) => {
        event.stopPropagation();
        openWidgetEditor(w, el);
      },
    }),
  );
  if (w.type === "photo" && !images.photos[w.id]) {
    el.addEventListener("click", () => {
      if (!editMode) pickPhotoFor(w);
    });
  }
  return el;
}
function pickPhotoFor(w) {
  pickImage(
    (data) => {
      if (storeImage(() => (images.photos[w.id] = data))) renderWidgets();
    },
    { maxSide: 640, maxBytes: 90_000, square: false },
  );
}
function clampWidget(w) {
  const [ww, wh] = WIDGET_SIZES[w.size] || WIDGET_SIZES.s;
  const maxX = Math.max(0, innerWidth - ww - 8);
  const maxY = Math.max(0, innerHeight - MENUBAR_H - wh - 12);
  w.x = Math.min(Math.max(w.x ?? 0, 8), maxX);
  w.y = Math.min(Math.max(w.y ?? 0, 8), maxY);
}
// Widgets without a position line up in a column on the right.
// Unplaced widgets fill the right-hand column top-down; two small widgets
// share a row, like a widget stack.
function autoPlace() {
  const colW = WIDGET_SIZES.m[0];
  const gap = 16;
  const maxY = innerHeight - MENUBAR_H - 90;
  let col = 0;
  let y = 16;
  let half = false; // a small widget already sits on the left of this row
  for (const w of state.widgets) {
    if (Number.isFinite(w.x) && Number.isFinite(w.y)) continue;
    const [ww, wh] = WIDGET_SIZES[w.size] || WIDGET_SIZES.s;
    const small = w.size === "s";
    if (half && !small) {
      y += WIDGET_SIZES.s[1] + gap;
      half = false;
    }
    if (!half && y + wh > maxY && y > 16) {
      y = 16;
      col += 1;
    }
    const colX = innerWidth - 24 - colW - col * (colW + 18);
    if (small && half) {
      w.x = colX + colW - ww;
      w.y = y;
      y += wh + gap;
      half = false;
      continue;
    }
    w.x = colX;
    w.y = y;
    if (small) half = true;
    else y += wh + gap;
  }
}
function placeWidget(el, w) {
  el.style.left = `${w.x}px`;
  el.style.top = `${w.y}px`;
}
function renderWidgets() {
  if (isDesktop()) {
    autoPlace();
    widgetLayer.replaceChildren(
      ...state.widgets.map((w) => {
        clampWidget(w);
        const el = widgetEl(w);
        placeWidget(el, w);
        return el;
      }),
    );
  } else widgetLayer.replaceChildren();
  if (sbWidgets) sbWidgets.replaceChildren(...state.widgets.map(widgetEl));
}
// Refresh only the time-based widgets (notes keep their focus/caret).
function tickWidgets() {
  for (const w of state.widgets) {
    if (!["clock", "analog", "calendar", "greeting", "dday"].includes(w.type)) continue;
    for (const el of $$(`.mdos-wg[data-wid="${w.id}"] .mdos-wg-body`)) el.replaceChildren(...widgetBody(w));
  }
}
function addWidget(type, size) {
  const w = { id: newId(), type, size, style: type === "note" ? "note" : "glass", x: null, y: null };
  if (type === "dday") Object.assign(w, { title: L.ddayDefault, date: "", style: "accent" });
  if (type === "note") w.color = NOTE_COLORS[0];
  if (isDesktop()) {
    const [ww, wh] = WIDGET_SIZES[size];
    w.x = Math.round((innerWidth - ww) / 2 / 8) * 8;
    w.y = Math.round((innerHeight - MENUBAR_H - wh) / 3 / 8) * 8;
  }
  state.widgets.push(w);
  save();
  renderWidgets();
  if (type === "photo") pickPhotoFor(w);
}
function removeWidget(id) {
  state.widgets = state.widgets.filter((w) => w.id !== id);
  if (images.photos[id]) {
    delete images.photos[id];
    saveImages();
  }
  save();
  renderWidgets();
  closePop();
}
function moveWidget(id, delta) {
  const i = state.widgets.findIndex((w) => w.id === id);
  const j = i + delta;
  if (i < 0 || j < 0 || j >= state.widgets.length) return;
  [state.widgets[i], state.widgets[j]] = [state.widgets[j], state.widgets[i]];
  save();
  renderWidgets();
}

function openWidgetEditor(w, anchor) {
  const rerender = () => {
    save();
    renderWidgets();
  };
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(
      L.size,
      segmented(
        Object.entries(L.sizes),
        w.size,
        (v) => {
          w.size = v;
          rerender();
        },
      ),
    ),
    w.type === "note"
      ? field(
          L.noteColor,
          h(
            "div",
            { class: "mdos-row mdos-swatches" },
            ...NOTE_COLORS.map((c) =>
              h("button", {
                type: "button",
                class: "mdos-swatch",
                style: `background:${c}`,
                "aria-label": c,
                onclick: () => {
                  w.color = c;
                  rerender();
                },
              }),
            ),
          ),
        )
      : field(
          L.style,
          segmented(Object.entries(L.wStyles), w.style || "glass", (v) => {
            w.style = v;
            rerender();
          }),
        ),
    w.type === "dday"
      ? field(
          L.title,
          h("input", {
            type: "text",
            class: "mdos-input",
            value: w.title || "",
            maxlength: "30",
            oninput: (e) => {
              w.title = e.target.value;
              rerender();
            },
          }),
        )
      : null,
    w.type === "dday"
      ? field(
          L.date,
          h("input", {
            type: "date",
            class: "mdos-input",
            value: w.date || "",
            onchange: (e) => {
              w.date = e.target.value;
              rerender();
            },
          }),
        )
      : null,
    w.type === "photo"
      ? h("button", { type: "button", class: "mdos-btn", text: L.pickImage, onclick: () => pickPhotoFor(w) })
      : null,
    isTouch()
      ? h(
          "div",
          { class: "mdos-row" },
          h("button", { type: "button", class: "mdos-btn", text: "◀", onclick: () => moveWidget(w.id, -1) }),
          h("button", { type: "button", class: "mdos-btn", text: "▶", onclick: () => moveWidget(w.id, 1) }),
        )
      : null,
    h("button", { type: "button", class: "mdos-btn mdos-btn--danger", text: L.remove, onclick: () => removeWidget(w.id) }),
  );
  openPop(body, anchor, { title: L.widgetNames[w.type] });
}

function openWidgetGallery(anchor) {
  let size = "s";
  const grid = h("div", { class: "mdos-gallery" });
  const render = () =>
    grid.replaceChildren(
      ...WIDGET_TYPES.map((type) => {
        const sample = widgetEl({ id: `preview-${type}`, type, size: "s", style: type === "note" ? "note" : type === "dday" ? "accent" : "glass", title: L.ddayDefault, color: NOTE_COLORS[0] });
        sample.classList.add("is-sample");
        return h(
          "button",
          {
            type: "button",
            class: "mdos-gallery-item",
            onclick: () => {
              addWidget(type, size);
              closePop();
            },
          },
          sample,
          h("span", { text: L.widgetNames[type] }),
        );
      }),
    );
  render();
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(L.size, segmented(Object.entries(L.sizes), size, (v) => (size = v))),
    grid,
  );
  openPop(body, anchor, { title: L.addWidget, wide: true });
}

const editBar = h(
  "div",
  { id: "mdos-editbar", role: "toolbar", "aria-label": L.editWidgets },
  h("button", { type: "button", class: "mdos-btn", text: `+ ${L.addWidget}`, onclick: (e) => openWidgetGallery(e.currentTarget) }),
  h("button", { type: "button", class: "mdos-btn", text: L.wallpaper, onclick: () => toggleCC(true, "wallpaper") }),
  h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: L.done, onclick: () => setEditMode(false) }),
);
ui.append(editBar);
function setEditMode(next) {
  editMode = next;
  toggleClass("mdos-edit", next);
  closeMenu();
  closeLaunchpad();
  closeCC();
  if (!next) closePop();
  if (next && isDesktop()) goHome();
}

// ── Control Center ────────────────────────────────────────────

let ccEl = null;
function toggleCC(forceOpen, section) {
  if (ccEl && !forceOpen) return closeCC();
  closeMenu();
  closeLaunchpad();
  if (!ccEl) buildCC();
  if (section) {
    const target = ccEl.querySelector(`[data-section="${section}"]`);
    target?.scrollIntoView({ block: "start" });
    target?.classList.add("is-flash");
    marinara.setTimeout(() => target?.classList.remove("is-flash"), 900);
  }
}
function buildCC() {
  const toggle = (key, label) =>
    h(
      "label",
      { class: "mdos-cc-toggle" },
      h("span", { text: label }),
      h("input", {
        type: "checkbox",
        role: "switch",
        checked: !!state[key],
        onchange: (event) => updateSetting(key, event.target.checked),
      }),
    );
  const card = (section, title, ...kids) => h("section", { class: "mdos-cc-card", "data-section": section }, h("h3", { text: title }), ...kids);

  const accents = h(
    "div",
    { class: "mdos-cc-accents", role: "radiogroup", "aria-label": L.accent },
    ...ACCENTS.map((accent) =>
      h("button", {
        type: "button",
        role: "radio",
        class: `mdos-cc-accent${accent.color ? "" : " mdos-cc-accent--app"}`,
        title: accent.name,
        "aria-label": accent.name,
        "aria-checked": String(state.accent === accent.id),
        "data-accent": accent.id,
        style: accent.color ? `--c:${accent.color}` : "",
        onclick: () => {
          updateSetting("accent", accent.id);
          refreshCC();
        },
      }),
    ),
  );
  const swatches = h(
    "div",
    { class: "mdos-cc-swatches", role: "radiogroup", "aria-label": L.wallpaper },
    ...WALLPAPERS.map((wp) =>
      h("button", {
        type: "button",
        role: "radio",
        class: "mdos-cc-swatch",
        title: wp.name,
        "aria-label": wp.name,
        "aria-checked": String(!images.wallpaper && state.wallpaper === wp.id),
        "data-wp": wp.id,
        style: `background:${wp.css}`,
        onclick: () => {
          if (images.wallpaper) {
            images.wallpaper = "";
            saveImages();
          }
          updateSetting("wallpaper", wp.id);
          refreshCC();
        },
      }),
    ),
  );
  const urlInput = h("input", { type: "url", class: "mdos-cc-input", placeholder: L.imageUrl, "aria-label": L.imageUrl });
  const urlRow = h(
    "form",
    {
      class: "mdos-cc-row",
      onsubmit: (event) => {
        event.preventDefault();
        const url = urlInput.value.trim();
        if (!/^https:\/\/[^\s"'()\\]+$/i.test(url)) {
          urlInput.setCustomValidity(L.badUrl);
          urlInput.reportValidity();
          return;
        }
        urlInput.setCustomValidity("");
        if (storeImage(() => (images.wallpaper = url))) {
          applyWallpaper();
          refreshCC();
        }
      },
    },
    urlInput,
    h("button", { type: "submit", class: "mdos-cc-btn", text: L.apply }),
  );
  const size = h("input", {
    type: "range",
    min: "40",
    max: "80",
    step: "2",
    value: String(state.dockSize),
    "aria-label": L.dockSize,
    oninput: (event) => updateSetting("dockSize", Number(event.target.value)),
  });
  const select = (key, options) => {
    const el = h("select", { class: "mdos-cc-select", onchange: (e) => updateSetting(key, e.target.value) });
    for (const [v, label] of options) el.append(h("option", { value: v, text: label, selected: state[key] === v }));
    return el;
  };

  ccEl = h(
    "div",
    { id: "mdos-cc", role: "dialog", "aria-label": L.controlCenter },
    card(
      "appearance",
      L.appearance,
      h("div", { class: "mdos-cc-sub", text: L.accent }),
      accents,
      h("label", { class: "mdos-cc-slider" }, h("span", { text: L.convoStyle }), select("convoStyle", [["messages", L.convoMessages], ["marinara", L.convoMarinara]])),
      h("label", { class: "mdos-cc-slider" }, h("span", { text: L.rpStyle }), select("rpStyle", [["book", L.rpBook], ["night", L.rpNight], ["clean", L.rpClean]])),
    ),
    card(
      "wallpaper",
      L.wallpaper,
      swatches,
      h(
        "div",
        { class: "mdos-cc-row" },
        h("button", {
          type: "button",
          class: "mdos-cc-btn mdos-cc-btn--wide",
          text: L.customImage,
          onclick: () =>
            pickImage(
              (data) => {
                if (storeImage(() => (images.wallpaper = data))) {
                  applyWallpaper();
                  refreshCC();
                }
              },
              { maxSide: 2200, maxBytes: 450_000 },
            ),
        }),
      ),
      urlRow,
    ),
    card(
      "customize",
      L.customize,
      h("label", { class: "mdos-cc-slider" }, h("span", { text: L.iconStyle }), select("iconStyle", Object.entries(L.iconStyles))),
      h("label", { class: "mdos-cc-slider" }, h("span", { text: L.iconShape }), select("iconShape", Object.entries(L.iconShapes))),
      h(
        "div",
        { class: "mdos-cc-row" },
        h("button", { type: "button", class: "mdos-cc-btn mdos-cc-btn--wide", text: L.editIcons, onclick: () => { closeCC(); openIconPicker(); } }),
        h("button", { type: "button", class: "mdos-cc-btn mdos-cc-btn--wide", text: L.editWidgets, onclick: () => setEditMode(true) }),
      ),
      toggle("iconView", L.iconView),
    ),
    card(
      "dock",
      L.dock,
      h("label", { class: "mdos-cc-slider" }, h("span", { text: L.dockSize }), size),
      toggle("dockAutohide", L.autohide),
      toggle("magnify", L.magnify),
      toggle("dockRecents", L.recents),
    ),
    card(
      "performance",
      L.performance,
      toggle("reduceTransparency", L.reduceTransparency),
      toggle("reduceMotion", L.reduceMotion),
      toggle("bootSplash", L.bootSplash),
    ),
    h(
      "section",
      { class: "mdos-cc-card mdos-cc-actions" },
      isDesktop() ? h("button", { type: "button", class: "mdos-cc-btn", text: L.tile, onclick: tileWindows }) : null,
      isDesktop() ? h("button", { type: "button", class: "mdos-cc-btn", text: L.resetLayout, onclick: resetLayout }) : null,
      h("button", { type: "button", class: "mdos-cc-btn", text: L.classic, onclick: () => setEnabled(false) }),
    ),
    isTouch() ? h("button", { type: "button", class: "mdos-cc-btn mdos-cc-done", text: L.done, onclick: () => closeCC() }) : null,
  );
  ui.append(ccEl);
  raf(() => ccEl?.classList.add("is-open"));
}
function refreshCC() {
  if (!ccEl) return;
  ccEl.querySelectorAll(".mdos-cc-swatch").forEach((el) => {
    el.setAttribute("aria-checked", String(!images.wallpaper && state.wallpaper === el.dataset.wp));
  });
  ccEl.querySelectorAll(".mdos-cc-accent").forEach((el) => {
    el.setAttribute("aria-checked", String(state.accent === el.dataset.accent));
  });
}
function closeCC() {
  if (!ccEl) return;
  ccEl.remove();
  ccEl = null;
}

// ── About / shortcuts ─────────────────────────────────────────

let aboutEl = null;
function showAbout() {
  closeMenu();
  closeLaunchpad();
  if (aboutEl) return;
  aboutEl = h(
    "div",
    {
      id: "mdos-about",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": L.about,
      onclick: (event) => {
        if (event.target === aboutEl) closeAbout();
      },
    },
    h(
      "div",
      { class: "mdos-about-card" },
      h("div", { class: "mdos-about-logo", svg: LOGO }),
      h("h2", { text: "Marinara Desktop" }),
      h("p", { class: "mdos-about-version", text: "2.0.0" }),
      h("p", { text: L.aboutBody }),
      h(
        "dl",
        { class: "mdos-about-keys" },
        ...L.shortcutList.flatMap(([k, v]) => [h("dt", { text: k }), h("dd", { text: v })]),
      ),
      h("button", { type: "button", class: "mdos-cc-btn", text: L.close, onclick: () => closeAbout() }),
    ),
  );
  ui.append(aboutEl);
  aboutEl.querySelector("button")?.focus();
}
function closeAbout() {
  aboutEl?.remove();
  aboutEl = null;
}
function closeOverlays() {
  closeMenu();
  closeLaunchpad();
  closeCC();
  closeAbout();
  closePop();
}

// ── Touch: springboard, Dock and home indicator ───────────────

let sbEl = null;
let sbWidgets = null;
let sbApps = null;
function renderSpringboardApps() {
  if (!sbApps) return;
  const apps = [...APPS.filter((a) => a.id !== "home"), ...homeApps(), ...TAIL_APPS.filter((a) => a.id !== "search"), ...EXTRA_APPS.filter((a) => ["controlcenter", "widgets", "customize"].includes(a.id))];
  sbApps.replaceChildren(...apps.map((a, i) => appTile(a, i, (picked) => launch(picked.id))));
}
function ensureSpringboard() {
  const page = $(SEL.homePage);
  const host = page?.querySelector(":scope > div.relative") || page?.lastElementChild;
  if (!isTouch() || !host) {
    if (sbEl && !sbEl.isConnected) sbEl = sbWidgets = sbApps = null;
    return;
  }
  if (sbEl && sbEl.parentNode === host) return;
  sbEl?.remove();
  sbWidgets = h("div", { class: "mdos-sb-widgets" });
  sbApps = h("div", { class: "mdos-sb-apps", role: "list" });
  sbEl = h("section", { id: "mdos-sb", "aria-label": L.home }, sbWidgets, sbApps);
  // Long-press empty space to edit widgets, like a phone home screen.
  let pressTimer = 0;
  sbEl.addEventListener("pointerdown", (event) => {
    if (editMode || event.target.closest("button, textarea, input")) return;
    pressTimer = marinara.setTimeout(() => setEditMode(true), 550);
  });
  for (const type of ["pointerup", "pointercancel", "pointerleave", "pointermove"]) {
    sbEl.addEventListener(type, () => marinara.clearTimeout(pressTimer));
  }
  host.prepend(sbEl);
  renderSpringboardApps();
  renderWidgets();
}
function removeSpringboard() {
  sbEl?.remove();
  sbEl = sbWidgets = sbApps = null;
}
const homebar = h("button", {
  type: "button",
  id: "mdos-homebar",
  "aria-label": L.homeIndicator,
  onclick: () => goHome(),
});
ui.append(homebar);
// Swipe up on the home indicator also goes home.
let swipeStart = null;
on(homebar, "pointerdown", (e) => (swipeStart = e.clientY));
on(homebar, "pointerup", (e) => {
  if (swipeStart != null && swipeStart - e.clientY > 24) goHome();
  swipeStart = null;
});

// Long how-to lines under library toolbars ("drag characters into folders…")
// collapse into an ⓘ icon; the text shows as a tooltip (desktop.css).
function compactHelpers() {
  for (const el of $$(".mari-folder-helper:not([data-mdos-tip])")) {
    const text = el.textContent.trim();
    if (!text) continue;
    el.setAttribute("data-mdos-tip", text);
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "note");
    el.setAttribute("aria-label", `${L.help}: ${text}`);
  }
}

// ── Settings, wallpaper, clock ────────────────────────────────

function updateSetting(key, value) {
  state[key] = value;
  applySettings();
  save();
}
function applyAccent() {
  const accent = ACCENTS.find((a) => a.id === state.accent) || ACCENTS[0];
  toggleClass("mdos-accent", !!accent.color);
  setVar("--mdos-accent", accent.color || "var(--primary)");
}
function applyWallpaper() {
  const image = images.wallpaper;
  const wp = WALLPAPERS.find((w) => w.id === state.wallpaper) || WALLPAPERS[0];
  setVar("--mdos-wallpaper", image ? `center / cover no-repeat url(${JSON.stringify(image)}), #111` : wp.css);
  html.dataset.mdosWallpaperTone = image ? "dark" : wp.dark === false ? "light" : "dark";
}
function applySettings() {
  applyAccent();
  applyWallpaper();
  setVar("--mdos-dock-size", `${state.dockSize}px`);
  toggleClass("mdos-dock-autohide", !!state.dockAutohide);
  toggleClass("mdos-icon-view", !!state.iconView);
  toggleClass("mdos-main-min", !!state.mainMinimized);
  toggleClass("mdos-no-blur", !!state.reduceTransparency);
  toggleClass("mdos-calm", reducedMotion());
  html.dataset.mdosIconStyle = state.iconStyle;
  html.dataset.mdosIconShape = state.iconShape;
  html.dataset.mdosRp = state.rpStyle;
  html.dataset.mdosConvo = state.convoStyle;
  if (!state.dockAutohide) dock.classList.remove("is-peek");
  dockSignature = "";
  if (mode !== "off") {
    renderDock();
    if (isDesktop()) applyAllRects();
  }
}

function tick() {
  const now = new Date();
  setText(mbClock, `${menubarDateFmt.format(now)}  ${timeFmt.format(now)}`);
  tickWidgets();
}
const clockTimer = marinara.setInterval(tick, 15_000);

// ── Activation ────────────────────────────────────────────────

const returnPill = h(
  "button",
  {
    type: "button",
    id: "mdos-return",
    title: `${L.desktop} (Ctrl Alt D)`,
    onclick: () => setEnabled(true),
  },
  h("span", { class: "mdos-return-icon", svg: LOGO }),
  h("span", { text: L.desktop }),
);
doc.body.append(returnPill);

function refreshMode() {
  const next = computeMode();
  toggleClass("mdos-classic", !state.enabled && innerWidth >= MIN_VIEWPORT);
  toggleClass("mdos-tablet", next === "touch" && innerWidth >= 700);
  if (next === mode) return;
  const prev = mode;
  mode = next;
  toggleClass("mdos", next !== "off");
  toggleClass("mdos-desktop", next === "desktop");
  toggleClass("mdos-touch", next === "touch");
  if (prev === "desktop") {
    removeChrome();
    setDesktopHome(false);
  }
  if (prev === "touch") removeSpringboard();
  closeOverlays();
  if (editMode) setEditMode(false);
  if (next === "desktop") {
    ensureChrome();
    applyAllRects();
  }
  dockSignature = "";
  if (next !== "off") {
    renderDock();
    renderWidgets();
  } else widgetLayer.replaceChildren();
}
function setEnabled(enabled) {
  state.enabled = enabled;
  save();
  refreshMode();
  syncSoon();
}
function setDesktopHome(on) {
  if (desktopHome === on) return;
  desktopHome = on;
  toggleClass("mdos-desktop-home", on);
  if (on && state.mainMinimized) setMainMinimized(false);
  if (on) focusTopVisible();
  updateMenubar();
}

// ── Sync with Marinara's own state ────────────────────────────

const prevOpen = { chats: null, panel: null };
let lastPanel = null;
let syncTimer = 0;
let lastSync = 0;
// Set by cleanup: a queued sync must not re-attach chrome after disable.
let disposed = false;
function syncSoon() {
  if (syncTimer || disposed) return;
  // At most ~10 syncs a second, even while a reply streams in.
  const wait = Math.max(0, 100 - (performance.now() - lastSync));
  syncTimer = marinara.setTimeout(() => {
    syncTimer = 0;
    raf(sync);
  }, wait);
}
function sync() {
  if (disposed) return;
  lastSync = performance.now();
  refreshMode();
  if (mode === "off") return;

  const onHome = homePageVisible();
  compactHelpers();
  toggleClass("mdos-touch-home", isTouch() && onHome && !$(SEL.sheets));
  if (homeVisible()) readHomeApps();

  if (isTouch()) {
    ensureSpringboard();
    updateDockState();
    return;
  }

  ensureChrome();
  setDesktopHome(onHome);

  // Bring a window forward when Marinara opens it.
  for (const id of ["chats", "panel"]) {
    const open = windowVisible(id);
    if (prevOpen[id] === false && open) focusWin(id);
    if (prevOpen[id] === true && !open && focused === id) focusTopVisible();
    prevOpen[id] = open;
  }
  const panel = activePanelId();
  if (panel !== lastPanel) {
    // Each panel has its own window size (Settings opens wide).
    if (lastPanel && panel) animateGeometry();
    applyRect("panel");
    if (panel && panelOpen()) focusWin("panel");
  }
  lastPanel = panel;

  const topbar = $(SEL.topbar);
  if (topbar && !desktopHome) setVar("--mdos-topbar-h", `${topbar.offsetHeight}px`);
  renderDock();
  updateDockState();
  updateMenubar();
}

// The main window comes back whenever Marinara shows something new in it.
let lastView = "";
const detailIds = new WeakMap();
let detailSeq = 0;
function mainViewKey() {
  if (homePageVisible()) return "home";
  if (homeVisible()) return `tab:${$(`${SEL.homeTabs}[aria-selected="true"]`)?.id || ""}`;
  const detail = $(SEL.detail);
  if (detail) {
    if (!detailIds.has(detail)) detailIds.set(detail, ++detailSeq);
    return `detail:${detailIds.get(detail)}`;
  }
  const active = $(`${SEL.chatRows}[class~="bg-[var(--marinara-chat-chrome-highlight-bg)]"]`);
  return `chat:${active?.getAttribute("data-chat-id") || location.pathname}`;
}
function watchMainView() {
  if (!isDesktop()) return;
  const key = mainViewKey();
  if (key === lastView) return;
  const changed = lastView !== "";
  lastView = key;
  if (changed && state.mainMinimized && key !== "home") setMainMinimized(false);
}

// Streaming replies rewrite the transcript many times a second; those
// mutations never change the shell, so they are skipped cheaply.
const CHURN = ".mari-messages-scroll, .mari-chat-area, .mari-home-feed-shell, #mac-credit-home, textarea";
const observer = new MutationObserver((records) => {
  for (const r of records) {
    if (r.type === "attributes") {
      syncSoon();
      return;
    }
    const t = r.target;
    if (t.nodeType === 1 && t.closest(CHURN)) continue;
    syncSoon();
    return;
  }
});
observer.observe(hostRoot || doc.body, {
  subtree: true,
  childList: true,
  attributes: true,
  attributeFilter: ["aria-pressed", "aria-hidden", "aria-selected", "data-shell-overlay-mode"],
});
const viewTimer = marinara.setInterval(watchMainView, 800);

// ── Global listeners ──────────────────────────────────────────

on(doc, "pointerdown", onPointerDown, true);
on(window, "pointermove", onPointerMove, { passive: true });
on(window, "pointerup", onPointerUp);
on(window, "pointercancel", onPointerUp);
on(doc, "dblclick", onDoubleClick, true);
on(doc, "contextmenu", onContextMenu);
// Tap an info icon to show its tip on touch screens (mouse users just hover).
on(doc, "click", (event) => {
  const tip = event.target instanceof Element ? event.target.closest("[data-mdos-tip]") : null;
  for (const open of $$("[data-mdos-tip-open]")) if (open !== tip) open.removeAttribute("data-mdos-tip-open");
  if (tip) tip.toggleAttribute("data-mdos-tip-open");
});
let resizeTimer = 0;
on(window, "resize", () => {
  marinara.clearTimeout(resizeTimer);
  resizeTimer = marinara.setTimeout(() => {
    refreshMode();
    if (isDesktop()) {
      applyAllRects();
      renderWidgets();
    }
  }, 120);
});
on(window, "blur", onPointerUp);
on(
  window,
  "keydown",
  (event) => {
    if (event.ctrlKey && event.altKey && !event.shiftKey && !event.metaKey) {
      if (event.code === "KeyD") {
        event.preventDefault();
        setEnabled(!state.enabled);
        return;
      }
      if (mode === "off") return;
      if (event.code === "KeyL") {
        event.preventDefault();
        toggleLaunchpad();
      } else if (event.code === "KeyH") {
        event.preventDefault();
        showDesktop();
      } else if (event.code === "KeyM" && focused && isDesktop()) {
        event.preventDefault();
        minimizeWin(focused);
      }
      return;
    }
    if (event.ctrlKey && !event.altKey && event.code === "Backquote" && isDesktop()) {
      event.preventDefault();
      cycleWindows();
      return;
    }
    if (event.key === "Escape" && mode !== "off") {
      if (launchpadEl || openMenu || ccEl || aboutEl || popEl || editMode) {
        event.stopPropagation();
        if (popEl) closePop();
        else if (editMode) setEditMode(false);
        else closeOverlays();
      }
    }
  },
  true,
);

// ── Boot ──────────────────────────────────────────────────────

function bootSplash() {
  let shown = false;
  try {
    shown = sessionStorage.getItem("mdos-booted") === "1";
    sessionStorage.setItem("mdos-booted", "1");
  } catch {
    /* private mode: just show it */
  }
  if (shown || !state.bootSplash || mode === "off") return;
  const splash = h(
    "div",
    { id: "mdos-boot", "aria-hidden": "true" },
    h("div", { class: "mdos-boot-logo", svg: LOGO }),
    h("div", { class: "mdos-boot-bar" }, h("span")),
  );
  doc.body.append(splash);
  const duration = reducedMotion() ? 200 : 1100;
  splash.style.setProperty("--boot-ms", `${duration}ms`);
  marinara.setTimeout(() => splash.classList.add("is-done"), duration);
  marinara.setTimeout(() => splash.remove(), duration + 600);
  disposers.push(() => splash.remove());
}

applySettings();
sync();
tick();
bootSplash();
marinara.log.info("Marinara Desktop ready");

// ── Cleanup (extension disabled or updated) ───────────────────

return () => {
  disposed = true;
  mode = "off";
  observer.disconnect();
  marinara.clearInterval(clockTimer);
  marinara.clearInterval(viewTimer);
  marinara.clearTimeout(saveTimer);
  marinara.clearTimeout(imageTimer);
  marinara.clearTimeout(syncTimer);
  marinara.clearTimeout(dockHideTimer);
  disposers.forEach((dispose) => dispose());
  removeChrome();
  removeSpringboard();
  for (const el of $$("[data-mdos-tip]")) {
    for (const a of ["data-mdos-tip", "data-mdos-tip-open", "tabindex", "role", "aria-label"]) el.removeAttribute(a);
  }
  ui.remove();
  wallpaper.remove();
  widgetLayer.remove();
  returnPill.remove();
  for (const cls of [...html.classList]) if (cls.startsWith("mdos")) html.classList.remove(cls);
  for (const key of Object.keys(html.dataset)) if (key.startsWith("mdos")) delete html.dataset[key];
  for (const name of [...html.style]) if (name.startsWith("--mdos-")) html.style.removeProperty(name);
};
