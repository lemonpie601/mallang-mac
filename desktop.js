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
      rpBook: "리더 (세피아·라이트)",
      rpNight: "리더 (다크)",
      rpClean: "깔끔하게",
      convoStyle: "대화 화면",
      convoMessages: "메시지 앱",
      convoMarinara: "마리나라 기본",
      customize: "꾸미기",
      iconStyle: "아이콘 스타일",
      iconShape: "아이콘 모양",
      iconStyles: { gradient: "그라데이션", glass: "유리", pastel: "파스텔", tinted: "틴트", dark: "다크" },
      iconShapes: { squircle: "둥근 사각", circle: "동그라미", rounded: "각진 사각" },
      cursor: "마우스 포인터",
      cursorSize: "포인터 크기",
      cursors: { system: "시스템 기본", mac: "검은 화살표", white: "흰 화살표", accent: "강조색 화살표", dot: "동그라미", custom: "내 이미지" },
      cursorSizes: { m: "보통", l: "크게", xl: "아주 크게" },
      cursorImage: "포인터 이미지 올리기…",
      cursorHint: "내 이미지는 배경이 투명한 PNG가 좋아요. 그림의 왼쪽 위 끝이 클릭하는 점이에요. 검은·흰 화살표는 링크와 버튼 위에서 손가락 모양으로 바뀌어요.",
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
        credits: "API 크레딧",
        locker: "확장 보관함",
        ledger: "API 가계부",
        credit: "크레딧",
      },
      creditPick: "보여 줄 크레딧",
      ledgerTopUse: "많이 쓴 곳",
      lockerEmpty: "보관함에 담긴 확장 버튼이 없어요",
      creditsEmpty: "홈을 한 번 열면 크레딧이 여기 표시돼요",
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
      notes: "메모장",
      browser: "인터넷",
      youtube: "YouTube",
      newNote: "새 메모",
      deleteNote: "메모 삭제",
      untitled: "제목 없음",
      urlPlaceholder: "주소나 검색어 입력",
      ytPlaceholder: "YouTube 링크를 붙여 넣으세요",
      ytHint: "보고 싶은 YouTube 영상이나 재생목록 링크를 위에 붙여 넣으세요. 창을 띄워 둔 채로 채팅할 수 있어요.",
      load: "열기",
      openOutside: "새 창에서 열기",
      addToHome: "홈 화면에 추가",
      cantEmbed: "이 사이트는 보안 설정 때문에 창 안에 바로 띄울 수 없어요. 리더로 보거나 새 창에서 열 수 있어요.",
      readerView: "리더로 보기",
      readerNote: "리더 보기: 주소를 외부 서비스(r.jina.ai)가 대신 열어 글과 이미지만 가져와요. 로그인·글쓰기는 새 창에서 해 주세요.",
      readerLoading: "불러오는 중… (몇 초 걸릴 수 있어요)",
      readerFail: "리더로 불러오지 못했어요",
      readerEmpty: "이 페이지는 사이트가 리더 서비스를 막고 있어 내용을 가져오지 못했어요. 새 창에서 열어 옆에 띄워 두세요.",
      back: "뒤로",
      favorites: "즐겨찾기",
      noFavorites: "아직 즐겨찾기가 없어요. 주소를 열고 ★ 를 누르면 여기와 홈 화면에 생겨요.",
      pinOnTop: "항상 위에",
      bookmarks: "북마크",
      addBookmark: "북마크 추가",
      bookmarkTitle: "이름",
      bookmarkUrl: "주소 (https://…)",
      add: "추가",
      rename: "이름 바꾸기",
      removeFromDesktop: "데스크톱에서 빼기",
      removeFromHome: "홈 화면에서 빼기",
      addToDesktop: "데스크톱에 추가",
      addApps: "앱·북마크 추가",
      homeLayout: "홈 구성",
      boardPos: "마리나라 홈 위치",
      boardPositions: { left: "왼쪽", center: "가운데", hidden: "숨기기" },
      showCredits: "API 크레딧 카드 보이기",
      showFeed: "마리나라 홈 위젯 보이기",
      arrangeIcons: "아이콘 자동 정렬",
      arrangeWidgets: "위젯 자동 정렬",
      realGlass: "진짜 유리 효과 (느릴 수 있음)",
      apps: "앱",
      settingsTitle: "꾸미기",
      openSettings: "꾸미기 설정 열기…",
      themeSync: "테마 라이브러리와 색상 동기화",
      themeSyncHint: "마리나라 설정 → 모양 → 테마 라이브러리에서 적용한 테마의 색·글꼴·배경을 따라가요. 테마를 바꾸면 바로 반영돼요.",
      themeNow: "지금 적용된 테마",
      themeNone: "기본 테마 (마리나라 강조색만 따라가요)",
      themeAccent: "테마",
      layoutMode: "위젯·아이콘 배치",
      layoutModes: { grid: "그리드", free: "자유" },
      chatDesign: "채팅 꾸미기",
      convo: "대화",
      roleplay: "롤플",
      presets: "프리셋",
      font: "글꼴",
      fonts: { "": "기본 (프리텐다드)", system: "시스템", serif: "명조", rounded: "둥근", hand: "손글씨", mono: "고정폭", theme: "테마 글꼴", custom: "직접 입력" },
      customFont: "글꼴 이름 (예: Pretendard)",
      textSize: "글자 크기",
      lineHeight: "줄 간격",
      myBubble: "내 말풍선",
      theirBubble: "상대 말풍선",
      bubbleText: "글자",
      corner: "모서리",
      chatBg: "채팅 배경",
      chatBgModes: { "": "기본", color: "색", wallpaper: "배경화면 비치게", image: "이미지" },
      avatars: "프로필 사진",
      avatarModes: { circle: "동그라미", rounded: "둥근 사각", hidden: "숨기기" },
      showNames: "이름 보이기",
      columnWidth: "글 폭",
      paper: "종이 색",
      ink: "글자 색",
      preview: "미리보기",
      resetChat: "기본 디자인으로",
      cvPresets: { base: "기본", yellow: "노랑 말풍선", green: "초록 말풍선", dark: "다크", pastel: "파스텔" },
      rpPresets: { book: "세피아", novel: "라이트", night: "다크", parchment: "양피지", typewriter: "타자기" },
      justify: "양쪽 정렬",
      actionsHover: "메시지 버튼은 가리킬 때만",
      actItalic: "행동(* *) 기울이기",
      readerLayout: "읽기 화면",
      sideMargin: "좌우 여백",
      sideMarginHint: "좁은 창과 휴대폰에서 글 양옆의 여백이에요. 0이면 화면 끝까지 써요.",
      lineWrap: "줄바꿈",
      wrapChars: "글자 단위",
      wrapWords: "단어 단위",
      lineWrapHint: "글자 단위는 줄 끝까지 채우고 아무 글자에서나 줄을 바꿔요(영어 단어는 자르지 않아요). 단어 단위는 한국어 단어를 자르지 않지만, 일본어·중국어 문장은 마침표 같은 문장부호에서만 줄이 바뀌어요.",
      pvThem: "오늘 뭐 했어?",
      pvMe: "마리나라 꾸미기 하고 있었어!",
      pvThem2: "오 진짜? 보여 줘 ✨",
      pvRpNar: "창밖으로 비가 내리기 시작했다. ",
      pvRpAct: "그는 찻잔을 내려놓고 조용히 웃었다.",
      pvRpDlg: "“오늘은 여기서 쉬어 가요.”",
      textTone: "대사·서술·행동 색 구분",
      textToneHint: "대사(\" \")는 진하게, 서술은 조금 연하게, 행동(* *)은 더 연하게 보여요.",
      dlgColor: "대사",
      narColor: "서술",
      actColor: "행동 (* *)",
      ytMode: "YouTube 사용 방식",
      ytModes: { link: "링크만", api: "API 키로 검색", account: "내 계정으로" },
      ytApiKey: "YouTube Data API 키",
      ytApiHint: "Google Cloud 콘솔에서 만든 YouTube Data API v3 키를 넣으면 앱 안에서 검색할 수 있어요. 키는 이 확장의 저장 공간에만 저장돼요.",
      ytAccountHint: "로그인한 YouTube 계정으로 재생해요(광고 없음·기록 등). 브라우저가 다른 사이트 쿠키를 막으면 창 안 플레이어에는 로그인이 안 보일 수 있어요.",
      ytLogin: "YouTube 로그인",
      ytOpenSite: "YouTube 열기",
      ytSearchPlaceholder: "검색어나 링크 입력",
      ytNoKey: "검색하려면 설정에서 API 키를 넣어 주세요. 링크는 바로 재생돼요.",
      ytSearching: "검색 중…",
      ytError: "검색하지 못했어요",
      ytResults: "검색 결과",
      ytSettings: "YouTube 설정",
      quick: "빠른 설정",
      allSettings: "모든 꾸미기 설정",
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
      rpBook: "Reader (sepia / light)",
      rpNight: "Reader (dark)",
      rpClean: "Clean",
      convoStyle: "Conversation view",
      convoMessages: "Messages app",
      convoMarinara: "Marinara default",
      customize: "Customize",
      iconStyle: "Icon style",
      iconShape: "Icon shape",
      iconStyles: { gradient: "Gradient", glass: "Glass", pastel: "Pastel", tinted: "Tinted", dark: "Dark" },
      iconShapes: { squircle: "Squircle", circle: "Circle", rounded: "Rounded" },
      cursor: "Mouse pointer",
      cursorSize: "Pointer size",
      cursors: { system: "System", mac: "Black arrow", white: "White arrow", accent: "Accent arrow", dot: "Dot", custom: "My image" },
      cursorSizes: { m: "Regular", l: "Large", xl: "Extra large" },
      cursorImage: "Upload pointer image…",
      cursorHint: "A PNG with a transparent background works best. The image's top-left corner is the click point. The black and white arrows turn into a hand over links and buttons.",
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
        credits: "API credits",
        locker: "Extension locker",
        ledger: "API budget",
        credit: "Credit",
      },
      creditPick: "Credit to show",
      ledgerTopUse: "Top uses",
      lockerEmpty: "No extension buttons in the locker yet",
      creditsEmpty: "Open Home once to load your credits here",
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
      notes: "Notes",
      browser: "Web",
      youtube: "YouTube",
      newNote: "New note",
      deleteNote: "Delete note",
      untitled: "Untitled",
      urlPlaceholder: "Address or search",
      ytPlaceholder: "Paste a YouTube link",
      ytHint: "Paste a YouTube video or playlist link above. Keep the window open while you chat.",
      load: "Open",
      openOutside: "Open in new window",
      addToHome: "Add to home screen",
      cantEmbed: "This site's security settings stop it from opening inside a window. Read it in reader view, or open it in a new window.",
      readerView: "Reader view",
      readerNote: "Reader view: an outside service (r.jina.ai) opens the address and returns its text and images. Sign in or post in a new window.",
      readerLoading: "Loading… (this can take a few seconds)",
      readerFail: "Couldn't load this page in reader view",
      readerEmpty: "This site blocks the reader service for this page, so nothing came back. Open it in a new window to keep it alongside.",
      back: "Back",
      favorites: "Favorites",
      noFavorites: "No favorites yet. Open an address and press ★ to add it here and to your home screen.",
      pinOnTop: "Keep on top",
      bookmarks: "Bookmarks",
      addBookmark: "Add bookmark",
      bookmarkTitle: "Name",
      bookmarkUrl: "Address (https://…)",
      add: "Add",
      rename: "Rename",
      removeFromDesktop: "Remove from desktop",
      removeFromHome: "Remove from home screen",
      addToDesktop: "Add to desktop",
      addApps: "Add apps & bookmarks",
      homeLayout: "Home layout",
      boardPos: "Marinara Home position",
      boardPositions: { left: "Left", center: "Centre", hidden: "Hidden" },
      showCredits: "Show API credit cards",
      showFeed: "Show Marinara Home widgets",
      arrangeIcons: "Arrange icons",
      arrangeWidgets: "Arrange widgets",
      realGlass: "Real glass blur (can be slow)",
      apps: "Apps",
      settingsTitle: "Customize",
      openSettings: "Open Customize…",
      themeSync: "Sync colours with the theme library",
      themeSyncHint: "Follows the colours, font and background of the theme applied in Marinara's Settings → Appearance → Theme library, and updates when you switch themes.",
      themeNow: "Applied theme",
      themeNone: "Default theme (follows Marinara's accent only)",
      themeAccent: "Theme",
      layoutMode: "Widget & icon placement",
      layoutModes: { grid: "Grid", free: "Free" },
      chatDesign: "Chat design",
      convo: "Conversation",
      roleplay: "Roleplay",
      presets: "Presets",
      font: "Font",
      fonts: { "": "Default (Pretendard)", system: "System", serif: "Serif", rounded: "Rounded", hand: "Handwriting", mono: "Monospace", theme: "Theme font", custom: "Custom" },
      customFont: "Font name (e.g. Inter)",
      textSize: "Text size",
      lineHeight: "Line height",
      myBubble: "My bubble",
      theirBubble: "Their bubble",
      bubbleText: "Text",
      corner: "Corners",
      chatBg: "Chat background",
      chatBgModes: { "": "Default", color: "Colour", wallpaper: "Show wallpaper", image: "Image" },
      avatars: "Avatars",
      avatarModes: { circle: "Circle", rounded: "Rounded", hidden: "Hidden" },
      showNames: "Show names",
      columnWidth: "Column width",
      paper: "Paper",
      ink: "Ink",
      preview: "Preview",
      resetChat: "Reset to default",
      cvPresets: { base: "Default", yellow: "Yellow bubbles", green: "Green bubbles", dark: "Dark", pastel: "Pastel" },
      rpPresets: { book: "Sepia", novel: "Light", night: "Dark", parchment: "Parchment", typewriter: "Typewriter" },
      justify: "Justify text",
      actionsHover: "Message buttons on hover only",
      actItalic: "Italic actions (* *)",
      readerLayout: "Reading view",
      sideMargin: "Side margins",
      sideMarginHint: "Space on each side of the text in narrow windows and on phones; 0 uses the full width.",
      lineWrap: "Line breaks",
      wrapChars: "Any character",
      wrapWords: "Between words",
      lineWrapHint: "Any character fills each line and breaks wherever needed (English words stay whole). Between words keeps Korean words whole, but Japanese and Chinese then break only at punctuation such as full stops.",
      pvThem: "What did you do today?",
      pvMe: "Decorating my Marinara!",
      pvThem2: "Ooh, show me ✨",
      pvRpNar: "Rain began to fall outside the window. ",
      pvRpAct: "He set down his teacup and smiled quietly.",
      pvRpDlg: "“Rest here for tonight.”",
      textTone: "Tone dialogue, narration and actions",
      textToneHint: "Dialogue (\" \") reads darkest, narration a little lighter, actions (* *) lighter still.",
      dlgColor: "Dialogue",
      narColor: "Narration",
      actColor: "Actions (* *)",
      ytMode: "How YouTube works",
      ytModes: { link: "Links only", api: "Search with API key", account: "My account" },
      ytApiKey: "YouTube Data API key",
      ytApiHint: "Add a YouTube Data API v3 key from the Google Cloud console to search inside the app. The key is stored only in this extension's storage.",
      ytAccountHint: "Plays with your signed-in YouTube account (no ads, history…). If the browser blocks third-party cookies, the in-window player may not show you as signed in.",
      ytLogin: "Sign in to YouTube",
      ytOpenSite: "Open YouTube",
      ytSearchPlaceholder: "Search or paste a link",
      ytNoKey: "Add an API key in settings to search. Links play right away.",
      ytSearching: "Searching…",
      ytError: "Search failed",
      ytResults: "Results",
      ytSettings: "YouTube settings",
      quick: "Quick settings",
      allSettings: "All customize settings",
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
    // Built at runtime from the applied theme's colours (themeWallpaperCss).
    css: "linear-gradient(135deg, var(--mdos-accent, #ec4b97), var(--mdos-win-bg, #faf8ff))",
    dark: null,
  },
];

// "marinara" keeps the app's own accent; the rest replace it everywhere.
const ACCENTS = [
  { id: "theme", color: null, theme: true, name: L.themeAccent },
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
  notes: '<rect x="4.5" y="3" width="15" height="18" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.4 5.2-5.2 2.4 2.4-5.2z"/>',
  play: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.2 5 2.8-5 2.8z" fill="currentColor"/>',
  star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  pin: '<path d="M9 3h6l-1 6 3 3H7l3-3z"/><path d="M12 12v9"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  reader: '<path d="M6 3.5h8.5L19 8v12.5H6z"/><path d="M9.5 11h6M9.5 14.5h6M9.5 18h4"/>',
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
// Small apps that run in our own windows.
const UTIL_APPS = [
  { id: "notes", icon: "notes", g: ["#ffe27a", "#f5b400"], label: () => L.notes, util: true },
  { id: "browser", icon: "compass", g: ["#6fd3ff", "#1f7cf2"], label: () => L.browser, util: true },
  { id: "youtube", icon: "play", g: ["#ff6b6b", "#d91c1c"], label: () => L.youtube, util: true },
];
const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};
const hueOf = (text) => [...text].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);
// Bookmarks are apps too: an icon on the home screen that opens the address.
const bookmarkApps = () =>
  (state.bookmarks || []).map((b) => {
    const host = hostOf(b.url);
    const hue = hueOf(host);
    let favicon = null;
    try {
      const u = new URL(b.url);
      if (u.protocol === "https:") favicon = `${u.origin}/favicon.ico`;
    } catch {
      /* not a URL: letter tile only */
    }
    return {
      id: `bm:${b.id}`,
      bm: b,
      favicon,
      letter: (b.title || host || "?").trim().charAt(0).toUpperCase(),
      g: [`hsl(${hue} 70% 62%)`, `hsl(${(hue + 40) % 360} 65% 46%)`],
      label: () => b.title || host,
    };
  });
