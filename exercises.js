/**
 * GymPulse Exercise Database - Thai TikTok Edition
 * รวมคอร์สเวทเทรนนิ่งแยกย่อย อกบน/อกกลาง/อกล่าง
 * พร้อมรูปถ่ายสัดส่วนกล้ามเนื้อคมชัดสวยงาม และคลิปสั้น TikTok จากโค้ชคนไทย
 */

const EXERCISE_CATEGORIES = {
  chest: {
    nameTh: 'อก',
    emoji: '🛡️',
    subCategories: [
      { id: 'upper', nameTh: 'อกบน' },
      { id: 'mid', nameTh: 'อกกลาง' },
      { id: 'lower', nameTh: 'อกล่าง' }
    ]
  },
  back: {
    nameTh: 'หลัง',
    emoji: '🦅',
    subCategories: [
      { id: 'lats', nameTh: 'ปีกหลัง' },
      { id: 'thickness', nameTh: 'หลังกลาง' },
      { id: 'lower', nameTh: 'หลังล่าง' }
    ]
  },
  legs: {
    nameTh: 'ขา & ก้น',
    emoji: '🦵',
    subCategories: [
      { id: 'quads', nameTh: 'ต้นขาหน้า' },
      { id: 'hamstrings', nameTh: 'ต้นขาหลัง' },
      { id: 'glutes', nameTh: 'สะโพก & ก้น' }
    ]
  },
  shoulders: {
    nameTh: 'หัวไหล่',
    emoji: '🥋',
    subCategories: [
      { id: 'front', nameTh: 'ไหล่หน้า' },
      { id: 'side', nameTh: 'ไหล่ข้าง' },
      { id: 'rear', nameTh: 'ไหล่หลัง' }
    ]
  },
  arms: {
    nameTh: 'แขน',
    emoji: '💪',
    subCategories: [
      { id: 'biceps', nameTh: 'แขนหน้า' },
      { id: 'triceps', nameTh: 'แขนหลัง' }
    ]
  },
  core: {
    nameTh: 'หน้าท้อง & แกนกลาง',
    emoji: '🧱',
    subCategories: [
      { id: 'upper_abs', nameTh: 'หน้าท้องบน' },
      { id: 'lower_abs', nameTh: 'หน้าท้องล่าง' }
    ]
  }
};