const allApps = () => [...APPS, ...UTIL_APPS, ...homeApps(), ...bookmarkApps(), ...TAIL_APPS, ...EXTRA_APPS];
const appById = (id) => allApps().find((a) => a.id === id);

// ── State ─────────────────────────────────────────────────────

const DEFAULTS = {
  enabled: true,
  wallpaper: "dusk",
  accent: "theme",
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
  cursor: "system",
  cursorSize: "m",
  icons: {},
  widgets: null,
  reduceTransparency: false,
  reduceMotion: false,
  rpStyle: "book",
  convoStyle: "messages",
  rpTone: true,
  homeApps: [],
  apps: [], // open small-app windows
  bookmarks: [],
  desk: null, // desktop icons [{ id, app, x, y }]
  sbOrder: [], // touch home screen: app order
  sbHidden: [], // touch home screen: apps taken off the grid
  board: "left", // Marinara's Home blocks: left | center | hidden
  showCredits: true,
  showFeed: true,
  realGlass: false,
  themeSync: true, // follow the theme applied in Marinara's theme library
  layoutMode: "grid", // widgets & desktop icons: grid | free
  chat: { convo: {}, rp: {} }, // chat design overrides (empty = default)
  yt: { mode: "link", apiKey: "" },
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
  chatBg: "",
  cursor: "",
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
    for (const w of state.widgets) w.x = w.y = null, (w.manual = false);
  }
  state.launcherSeeded = true;
}

// 2.3: the document window now leaves the widget column free by default;
// forget an older saved size once so the new default applies.
if (!state.mainFitWidgets) {
  if (state.windows && !state.windows.main?.snap) delete state.windows.main;
  state.mainFitWidgets = true;
}
for (const key of ["apps", "bookmarks", "sbOrder", "sbHidden", "readerHosts"]) if (!Array.isArray(state[key])) state[key] = [];
state.chat = { convo: { ...(state.chat?.convo || {}) }, rp: { ...(state.chat?.rp || {}) } };
state.yt = { mode: "link", apiKey: "", ...(state.yt || {}) };
if (!Array.isArray(state.desk)) {
  state.desk = UTIL_APPS.map((a) => ({ id: newId(), app: a.id, x: null, y: null }));
}
// Notes live under their own storage key and save on their own schedule.
const notesStore = {
  notes: Array.isArray(stored.desktopNotes?.notes) ? stored.desktopNotes.notes : [],
};
let notesTimer = 0;
function saveNotes() {
  marinara.clearTimeout(notesTimer);
  notesTimer = marinara.setTimeout(() => {
    notesTimer = 0;
    marinara.storage
      .patch({ desktopNotes: notesStore })
      .catch((error) => marinara.log.warn("Could not save notes", error));
  }, 500);
}

let saveTimer = 0;
function save() {
  marinara.clearTimeout(saveTimer);
  saveTimer = marinara.setTimeout(() => {
    saveTimer = 0;
    marinara.storage.patch({ desktop: state }).catch((error) => marinara.log.warn("Could not save desktop state", error));
  }, 400);
}
let imageTimer = 0;
function saveImages() {
  marinara.clearTimeout(imageTimer);
  imageTimer = marinara.setTimeout(() => {
    imageTimer = 0;
    marinara.storage
      .patch({ desktopImages: images })
      .catch((error) => marinara.log.warn("Could not save desktop images", error));
  }, 300);
}
const imagesSize = () =>
  JSON.stringify(images).length + JSON.stringify(state).length + JSON.stringify(notesStore).length;

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
// Launcher drawers such as "확장 보관함" skip roots marked data-exd. Our layers
// aren't floating launchers, and without the mark every clock tick, Dock or
// window change woke a full-page scan there (~125 ms each, twice a second).
for (const el of [ui, wallpaper, widgetLayer]) el.setAttribute("data-exd", "");

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
  } else if (app.letter) {
    // Bookmark: a letter tile, covered by the site's favicon when it loads.
    el.classList.add("has-letter");
    el.append(h("span", { class: "mdos-icon-letter", text: app.letter }));
    if (app.favicon) {
      const img = h("img", { class: "mdos-icon-favicon", src: app.favicon, alt: "", draggable: "false", loading: "lazy", referrerpolicy: "no-referrer" });
      img.addEventListener("error", () => img.remove());
      img.addEventListener("load", () => {
        if (img.naturalWidth < 12) img.remove();
      });
      el.append(img);
    }
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
// Small-app windows ("app:<id>") share the same manager as Marinara's windows.
const isAppWin = (id) => typeof id === "string" && id.startsWith("app:");
const appRec = (id) => state.apps.find((a) => `app:${a.id}` === id);
const appWins = new Map(); // "app:<id>" → { el, rec, … }
const winIds = () => [...WIN_IDS, ...appWins.keys()];
const APP_SIZES = { notes: [660, 460], browser: [1000, 660], youtube: [640, 404], customize: [880, 620] };
function defaultAppRect(rec) {
  const a = area();
  const [w0, h0] = APP_SIZES[rec?.type] || [640, 460];
  const w = Math.min(w0, a.right - a.left - 40);
  const hh = Math.min(h0, a.bottom - a.top - 40);
  const n = (state.apps.indexOf(rec) + 6) % 6;
  return { x: Math.round((innerWidth - w) / 2) - 70 + n * 28, y: a.top + 40 + n * 28, w, h: hh };
}

function area() {
  const reserve = state.dockAutohide ? 10 : state.dockSize + 26;
  return { left: 8, top: MENUBAR_H + 8, right: innerWidth - 8, bottom: innerHeight - reserve };
}
function defaultRect(id) {
  if (isAppWin(id)) return defaultAppRect(appRec(id));
  const a = area();
  const height = a.bottom - a.top;
  const chatsW = Math.round(Math.min(320, Math.max(260, innerWidth * 0.2)));
  if (id === "chats") return { x: a.left + 4, y: a.top, w: chatsW, h: height };
  if (id === "main") {
    const x = a.left + 4 + chatsW + 10;
    // Leave the right-hand widget column showing beside the chat when the
    // screen is wide enough, so the desktop doesn't vanish behind a window.
    let right = a.right - 4;
    const col = state.widgets.filter((w) => Number.isFinite(w.x) && w.x > innerWidth / 2).map((w) => w.x);
    if (isDesktop() && col.length && Math.min(...col) - 16 - x >= 600) right = Math.min(...col) - 16;
    return { x, y: a.top, w: Math.max(MIN_W, right - x), h: height };
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
const savedRect = (id) => (isAppWin(id) ? appRec(id) : state.windows[winKey(id)]);
function writeRect(id, r) {
  if (isAppWin(id)) {
    const rec = appRec(id);
    if (rec) Object.assign(rec, { x: r.x, y: r.y, w: r.w, h: r.h, snap: r.snap ?? null });
  } else state.windows[winKey(id)] = r;
}
// Moves use the compositor-only `translate`; left/top are committed on release.
function setTranslate(id, dx, dy) {
  if (isAppWin(id)) {
    const w = appWins.get(id);
    if (w) w.el.style.translate = dx || dy ? `${dx}px ${dy}px` : "";
    return;
  }
  setVar(`--mdos-${id}-tx`, `${dx}px`);
  setVar(`--mdos-${id}-ty`, `${dy}px`);
}
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
  if (isAppWin(id)) {
    const w = appWins.get(id);
    if (w) Object.assign(w.el.style, { left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px` });
    return;
  }
  setVar(`--mdos-${id}-x`, `${r.x}px`);
  setVar(`--mdos-${id}-y`, `${r.y}px`);
  setVar(`--mdos-${id}-w`, `${r.w}px`);
  setVar(`--mdos-${id}-h`, `${r.h}px`);
}
const applyAllRects = () => winIds().forEach(applyRect);
function applyZ() {
  zOrder.forEach((id, i) => {
    if (!isAppWin(id)) return setVar(`--mdos-${id}-z`, String(10 + i));
    const w = appWins.get(id);
    // A pinned window ("keep on top") stays above every other window.
    if (w) w.el.style.zIndex = String(w.rec.pinned ? 7900 : 10 + i);
  });
  for (const id of WIN_IDS) setAttr($(WIN_SEL[id]), "data-mdos-focused", focused === id ? "true" : null);
  for (const [id, w] of appWins) setAttr(w.el, "data-mdos-focused", focused === id ? "true" : null);
}
function windowVisible(id) {
  if (isAppWin(id)) {
    const rec = appRec(id);
    return !!rec && !rec.min;
  }
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
  const visible = winIds().filter(windowVisible);
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
  if (saved?.snap) writeRect(id, { ...saved, snap: null });
  else if (isAppWin(id)) {
    // App records hold the restore size; the snap flag says "show maximised".
    const r = rectOf(id);
    writeRect(id, { ...r, snap: "max" });
  } else writeRect(id, { ...rectOf(id), snap: "max" });
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
// App agents (Otome Hearth, Story Writer…) open as Home tabs. Leaving one
// selects Home's own tab; Marinara's Home button does nothing there.
const hubAppTab = () => {
  if (!homeVisible()) return null;
  const tab = $(`${SEL.homeTabs}[aria-selected="true"]`);
  return tab && tab.id !== "marinara-home-tab-home" ? tab : null;
};
const leaveHubApp = () => !!hubAppTab() && click($("#marinara-home-tab-home"));
// App agents paint their own backdrop (Otome Hearth is always dark, for
// example). The window's title strip takes that colour, with light or dark
// controls to match, instead of a light strip over a dark app.
function tintHubApp(on) {
  let bg = "";
  if (on) {
    let el = $('[data-component="HomeBrowserHub.Content"]')?.firstElementChild;
    for (let depth = 0; el && depth < 4; el = el.firstElementChild, depth++) {
      const c = getComputedStyle(el).backgroundColor;
      if (c && c !== "transparent" && !/^rgba\(.*,\s*0\)$/.test(c)) {
        bg = c;
        break;
      }
    }
  }
  if (bg) setVar("--mdos-hubapp-bg", bg);
  else html.style.removeProperty("--mdos-hubapp-bg");
  html.dataset.mdosHubTone = bg ? (luminance(bg) < 0.35 ? "dark" : "light") : "";
}
function goHome() {
  closeOverlays();
  if (state.mainMinimized) setMainMinimized(false);
  // On touch screens Home stays mounted under open sheets; Marinara's Home
  // button also closes those sheets there. Open small apps go to the background.
  if (isTouch()) for (const rec of state.apps) if (!rec.min) setAppMinimized(`app:${rec.id}`, true);
  // An app agent is a Home tab, so Home looks "visible" to nothing here:
  // always try to leave it first, then close any sheet with the Home button.
  const sheet = isTouch() && !!$(SEL.sheets);
  const leftApp = leaveHubApp();
  if ((!leftApp && !homePageVisible()) || sheet) click($(SEL.homeBtn));
}
function closeWin(id) {
  if (isAppWin(id)) return closeApp(id);
  if (id === "chats") {
    if (chatsOpen()) click($(SEL.chatsBtn));
  } else if (id === "panel") {
    const active = activePanelId();
    if (active) click(panelBtn(active));
  } else {
    // Closing the document window shows the desktop (Home).
    leaveHubApp() || click($(SEL.homeBtn));
  }
  marinara.setTimeout(focusTopVisible, 60);
}
function minimizeWin(id) {
  if (isAppWin(id)) setAppMinimized(id, true);
  else if (id === "main") setMainMinimized(true);
  else closeWin(id);
}
function showDesktop() {
  if (chatsOpen()) click($(SEL.chatsBtn));
  const active = activePanelId();
  if (active) click(panelBtn(active));
  goHome();
}

function windowTitle(id) {
  if (isAppWin(id)) {
    const rec = appRec(id);
    return rec ? appLabel(appById(rec.type)) : "";
  }
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
  (!target.closest(INTERACTIVE) &&
    !!target.closest(isAppWin(id) ? ".mdos-appwin-bar" : id === "main" ? SEL.topbar : SEL.sideHeaders));

function onPointerDown(event) {
  if (mode === "off") return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (openMenu && !target.closest(".mdos-menu, #mdos-menubar")) closeMenu();
  if (ccEl && !target.closest("#mdos-cc, [data-mdos-cc-toggle]")) closeCC();
  if (popEl && !target.closest(".mdos-pop")) closePop();
  if (event.button !== 0) return;

  // Desktop icons drag any time (a click without movement opens them);
  // widgets drag in edit mode. Desktop only.
  const icon = target.closest(".mdos-dicon");
  if (icon && isDesktop() && !target.closest(".mdos-wg-badge")) {
    const rec = state.desk.find((d) => d.id === icon.dataset.did);
    if (rec) return startItemDrag(event, icon, rec, "icon");
  }
  const widget = target.closest(".mdos-wg");
  if (widget && editMode && isDesktop() && !target.closest(".mdos-wg-badge, textarea, input")) {
    const w = state.widgets.find((x) => x.id === widget.dataset.wid);
    if (w) return startItemDrag(event, widget, w, "widget");
  }
  if (!isDesktop()) return;

  const host = target.closest("[data-mdos-win]");
  const id = host?.getAttribute("data-mdos-win");
  if (!id || !(WIN_IDS.includes(id) || isAppWin(id))) return;
  if (!(id === "main" && desktopHome)) focusWin(id);
  if (id === "main" && desktopHome) return;

  const grip = target.closest("[data-mdos-grip]");
  if (grip) return startGesture(event, id, grip.getAttribute("data-mdos-grip"));
  if (target.closest(".mdos-light")) return;
  if (isDragSurface(target, id)) startGesture(event, id, "move");
}

function startGesture(event, id, gmode) {
  event.preventDefault();
  // The title strip sits on Marinara's TopBar, whose "pull down to search /
  // ask Mari" drag starts from the same press. We listen on the document in
  // the capture phase, so stopping here keeps that press from React entirely.
  event.stopPropagation();
  const saved = savedRect(id);
  let start = rectOf(id);
  if (gmode === "move" && saved?.snap) {
    // Pull a snapped window off the edge at its remembered size, under the pointer.
    const restore = clampRect(validRect(saved) ? saved : defaultRect(id));
    const ratio = (event.clientX - start.x) / start.w;
    start = { ...restore, x: event.clientX - restore.w * ratio, y: start.y };
    writeRect(id, { ...start, snap: null });
    applyRect(id);
  }
  gesture = { kind: "window", id, mode: gmode, sx: event.clientX, sy: event.clientY, start, rect: start, moved: false, snap: null };
  html.classList.add("mdos-gesture");
  html.dataset.mdosGesture = gmode === "move" ? "move" : `${gmode}-resize`;
}

// Widgets and desktop icons both live in the widget layer and drag the same way.
function startItemDrag(event, el, rec, kind) {
  event.preventDefault();
  const r = el.getBoundingClientRect();
  const layer = widgetLayer.getBoundingClientRect();
  gesture = {
    kind,
    el,
    w: rec,
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
  if (g.kind === "widget" || g.kind === "icon") {
    g.el.style.translate = `${g.dx}px ${g.dy}px`;
    return;
  }
  const s = g.start;
  if (g.mode === "move") {
    setTranslate(g.id, g.dx, Math.max(g.dy, MENUBAR_H + 2 - s.y));
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
  writeRect(g.id, { ...g.rect, snap: null });
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
  if (g.kind === "widget" || g.kind === "icon") {
    g.el.classList.remove("is-dragging");
    g.el.style.translate = "";
    if (g.moved) {
      const snap = (v) => Math.round(v / 8) * 8;
      g.w.x = snap(g.start.x + g.dx);
      g.w.y = snap(g.start.y + g.dy);
      if (g.kind === "widget") {
        clampWidget(g.w);
        g.w.manual = true;
      } else clampIcon(g.w);
      if (state.layoutMode === "grid") {
        const list = g.kind === "widget" ? state.widgets : state.desk;
        snapToGrid(g.w, g.kind, list.filter((o) => o !== g.w));
        if (!reducedMotion()) {
          g.el.classList.add("is-settling");
          marinara.setTimeout(() => g.el.classList.remove("is-settling"), 260);
        }
      }
      // Free placement too: a widget dropped onto another slides to a free spot.
      if (g.kind === "widget" && state.layoutMode !== "grid") {
        const others = state.widgets.filter((o) => o !== g.w);
        if (others.some((o) => Number.isFinite(o.x) && rectsOverlap(wgRect(g.w), wgRect(o)))) snapToGrid(g.w, "widget", others);
      }
      placeWidget(g.el, g.w);
      save();
    } else if (g.kind === "icon" && !editMode) {
      launch(g.w.app);
    }
    return;
  }
  if (g.mode === "move") {
    if (g.moved && g.snap) {
      writeRect(g.id, { ...g.start, snap: g.snap });
      animateGeometry();
    } else if (g.moved) {
      writeRect(g.id, clampRect({ ...g.start, x: g.start.x + g.dx, y: g.start.y + g.dy }));
    }
    applyRect(g.id);
    setTranslate(g.id, 0, 0);
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
    { label: `${L.addApps}…`, action: () => openAddApps() },
    { label: `${L.addBookmark}…`, action: () => openBookmarkForm() },
    { label: `${L.homeLayout}…`, action: () => openHomeLayout() },
    "-",
    { label: L.notes, action: () => openApp("notes") },
    { label: L.browser, action: () => openApp("browser") },
    { label: L.youtube, action: () => openApp("youtube") },
    "-",
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
  const deskIcon = target.closest(".mdos-dicon");
  if (deskIcon) {
    event.preventDefault();
    const entry = state.desk.find((d) => d.id === deskIcon.dataset.did);
    const app = entry && appById(entry.app);
    if (app) showMenuAt([{ label: L.open, action: () => launch(app.id) }, ...appMenuExtras(app, entry)], event.clientX, event.clientY);
    return;
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
  kids.push(h("div", { class: "mdos-dock-sep", "aria-hidden": "true" }), ...UTIL_APPS.map(dockItem));
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
  if (APP_TYPES[id]) return state.apps.some((a) => a.type === id);
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
    if (APP_TYPES[id] && running) {
      items.push({ label: L.close, action: () => state.apps.filter((a) => a.type === id).forEach((a) => closeApp(`app:${a.id}`)) });
    }
    items.push(...appMenuExtras(app));
  }
  return items;
}
// Shared by the Dock, desktop icons and Launchpad.
function appMenuExtras(app, deskEntry) {
  const items = ["-"];
  if (app.bm) {
    items.push(
      { label: L.openOutside, action: () => openExternal(app.bm.url) },
      { label: L.rename, action: () => renameBookmark(app.bm) },
      { label: L.remove, action: () => removeBookmark(app.bm.id) },
    );
  }
  if (deskEntry) items.push({ label: L.removeFromDesktop, action: () => removeDeskIcon(deskEntry.id) });
  else if (isDesktop() && !state.desk.some((d) => d.app === app.id)) {
    items.push({ label: L.addToDesktop, action: () => addDeskIcon(app.id) });
  }
  items.push({ label: L.editIcon, action: () => openIconEditor(app) });
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
  } else if (APP_TYPES[id]) {
    openApp(id);
  } else if (id.startsWith("bm:")) {
    const bm = state.bookmarks.find((b) => `bm:${b.id}` === id);
    if (bm) openUrl(bm.url);
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
        showMenuAt(appMenuExtras(a).slice(1), event.clientX, event.clientY);
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
const WIDGET_TYPES = ["launcher", "clock", "analog", "calendar", "greeting", "dday", "note", "photo", "credits", "ledger", "credit", "locker"];
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
    case "locker": {
      // The "확장 보관함" extension gathers other extensions' floating buttons
      // (marked data-bgh-stored); the widget lists them and clicks the real one.
      // Every button is listed; the row (medium) or grid (small, large)
      // scrolls by dragging, swiping or the mouse wheel.
      const items = lockerItems();
      return [
        h("div", { class: "mdos-wg-label", text: L.widgetNames.locker }),
        items.length
          ? dragScroll(h(
              "div",
              { class: "mdos-locker" },
              ...items.map((it) =>
                h(
                  "button",
                  {
                    type: "button",
                    class: "mdos-locker-item",
                    title: it.label,
                    "aria-label": it.label,
                    onclick: (event) => {
                      event.stopPropagation();
                      if (!editMode) it.el.click();
                    },
                  },
                  h("span", { class: "mdos-locker-ico" }, it.icon),
                  h("span", { class: "mdos-locker-name", text: it.label }),
                ),
              ),
            ))
          : h("div", { class: "mdos-wg-empty", text: L.lockerEmpty }),
      ];
    }
    case "credits": {
      // All credit cards as a list, synced from the credit extension.
      const c = state.credits;
      const head = h("div", { class: "mdos-wg-label mdos-cr-head" }, h("span", { text: L.widgetNames.credits }), c?.total ? h("b", { text: c.total }) : null);
      if (!c?.rows?.length) return [head, h("div", { class: "mdos-wg-empty", text: L.creditsEmpty })];
      const max = w.size === "l" ? 8 : w.size === "m" ? 3 : 4;
      return [
        head,
        h(
          "div",
          { class: "mdos-cr-list" },
          ...c.rows.slice(0, max).map((r) =>
            h(
              "div",
              { class: "mdos-cr-row" },
              h("span", { class: "mdos-cr-brand", text: r.brand }),
              h("span", { class: "mdos-cr-amt", text: r.amount || "—" }),
              r.pct != null ? h("i", { class: "mdos-cr-bar", style: `--p:${r.pct}%` }) : null,
            ),
          ),
        ),
      ];
    }
    case "credit": {
      // One credit card, chosen in the widget's settings (by the credit
      // extension's own card id, so it survives reordering there).
      const rows = state.credits?.rows || [];
      const r = rows.find((x) => x.id && x.id === w.card) || rows[0];
      if (!r) return [h("div", { class: "mdos-wg-label", text: L.widgetNames.credit }), h("div", { class: "mdos-wg-empty", text: L.creditsEmpty })];
      return [
        h("div", { class: "mdos-wg-label mdos-crd-brand", text: r.brand }),
        r.sub ? h("div", { class: "mdos-wg-sub mdos-crd-sub", text: r.sub }) : null,
        w.size !== "s" && r.lines?.length
          ? h("div", { class: "mdos-crd-lines" }, ...r.lines.slice(0, 2).map((line) => h("div", { text: line })))
          : null,
        h("div", { class: "mdos-crd-amount" }, h("b", { text: r.amount || "—" }), r.of ? h("span", { text: r.of }) : null),
        r.pct != null ? h("i", { class: "mdos-crd-bar", style: `--p:${r.pct}%` }) : null,
      ];
    }
    case "ledger": {
      // The credit extension's "API 가계부", synced: month total, change,
      // today / month-end, the daily heat map and where the money went.
      const d = state.ledger;
      const head = h("div", { class: "mdos-wg-label mdos-lg-head" }, h("span", { text: L.widgetNames.ledger }), d?.month ? h("em", { text: d.month }) : null);
      if (!d?.total) return [head, h("div", { class: "mdos-wg-empty", text: L.creditsEmpty })];
      const total = h("div", { class: "mdos-lg-total" }, h("b", { text: d.total }), d.usd ? h("span", { text: d.usd }) : null);
      const chip = d.chip
        ? h("div", { class: "mdos-lg-cmp" }, h("span", { class: `mdos-lg-chip${d.up ? " is-up" : d.down ? " is-down" : ""}`, text: d.chip }), w.size === "s" ? null : h("small", { text: d.cmpNote || "" }))
        : null;
      if (w.size === "s") return [head, total, chip];
      const facts = h("div", { class: "mdos-lg-facts" }, ...(d.facts || []).slice(0, w.size === "l" ? 4 : 2).map(([k, v]) => h("span", {}, k, h("b", { text: v }))));
      if (w.size === "m") return [head, total, chip, facts];
      const cal = h("div", { class: "mdos-lg-cal", style: `--off:${d.cal?.offset || 0}` });
      (d.cal?.days || []).forEach((day, i) =>
        cal.append(h("i", { class: `lv${day.lv}${day.today ? " is-today" : ""}`, style: i === 0 ? `grid-column-start:${(d.cal.offset || 0) + 1}` : "", title: day.t || "" })),
      );
      const uses = h(
        "div",
        { class: "mdos-lg-uses" },
        h("div", { class: "mdos-lg-uses-title", text: L.ledgerTopUse }),
        ...(d.uses || []).slice(0, 4).map((u) => h("div", { class: "mdos-lg-use" }, h("i", { style: `background:${u.color}` }), h("span", { text: u.name }), h("b", { text: u.pct }))),
      );
      return [head, total, chip, h("div", { class: "mdos-lg-grid" }, cal, uses), facts];
    }
    default:
      return [];
  }
}
// Scrolls a widget's list by dragging with the mouse (touch scrolls natively)
// and turns a vertical wheel into sideways scrolling for a sideways row. A
// drag doesn't count as a click on the item under the pointer. Edges fade
// while there is more to see in that direction.
function dragScroll(el) {
  let start = null;
  let moved = false;
  const fade = () => {
    const sideways = el.scrollWidth > el.clientWidth + 1;
    const max = sideways ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
    const pos = sideways ? el.scrollLeft : el.scrollTop;
    el.dataset.more = max <= 1 ? "" : `${pos > 1 ? "start " : ""}${pos < max - 1 ? "end" : ""}`.trim();
  };
  el.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || editMode) return;
    start = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop, id: event.pointerId };
    moved = false;
  });
  el.addEventListener("pointermove", (event) => {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!moved && Math.hypot(dx, dy) < 5) return;
    if (!moved) {
      moved = true;
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    }
    el.scrollLeft = start.left - dx;
    el.scrollTop = start.top - dy;
  });
  const end = () => {
    start = null;
    el.classList.remove("is-dragging");
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener(
    "click",
    (event) => {
      if (!moved) return;
      moved = false;
      event.stopPropagation();
      event.preventDefault();
    },
    true,
  );
  el.addEventListener(
    "wheel",
    (event) => {
      if (el.scrollWidth <= el.clientWidth + 1 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      el.scrollLeft += event.deltaY;
      event.preventDefault();
    },
    { passive: false },
  );
  el.addEventListener("scroll", fade, { passive: true });
  raf(fade);
  return el;
}
function lockerItems() {
  return $$("[data-bgh-stored]")
    .map((el) => {
      const label = (el.getAttribute("aria-label") || el.title || el.textContent || "")
        .trim()
        .replace(/\s*(열기|Open)$/i, "")
        .slice(0, 30);
      // Clone the button's own artwork (already on the page); else a letter.
      const art = el.querySelector("svg, img");
      return { el, label, icon: art ? art.cloneNode(true) : label.charAt(0) };
    })
    .filter((it) => it.label);
}
let lockerSig = "";
function refreshLocker() {
  const sig = $$("[data-bgh-stored]")
    .map((el) => el.getAttribute("aria-label") || el.title || "")
    .join("|");
  if (sig === lockerSig) return;
  lockerSig = sig;
  if (sig && !state.lockerSeeded) {
    state.lockerSeeded = true;
    if (!state.widgets.some((w) => w.type === "locker")) {
      state.widgets.push({ id: newId(), type: "locker", size: "m", style: "glass", x: null, y: null });
      save();
      return renderWidgets();
    }
  }
  for (const w of state.widgets) {
    if (w.type !== "locker") continue;
    for (const el of $$(`.mdos-wg[data-wid="${w.id}"] .mdos-wg-body`)) el.replaceChildren(...widgetBody(w));
  }
}
// Reads the credit extension's cards (#mac-credit-home) while Home is
// mounted — also when its board is switched off, since the cards stay in the
// page. The result is cached, so the widgets keep showing it anywhere.
// A provider that hasn't answered yet leaves "NULL", "undefined" or "NaN" in
// the card ("$NULL", "/ null"); those show as nothing (the widget prints —).
const textOf = (el) => {
  const t = (el?.textContent || "")
    .replace(/\b(?:null|undefined|NaN)\b/gi, "")
    .replace(/[$₩¥€£](?!\s*[\d.])/g, "")
    .replace(/\s+/g, " ")
    .replace(/^[\s/·:|,-]+|[\s/·:|,-]+$/g, "")
    .trim();
  return /[\p{L}\p{N}]/u.test(t) ? t : "";
};
function scrapeLedger(card) {
  if (!card) return null;
  const facts = [];
  for (const row of card.querySelectorAll(".mac-led-facts")) {
    let label = "";
    for (const n of row.childNodes) {
      if (n.nodeType === 1 && n.tagName === "B") {
        const value = textOf(n).slice(0, 24);
        if (value) facts.push([label.replace(/[·\s]+$/g, "").replace(/^[·\s]+/g, "").slice(0, 24), value]);
        label = "";
      } else label += n.textContent;
    }
  }
  const days = [...card.querySelectorAll(".mac-cal .mac-cal-day")].map((b) => ({
    lv: Number((b.className.match(/lv(\d)/) || [0, 0])[1]),
    today: b.classList.contains("is-today"),
    t: `${textOf(b.querySelector("span"))} · ${textOf(b.querySelector("small"))}`.slice(0, 24),
  }));
  const first = card.querySelector(".mac-cal .mac-cal-day");
  const start = first ? parseInt(getComputedStyle(first).gridColumnStart, 10) : 1;
  const chip = card.querySelector(".mac-led-chip");
  return {
    month: textOf(card.querySelector(".mac-led-nav b")).slice(0, 20),
    total: textOf(card.querySelector(".mac-led-total b")).slice(0, 24),
    usd: textOf(card.querySelector(".mac-led-total em")).slice(0, 20),
    chip: textOf(chip).slice(0, 16),
    up: !!chip?.classList.contains("is-up"),
    down: !!chip?.classList.contains("is-down"),
    cmpNote: textOf(card.querySelector(".mac-led-cmp small")).slice(0, 30),
    facts: facts.slice(0, 6),
    cal: { offset: Number.isFinite(start) ? Math.max(0, start - 1) : 0, days: days.slice(0, 31) },
    uses: [...card.querySelectorAll(".mac-pie-legend li")].slice(0, 5).map((li) => ({
      name: textOf(li.querySelector("span")).slice(0, 18),
      pct: textOf(li.querySelector("b")).slice(0, 8),
      color: getComputedStyle(li.querySelector("i") || li).backgroundColor,
    })),
  };
}
function scrapeCredits() {
  const home = $("#mac-credit-home");
  if (!home) return;
  const rows = [];
  for (const card of home.querySelectorAll(".mlh-crcard")) {
    const brand = textOf(card.querySelector(".mlh-cr-brand b"));
    if (!brand) continue;
    const amount = textOf(card.querySelector(".mlh-cr-big b")) || textOf(card.querySelector(".mlh-cr-big")) || textOf(card.querySelector(".mlh-rc-line b")) || "";
    const pct = parseFloat(card.querySelector(".mlh-cr-bar i")?.style.width);
    rows.push({
      id: (card.dataset.widgetId || "").slice(0, 40),
      brand: brand.slice(0, 40),
      sub: textOf(card.querySelector(".mlh-cr-brand em")).slice(0, 40),
      amount: amount.slice(0, 40),
      of: textOf(card.querySelector(".mlh-cr-big span")).slice(0, 24),
      lines: [...card.querySelectorAll(".mlh-cr > .mlh-rc-line")].map((l) => textOf(l).slice(0, 40)).filter(Boolean).slice(0, 2),
      pct: Number.isFinite(pct) ? Math.round(pct) : null,
    });
  }
  const total = textOf(home.querySelector(".mac-led-total b")).slice(0, 30);
  const credits = { total, rows: rows.slice(0, 12) };
  const ledger = scrapeLedger(home.querySelector(".mlh-rcptcard"));
  const changed = JSON.stringify(credits) !== JSON.stringify(state.credits || null) || JSON.stringify(ledger) !== JSON.stringify(state.ledger || null);
  if (!changed) return;
  state.credits = credits;
  state.ledger = ledger;
  save();
  // 2.4: the budget and credit cards become desktop widgets (once). The
  // board's own cards are switched off; Home layout can bring them back.
  if (!state.creditWidgetsV && (ledger?.total || rows.length)) {
    state.creditWidgetsV = 1;
    state.creditsSeeded = true;
    if (ledger?.total && !state.widgets.some((w) => w.type === "ledger")) state.widgets.push({ id: newId(), type: "ledger", size: "l", style: "glass", x: null, y: null });
    if (rows.length && !state.widgets.some((w) => w.type === "credits")) state.widgets.push({ id: newId(), type: "credits", size: "m", style: "glass", x: null, y: null });
    state.showCredits = false;
    applySettings();
    return renderWidgets();
  }
  for (const w of state.widgets) {
    if (!["credits", "credit", "ledger"].includes(w.type)) continue;
    for (const el of $$(`.mdos-wg[data-wid="${w.id}"] .mdos-wg-body`)) el.replaceChildren(...widgetBody(w));
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
// ── Grid placement ────────────────────────────────────────────
// Widgets snap to 160 px cells with 20 px gaps, counted from the right edge
// so the widget column lines up; desktop icons snap to their own grid from
// the left. Dropping on an occupied spot takes the nearest free cell.
const WG_CELL = 180;
const IC_CELL_W = 96;
const IC_CELL_H = 104;
const wgSpan = (w) => ({ s: [1, 1], m: [2, 1], l: [2, 2] })[w.size] || [1, 1];
const wgX = (k) => innerWidth - 24 - 160 - k * WG_CELL;
function snapToGrid(item, kind, others) {
  const isIcon = kind === "icon";
  const [cw, ch] = isIcon ? [1, 1] : wgSpan(item);
  const maxK = isIcon
    ? Math.max(0, Math.floor((innerWidth - 14 - ICON_W) / IC_CELL_W))
    : Math.max(cw - 1, Math.floor((innerWidth - 24 - 160 - 16) / WG_CELL));
  const maxJ = Math.max(0, Math.floor((innerHeight - MENUBAR_H - 90 - (isIcon ? ICON_H : ch * WG_CELL - 20)) / (isIcon ? IC_CELL_H : WG_CELL)));
  const cellOf = (x, y, span) =>
    isIcon
      ? [Math.round((x - 14) / IC_CELL_W), Math.round((y - 12) / IC_CELL_H)]
      : [Math.max(span - 1, Math.round((innerWidth - 24 - 160 - x) / WG_CELL)), Math.round((y - 16) / WG_CELL)];
  const used = new Set();
  for (const o of others) {
    if (!Number.isFinite(o.x) || !Number.isFinite(o.y)) continue;
    const [ow, oh] = isIcon ? [1, 1] : wgSpan(o);
    const [ok, oj] = cellOf(o.x, o.y, ow);
    for (let a = 0; a < ow; a++) for (let b = 0; b < oh; b++) used.add(`${isIcon ? ok + a : ok - a},${oj + b}`);
  }
  const fits = (k, j) => {
    if (k < (isIcon ? 0 : cw - 1) || k > maxK || j < 0 || j > maxJ) return false;
    for (let a = 0; a < cw; a++) for (let b = 0; b < ch; b++) if (used.has(`${isIcon ? k + a : k - a},${j + b}`)) return false;
    return true;
  };
  const [k0, j0] = cellOf(item.x ?? 0, item.y ?? 0, cw);
  for (let r = 0; r <= 12; r++) {
    for (let dk = -r; dk <= r; dk++) {
      for (let dj = -r; dj <= r; dj++) {
        if (Math.max(Math.abs(dk), Math.abs(dj)) !== r) continue;
        const k = k0 + dk;
        const j = j0 + dj;
        if (!fits(k, j)) continue;
        item.x = isIcon ? 14 + k * IC_CELL_W : wgX(k);
        item.y = isIcon ? 12 + j * IC_CELL_H : 16 + j * WG_CELL;
        return;
      }
    }
  }
}
// Widgets never sit on top of each other: one that lands on another (after a
// drop, a resize of the window or auto-placement) moves to the nearest free cell.
const wgRect = (w) => {
  const [ww, wh] = WIDGET_SIZES[w.size] || WIDGET_SIZES.s;
  return { x: w.x, y: w.y, w: ww, h: wh };
};
const rectsOverlap = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
function fixOverlaps(list = state.widgets) {
  const placed = [];
  for (const w of list) {
    if (!Number.isFinite(w.x) || !Number.isFinite(w.y)) continue;
    if (placed.some((o) => rectsOverlap(wgRect(w), wgRect(o)))) snapToGrid(w, "widget", placed);
    placed.push(w);
  }
}
function snapAll() {
  if (state.layoutMode !== "grid") return;
  state.widgets.forEach((w, i) => snapToGrid(w, "widget", state.widgets.slice(0, i)));
  state.desk.forEach((d, i) => snapToGrid(d, "icon", state.desk.slice(0, i)));
}

function placeWidget(el, w) {
  el.style.left = `${w.x}px`;
  el.style.top = `${w.y}px`;
}
// Widgets on the right half keep their distance from the right edge when the
// browser width changes, so the widget column stays a column.
function reanchorWidgets() {
  const last = state.layoutW;
  if (last && last !== innerWidth) {
    const dx = innerWidth - last;
    for (const w of state.widgets) if (Number.isFinite(w.x) && w.x > last / 2) w.x += dx;
  }
  if (state.layoutW !== innerWidth) {
    state.layoutW = innerWidth;
    save();
  }
}
// Home's board (feed + credit cards) ends 20 px before the widget column.
// Measured, because the board's own left edge moves with the icon column.
function fitBoard() {
  const board = desktopHome && $(`${SEL.homePage} > div.relative`);
  if (!board) return;
  const xs = state.widgets.filter((w) => Number.isFinite(w.x) && w.x > innerWidth * 0.3).map((w) => w.x);
  const right = xs.length ? Math.min(...xs) - 20 : innerWidth - 24;
  setVar("--mdos-board-max", `${Math.max(360, Math.round(right - board.getBoundingClientRect().left))}px`);
}
function renderWidgets() {
  if (isDesktop()) {
    reanchorWidgets();
    // Widgets the user never dragged are packed afresh for this window size;
    // dragged ones (manual) keep their place.
    for (const w of state.widgets) if (!w.manual) w.x = w.y = null;
    autoPlace();
    autoPlaceIcons();
    snapAll();
    fixOverlaps();
    // Home's own board (feed, credit cards) stops short of the widget column.
    const col = state.widgets.filter((w) => Number.isFinite(w.x) && w.x > innerWidth * 0.3).map((w) => w.x);
    setVar("--mdos-widget-reserve", `${col.length ? Math.max(0, innerWidth - Math.min(...col)) + 12 : 24}px`);
    fitBoard();
    toggleClass("mdos-has-icons", state.desk.length > 0);
    widgetLayer.replaceChildren(
      ...state.desk
        .map((d) => {
          clampIcon(d);
          const el = deskIconEl(d);
          if (el) placeWidget(el, d);
          return el;
        })
        .filter(Boolean),
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
    w.type === "credit"
      ? field(
          L.creditPick,
          (() => {
            const sel = h("select", {
              class: "mdos-cc-select",
              onchange: (e) => {
                w.card = e.target.value;
                rerender();
              },
            });
            for (const r of state.credits?.rows || []) {
              sel.append(h("option", { value: r.id, text: r.sub ? `${r.brand} · ${r.sub}` : r.brand, selected: r.id === w.card }));
            }
            return sel;
          })(),
        )
      : null,
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
  h("button", { type: "button", class: "mdos-btn", text: `+ ${L.addApps}`, onclick: (e) => openAddApps(e.currentTarget) }),
  h("button", { type: "button", class: "mdos-btn", text: L.homeLayout, onclick: (e) => openHomeLayout(e.currentTarget) }),
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

// ── Small apps: Notes, Web, YouTube ───────────────────────────

// App windows live inside Marinara's shell element so they stack with its
// windows (same z-order), but the nodes are ours.
const appLayer = h("div", { id: "mdos-appwins" });
function ensureAppLayer() {
  const shell = $(SEL.shell);
  if (shell && appLayer.parentNode !== shell) shell.append(appLayer);
}
const YT_ID = /^[\w-]{11}$/;
function parseYouTube(input) {
  const text = (input || "").trim();
  if (YT_ID.test(text)) return { id: text, list: null };
  let u;
  try {
    u = new URL(text.includes("://") ? text : `https://${text}`);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www|m|music)\./, "");
  let id = null;
  if (host === "youtu.be") id = u.pathname.slice(1).split("/")[0];
  else if (/^youtube(-nocookie)?\.com$/.test(host)) {
    id = u.searchParams.get("v") || (u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]{11})/) || [])[1] || null;
  } else return null;
  if (id && !YT_ID.test(id)) id = null;
  const list = u.searchParams.get("list");
  return id || list ? { id, list } : null;
}
function youTubeEmbed(yt, autoplay = false) {
  const params = new URLSearchParams({ rel: "0", playsinline: "1" });
  if (yt.list) params.set("list", yt.list);
  if (autoplay) params.set("autoplay", "1");
  // "My account" mode uses youtube.com so a signed-in session can apply;
  // otherwise the privacy-enhanced (no-cookie) player.
  const host = state.yt.mode === "account" ? "www.youtube.com" : "www.youtube-nocookie.com";
  return `https://${host}/embed/${yt.id || "videoseries"}?${params}`;
}
function normalizeUrl(input) {
  const text = (input || "").trim();
  if (!text) return "";
  if (/^https?:\/\//i.test(text)) return text;
  if (/^[^\s/]+\.[^\s]{2,}$/.test(text)) return `https://${text}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(text)}`;
}
// Marinara's security policy only lets its own pages and YouTube load in a
// frame (CSP frame-src); everything else opens in a separate browser window.
function embedSrc(url, autoplay) {
  const yt = parseYouTube(url);
  if (yt) return youTubeEmbed(yt, autoplay);
  try {
    if (new URL(url).origin === location.origin) return url;
  } catch {
    /* not a URL */
  }
  return null;
}
function openExternal(url) {
  const w = Math.min(1200, screen.availWidth - 80);
  const hh = Math.min(820, screen.availHeight - 80);
  window.open(url, "_blank", `noopener,noreferrer,popup,width=${w},height=${hh}`);
}
function openUrl(url) {
  if (parseYouTube(url)) openApp("youtube", { url, autoplay: true });
  else openApp("browser", { url });
}
const toolBtn = (icon, label, onclick) =>
  h("button", { type: "button", class: "mdos-tool", title: label, "aria-label": label, svg: svg(icon), onclick });
function frame(src, title, sandbox = null) {
  return h("iframe", {
    class: "mdos-frame",
    src,
    title,
    sandbox,
    allow: "autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write",
    allowfullscreen: true,
    referrerpolicy: "strict-origin-when-cross-origin",
  });
}
function urlField(win, placeholder, onGo) {
  const input = h("input", { type: "text", class: "mdos-url", placeholder, "aria-label": placeholder, spellcheck: "false", autocomplete: "off" });
  const form = h(
    "form",
    {
      class: "mdos-url-form",
      onsubmit: (event) => {
        event.preventDefault();
        onGo(input.value);
      },
    },
    input,
  );
  win.title.replaceWith(form);
  return input;
}

const APP_TYPES = {
  notes: { mount: mountNotes },
  browser: { mount: mountBrowser },
  youtube: { mount: mountYouTube },
  customize: { mount: (win) => mountCustomize(win) },
};
function makeLights(id) {
  return h(
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
}
function openApp(type, opts = {}) {
  if (!APP_TYPES[type] || mode === "off") return;
  closeLaunchpad();
  let rec = state.apps.find((a) => a.type === type);
  if (!rec) {
    rec = { id: newId(), type, x: null, y: null, w: null, h: null, snap: null, min: false, pinned: false };
    state.apps.push(rec);
  }
  if (opts.url) rec.url = opts.url;
  if (opts.section) rec.section = opts.section;
  rec.min = false;
  const id = `app:${rec.id}`;
  const win = appWins.get(id) || renderAppWin(rec);
  win.autoplay = !!opts.autoplay;
  if (opts.section) win.openSection?.(opts.section);
  else win.refresh?.();
  setAttr(win.el, "aria-hidden", null);
  focusWin(id);
  bounce(type);
  save();
  syncSoon();
}
function renderAppWin(rec) {
  ensureAppLayer();
  const id = `app:${rec.id}`;
  const app = appById(rec.type);
  const tools = h("div", { class: "mdos-appwin-tools" });
  const title = h("div", { class: "mdos-appwin-title", text: appLabel(app) });
  const bar = h("div", { class: "mdos-appwin-bar" }, makeLights(id), title, tools);
  const body = h("div", { class: "mdos-appwin-body" });
  const grips = ["n", "e", "s", "w", "ne", "nw", "se", "sw"].map((dir) =>
    h("div", { class: `mdos-grip mdos-grip--${dir}`, "data-mdos-grip": dir, "aria-hidden": "true" }),
  );
  const el = h(
    "section",
    { class: `mdos-appwin mdos-appwin--${rec.type}`, "data-mdos-win": id, role: "dialog", "aria-label": appLabel(app) },
    bar,
    body,
    ...grips,
  );
  if (rec.min) el.setAttribute("aria-hidden", "true");
  const win = { id, el, rec, bar, tools, title, body };
  appWins.set(id, win);
  APP_TYPES[rec.type].mount(win);
  appLayer.append(el);
  if (!zOrder.includes(id)) zOrder.push(id);
  applyRect(id);
  applyZ();
  return win;
}
function closeApp(id) {
  const win = appWins.get(id);
  win?.dispose?.();
  win?.el.remove();
  appWins.delete(id);
  state.apps = state.apps.filter((a) => `app:${a.id}` !== id);
  zOrder = zOrder.filter((x) => x !== id);
  save();
  focusTopVisible();
  syncSoon();
}
function setAppMinimized(id, min) {
  const rec = appRec(id);
  const win = appWins.get(id);
  if (!rec || !win) return;
  rec.min = min;
  setAttr(win.el, "aria-hidden", min ? "true" : null);
  save();
  if (min) focusTopVisible();
  else focusWin(id);
  syncSoon();
}
const renderAllApps = () => state.apps.forEach((rec) => appWins.has(`app:${rec.id}`) || renderAppWin(rec));
function removeAllAppWins() {
  for (const [id, w] of appWins) {
    w.dispose?.();
    w.el.remove();
    zOrder = zOrder.filter((x) => x !== id);
  }
  appWins.clear();
}

// Notes: a list of notes and an editor; saved to extension storage as you type.
const noteDateFmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const noteTitle = (n) => (n.text || "").trim().split("\n")[0].slice(0, 60) || L.untitled;
let notesWarned = false;
function mountNotes(win) {
  const list = h("div", { class: "mdos-notes-list", role: "listbox", "aria-label": L.notes });
  const editor = h("textarea", { class: "mdos-notes-editor", placeholder: L.notePlaceholder, spellcheck: "false", "aria-label": L.notes });
  const current = () => notesStore.notes.find((n) => n.id === win.rec.noteId) || null;
  const sorted = () => [...notesStore.notes].sort((a, b) => (b.updated || 0) - (a.updated || 0));
  const renderList = () =>
    list.replaceChildren(
      ...sorted().map((n) =>
        h(
          "button",
          {
            type: "button",
            role: "option",
            class: "mdos-notes-item",
            "aria-selected": String(n.id === win.rec.noteId),
            onclick: () => select(n.id),
          },
          h("b", { text: noteTitle(n) }),
          h("span", { text: noteDateFmt.format(n.updated || Date.now()) }),
        ),
      ),
    );
  const select = (nid) => {
    win.rec.noteId = nid;
    save();
    const n = current();
    editor.value = n ? n.text : "";
    editor.disabled = !n;
    renderList();
  };
  const create = () => {
    const n = { id: newId(), text: "", updated: Date.now() };
    notesStore.notes.push(n);
    saveNotes();
    select(n.id);
    editor.focus();
  };
  const remove = () => {
    const n = current();
    if (!n) return;
    if (n.text.trim() && !window.confirm(`${L.deleteNote}?`)) return;
    notesStore.notes = notesStore.notes.filter((x) => x.id !== n.id);
    saveNotes();
    select(sorted()[0]?.id || null);
  };
  let listTimer = 0;
  editor.addEventListener("input", () => {
    const n = current();
    if (!n) return;
    n.text = editor.value;
    n.updated = Date.now();
    saveNotes();
    if (!notesWarned && imagesSize() > STORAGE_BUDGET) {
      notesWarned = true;
      window.alert(L.storageFull);
    }
    marinara.clearTimeout(listTimer);
    listTimer = marinara.setTimeout(renderList, 400);
  });
  win.tools.append(toolBtn("plus", L.newNote, create), toolBtn("trash", L.deleteNote, remove));
  win.body.append(list, editor);
  if (!notesStore.notes.length) {
    notesStore.notes.push({ id: newId(), text: "", updated: Date.now() });
    saveNotes();
  }
  select(current() ? win.rec.noteId : sorted()[0].id);
  win.dispose = () => marinara.clearTimeout(listTimer);
}

// ── Reader view ───────────────────────────────────────────────
// Most sites refuse to be framed (X-Frame-Options / CSP), and Marinara has no
// page proxy. Reader view asks r.jina.ai for the page as Markdown and renders
// it here as plain elements — never as HTML from the site. Opt-in per site,
// because the address is sent to that service.
// ponytail: line-based Markdown subset (headings, lists, quotes, links,
// images, bold); upgrade to a real parser if pages need tables or code.
const READER = "https://r.jina.ai/";
async function fetchReader(url) {
  const doFetch = typeof marinara.fetch === "function" ? marinara.fetch : window.fetch.bind(window);
  const res = await doFetch(READER + url, { headers: { Accept: "text/plain" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}
function safeHref(href, base) {
  try {
    const u = new URL(href, base);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}
function mdImg(alt, src, base) {
  const u = safeHref(src, base);
  // Image hosts that refuse hotlinking just drop out instead of showing a broken icon.
  return u ? h("img", { src: u, alt, loading: "lazy", decoding: "async", referrerpolicy: "no-referrer", onerror: (e) => e.target.remove() }) : null;
}
function mdLink(kids, href, onLink) {
  return h(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      onclick: (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
        e.preventDefault();
        onLink(href);
      },
    },
    ...kids,
  );
}
// Link text may hold images ("[![thumb](src) title](href)"), so it is parsed again.
const MD_INLINE = /!\[([^\]]*)\]\(([^)\s]+)[^)]*\)|\[((?:[^[\]]|!\[[^\]]*\]\([^)\s]*\)|\[[^[\]]*\])+)\]\(([^)\s]+)[^)]*\)|\*\*([^*]+)\*\*/g;
function mdInline(text, base, onLink) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(MD_INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1] !== undefined) out.push(mdImg(m[1], m[2], base));
    else if (m[3] !== undefined) {
      const href = safeHref(m[4], base);
      const kids = mdInline(m[3], base, onLink);
      out.push(href ? mdLink(kids, href, onLink) : kids);
    } else out.push(h("strong", { text: m[5] }));
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
function mdBlocks(md, base, onLink) {
  const blocks = [];
  let para = [];
  let list = null;
  const flush = () => {
    if (para.length) blocks.push(h("p", {}, ...mdInline(para.join(" "), base, onLink)));
    para = [];
  };
  for (const raw of md.split(/\r?\n/)) {
    if (blocks.length > 2500) break;
    const line = raw.trim();
    if (!line || /^([-=*_]\s*){3,}$/.test(line) || /^\|?\s*:?-{2,}/.test(line)) {
      flush();
      list = null;
      continue;
    }
    const head = line.match(/^(#{1,6})\s+(.*)$/);
    const item = line.match(/^(?:(?:[*+-]|\d+\.)\s+)+(.*)$/);
    if (head) {
      flush();
      list = null;
      blocks.push(h(`h${Math.min(6, head[1].length + 1)}`, {}, ...mdInline(head[2], base, onLink)));
    } else if (item) {
      flush();
      if (!list) blocks.push((list = h("ul")));
      list.append(h("li", {}, ...mdInline(item[1], base, onLink)));
    } else if (line.startsWith(">")) {
      flush();
      list = null;
      blocks.push(h("blockquote", {}, ...mdInline(line.replace(/^>+\s*/, ""), base, onLink)));
    } else if (line.startsWith("|")) {
      flush();
      list = null;
      const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
      blocks.push(h("p", { class: "mdos-reader-row" }, ...mdInline(cells.join("  ·  "), base, onLink)));
    } else para.push(line);
  }
  flush();
  return blocks;
}
const readerOn = (url) => state.readerHosts.includes(hostOf(url));
// Web pages open in a real iframe first. Marinara's own security policy
// (frame-src) refuses most sites; the browser reports that as a
// "securitypolicyviolation", and the window then falls back to reader view or
// the open-in-new-window card for that site.
const frameBlocked = new Set();
const originOf = (u) => {
  try {
    return new URL(u).origin;
  } catch {
    return "";
  }
};
// No top navigation: a framed page can't take Marinara's tab away.
const WEB_SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals";
function setReader(url, on) {
  const host = hostOf(url);
  state.readerHosts = state.readerHosts.filter((x) => x !== host);
  if (on) state.readerHosts.push(host);
  save();
}

// Web: an address bar. YouTube and Marinara pages open in the window; other
// sites can't be framed under Marinara's security policy, so they get a card
// with "open in new window" and "add to home screen".
function mountBrowser(win) {
  const input = urlField(win, L.urlPlaceholder, (value) => go(normalizeUrl(value)));
  const star = toolBtn("star", L.addToHome, () => win.rec.url && addBookmark({ url: win.rec.url }));
  const ext = toolBtn("external", L.openOutside, () => win.rec.url && openExternal(win.rec.url));
  const history = [];
  const back = toolBtn("back", L.back, () => history.length && go(history.pop(), false));
  const reader = toolBtn("reader", L.readerView, () => {
    if (!win.rec.url) return;
    setReader(win.rec.url, !readerOn(win.rec.url));
    render();
  });
  win.tools.prepend(back);
  win.tools.append(reader, star, ext);
  let shown = null;
  let readSeq = 0;
  const readerView = (url) => {
    const note = h("p", { class: "mdos-reader-note", text: L.readerNote });
    const status = h("p", { class: "mdos-web-note", text: L.readerLoading });
    const box = h("div", { class: "mdos-reader" }, note, status);
    const token = ++readSeq;
    fetchReader(url).then(
      (text) => {
        if (token !== readSeq) return;
        const title = text.match(/^Title:[ \t]*(.*)$/m)?.[1]?.trim();
        const at = text.indexOf("Markdown Content:");
        const body = at >= 0 ? text.slice(at + 17) : text;
        const blocks = mdBlocks(body, url, go);
        if (!blocks.length) {
          // Some sites (DCInside galleries, for one) refuse the reader service.
          status.textContent = L.readerEmpty;
          box.append(h("button", { type: "button", class: "mdos-btn mdos-btn--primary", text: L.openOutside, onclick: () => openExternal(url) }));
          return;
        }
        box.replaceChildren(note, ...(title ? [h("h1", { class: "mdos-reader-title", text: title })] : []), ...blocks);
        box.scrollTop = 0;
      },
      (err) => {
        if (token === readSeq) status.textContent = `${L.readerFail} (${err.message})`;
      },
    );
    return box;
  };
  const startPage = () => {
    const tiles = bookmarkApps().map((a) =>
      h(
        "button",
        { type: "button", class: "mdos-web-fav", onclick: () => go(a.bm.url) },
        appIcon(a),
        h("span", { text: appLabel(a) }),
      ),
    );
    return h(
      "div",
      { class: "mdos-web-start" },
      h("h3", { text: L.favorites }),
      tiles.length ? h("div", { class: "mdos-web-favs" }, ...tiles) : h("p", { class: "mdos-web-note", text: L.noFavorites }),
    );
  };
  const blocked = (url) =>
    h(
      "div",
      { class: "mdos-web-card" },
      appIcon({ id: "", letter: hostOf(url).charAt(0).toUpperCase(), favicon: url.startsWith("https:") ? `${new URL(url).origin}/favicon.ico` : null, g: [`hsl(${hueOf(hostOf(url))} 70% 62%)`, `hsl(${(hueOf(hostOf(url)) + 40) % 360} 65% 46%)`], label: () => hostOf(url) }),
      h("h3", { text: hostOf(url) }),
      h("p", { class: "mdos-web-url", text: url }),
      h("p", { class: "mdos-web-note", text: L.cantEmbed }),
      h(
        "div",
        { class: "mdos-row" },
        h("button", {
          type: "button",
          class: "mdos-btn mdos-btn--primary",
          text: L.readerView,
          onclick: () => {
            setReader(url, true);
            render();
          },
        }),
        h("button", { type: "button", class: "mdos-btn", text: L.openOutside, onclick: () => openExternal(url) }),
        h("button", { type: "button", class: "mdos-btn", text: L.addToHome, onclick: () => addBookmark({ url }) }),
      ),
    );
  const render = () => {
    const url = win.rec.url || "";
    input.value = url;
    star.disabled = ext.disabled = !url;
    back.disabled = !history.length;
    const src = url ? embedSrc(url, win.autoplay) : null;
    const useReader = !!url && !src && readerOn(url);
    const page = url && !src && !useReader && /^https?:/i.test(url) && !frameBlocked.has(originOf(url)) ? url : null;
    reader.disabled = !url || !!src;
    reader.setAttribute("aria-pressed", String(useReader));
    const key = url ? (src ? `embed:${src}` : page ? `frame:${page}` : `${useReader ? "reader" : "card"}:${url}`) : `start:${state.bookmarks.length}`;
    if (key === shown) return;
    shown = key;
    win.body.replaceChildren(
      !url ? startPage() : src ? frame(src, hostOf(url)) : page ? frame(page, hostOf(url), WEB_SANDBOX) : useReader ? readerView(url) : blocked(url),
    );
  };
  const go = (url, remember = true) => {
    if (remember && win.rec.url && win.rec.url !== url) history.push(win.rec.url);
    if (history.length > 50) history.shift();
    win.rec.url = url;
    win.autoplay = true;
    save();
    render();
  };
  win.refresh = render;
  render();
}

// YouTube: three ways to use it (YouTube settings ⚙):
//   link    — paste a link; privacy-enhanced player.
//   api     — search inside the app with your own YouTube Data API key.
//   account — youtube.com player, so a signed-in YouTube session can apply.
// The player keeps playing while minimized; 📌 keeps the window on top.
async function searchYouTube(query) {
  const params = new URLSearchParams({ part: "snippet", type: "video", maxResults: "24", q: query, key: state.yt.apiKey });
  const doFetch = typeof marinara.fetch === "function" ? marinara.fetch : window.fetch.bind(window);
  const res = await doFetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
  return (data.items || [])
    .filter((it) => it.id?.videoId)
    .map((it) => ({
      id: it.id.videoId,
      title: it.snippet?.title || "",
      channel: it.snippet?.channelTitle || "",
      thumb: it.snippet?.thumbnails?.medium?.url || it.snippet?.thumbnails?.default?.url || "",
    }));
}
// Titles from the API arrive HTML-escaped; decode them as text, never markup.
const decodeEntities = (text) => new DOMParser().parseFromString(`<!doctype html><body>${text}`, "text/html").body.textContent || "";
function openYouTubeSettings(anchor) {
  const key = h("input", {
    type: "password",
    class: "mdos-input",
    placeholder: L.ytApiKey,
    autocomplete: "off",
    value: state.yt.apiKey || "",
    onchange: (e) => {
      state.yt.apiKey = e.target.value.trim();
      save();
    },
  });
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(
      L.ytMode,
      segmented(Object.entries(L.ytModes), state.yt.mode, (v) => {
        state.yt.mode = v;
        save();
        for (const w of appWins.values()) if (w.rec.type === "youtube") w.refresh?.(true);
        openYouTubeSettings(anchor);
      }),
    ),
    state.yt.mode === "api" ? field(L.ytApiKey, key) : null,
    state.yt.mode === "api" ? h("p", { class: "mdos-pop-note", text: L.ytApiHint }) : null,
    state.yt.mode === "account" ? h("p", { class: "mdos-pop-note", text: L.ytAccountHint }) : null,
    state.yt.mode === "account"
      ? h(
          "div",
          { class: "mdos-row" },
          h("button", {
            type: "button",
            class: "mdos-btn mdos-btn--primary",
            text: L.ytLogin,
            onclick: () => openExternal("https://accounts.google.com/ServiceLogin?service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2F"),
          }),
          h("button", { type: "button", class: "mdos-btn", text: L.ytOpenSite, onclick: () => openExternal("https://www.youtube.com/") }),
        )
      : null,
  );
  openPop(body, anchor, { title: L.ytSettings });
}
function mountYouTube(win) {
  let results = null; // last search results, kept so "back" can return to them
  let status = "";
  const input = urlField(win, L.ytPlaceholder, async (value) => {
    const text = value.trim();
    if (!text) return;
    if (parseYouTube(text)) {
      win.rec.url = text;
      win.autoplay = true;
      win.view = "player";
      save();
      return render();
    }
    if (state.yt.mode !== "api" || !state.yt.apiKey) {
      status = L.ytNoKey;
      win.view = "results";
      return render(true);
    }
    status = L.ytSearching;
    win.view = "results";
    render(true);
    try {
      results = await searchYouTube(text);
      status = results.length ? "" : "0";
    } catch (error) {
      results = null;
      status = `${L.ytError}: ${error.message}`;
    }
    render(true);
  });
  const settingsBtn = toolBtn("sliders", L.ytSettings, (e) => openYouTubeSettings(e.currentTarget));
  const listBtn = toolBtn("launchpad", L.ytResults, () => {
    win.view = win.view === "results" ? "player" : "results";
    render(true);
  });
  const pin = toolBtn("pin", L.pinOnTop, () => {
    win.rec.pinned = !win.rec.pinned;
    pin.setAttribute("aria-pressed", String(!!win.rec.pinned));
    applyZ();
    save();
  });
  pin.setAttribute("aria-pressed", String(!!win.rec.pinned));
  const ext = toolBtn("external", L.openOutside, () => win.rec.url && openExternal(win.rec.url));
  win.tools.append(listBtn, settingsBtn, pin, ext);
  let shown = null;
  const resultsView = () =>
    h(
      "div",
      { class: "mdos-yt-results" },
      status ? h("p", { class: "mdos-web-note", text: status === "0" ? "—" : status }) : null,
      ...(results || []).map((r) =>
        h(
          "button",
          {
            type: "button",
            class: "mdos-yt-item",
            onclick: () => {
              win.rec.url = `https://youtu.be/${r.id}`;
              win.autoplay = true;
              win.view = "player";
              save();
              render();
            },
          },
          r.thumb ? h("img", { src: r.thumb, alt: "", loading: "lazy", referrerpolicy: "no-referrer" }) : h("span", { class: "mdos-yt-thumb" }),
          h("b", { text: decodeEntities(r.title) }),
          h("span", { text: decodeEntities(r.channel) }),
        ),
      ),
    );
  const render = (force = false) => {
    input.placeholder = state.yt.mode === "api" ? L.ytSearchPlaceholder : L.ytPlaceholder;
    input.setAttribute("aria-label", input.placeholder);
    listBtn.hidden = !(results || status);
    listBtn.setAttribute("aria-pressed", String(win.view === "results"));
    if (win.view === "results") {
      shown = "results";
      return win.body.replaceChildren(resultsView());
    }
    const yt = parseYouTube(win.rec.url || "");
    input.value = win.rec.url || "";
    const src = yt ? youTubeEmbed(yt, win.autoplay) : null;
    const key = yt ? `${state.yt.mode}|${yt.id}|${yt.list}` : `hint|${state.yt.mode}`;
    if (key === shown && !force) return;
    shown = key;
    const hint = state.yt.mode === "api" && !state.yt.apiKey ? `${L.ytHint} ${L.ytNoKey}` : L.ytHint;
    win.body.replaceChildren(src ? frame(src, "YouTube") : h("div", { class: "mdos-web-start" }, h("p", { class: "mdos-web-note", text: hint })));
  };
  win.refresh = render;
  render();
}

// ── Bookmarks & desktop icons ─────────────────────────────────

function addBookmark({ url, title }) {
  const clean = normalizeUrl(url);
  if (!clean) return null;
  let b = state.bookmarks.find((x) => x.url === clean);
  if (!b) {
    b = { id: newId(), url: clean, title: (title || hostOf(clean)).trim().slice(0, 40) };
    state.bookmarks.push(b);
  }
  if (isDesktop() && !state.desk.some((d) => d.app === `bm:${b.id}`)) {
    state.desk.push({ id: newId(), app: `bm:${b.id}`, x: null, y: null });
  }
  state.sbHidden = state.sbHidden.filter((id) => id !== `bm:${b.id}`);
  save();
  refreshHomeItems();
  return b;
}
function removeBookmark(id) {
  state.bookmarks = state.bookmarks.filter((b) => b.id !== id);
  state.desk = state.desk.filter((d) => d.app !== `bm:${id}`);
  delete state.icons[`bm:${id}`];
  if (images.icons[`bm:${id}`]) {
    delete images.icons[`bm:${id}`];
    saveImages();
  }
  save();
  refreshHomeItems();
}
function renameBookmark(b) {
  const next = window.prompt(L.rename, b.title);
  if (next == null || !next.trim()) return;
  b.title = next.trim().slice(0, 40);
  save();
  refreshHomeItems();
}
function refreshHomeItems() {
  renderWidgets();
  if (sbEl) renderSpringboardApps();
  for (const w of appWins.values()) w.refresh?.();
}
function openBookmarkForm(anchor) {
  const title = h("input", { type: "text", class: "mdos-input", placeholder: L.bookmarkTitle, maxlength: "40" });
  const url = h("input", { type: "url", class: "mdos-input", placeholder: L.bookmarkUrl, required: true });
  const form = h(
    "form",
    {
      class: "mdos-pop-body",
      onsubmit: (event) => {
        event.preventDefault();
        if (addBookmark({ url: url.value, title: title.value })) closePop();
      },
    },
    field(L.bookmarkTitle, title),
    field(L.bookmarkUrl, url),
    h("button", { type: "submit", class: "mdos-btn mdos-btn--primary", text: L.add }),
  );
  openPop(form, anchor, { title: L.addBookmark });
  url.focus();
}

const ICON_W = 92;
const ICON_H = 100;
function clampIcon(d) {
  d.x = Math.min(Math.max(d.x ?? 0, 4), innerWidth - ICON_W - 4);
  d.y = Math.min(Math.max(d.y ?? 0, 4), innerHeight - MENUBAR_H - ICON_H - 10);
}
// Unplaced icons fill the left edge top-down, column by column, like a desktop.
function autoPlaceIcons() {
  const taken = state.desk.filter((d) => Number.isFinite(d.x) && Number.isFinite(d.y));
  const maxY = innerHeight - MENUBAR_H - ICON_H - 90;
  let x = 14;
  let y = 12;
  for (const d of state.desk) {
    if (Number.isFinite(d.x) && Number.isFinite(d.y)) continue;
    while (taken.some((t) => Math.abs(t.x - x) < ICON_W - 12 && Math.abs(t.y - y) < ICON_H - 12)) {
      y += ICON_H;
      if (y > maxY) {
        y = 12;
        x += ICON_W;
      }
    }
    d.x = x;
    d.y = y;
    taken.push(d);
  }
}
function deskIconEl(d) {
  const app = appById(d.app);
  if (!app) return null;
  return h(
    "div",
    {
      class: "mdos-dicon",
      role: "button",
      tabindex: "0",
      "data-did": d.id,
      "aria-label": appLabel(app),
      onkeydown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          launch(app.id);
        }
      },
    },
    appIcon(app),
    h("span", { class: "mdos-dicon-label", text: appLabel(app) }),
    h("button", {
      type: "button",
      class: "mdos-wg-badge mdos-wg-remove",
      "aria-label": L.removeFromDesktop,
      text: "−",
      onclick: (event) => {
        event.stopPropagation();
        removeDeskIcon(d.id);
      },
    }),
  );
}
function addDeskIcon(appId) {
  if (state.desk.some((d) => d.app === appId)) return;
  state.desk.push({ id: newId(), app: appId, x: null, y: null });
  save();
  renderWidgets();
}
function removeDeskIcon(id) {
  state.desk = state.desk.filter((d) => d.id !== id);
  save();
  renderWidgets();
}