const EXERCISE_DATABASE = [
  // ==========================================
  // หมวด: อก (CHEST) - อกบน, อกกลาง, อกล่าง
  // ==========================================

  // --- 1. อกบน ---
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    nameTh: 'อินไคลน์ ดัมเบลเพรส',
    muscle: 'chest',
    subCategory: 'upper',
    subCategoryNameTh: 'อกบน',
    equipment: 'Dumbbells & ม้านั่งเอียง',
    difficulty: 'ปานกลาง',
    targetMuscles: 'อกบน, ไหล่หน้า',
    muscleHighlightTh: 'อกบน',
    actionPoseTh: 'กำลังนอนดันดัมเบล (สีแดง = อกบน)',
    photoUrl: 'images/incline_action.jpg',
    coachTips: {
      setup: 'ปรับเบาะม้านั่งประมาณ 30-45 องศา (ถ้าชันเกิน 45 องศาจะไปโดนไหล่หน้าแทน)',
      execution: 'ตอนดันขึ้นให้ใช้แรงจากอกบนบีบเข้าหากัน ไม่ดันดัมเบลมาชนกันแรงๆ',
      commonMistakes: 'อย่ากางข้อศอก 90 องศา จะทำให้หัวไหล่บาดเจ็บ ให้หุบศอกเฉียงลง 60 องศา',
      breathing: 'หย่อนดัมเบลลงหายใจเข้า ดันขึ้นพร้อมหายใจออก'
    },
    tiktokGuide: {
      creatorName: 'ฟ้าใส Fit Junctions',
      creatorHandle: '@fitjunctions',
      viewsText: '🔥 1.5M วิวบน TikTok',
      title: 'วิธีเล่นอกบน Incline Press ให้โดนเต็มๆ ไม่เจ็บไหล่',
      videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/สอนเล่นอกบน'
    }
  },
  {
    id: 'incline-barbell-press',
    name: 'Incline Barbell Bench Press',
    nameTh: 'อินไคลน์ บาร์เบลเพรส',
    muscle: 'chest',
    subCategory: 'upper',
    subCategoryNameTh: 'อกบน',
    equipment: 'Barbell & ม้านั่งเอียง',
    difficulty: 'ยาก',
    targetMuscles: 'อกบน, ไหล่หน้า, แขนหลัง',
    muscleHighlightTh: 'อกบน',
    actionPoseTh: 'กำลังนอนยกบาร์เบล (สีแดง = อกบน)',
    photoUrl: 'images/incline_action.jpg',
    coachTips: {
      setup: 'วางเท้าให้แน่นกับพื้น ดึงสะบักลงติดเบาะ ล็อกตัวมั่นคง',
      execution: 'ลดบาร์ลงมาแตะบริเวณกระดูกไหปลาร้าหรืออกส่วนบนช้าๆ อย่างควบคุม',
      commonMistakes: 'ระวังอย่าแอ่นหลังล่างมากเกินไปจนกลายเป็นเล่นอกกลาง',
      breathing: 'ลดบาร์ลงหายใจเข้า - ดันบาร์ขึ้นหายใจออก'
    },
    tiktokGuide: {
      creatorName: 'Trainer Tae สอนเวท',
      creatorHandle: '@trainer_tae',
      viewsText: '🔥 890K วิวบน TikTok',
      title: 'แก้ปัญหาเล่นอกบนแล้วไม่โดน สำหรับมือใหม่',
      videoUrl: 'https://www.youtube.com/embed/0xR4s659E80',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/inclinebenchpress'
    }
  },
  {
    id: 'low-to-high-cable-fly',
    name: 'Low-to-High Cable Fly',
    nameTh: 'เคเบิลฟลาย ดึงล่างขึ้นบน',
    muscle: 'chest',
    subCategory: 'upper',
    subCategoryNameTh: 'อกบน',
    equipment: 'Cable Machine',
    difficulty: 'ง่าย-ปานกลาง',
    targetMuscles: 'อกบนด้านในและร่องอกบน สร้างทรงอกแน่น',
    muscleHighlightTh: 'อกบน & ร่องอกบน',
    actionPoseTh: 'กำลังดึงสายเคเบิล (สีแดง = อกบน)',
    photoUrl: 'images/incline_action.jpg',
    coachTips: {
      setup: 'ตั้งรอกเคเบิลไว้ตำแหน่งต่ำสุด ก้าวขาข้างหนึ่งมาข้างหน้าเพื่อความมั่นคง',
      execution: 'ดึงมือจับขึ้นในแนวเฉียงจากล่างขึ้นมาระดับอกบน บีบเกร็งอกค้าง 1 วินาที',
      commonMistakes: 'อย่าใช้แรงเหวี่ยงจากลำตัว ให้ล็อกข้อศอกงอเล็กน้อยคงที่',
      breathing: 'ดึงขึ้นหายใจออก คืนตัวช้าๆ หายใจเข้า'
    },
    tiktokGuide: {
      creatorName: 'Coach Bank ปั้นหุ่น',
      creatorHandle: '@coach_bank_muscle',
      viewsText: '🔥 640K วิวบน TikTok',
      title: 'ท่าปั้นร่องอกบนด้วยสายเคเบิล คมชัดทรงสวย',
      videoUrl: 'https://www.youtube.com/embed/Iwe6AmxVf7o',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/cablefly'
    }
  },

  // --- 2. อกกลาง ---
  {
    id: 'flat-barbell-bench-press',
    name: 'Barbell Flat Bench Press',
    nameTh: 'แฟลต บาร์เบล เบนช์เพรส',
    muscle: 'chest',
    subCategory: 'mid',
    subCategoryNameTh: 'อกกลาง',
    equipment: 'Barbell & ม้านั่งราบ',
    difficulty: 'ปานกลาง',
    targetMuscles: 'อกกลาง (สร้างความหนาและขนาดอกหลัก)',
    muscleHighlightTh: 'อกกลาง',
    actionPoseTh: 'กำลังนอนดันบาร์เบล (สีแดง = อกกลาง)',
    photoUrl: 'images/bench_action.jpg',
    coachTips: {
      setup: 'วางเท้าให้ติดพื้น ดึงสะบักหลังแนบชิดเบาะ แอ่นอกขึ้นเล็กน้อย',
      execution: 'ลดบาร์ลงมาแตะบริเวณราวนมอย่างนุ่มนวล แล้วดันขึ้นตรงๆ ห้ามยักไหล่',
      commonMistakes: 'ก้นลอยจากเบาะ หรือปล่อยบาร์กระแทกหน้าอกแรงๆ',
      breathing: 'ลดบาร์ลงหายใจเข้า - ดันขึ้นหายใจออก'
    },
    tiktokGuide: {
      creatorName: 'ฟ้าใส Fit Junctions',
      creatorHandle: '@fitjunctions',
      viewsText: '🔥 2.3M วิวบน TikTok',
      title: 'สอน Bench Press ฟอร์มถูกต้อง ไม่เจ็บไหล่ แรงไม่ตก',
      videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/benchpress'
    }
  },
  {
    id: 'flat-dumbbell-fly',
    name: 'Dumbbell Flat Fly',
    nameTh: 'ดัมเบลฟลาย ม้านั่งราบ',
    muscle: 'chest',
    subCategory: 'mid',
    subCategoryNameTh: 'อกกลาง',
    equipment: 'Dumbbells & ม้านั่งราบ',
    difficulty: 'ง่าย',
    targetMuscles: 'อกกลางและการยืดขยายขนาดกล้ามเนื้ออก',
    muscleHighlightTh: 'อกกลาง & ร่องอก',
    actionPoseTh: 'กำลังนอนกางหุบดัมเบล (สีแดง = อกกลาง)',
    photoUrl: 'images/bench_action.jpg',
    coachTips: {
      setup: 'นอนราบบนเบาะ งอข้อศอกเล็กน้อยคงที่ตลอดเวลา',
      execution: 'กางแขนออกช้าๆ ให้รู้สึกตึงที่อก แล้วหุบแขนเข้าหากันเหมือนกำลังกอดต้นไม้',
      commonMistakes: 'อย่าใช้น้ำหนักที่หนักเกินไป เพราะจะเสี่ยงต่อเอ็นข้อต่อไหล่ฉีกขาด',
      breathing: 'กางแขนออกหายใจเข้า - หุบแขนเข้าหายใจออก'
    },
    tiktokGuide: {
      creatorName: 'Trainer Tae สอนเวท',
      creatorHandle: '@trainer_tae',
      viewsText: '🔥 1.1M วิวบน TikTok',
      title: 'เล่นดัมเบลฟลายยังไงให้ปลอดภัย ได้ร่องอกเน้นๆ',
      videoUrl: 'https://www.youtube.com/embed/eozdVDA78K0',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/dumbbellfly'
    }
  },

  // --- 3. อกล่าง ---
  {
    id: 'chest-dips',
    name: 'Chest Dips',
    nameTh: 'เชสต์ ดิปส์',
    muscle: 'chest',
    subCategory: 'lower',
    subCategoryNameTh: 'อกล่าง',
    equipment: 'บาร์คู่ (Dip Station)',
    difficulty: 'ยาก',
    targetMuscles: 'ขอบอกล่างให้คมชัด, แขนหลัง',
    muscleHighlightTh: 'อกล่าง',
    actionPoseTh: 'กำลังโหนบาร์คู่ดิปส์ (สีแดง = อกล่าง)',
    photoUrl: 'images/dips_action.jpg',
    coachTips: {
      setup: 'โน้มตัวไปข้างหน้าประมาณ 30 องศา และเก็บคางชิดอก (ถ้าตัวตั้งตรงจะไปโดนแขนหลังแทน)',
      execution: 'หย่อนตัวลงมาช้าๆ จนข้อศอกทำมุม 90 องศา แล้วดันตัวขึ้น บีบอกล่าง',
      commonMistakes: 'อย่าหย่อนตัวลงลึกเกินไปจะทำให้เจ็บหน้าไหล่',
      breathing: 'หย่อนตัวลงหายใจเข้า - ดันตัวขึ้นหายใจออก'
    },
    tiktokGuide: {
      creatorName: 'ครูพี่เบิร์ด Sixpack Creator',
      creatorHandle: '@sixpack_creator',
      viewsText: '🔥 950K วิวบน TikTok',
      title: 'ดิปส์ยังไงให้โดนอกล่าง ตัดขอบอกคมชัด ไม่ปวดไหล่',
      videoUrl: 'https://www.youtube.com/embed/2z8JmcrW-As',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/สอนดิปส์'
    }
  },
  {
    id: 'high-to-low-cable-fly',
    name: 'High-to-Low Cable Fly',
    nameTh: 'เคเบิลฟลาย ดึงบนลงล่าง',
    muscle: 'chest',
    subCategory: 'lower',
    subCategoryNameTh: 'อกล่าง',
    equipment: 'Cable Machine',
    difficulty: 'ง่าย',
    targetMuscles: 'อกล่าง และสร้างเส้นขอบอกชัดเจน',
    muscleHighlightTh: 'อกล่าง & ตัดขอบอก',
    actionPoseTh: 'กำลังดึงสายเคเบิล (สีแดง = อกล่าง)',
    photoUrl: 'images/dips_action.jpg',
    coachTips: {
      setup: 'ตั้งรอกเคเบิลไว้ด้านบนสุด โน้มตัวไปข้างหน้าเล็กน้อย',
      execution: 'ดึงสายเคเบิลลงมาตัดกันที่บริเวณด้านล่างหน้าสะโพก บีบเกร็งอกล่าง',
      commonMistakes: 'อย่าใช้แรงเหวี่ยงจากลำตัว ให้ควบคุมจังหวะคืนสายช้าๆ',
      breathing: 'ดึงลงมาหายใจออก - ผ่อนมือขึ้นหายใจเข้า'
    },
    tiktokGuide: {
      creatorName: 'Coach Bank ปั้นหุ่น',
      creatorHandle: '@coach_bank_muscle',
      viewsText: '🔥 780K วิวบน TikTok',
      title: 'เทคนิคปั้นอกล่างด้วยสายเคเบิลแบบเซียน',
      videoUrl: 'https://www.youtube.com/embed/taI4XduLpTk',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/สอนเล่นอกล่าง'
    }
  },

  // ==========================================
  // หมวด: หลัง (BACK)
  // ==========================================
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    nameTh: 'แลท พูลดาวน์',
    muscle: 'back',
    subCategory: 'lats',
    subCategoryNameTh: 'ปีกหลัง',
    equipment: 'Lat Pulldown Machine',
    difficulty: 'ง่าย-ปานกลาง',
    targetMuscles: 'ปีกหลัง สร้างหลังกว้าง V-Shape',
    muscleHighlightTh: 'ปีกหลัง',
    actionPoseTh: 'กำลังดึงบาร์ลงมาหาราวนม (สีแดง = ปีกหลัง)',
    photoUrl: 'images/lat_action.jpg',
    coachTips: {
      setup: 'ปรับเบาะให้ล็อกขาพอดี จับบาร์กว้างกว่าไหล่เล็กน้อย แอ่นอกหาบาร์',
      execution: 'ดึงบาร์ลงมาหาราวนมบน ใช้ศอกดึงลง ไม่ใช้ข้อมือกระชาก',
      commonMistakes: 'เอนตัวไปข้างหลังมากเกินไปจนกลายเป็นดึงหลังกลาง',
      breathing: 'ดึงบาร์ลงหายใจออก - ปล่อยบาร์ขึ้นช้าๆ หายใจเข้า'
    },
    tiktokGuide: {
      creatorName: 'ฟ้าใส Fit Junctions',
      creatorHandle: '@fitjunctions',
      viewsText: '🔥 1.8M วิวบน TikTok',
      title: 'ดึง Lat Pulldown ยังไงให้ลงปีก ไม่ปวดแขน',
      videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/latpulldown'
    }
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    nameTh: 'บาร์เบล โรว์',
    muscle: 'back',
    subCategory: 'thickness',
    subCategoryNameTh: 'หลังกลาง',
    equipment: 'Barbell',
    difficulty: 'ยาก',
    targetMuscles: 'หลังส่วนกลาง, กล้ามเนื้อสะบัก, ปีก',
    muscleHighlightTh: 'หลังกลาง',
    actionPoseTh: 'กำลังพับสะโพกดึงบาร์เบล (สีแดง = หลังกลาง)',
    photoUrl: 'images/lat_action.jpg',
    coachTips: {
      setup: 'พับสะโพกไปข้างหลัง หลังตรงทำมุม 45 องศา เกร็งหน้าท้องแน่น',
      execution: 'ดึงบาร์เข้าหาช่วงสะดือ บีบสะบักเข้าหากันแน่นๆ',
      commonMistakes: 'ห้ามหลังค่อมเด็ดขาด มิฉะนั้นจะเสี่ยงหมอนรองกระดูกบาดเจ็บ',
      breathing: 'ดึงขึ้นหายใจออก - ผ่อนลงหายใจเข้า'
    },
    tiktokGuide: {
      creatorName: 'Trainer Tae สอนเวท',
      creatorHandle: '@trainer_tae',
      viewsText: '🔥 920K วิวบน TikTok',
      title: 'เทคนิค Barbell Row ฟอร์มหลังตรงปลอดภัย โดนหลังเต็มๆ',
      videoUrl: 'https://www.youtube.com/embed/9efgc2WgPW4',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/barbellrow'
    }
  },

  // ==========================================
  // หมวด: ขา & ก้น (LEGS & GLUTES)
  // ==========================================
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    nameTh: 'บาร์เบล สควอท',
    muscle: 'legs',
    subCategory: 'quads',
    subCategoryNameTh: 'ต้นขาหน้า',
    equipment: 'Barbell & Squat Rack',
    difficulty: 'ยาก',
    targetMuscles: 'ต้นขาหน้า, ก้น, แกนกลางลำตัว',
    muscleHighlightTh: 'ต้นขาหน้า & ก้น',
    actionPoseTh: 'กำลังย่อสควอทหลังตรง (สีแดง = ต้นขาหน้า & ก้น)',
    photoUrl: 'images/squat_action.jpg',
    coachTips: {
      setup: 'วางบาร์บนบ่าหลัง กางเท้ากว้างระดับไหล่ ปลายเท้าเฉียงออก 20 องศา',
      execution: 'ทิ้งสะโพกลงเหมือนนั่งเก้าอี้ ย่อลงจนต้นขาขนานพื้น แล้วถีบขึ้นผ่านส้นเท้า',
      commonMistakes: 'ระวังอย่าให้หัวเข่ายุบเข้าด้านในขณะดันตัวขึ้น',
      breathing: 'ย่อตัวลงหายใจเข้ากลั้นไว้ - ดันขึ้นพ้นจุดยากหายใจออก'
    },
    tiktokGuide: {
      creatorName: 'ฟ้าใส Fit Junctions',
      creatorHandle: '@fitjunctions',
      viewsText: '🔥 3.1M วิวบน TikTok',
      title: 'สควอทยังไงไม่ให้ปวดเข่า ฟอร์มมาตรฐานนักกีฬา',
      videoUrl: 'https://www.youtube.com/embed/bEv6CCg2BC8',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/สอนสควอท'
    }
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    nameTh: 'โรมาเนียน เดดลิฟต์',
    muscle: 'legs',
    subCategory: 'hamstrings',
    subCategoryNameTh: 'ต้นขาหลัง',
    equipment: 'Barbell หรือ Dumbbells',
    difficulty: 'ปานกลาง-ยาก',
    targetMuscles: 'ต้นขาด้านหลัง และกล้ามเนื้อก้น',
    muscleHighlightTh: 'ต้นขาหลัง & ก้น',
    actionPoseTh: 'กำลังพับสะโพกโน้มตัว (สีแดง = ต้นขาหลัง & ก้น)',
    photoUrl: 'images/squat_action.jpg',
    coachTips: {
      setup: 'ยืนเท้ากว้างระดับสะโพก ปลดล็อกเข่าเล็กน้อยคงที่ตลอดเวลา',
      execution: 'ดันสะโพกไปข้างหลังให้มากที่สุด ลดบาร์ลงแนบหน้าขาจนตึงขาหลังเต็มที่',
      commonMistakes: 'อย่าย่อเข่าเหมือนสควอท และห้ามหลังงอ',
      breathing: 'หย่อนตัวลงหายใจเข้า - ดันสะโพกกลับมาข้างหน้าหายใจออก'
    },
    tiktokGuide: {
      creatorName: 'Alita Pear ปั้นก้น',
      creatorHandle: '@alita_pear',
      viewsText: '🔥 1.7M วิวบน TikTok',
      title: 'สอนเล่น RDL โดนก้นและขาหลังเต็มๆ ก้นกลมสวย',
      videoUrl: 'https://www.youtube.com/embed/JCXUYuzwNrM',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/สอนrdl'
    }
  },

  // ==========================================
  // หมวด: ไหล่ (SHOULDERS)
  // ==========================================
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    nameTh: 'ดัมเบล แลทเทอรัลเรส',
    muscle: 'shoulders',
    subCategory: 'side',
    subCategoryNameTh: 'ไหล่ข้าง',
    equipment: 'Dumbbells',
    difficulty: 'ปานกลาง',
    targetMuscles: 'หัวไหล่ด้านข้าง สร้างไหล่กว้าง V-Shape',
    muscleHighlightTh: 'หัวไหล่ข้าง',
    actionPoseTh: 'กำลังกางแขนยกดัมเบล (สีแดง = หัวไหล่ข้าง)',
    photoUrl: 'images/lateral_raise_action.jpg',
    coachTips: {
      setup: 'ยืนโน้มตัวไปข้างหน้าเล็กน้อย 10 องศา งอข้อศอกเล็กน้อย',
      execution: 'กางแขนออกโดยเน้นยกด้วยข้อศอก ยกขึ้นมาระดับเดียวกับไหล่',
      commonMistakes: 'อย่ายักบ่าหรือเหวี่ยงตัว ใช้ดัมเบลเบาๆ แต่โฟกัสบีบเกร็ง',
      breathing: 'ยกขึ้นหายใจออก - ลดลงช้าๆ หายใจเข้า'
    },
    tiktokGuide: {
      creatorName: 'Trainer Tae สอนเวท',
      creatorHandle: '@trainer_tae',
      viewsText: '🔥 1.4M วิวบน TikTok',
      title: 'เทคนิคเล่น Lateral Raise ให้ไหล่กว้าง ไม่เจ็บบ่า',
      videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/lateralraise'
    }
  },

  // ==========================================
  // หมวด: แขน (ARMS)
  // ==========================================
  {
    id: 'barbell-bicep-curl',
    name: 'Barbell Biceps Curl',
    nameTh: 'บาร์เบล ไบเซพส์เคิร์ล',
    muscle: 'arms',
    subCategory: 'biceps',
    subCategoryNameTh: 'แขนหน้า',
    equipment: 'Barbell หรือ EZ-Bar',
    difficulty: 'ง่าย',
    targetMuscles: 'กล้ามเนื้อต้นแขนด้านหน้า',
    muscleHighlightTh: 'แขนหน้า',
    actionPoseTh: 'กำลังพับข้อศอกยกบาร์ (สีแดง = แขนหน้า)',
    photoUrl: 'images/lateral_raise_action.jpg',
    coachTips: {
      setup: 'ยืนตรง ล็อกข้อศอกแนบข้างลำตัว ไม่ขยับศอกไปข้างหน้าหรือหลัง',
      execution: 'ยกบาร์ขึ้นโดยใช้แรงแขนหน้า บีบเกร็งค้างไว้ 1 วินาทีที่จุดสูงสุด',
      commonMistakes: 'อย่าโยกหลังช่วยยก หากยกไม่ไหวให้ลดน้ำหนักลง',
      breathing: 'ยกบาร์ขึ้นหายใจออก - ลดลงช้าๆ หายใจเข้า'
    },
    tiktokGuide: {
      creatorName: 'ฟ้าใส Fit Junctions',
      creatorHandle: '@fitjunctions',
      viewsText: '🔥 1.9M วิวบน TikTok',
      title: 'ยกแขนหน้ายังไงให้โดน ไม่ปวดหลังล่าง แขนแน่นขึ้นเร็ว',
      videoUrl: 'https://www.youtube.com/embed/kwG2ipFRgfo',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/bicepcurltips'
    }
  },
  {
    id: 'triceps-rope-pushdown',
    name: 'Triceps Rope Pushdown',
    nameTh: 'ไตรเซพส์ โรปพุชดาวน์',
    muscle: 'arms',
    subCategory: 'triceps',
    subCategoryNameTh: 'แขนหลัง',
    equipment: 'Cable Machine & เชือก',
    difficulty: 'ง่าย',
    targetMuscles: 'ต้นแขนด้านหลัง สร้างแขนใหญ่เต็มเสื้อ',
    muscleHighlightTh: 'แขนหลัง',
    actionPoseTh: 'กำลังกดเชือกเคเบิล (สีแดง = แขนหลัง)',
    photoUrl: 'images/dips_action.jpg',
    coachTips: {
      setup: 'โน้มตัวไปข้างหน้าเล็กน้อย ล็อกข้อศอกแนบข้างลำตัวแน่นๆ',
      execution: 'กดเชือกลงตรงๆ พร้อมกางปลายเชือกออกด้านล่างสุดเพื่อบีบแขนหลัง',
      commonMistakes: 'ระวังอย่าให้ข้อศอกขยับลอยขึ้นลงตามแรงเคเบิล',
      breathing: 'กดลงหายใจออก - คืนตัวช้าๆ หายใจเข้า'
    },
    tiktokGuide: {
      creatorName: 'Coach Bank ปั้นหุ่น',
      creatorHandle: '@coach_bank_muscle',
      viewsText: '🔥 850K วิวบน TikTok',
      title: 'กดเชือกแขนหลังให้โดนสะใจ แขนใหญ่เต็มแขนเสื้อ',
      videoUrl: 'https://www.youtube.com/embed/vB5OHsJ3EME',
      tiktokSearchUrl: 'https://www.tiktok.com/tag/tricepspushdown'
    }
  }
];