// ── Home screen customization ─────────────────────────────────

// Touch home screen: app order and apps taken off the grid.
function springboardApps() {
  const base = [
    ...APPS.filter((a) => a.id !== "home"),
    ...UTIL_APPS,
    ...homeApps(),
    ...bookmarkApps(),
    ...TAIL_APPS.filter((a) => a.id !== "search"),
    ...EXTRA_APPS.filter((a) => ["controlcenter", "widgets", "customize"].includes(a.id)),
  ];
  const rank = (a) => {
    const i = state.sbOrder.indexOf(a.id);
    return i < 0 ? 1e4 + base.indexOf(a) : i;
  };
  return base.filter((a) => !state.sbHidden.includes(a.id)).sort((a, b) => rank(a) - rank(b));
}
function moveSpringboardApp(id, delta) {
  const ids = springboardApps().map((a) => a.id);
  const i = ids.indexOf(id);
  const j = i + delta;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  state.sbOrder = ids;
  save();
  renderSpringboardApps();
}
function hideFromHome(id) {
  if (!state.sbHidden.includes(id)) state.sbHidden.push(id);
  save();
  renderSpringboardApps();
}

// "Add apps & bookmarks": every app not yet on the desktop (or hidden from the
// touch home screen), plus a button to add a website.
function openAddApps(anchor) {
  const candidates = launchpadApps().filter((a) =>
    isTouch() ? state.sbHidden.includes(a.id) : !state.desk.some((d) => d.app === a.id),
  );
  const grid = h(
    "div",
    { class: "mdos-iconpick" },
    ...candidates.map((a, i) =>
      appTile(a, i, (picked) => {
        if (isTouch()) {
          state.sbHidden = state.sbHidden.filter((x) => x !== picked.id);
          save();
          renderSpringboardApps();
        } else addDeskIcon(picked.id);
        grid.querySelector(`[data-app="${CSS.escape(picked.id)}"]`)?.remove();
      }),
    ),
  );
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    grid,
    h("button", { type: "button", class: "mdos-btn", text: `+ ${L.addBookmark}`, onclick: () => openBookmarkForm(anchor) }),
  );
  openPop(body, anchor, { title: L.addApps, wide: true });
}

// "Home layout": where Marinara's Home blocks sit and what shows.
function openHomeLayout(anchor) {
  const toggle = (key, label) =>
    h(
      "label",
      { class: "mdos-cc-toggle" },
      h("span", { text: label }),
      h("input", { type: "checkbox", role: "switch", checked: !!state[key], onchange: (e) => updateSetting(key, e.target.checked) }),
    );
  const body = h(
    "div",
    { class: "mdos-pop-body" },
    field(L.boardPos, segmented(Object.entries(L.boardPositions), state.board, (v) => updateSetting("board", v))),
    toggle("showCredits", L.showCredits),
    toggle("showFeed", L.showFeed),
    h(
      "div",
      { class: "mdos-row" },
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.arrangeIcons,
        onclick: () => {
          for (const d of state.desk) d.x = d.y = null;
          save();
          renderWidgets();
        },
      }),
      h("button", {
        type: "button",
        class: "mdos-btn",
        text: L.arrangeWidgets,
        onclick: () => {
          for (const w of state.widgets) w.x = w.y = null, (w.manual = false);
          save();
          renderWidgets();
        },
      }),
    ),
  );
  openPop(body, anchor, { title: L.homeLayout });
}

// ── Shared setting controls ───────────────────────────────────

function settingToggle(key, label, onChange) {
  return h(
    "label",
    { class: "mdos-cc-toggle" },
    h("span", { text: label }),
    h("input", {
      type: "checkbox",
      role: "switch",
      checked: !!state[key],
      onchange: (event) => {
        updateSetting(key, event.target.checked);
        onChange?.(event.target.checked);
      },
    }),
  );
}
function settingSelect(key, options, onChange) {
  const el = h("select", {
    class: "mdos-cc-select",
    onchange: (e) => {
      updateSetting(key, e.target.value);
      onChange?.(e.target.value);
    },
  });
  for (const [v, label] of options) el.append(h("option", { value: v, text: label, selected: state[key] === v }));
  return el;
}
function accentRow() {
  return h(
    "div",
    { class: "mdos-cc-accents", role: "radiogroup", "aria-label": L.accent },
    ...ACCENTS.map((accent) =>
      h("button", {
        type: "button",
        role: "radio",
        class: `mdos-cc-accent${accent.color ? "" : accent.theme ? " mdos-cc-accent--theme" : " mdos-cc-accent--app"}`,
        title: accent.name,
        "aria-label": accent.name,
        "aria-checked": String(state.accent === accent.id),
        "data-accent": accent.id,
        style: accent.color ? `--c:${accent.color}` : accent.theme ? `--c:${themePalette.accent || "#0a84ff"}` : "",
        onclick: () => {
          updateSetting("accent", accent.id);
          refreshCC();
        },
      }),
    ),
  );
}
function wallpaperSwatches() {
  return h(
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
        style: `background:${wp.id === "theme" ? themeWallpaperCss() : wp.css}`,
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
}
function wallpaperImageControls() {
  const urlInput = h("input", { type: "url", class: "mdos-cc-input", placeholder: L.imageUrl, "aria-label": L.imageUrl });
  return [
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
    h(
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
    ),
  ];
}
function refreshCC() {
  for (const el of $$(".mdos-cc-swatch[data-wp]")) {
    el.setAttribute("aria-checked", String(!images.wallpaper && state.wallpaper === el.dataset.wp));
  }
  for (const el of $$(".mdos-cc-accent[data-accent]")) {
    el.setAttribute("aria-checked", String(state.accent === el.dataset.accent));
  }
}

// ── Control Center (quick settings) ───────────────────────────

let ccEl = null;
function toggleCC(forceOpen, section) {
  // Detailed settings live in the Customize window.
  if (section) {
    closeCC();
    return openApp("customize", { section });
  }
  if (ccEl && !forceOpen) return closeCC();
  closeMenu();
  closeLaunchpad();
  if (!ccEl) buildCC();
}
function buildCC() {
  const card = (title, ...kids) => h("section", { class: "mdos-cc-card" }, title ? h("h3", { text: title }) : null, ...kids);
  ccEl = h(
    "div",
    { id: "mdos-cc", role: "dialog", "aria-label": L.controlCenter },
    card(L.accent, accentRow()),
    card(L.wallpaper, wallpaperSwatches()),
    card(
      L.quick,
      settingToggle("themeSync", L.themeSync, (on) => on && updateSetting("accent", "theme")),
      settingToggle("dockAutohide", L.autohide),
      settingToggle("realGlass", L.realGlass),
      h(
        "label",
        { class: "mdos-cc-slider" },
        h("span", { text: L.layoutMode }),
        settingSelect("layoutMode", Object.entries(L.layoutModes), () => renderWidgets()),
      ),
    ),
    h(
      "section",
      { class: "mdos-cc-card mdos-cc-actions" },
      h("button", { type: "button", class: "mdos-cc-btn mdos-cc-btn--accent", text: L.openSettings, onclick: () => { closeCC(); openApp("customize"); } }),
      h("button", { type: "button", class: "mdos-cc-btn", text: L.editWidgets, onclick: () => setEditMode(true) }),
      isDesktop() ? h("button", { type: "button", class: "mdos-cc-btn", text: L.tile, onclick: tileWindows }) : null,
      h("button", { type: "button", class: "mdos-cc-btn", text: L.classic, onclick: () => setEnabled(false) }),
    ),
    isTouch() ? h("button", { type: "button", class: "mdos-cc-btn mdos-cc-done", text: L.done, onclick: () => closeCC() }) : null,
  );
  ui.append(ccEl);
  raf(() => ccEl?.classList.add("is-open"));
}
function closeCC() {
  if (!ccEl) return;
  ccEl.remove();
  ccEl = null;
}

// ── Customize window (all settings) ───────────────────────────

const SET_SECTIONS = [
  ["appearance", () => L.appearance, "brush", "#ff7ab0", "#b25cff"],
  ["wallpaper", () => L.wallpaper, "wallpaper", "#7ad7ff", "#2f7cf2"],
  ["home", () => L.homeLayout, "widgets", "#ffd36b", "#ff8a3d"],
  ["chat", () => L.chatDesign, "chat", "#6ef08d", "#17a84d"],
  ["dock", () => L.dock, "launchpad", "#9aa6bb", "#4f5a70"],
  ["youtube", () => "YouTube", "play", "#ff6b6b", "#d91c1c"],
  ["performance", () => L.performance, "sliders", "#8e9cff", "#4b5ae0"],
  ["about", () => L.aboutShort, "info", "#c9ced8", "#868d9b"],
];
function openSettings(section) {
  openApp("customize", { section });
}
function mountCustomize(win) {
  const nav = h("nav", { class: "mdos-set-nav", "aria-label": L.settingsTitle });
  const pane = h("div", { class: "mdos-set-pane" });
  const group = (title, ...kids) => h("section", { class: "mdos-set-group" }, title ? h("h3", { text: title }) : null, ...kids);
  const row = (label, control) => h("div", { class: "mdos-set-row" }, h("span", { text: label }), control);
  const hint = (text) => h("p", { class: "mdos-set-hint", text });
  const btn = (text, onclick, primary) => h("button", { type: "button", class: `mdos-btn${primary ? " mdos-btn--primary" : ""}`, text, onclick });
  const show = (id) => {
    win.rec.section = id;
    save();
    for (const b of nav.children) b.setAttribute("aria-current", String(b.dataset.section === id));
    pane.replaceChildren(...(SECTION_BUILDERS[id] || SECTION_BUILDERS.appearance)());
    pane.scrollTop = 0;
  };
  const SECTION_BUILDERS = {
    appearance: () => {
      const status = h("p", { class: "mdos-set-hint" });
      fetch("/api/themes", { credentials: "same-origin" })
        .then((r) => (r.ok ? r.json() : []))
        .then((list) => {
          const active = Array.isArray(list) ? list.find((t) => t.isActive) : null;
          const applied = doc.getElementById("marinara-custom-theme");
          status.textContent = `${L.themeNow}: ${applied && active ? active.name : L.themeNone}`;
        })
        .catch(() => (status.textContent = ""));
      return [
        group(
          null,
          settingToggle("themeSync", L.themeSync, (on) => {
            if (on) updateSetting("accent", "theme");
            show("appearance");
          }),
          status,
          hint(L.themeSyncHint),
        ),
        group(L.accent, accentRow()),
        group(
          L.customize,
          row(L.iconStyle, settingSelect("iconStyle", Object.entries(L.iconStyles))),
          row(L.iconShape, settingSelect("iconShape", Object.entries(L.iconShapes))),
          settingToggle("iconView", L.iconView),
          h("div", { class: "mdos-row" }, btn(L.editIcons, () => openIconPicker())),
        ),
        group(
          L.cursor,
          row(L.cursor, settingSelect("cursor", Object.entries(L.cursors), () => show("appearance"))),
          !["system", "custom"].includes(state.cursor) ? row(L.cursorSize, settingSelect("cursorSize", Object.entries(L.cursorSizes))) : null,
          state.cursor === "custom"
            ? h(
                "div",
                { class: "mdos-row" },
                btn(L.cursorImage, () =>
                  pickCursorImage((data) => {
                    if (storeImage(() => (images.cursor = data))) applyCursor();
                  }),
                ),
              )
            : null,
          hint(L.cursorHint),
        ),
      ];
    },
    wallpaper: () => [group(L.wallpaper, wallpaperSwatches(), ...wallpaperImageControls())],
    home: () => [
      group(
        L.layoutMode,
        segmented(Object.entries(L.layoutModes), state.layoutMode, (v) => {
          updateSetting("layoutMode", v);
          renderWidgets();
        }),
      ),
      group(
        L.homeLayout,
        row(L.boardPos, segmented(Object.entries(L.boardPositions), state.board, (v) => updateSetting("board", v))),
        settingToggle("showCredits", L.showCredits),
        settingToggle("showFeed", L.showFeed),
        h(
          "div",
          { class: "mdos-row" },
          btn(L.arrangeIcons, () => {
            for (const d of state.desk) d.x = d.y = null;
            save();
            renderWidgets();
          }),
          btn(L.arrangeWidgets, () => {
            for (const w of state.widgets) w.x = w.y = null, (w.manual = false);
            save();
            renderWidgets();
          }),
        ),
      ),
      group(
        L.editWidgets,
        h(
          "div",
          { class: "mdos-row" },
          btn(L.editWidgets, () => setEditMode(true), true),
          btn(`${L.addApps}…`, (e) => openAddApps(e.currentTarget)),
          btn(`${L.addBookmark}…`, (e) => openBookmarkForm(e.currentTarget)),
        ),
      ),
    ],
    chat: () => chatDesignSection(win, { group, row, hint, btn, rerender: () => show("chat") }),
    dock: () => [
      group(
        L.dock,
        row(
          L.dockSize,
          h("input", {
            type: "range",
            min: "40",
            max: "80",
            step: "2",
            value: String(state.dockSize),
            "aria-label": L.dockSize,
            oninput: (e) => updateSetting("dockSize", Number(e.target.value)),
          }),
        ),
        settingToggle("dockAutohide", L.autohide),
        settingToggle("magnify", L.magnify),
        settingToggle("dockRecents", L.recents),
      ),
    ],
    youtube: () => {
      const key = h("input", {
        type: "password",
        class: "mdos-input",
        placeholder: L.ytApiKey,
        autocomplete: "off",
        value: state.yt.apiKey || "",
        onchange: (e) => {
          state.yt.apiKey = e.target.value.trim();
          save();
        },
      });
      return [
        group(
          L.ytMode,
          segmented(Object.entries(L.ytModes), state.yt.mode, (v) => {
            state.yt.mode = v;
            save();
            for (const w of appWins.values()) if (w.rec.type === "youtube") w.refresh?.(true);
            show("youtube");
          }),
          state.yt.mode === "api" ? field(L.ytApiKey, key) : null,
          state.yt.mode === "api" ? hint(L.ytApiHint) : null,
          state.yt.mode === "account" ? hint(L.ytAccountHint) : null,
          state.yt.mode === "account"
            ? h(
                "div",
                { class: "mdos-row" },
                btn(L.ytLogin, () => openExternal("https://accounts.google.com/ServiceLogin?service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2F"), true),
                btn(L.ytOpenSite, () => openExternal("https://www.youtube.com/")),
              )
            : null,
        ),
      ];
    },
    performance: () => [
      group(
        L.performance,
        settingToggle("realGlass", L.realGlass),
        settingToggle("reduceTransparency", L.reduceTransparency),
        settingToggle("reduceMotion", L.reduceMotion),
        settingToggle("bootSplash", L.bootSplash),
      ),
    ],
    about: () => [
      group(
        "Marinara Desktop 2.2.0",
        hint(L.aboutBody),
        h("dl", { class: "mdos-about-keys" }, ...L.shortcutList.flatMap(([k, v]) => [h("dt", { text: k }), h("dd", { text: v })])),
        h("div", { class: "mdos-row" }, btn(L.classic, () => setEnabled(false)), isDesktop() ? btn(L.resetLayout, resetLayout) : null),
      ),
    ],
  };
  for (const [id, label, icon, g1, g2] of SET_SECTIONS) {
    nav.append(
      h(
        "button",
        { type: "button", class: "mdos-set-nav-item", "data-section": id, onclick: () => show(id) },
        h("span", { class: "mdos-app-icon", style: `--g1:${g1};--g2:${g2}`, svg: svg(icon) }),
        h("span", { text: label() }),
      ),
    );
  }
  win.body.append(h("div", { class: "mdos-set" }, nav, pane));
  win.refresh = () => {
    if (win.rec.section && nav.querySelector(`[aria-current="true"]`)?.dataset.section !== win.rec.section) show(win.rec.section);
  };
  win.openSection = show;
  show(win.rec.section || "appearance");
}

// Chat design: presets, controls and a live preview; changes also apply to
// the real chat behind the window as you make them.
function chatDesignSection(win, { group, row, hint, btn, rerender }) {
  const target = win.rec.chatTarget || "convo";
  const spec = state.chat[target];
  const commit = (patch, redraw = false) => {
    Object.assign(spec, patch);
    for (const k of Object.keys(spec)) if (spec[k] === "" || spec[k] == null) delete spec[k];
    save();
    applyChatStyle();
    if (redraw) rerender();
  };
  const toHex = (value, fallback) => {
    const c = toColor(value) || toColor(fallback) || "rgb(0, 0, 0)";
    const m = c.match(/[\d.]+/g) || [0, 0, 0];
    return `#${m.slice(0, 3).map((v) => Number(v).toString(16).padStart(2, "0")).join("")}`;
  };
  const color = (key, fallback) =>
    h("input", { type: "color", class: "mdos-color", value: toHex(spec[key], fallback), oninput: (e) => commit({ [key]: e.target.value }) });
  const range = (key, min, max, step, fallback, unit = "") => {
    const out = h("output", { text: `${spec[key] ?? fallback}${unit}` });
    return h(
      "div",
      { class: "mdos-set-range" },
      h("input", {
        type: "range",
        min: String(min),
        max: String(max),
        step: String(step),
        value: String(spec[key] ?? fallback),
        oninput: (e) => {
          out.textContent = `${e.target.value}${unit}`;
          commit({ [key]: Number(e.target.value) });
        },
      }),
      out,
    );
  };
  const fontPicker = () => {
    const sel = h("select", {
      class: "mdos-cc-select",
      onchange: (e) => commit({ font: e.target.value }, true),
    });
    for (const [v, label] of Object.entries(L.fonts)) sel.append(h("option", { value: v, text: label, selected: (spec.font || "") === v }));
    const custom = h("input", {
      type: "text",
      class: "mdos-input",
      placeholder: L.customFont,
      value: spec.customFont || "",
      onchange: (e) => commit({ customFont: e.target.value.trim() }),
    });
    return [row(L.font, sel), spec.font === "custom" ? custom : null];
  };
  const preview = h(
    "div",
    { class: `mdos-cv-preview mdos-cv-preview--${target}`, "aria-label": L.preview },
    target === "convo"
      ? [
          h("div", { class: "mdos-pv-row mdos-pv-them" }, h("span", { class: "mdos-pv-avatar" }), h("div", { class: "mdos-pv-col" }, h("small", { class: "mdos-pv-name", text: "Mari" }), h("p", { class: "mdos-pv-bubble", text: L.pvThem }), h("p", { class: "mdos-pv-bubble", text: L.pvThem2 }))),
          h("div", { class: "mdos-pv-row mdos-pv-me" }, h("p", { class: "mdos-pv-bubble", text: L.pvMe })),
        ]
      : [
          h("small", { class: "mdos-pv-name", text: "MARI" }),
          h("p", { class: "mdos-pv-rp" }, L.pvRpNar, h("em", { text: L.pvRpAct }), " ", h("span", { class: "mdos-pv-dlg", text: L.pvRpDlg })),
        ],
  );
  const out = [
    group(
      null,
      segmented(
        [
          ["convo", L.convo],
          ["rp", L.roleplay],
        ],
        target,
        (v) => {
          win.rec.chatTarget = v;
          save();
          rerender();
        },
      ),
      preview,
    ),
  ];
  if (target === "convo") {
    out.push(
      group(
        L.presets,
        h(
          "div",
          { class: "mdos-row" },
          ...Object.entries(L.cvPresets).map(([id, label]) =>
            btn(label, () => {
              state.chat.convo = { ...CV_PRESETS[id] };
              save();
              applyChatStyle();
              rerender();
            }),
          ),
        ),
        row(L.convoStyle, settingSelect("convoStyle", [["messages", L.convoMessages], ["marinara", L.convoMarinara]])),
      ),
      group(
        L.font,
        ...fontPicker(),
        row(L.textSize, range("size", 12, 22, 1, 15, "px")),
        row(L.corner, range("radius", 2, 26, 1, 18, "px")),
        row(L.columnWidth, range("width", 520, 1200, 20, 860, "px")),
      ),
      group(
        L.myBubble,
        row(L.myBubble, color("me", "var(--mdos-accent)")),
        row(L.bubbleText, color("meFg", "#ffffff")),
        row(L.theirBubble, color("them", "var(--mdos-bubble-other)")),
        row(L.bubbleText, color("themFg", "var(--mdos-bubble-other-fg)")),
      ),
      group(
        L.chatBg,
        segmented(Object.entries(L.chatBgModes), spec.bgMode || "", (v) => commit({ bgMode: v }, true)),
        spec.bgMode === "color" ? row(L.chatBg, color("bg", "var(--mdos-win-bg)")) : null,
        spec.bgMode === "image"
          ? btn(L.pickImage, () =>
              pickImage(
                (data) => {
                  if (storeImage(() => (images.chatBg = data))) applyChatStyle();
                },
                { maxSide: 1600, maxBytes: 260_000 },
              ),
            )
          : null,
        row(L.avatars, segmented(Object.entries(L.avatarModes), spec.avatars || "circle", (v) => commit({ avatars: v }))),
        h(
          "label",
          { class: "mdos-cc-toggle" },
          h("span", { text: L.showNames }),
          h("input", { type: "checkbox", role: "switch", checked: spec.names !== false, onchange: (e) => commit({ names: e.target.checked ? "" : false }) }),
        ),
      ),
    );
  } else {
    out.push(
      group(
        L.presets,
        h(
          "div",
          { class: "mdos-row" },
          ...Object.entries(L.rpPresets).map(([id, label]) =>
            btn(label, () => {
              const { style, ...rest } = RP_PRESETS[id];
              state.chat.rp = { ...rest };
              updateSetting("rpStyle", style);
              applyChatStyle();
              rerender();
            }),
          ),
        ),
        row(L.rpStyle, settingSelect("rpStyle", [["book", L.rpBook], ["night", L.rpNight], ["clean", L.rpClean]], () => rerender())),
      ),
      group(
        L.font,
        ...fontPicker(),
        row(L.textSize, range("size", 13, 24, 1, 16, "px")),
        row(L.lineHeight, range("line", 1.3, 2.4, 0.05, 1.8)),
        row(L.columnWidth, range("width", 480, 1000, 20, 640, "px")),
        row(L.sideMargin, range("gutter", 0, 48, 2, 14, "px")),
        hint(L.sideMarginHint),
        row(
          L.lineWrap,
          segmented(
            [
              ["", L.wrapChars],
              ["words", L.wrapWords],
            ],
            spec.wrap || "",
            (v) => commit({ wrap: v }),
          ),
        ),
        hint(L.lineWrapHint),
      ),
      group(
        L.readerLayout,
        ...[
          ["justify", L.justify, !!spec.justify, (on) => ({ justify: on || "" })],
          ["actItalic", L.actItalic, !spec.actUpright, (on) => ({ actUpright: on ? "" : true })],
          ["actions", L.actionsHover, !spec.actionsAlways, (on) => ({ actionsAlways: on ? "" : true })],
        ].map(([key, label, checked, patch]) =>
          h(
            "label",
            { class: "mdos-cc-toggle", "data-key": key },
            h("span", { text: label }),
            h("input", { type: "checkbox", role: "switch", checked, onchange: (e) => commit(patch(e.target.checked)) }),
          ),
        ),
      ),
      group(L.paper, row(L.paper, color("paper", "var(--mdos-paper)")), row(L.ink, color("ink", "var(--mdos-ink)"))),
      group(
        L.textTone,
        h(
          "label",
          { class: "mdos-cc-toggle" },
          h("span", { text: L.textTone }),
          h("input", {
            type: "checkbox",
            role: "switch",
            checked: !!state.rpTone,
            onchange: (e) => {
              updateSetting("rpTone", e.target.checked);
              rerender();
            },
          }),
        ),
        hint(L.textToneHint),
        state.rpTone ? row(L.dlgColor, color("dlg", "var(--mdos-rp-dlg-c)")) : null,
        state.rpTone ? row(L.narColor, color("nar", "var(--mdos-rp-nar-c)")) : null,
        state.rpTone ? row(L.actColor, color("act", "var(--mdos-rp-act-c)")) : null,
      ),
    );
  }
  out.push(
    h(
      "div",
      { class: "mdos-row" },
      btn(L.resetChat, () => {
        state.chat[target] = {};
        if (target === "convo" && images.chatBg) {
          images.chatBg = "";
          saveImages();
        }
        save();
        applyChatStyle();
        rerender();
      }),
    ),
  );
  return out;
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
      h("p", { class: "mdos-about-version", text: "2.2.0" }),
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
  // In edit mode each icon gets − (take off the home screen) and ◀ ▶ (move).
  sbApps.replaceChildren(
    ...springboardApps().map((a, i) =>
      h(
        "div",
        { class: "mdos-sb-cell" },
        appTile(a, i, (picked) => {
          if (!editMode) launch(picked.id);
        }),
        h("button", {
          type: "button",
          class: "mdos-wg-badge mdos-wg-remove",
          "aria-label": L.removeFromHome,
          text: "−",
          onclick: () => hideFromHome(a.id),
        }),
        h(
          "div",
          { class: "mdos-sb-move" },
          h("button", { type: "button", "aria-label": "◀", text: "◀", onclick: () => moveSpringboardApp(a.id, -1) }),
          h("button", { type: "button", "aria-label": "▶", text: "▶", onclick: () => moveSpringboardApp(a.id, 1) }),
        ),
      ),
    ),
  );
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
    // Tagged here instead of a CSS :has() rule, which the browser would
    // re-check on every DOM change anywhere on the page.
    el.parentElement?.setAttribute("data-mdos-tip-row", "");
  }
  // Chat-mode tabs (Conversation / Roleplay / Game) show only their icons;
  // the label stays as the tooltip and accessible name.
  for (const b of $$(".mari-chat-sidebar [data-chat-mode-tab]:not([data-mdos-icon-tab])")) {
    const label = b.textContent.trim();
    b.setAttribute("data-mdos-icon-tab", "");
    if (!b.title) {
      b.title = label;
      b.setAttribute("data-mdos-set-title", "");
    }
    if (!b.hasAttribute("aria-label")) b.setAttribute("aria-label", label);
  }
}

// ── Settings, wallpaper, clock ────────────────────────────────

function updateSetting(key, value) {
  state[key] = value;
  applySettings();
  save();
}
// ── Theme library sync ────────────────────────────────────────
//
// Marinara injects the theme applied in Settings → Appearance → Theme library
// as <style id="marinara-custom-theme">. We read its root-level variables,
// resolve them to real colours and feed them to our design: accent, window
// surfaces, text, font, and the "theme" wallpaper. Our own token overrides
// on <html> don't affect this, because we read the theme's CSS text itself.

let themePalette = {};
let themeCssSeen = null;
const colorProbe = h("span", { style: "display:none" });
ui.append(colorProbe);
function toColor(value) {
  if (!value) return null;
  colorProbe.style.color = "";
  colorProbe.style.color = value;
  if (!colorProbe.style.color) return null;
  const out = getComputedStyle(colorProbe).color;
  return out && out !== "rgba(0, 0, 0, 0)" ? out : null;
}
const luminance = (rgb) => {
  const m = (rgb || "").match(/[\d.]+/g);
  if (!m) return 0.5;
  const [r, g, b] = m.slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
function readThemeVars(cssText) {
  const vars = {};
  let font = null;
  const sheet = new CSSStyleSheet();
  try {
    sheet.replaceSync(cssText.replace(/@import[^;]+;/g, ""));
  } catch {
    return { vars, font };
  }
  const dark = html.dataset.theme !== "light";
  const rootish = /^(:root|html|body|\[data-theme(=["']?(light|dark)["']?)?\]|:root\[data-theme(=["']?(light|dark)["']?)?\]|html\[data-theme(=["']?(light|dark)["']?)?\])$/i;
  const visit = (rules) => {
    for (const rule of rules) {
      if (rule.cssRules && !rule.selectorText) {
        visit(rule.cssRules); // @media / @supports blocks
        continue;
      }
      if (!rule.selectorText || !rule.style) continue;
      const parts = rule.selectorText.split(",").map((s) => s.trim());
      const applies = parts.some((p) => {
        if (!rootish.test(p)) return false;
        if (/light/i.test(p)) return !dark;
        if (/dark/i.test(p)) return dark;
        return true;
      });
      if (!applies) continue;
      for (const name of rule.style) {
        if (name.startsWith("--")) vars[name] = rule.style.getPropertyValue(name).trim();
        else if (name === "font-family") font = rule.style.getPropertyValue(name).trim();
      }
    }
  };
  visit(sheet.cssRules);
  return { vars, font };
}
function resolveVars(value, vars, depth = 0) {
  if (!value || depth > 6) return value;
  return value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g, (_, name, fallback) =>
    vars[name] != null ? resolveVars(vars[name], vars, depth + 1) : fallback != null ? resolveVars(fallback.trim(), vars, depth + 1) : "",
  );
}
function computeThemePalette() {
  const style = doc.getElementById("marinara-custom-theme");
  const cssText = style?.textContent || "";
  const palette = {};
  if (cssText) {
    const { vars, font } = readThemeVars(cssText);
    const pick = (...names) => {
      for (const n of names) {
        const c = toColor(resolveVars(vars[n], vars));
        if (c) return c;
      }
      return null;
    };
    palette.accent = pick("--marinara-app-accent-solid", "--marinara-app-accent-static", "--primary", "--marinara-chat-chrome-accent");
    palette.bg = pick("--background");
    palette.card = pick("--card", "--popover");
    palette.fg = pick("--foreground", "--card-foreground");
    palette.muted = pick("--muted-foreground");
    palette.sidebar = pick("--sidebar", "--card");
    // Decor: a background picture or gradient the theme paints behind the app.
    const paint = resolveVars(vars["--marinara-app-background-paint"] || "", vars);
    if (/url\(|gradient\(/i.test(paint)) palette.decor = paint;
    if (font) palette.font = resolveVars(font, vars).replace(/!important/g, "").trim() || null;
    palette.name = style.dataset.themeName || null;
  }
  // No custom theme (or it sets no accent): Marinara's own accent setting.
  palette.accent ||= toColor(html.style.getPropertyValue("--marinara-app-accent-static").trim()) || null;
  return palette;
}
function themeWallpaperCss() {
  const p = themePalette;
  if (p.decor) return p.decor;
  const accent = p.accent || "#0a84ff";
  const bg = p.bg || "#2b1242";
  const light = luminance(bg) > 0.5;
  return light
    ? `radial-gradient(100% 80% at 15% 10%, color-mix(in srgb, ${accent} 35%, white) 0%, transparent 60%), radial-gradient(90% 80% at 88% 22%, color-mix(in srgb, ${accent} 55%, white) 0%, transparent 62%), linear-gradient(180deg, ${bg}, color-mix(in srgb, ${bg} 85%, ${accent}))`
    : `radial-gradient(100% 80% at 15% 10%, color-mix(in srgb, ${accent} 70%, white) 0%, transparent 55%), radial-gradient(90% 80% at 88% 22%, ${accent} 0%, transparent 60%), linear-gradient(170deg, color-mix(in srgb, ${bg} 70%, ${accent}), ${bg})`;
}
const SYNC_VARS = ["--mdos-win-bg", "--mdos-card", "--mdos-fg", "--mdos-fg-2", "--mdos-panel-bg", "--mdos-sidebar-vib", "--mdos-ui-font"];
function applyThemeSync() {
  themePalette = computeThemePalette();
  const p = themePalette;
  const on = state.themeSync;
  const set = (name, value) => (on && value ? setVar(name, value) : html.style.removeProperty(name));
  // Surfaces follow the theme only when it defines them; text stays readable.
  set("--mdos-win-bg", p.bg);
  set("--mdos-card", p.card);
  set("--mdos-fg", p.bg && p.fg ? p.fg : null);
  set("--mdos-fg-2", p.bg && p.muted ? p.muted : null);
  set("--mdos-panel-bg", p.sidebar || p.bg);
  set("--mdos-sidebar-vib", p.sidebar ? `color-mix(in srgb, ${p.sidebar} 80%, transparent)` : null);
  set("--mdos-ui-font", p.font ? `${p.font}, -apple-system, "Segoe UI", Pretendard, "Malgun Gothic", system-ui, sans-serif` : null);
  toggleClass("mdos-theme-sync", on);
}
function refreshTheme() {
  const css = doc.getElementById("marinara-custom-theme")?.textContent || "";
  const key = `${css.length}:${css.slice(0, 200)}:${html.dataset.theme}:${html.style.getPropertyValue("--marinara-app-accent-static")}`;
  if (key === themeCssSeen) return;
  themeCssSeen = key;
  applyThemeSync();
  applyAccent();
  applyWallpaper();
  applyChatStyle();
}
// Theme switches replace the <style> in <head>; light/dark flips data-theme.
const themeObserver = new MutationObserver(() => refreshTheme());
themeObserver.observe(doc.head, { childList: true, subtree: true, characterData: true });
themeObserver.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

function applyAccent() {
  const accent = ACCENTS.find((a) => a.id === state.accent) || ACCENTS[0];
  const color = accent.theme ? themePalette.accent || "#0a84ff" : accent.color;
  toggleClass("mdos-accent", !!color);
  setVar("--mdos-accent", color || "var(--primary)");
  cursorAccent = color || "#0a84ff";
  applyCursor();
}
// ── Mouse pointer ─────────────────────────────────────────────
// Drawn as small SVGs (or the user's own PNG) and set on <html>, so every
// element that doesn't ask for its own cursor (resize edges, grab handles,
// text fields) shows it. Links and buttons get --mdos-cur-ptr.
let cursorAccent = "#0a84ff";
const CURSOR_PX = { m: 24, l: 34, xl: 48 };
const ARROW_PATH = "M5 2.5v17.2l4.3-4.1 2.7 6.2 2.8-1.2-2.7-6.1h6z";
function cursorCss(svg, px, hx, hy, fallback) {
  const url = `data:image/svg+xml,${encodeURIComponent(svg.replace(/SIZE/g, px))}`;
  return `url("${url}") ${Math.round(hx * px / 24)} ${Math.round(hy * px / 24)}, ${fallback}`;
}
function arrowSvg(fill, stroke) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="SIZE" height="SIZE" viewBox="0 0 24 24"><path d="${ARROW_PATH}" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
}
function dotSvg(fill, r) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="SIZE" height="SIZE" viewBox="0 0 24 24"><circle cx="12" cy="12" r="${r}" fill="${fill}" stroke="#fff" stroke-opacity="0.9" stroke-width="1.2"/></svg>`;
}
function applyCursor() {
  const kind = state.cursor || "system";
  const px = CURSOR_PX[state.cursorSize] || 24;
  const accent = /^#[0-9a-f]{3,8}$|^rgb/i.test(cursorAccent) ? cursorAccent : "#0a84ff";
  let cur = "";
  let ptr = "pointer";
  if (kind === "mac") cur = cursorCss(arrowSvg("#000", "#fff"), px, 5, 2.5, "default");
  else if (kind === "white") cur = cursorCss(arrowSvg("#fff", "#000"), px, 5, 2.5, "default");
  else if (kind === "accent") cur = ptr = cursorCss(arrowSvg(accent, "#fff"), px, 5, 2.5, "default");
  else if (kind === "dot") {
    cur = cursorCss(dotSvg("rgba(60,60,67,0.5)", 7), px, 12, 12, "default");
    ptr = cursorCss(dotSvg(accent, 9), px, 12, 12, "pointer");
  } else if (kind === "custom" && images.cursor) cur = ptr = `url(${JSON.stringify(images.cursor)}) 0 0, default`;
  toggleClass("mdos-cursor", !!cur && mode !== "off");
  if (cur) {
    setVar("--mdos-cur", cur);
    setVar("--mdos-cur-ptr", ptr);
  } else {
    html.style.removeProperty("--mdos-cur");
    html.style.removeProperty("--mdos-cur-ptr");
  }
}
// The user's own pointer: a PNG (keeps transparency) no larger than 64 px.
function pickCursorImage(onPicked) {
  const input = h("input", { type: "file", accept: "image/*", hidden: true });
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 64 / Math.max(bitmap.width, bitmap.height));
      const canvas = doc.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close?.();
      onPicked(canvas.toDataURL("image/png"));
    } catch (error) {
      marinara.log.warn("Pointer image failed", error);
      window.alert(L.tooLarge);
    }
  });
  doc.body.append(input);
  input.click();
}
function applyWallpaper() {
  const image = images.wallpaper;
  const wp = WALLPAPERS.find((w) => w.id === state.wallpaper) || WALLPAPERS[0];
  const css = image ? `center / cover no-repeat url(${JSON.stringify(image)}), #111` : wp.id === "theme" ? themeWallpaperCss() : wp.css;
  setVar("--mdos-wallpaper", css);
  const tone = image ? "dark" : wp.id === "theme" ? (luminance(themePalette.bg) > 0.5 && !themePalette.decor ? "light" : "dark") : wp.dark === false ? "light" : "dark";
  html.dataset.mdosWallpaperTone = tone;
}

// ── Chat design ───────────────────────────────────────────────

const FONT_STACKS = {
  system: "var(--mdos-ui-font)",
  serif: '"Iowan Old Style", "Palatino Linotype", Georgia, "Nanum Myeongjo", "Noto Serif KR", Batang, serif',
  rounded: '"SF Pro Rounded", Nunito, "NanumSquareRound", Jua, "Arial Rounded MT Bold", var(--mdos-ui-font)',
  hand: '"Nanum Pen Script", Gaegu, "Segoe Print", "Comic Sans MS", cursive',
  mono: 'ui-monospace, "SF Mono", D2Coding, Consolas, monospace',
};
const fontStack = (spec) => {
  if (!spec?.font) return null;
  if (spec.font === "theme") return themePalette.font || null;
  if (spec.font === "custom") return spec.customFont ? `${JSON.stringify(spec.customFont.replace(/["\\]/g, ""))}, var(--mdos-ui-font)` : null;
  return FONT_STACKS[spec.font] || null;
};
const CV_PRESETS = {
  base: {},
  yellow: { me: "#fee500", meFg: "#191919", them: "#ffffff", themFg: "#191919", bgMode: "color", bg: "#b2c7da", radius: 16 },
  green: { me: "#06c755", meFg: "#ffffff", them: "#ffffff", themFg: "#1d1d1f", bgMode: "color", bg: "#8fb3dd", radius: 20 },
  dark: { me: "", them: "#2c2c2e", themFg: "#f5f5f7", bgMode: "color", bg: "#000000" },
  pastel: { me: "#ffc8dd", meFg: "#5a2a3a", them: "#e2f0cb", themFg: "#2f4a1f", bgMode: "color", bg: "#fff7fb", radius: 22, font: "rounded" },
};
const RP_PRESETS = {
  book: { style: "book" },
  parchment: { style: "book", paper: "#efe0bf", ink: "#3b2a14", font: "serif", justify: true },
  night: { style: "night" },
  typewriter: { style: "book", paper: "#f6f5ef", ink: "#222222", font: "mono", size: 15, line: 1.7 },
  novel: { style: "book", paper: "#ffffff", ink: "#3a3a3c" },
};
// Fonts uploaded in Marinara (Settings → fonts) are registered through the
// FontFace API a moment after start-up, when the chat text is already laid
// out, and the browser doesn't always go back and use them: the chat font
// looked unset until it was typed in again. When the set of registered fonts
// changes, the font stack switches to an equivalent spelling, which makes the
// text pick the new faces up.
let fontBump = false;
let fontCount = doc.fonts?.size ?? 0;
function refreshChatFonts() {
  const n = doc.fonts?.size ?? 0;
  if (n === fontCount) return;
  fontCount = n;
  if (!state.chat.rp.font && !state.chat.convo.font) return;
  fontBump = !fontBump;
  applyChatStyle();
}
function applyChatStyle() {
  const cv = state.chat.convo;
  const rp = state.chat.rp;
  const v = (name, value) => (value ? setVar(name, value) : html.style.removeProperty(name));
  // fontBump flips an equivalent spelling of the stack (see refreshChatFonts).
  const bumped = (stack) => (stack && fontBump ? `${stack}, sans-serif` : stack);
  v("--mdos-cv-font", bumped(fontStack(cv)));
  v("--mdos-cv-size", cv.size ? `${cv.size}px` : null);
  v("--mdos-cv-me", cv.me);
  v("--mdos-cv-me-fg", cv.meFg);
  v("--mdos-cv-them", cv.them);
  v("--mdos-cv-them-fg", cv.themFg);
  v("--mdos-cv-radius", cv.radius != null && cv.radius !== "" ? `${cv.radius}px` : null);
  v("--mdos-cv-width", cv.width ? `${cv.width}px` : null);
  v("--mdos-cv-bg", cv.bgMode === "color" ? cv.bg : cv.bgMode === "image" && images.chatBg ? `center / cover no-repeat url(${JSON.stringify(images.chatBg)})` : null);
  html.dataset.mdosCvBg = cv.bgMode || "";
  html.dataset.mdosCvAvatar = cv.avatars || "circle";
  toggleClass("mdos-cv-no-names", cv.names === false);
  v("--mdos-rp-font", bumped(fontStack(rp)));
  v("--mdos-rp-size", rp.size ? `${rp.size}px` : null);
  v("--mdos-rp-line", rp.line ? String(rp.line) : null);
  v("--mdos-rp-paper", rp.paper);
  v("--mdos-rp-ink", rp.ink);
  v("--mdos-rp-width", rp.width ? `${rp.width}px` : null);
  v("--mdos-rp-dlg", rp.dlg);
  v("--mdos-rp-nar", rp.nar);
  v("--mdos-rp-act", rp.act);
  html.dataset.mdosRpJustify = rp.justify ? "on" : "";
  html.dataset.mdosRpWrap = rp.wrap === "words" ? "words" : "";
  v("--mdos-rp-gutter", rp.gutter != null && rp.gutter !== "" ? `${rp.gutter}px` : null);
  html.dataset.mdosRpActions = rp.actionsAlways ? "" : "hover";
  html.dataset.mdosRpActItalic = rp.actUpright ? "off" : "";
  html.dataset.mdosRpTone = state.rpTone ? "on" : "";
  if (!state.rpTone) CSS.highlights?.delete("mdos-dlg");
  scanDialogue(true);
}

// ── Roleplay text tones ───────────────────────────────────────
// Dialogue in quotes is plain text in Marinara's roleplay messages, so it is
// coloured with the CSS Custom Highlight API: ranges over the existing text,
// no DOM changes (React keeps owning the message markup). Narration and
// *actions* (<em>) are coloured in apps.css.
const DLG_RE = /"[^"\n]{1,800}"|“[^”\n]{1,800}”|「[^」\n]{1,800}」|『[^』\n]{1,800}』/g;
const DLG_SKIP = 'code, pre, [class*="mrpc-"]';
const dlgCache = new WeakMap();
let dlgCount = -1;
function dialogueRanges(el) {
  const nodes = [];
  let text = "";
  let lastBlock = null;
  const walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest(DLG_SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    // A paragraph break ends any open quote.
    const block = n.parentElement?.closest("p, li, blockquote, div, h1, h2, h3, h4");
    if (lastBlock && block !== lastBlock) text += "\n";
    lastBlock = block;
    nodes.push([n, text.length]);
    text += n.data;
  }
  const at = (pos, isEnd) => {
    let i = nodes.length - 1;
    while (i > 0 && (isEnd ? nodes[i][1] >= pos : nodes[i][1] > pos)) i--;
    return [nodes[i][0], pos - nodes[i][1]];
  };
  const ranges = [];
  for (const m of text.matchAll(DLG_RE)) {
    const r = new Range();
    r.setStart(...at(m.index, false));
    r.setEnd(...at(m.index + m[0].length, true));
    ranges.push(r);
  }
  return ranges;
}
function scanDialogue(force = false) {
  if (!state.rpTone || !CSS.highlights || typeof Highlight === "undefined" || mode === "off") return;
  const els = $$('[data-chat-mode="roleplay"] .mari-message-content');
  let changed = force || els.length !== dlgCount;
  const all = [];
  for (const el of els) {
    const key = el.textContent;
    let c = dlgCache.get(el);
    if (!c || c.key !== key || (c.ranges[0] && !c.ranges[0].startContainer.isConnected)) {
      c = { key, ranges: dialogueRanges(el) };
      dlgCache.set(el, c);
      changed = true;
    }
    all.push(...c.ranges);
  }
  dlgCount = els.length;
  if (changed) CSS.highlights.set("mdos-dlg", new Highlight(...all));
}
function applySettings() {
  applyThemeSync();
  applyAccent();
  applyWallpaper();
  applyChatStyle();
  html.dataset.mdosLayout = state.layoutMode;
  setVar("--mdos-dock-size", `${state.dockSize}px`);
  toggleClass("mdos-dock-autohide", !!state.dockAutohide);
  toggleClass("mdos-icon-view", !!state.iconView);
  toggleClass("mdos-main-min", !!state.mainMinimized);
  toggleClass("mdos-no-blur", !!state.reduceTransparency);
  toggleClass("mdos-real-glass", !!state.realGlass && !state.reduceTransparency);
  toggleClass("mdos-no-credits", !state.showCredits);
  toggleClass("mdos-no-feed", !state.showFeed);
  html.dataset.mdosBoard = state.board;
  toggleClass("mdos-calm", reducedMotion());
  html.dataset.mdosIconStyle = state.iconStyle;
  html.dataset.mdosIconShape = state.iconShape;
  applyCursor();
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
returnPill.setAttribute("data-exd", ""); // never tucked into a launcher drawer
doc.body.append(returnPill);

function refreshMode() {
  const next = computeMode();
  toggleClass("mdos-classic", !state.enabled && innerWidth >= MIN_VIEWPORT);
  toggleClass("mdos-tablet", next === "touch" && innerWidth >= 700);
  if (next === mode) return;
  const prev = mode;
  mode = next;
  toggleClass("mdos", next !== "off");
  applyCursor();
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
    // Small-app windows come back where they were (their state is saved).
    renderAllApps();
    applyAllRects();
  } else {
    widgetLayer.replaceChildren();
    removeAllAppWins();
    appLayer.remove();
  }
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
  if (on) raf(fitBoard);
  if (on && state.mainMinimized) setMainMinimized(false);
  if (on) focusTopVisible();
  updateMenubar();
}

// ── Sync with Marinara's own state ────────────────────────────

const prevOpen = { chats: null, panel: null };
let lastPanel = null;
let syncTimer = 0;
let lastSync = 0;
let lastCreditScrape = -1e9;
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
  refreshChatFonts();
  ensureAppLayer();
  // Tagged here (not CSS :has) for the "show wallpaper" chat background.
  toggleClass("mdos-in-convo", !!$('[data-chat-mode="conversation"]'));
  toggleClass("mdos-in-rp", !!$('[data-chat-mode="roleplay"]'));
  const appOpen = state.apps.some((a) => !a.min);
  // The home screen stays styled under open sheets: a sheet sliding away must
  // reveal our home, not Marinara's default one. Only the Dock and the home
  // indicator follow whether a sheet is open (mdos-touch-sheet).
  toggleClass("mdos-touch-home", isTouch() && onHome && !appOpen);
  toggleClass("mdos-touch-sheet", isTouch() && !!$(SEL.sheets));
  if (homeVisible()) readHomeApps();
  const hubApp = !!hubAppTab();
  toggleClass("mdos-hub-app", hubApp);
  refreshLocker();
  tintHubApp(hubApp);
  if (onHome && performance.now() - lastCreditScrape > 2500) {
    lastCreditScrape = performance.now();
    scrapeCredits();
  }

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
// Performance: we never watch the page's child nodes, so a streaming reply,
// which rewrites the transcript many times a second, costs nothing here.
// Navigation flips a few aria attributes on Marinara's buttons and panels;
// those wake a sync right away. Anything else (an editor or sheet mounting)
// is caught by a cheap check every 700 ms, skipped while the tab is hidden.
const observer = new MutationObserver(() => syncSoon());
observer.observe(hostRoot || doc.body, {
  subtree: true,
  attributes: true,
  attributeFilter: ["aria-pressed", "aria-hidden", "aria-selected", "data-shell-overlay-mode"],
});
const pollTimer = marinara.setInterval(() => {
  if (!doc.hidden && !gesture) syncSoon();
}, 700);
const viewTimer = marinara.setInterval(watchMainView, 800);
const dlgTimer = marinara.setInterval(() => {
  if (!doc.hidden && !gesture) scanDialogue();
}, 1200);

// ── Global listeners ──────────────────────────────────────────

on(doc, "pointerdown", onPointerDown, true);
on(window, "pointermove", onPointerMove, { passive: true });
on(window, "pointerup", onPointerUp);
on(window, "pointercancel", onPointerUp);
on(doc, "dblclick", onDoubleClick, true);
on(doc, "contextmenu", onContextMenu);
// Marinara's own Home button clears the chat but keeps an app agent's tab
// selected, so inside Otome Hearth or Story Writer it seemed to do nothing.
on(
  doc,
  "click",
  (event) => {
    if (mode === "off" || !(event.target instanceof Element) || !event.target.closest(SEL.homeBtn)) return;
    if (hubAppTab()) marinara.setTimeout(() => leaveHubApp() && syncSoon(), 0);
  },
  true,
);
// Tap an info icon to show its tip on touch screens (mouse users just hover).
on(doc, "click", (event) => {
  const tip = event.target instanceof Element ? event.target.closest("[data-mdos-tip]") : null;
  for (const open of $$("[data-mdos-tip-open]")) if (open !== tip) open.removeAttribute("data-mdos-tip-open");
  if (tip) tip.toggleAttribute("data-mdos-tip-open");
});
on(doc, "securitypolicyviolation", (event) => {
  if (!/^(frame|child)-src/.test(event.effectiveDirective || event.violatedDirective || "")) return;
  const origin = originOf(event.blockedURI);
  if (!origin || frameBlocked.has(origin)) return;
  frameBlocked.add(origin);
  for (const w of appWins.values()) if (w.rec.type === "browser") w.refresh?.();
});
let resizeTimer = 0;
on(window, "resize", () => {
  marinara.clearTimeout(resizeTimer);
  resizeTimer = marinara.setTimeout(() => {
    refreshMode();
    if (isDesktop()) {
      renderWidgets();
      applyAllRects();
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
    { id: "mdos-boot", "aria-hidden": "true", "data-exd": "" },
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
  themeObserver.disconnect();
  marinara.clearInterval(clockTimer);
  marinara.clearInterval(viewTimer);
  marinara.clearInterval(pollTimer);
  marinara.clearInterval(dlgTimer);
  CSS.highlights?.delete("mdos-dlg");
  marinara.clearTimeout(syncTimer);
  marinara.clearTimeout(dockHideTimer);
  // Flush anything still waiting to be saved (a note typed a moment ago).
  for (const [timer, key, value] of [
    [saveTimer, "desktop", state],
    [imageTimer, "desktopImages", images],
    [notesTimer, "desktopNotes", notesStore],
  ]) {
    if (!timer) continue;
    marinara.clearTimeout(timer);
    marinara.storage.patch({ [key]: value }).catch(() => {});
  }
  disposers.forEach((dispose) => dispose());
  removeChrome();
  removeSpringboard();
  removeAllAppWins();
  appLayer.remove();
  for (const el of $$("[data-mdos-tip]")) {
    for (const a of ["data-mdos-tip", "data-mdos-tip-open", "tabindex", "role", "aria-label"]) el.removeAttribute(a);
  }
  for (const el of $$("[data-mdos-tip-row]")) el.removeAttribute("data-mdos-tip-row");
  for (const el of $$("[data-mdos-icon-tab]")) {
    el.removeAttribute("data-mdos-icon-tab");
    el.removeAttribute("aria-label");
    if (el.hasAttribute("data-mdos-set-title")) el.removeAttribute("title");
    el.removeAttribute("data-mdos-set-title");
  }
  ui.remove();
  wallpaper.remove();
  widgetLayer.remove();
  returnPill.remove();
  for (const cls of [...html.classList]) if (cls.startsWith("mdos")) html.classList.remove(cls);
  for (const key of Object.keys(html.dataset)) if (key.startsWith("mdos")) delete html.dataset[key];
  for (const name of [...html.style]) if (name.startsWith("--mdos-")) html.style.removeProperty(name);
};
