/**
 * GymPulse - Fitness Rest, Workout Course & Thai TikTok Video Library
 * Optimized for Thai Gym Enthusiasts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- APPLICATION STATE ---
  let mode = 'WORKOUT'; // 'WORKOUT' | 'REST'
  let isTimerRunning = false;
  
  let totalWorkoutSeconds = 0;
  let setWorkoutSeconds = 0;
  
  let restTotalSeconds = 60;
  let restRemainingSeconds = 0;
  
  let currentSet = 1;
  let historyLogs = [];
  
  let soundEnabled = true;
  let wakeLockActive = false;
  let wakeLockSentinel = null;
  
  let timerInterval = null;
  let audioCtx = null;

  // Routine & Recovery State
  let yesterdayMuscle = 'chest';
  let activeRoutineMuscle = 'chest';
  let selectedRoutineExerciseIds = new Set();
  let activeRoutine = [];
  let currentRoutineIndex = 0;

  // Library Filter State
  let currentLibraryMainFilter = 'chest';
  let currentLibrarySubFilter = 'all';

  // --- DOM ELEMENTS ---
  const navTabs = document.querySelectorAll('.nav-tab');
  const viewContents = document.querySelectorAll('.view-content');

  // Timer View
  const modeBadge = document.getElementById('mode-badge');
  const setCounter = document.getElementById('set-counter');
  const progressCircle = document.getElementById('progress-ring-circle');
  const mainTimerLabel = document.getElementById('main-timer-label');
  const mainTimerDisplay = document.getElementById('main-timer-display');
  const subTimerDisplay = document.getElementById('sub-timer-display');
  const btnPrimaryAction = document.getElementById('btn-primary-action');
  const btnToggleWorkout = document.getElementById('btn-toggle-workout');
  const btnResetWorkout = document.getElementById('btn-reset-workout');
  const presetButtons = document.querySelectorAll('.btn-preset');
  const customSecondsInput = document.getElementById('custom-seconds');
  const btnApplyCustom = document.getElementById('btn-apply-custom');
  const activeRestControls = document.getElementById('active-rest-controls');
  const btnAdd15 = document.getElementById('btn-add-15');
  const btnAdd30 = document.getElementById('btn-add-30');
  const btnSkipRest = document.getElementById('btn-skip-rest');

  // Header Elements
  const btnNotification = document.getElementById('btn-notification');
  const notiIndicator = document.getElementById('noti-indicator');
  const notiBanner = document.getElementById('noti-banner');
  const btnRequestNoti = document.getElementById('btn-request-noti');
  const btnSound = document.getElementById('btn-sound');
  const soundIcon = document.getElementById('sound-icon');
  const btnWakelock = document.getElementById('btn-wakelock');
  const wakelockIcon = document.getElementById('wakelock-icon');

  // Active Exercise Banner in Timer
  const activeExerciseBanner = document.getElementById('active-exercise-banner');
  const activeExName = document.getElementById('active-ex-name');
  const activeExThumb = document.getElementById('active-ex-thumb');
  const activeExMuscle = document.getElementById('active-ex-muscle');
  const btnNextExercise = document.getElementById('btn-next-exercise');

  // Plan & Muscle Recovery Elements
  const muscleSelectBtns = document.querySelectorAll('.btn-muscle-select');
  const recoveryStatusIcon = document.getElementById('recovery-status-icon');
  const recoveryStatusTitle = document.getElementById('recovery-status-title');
  const recoveryStatusDesc = document.getElementById('recovery-status-desc');
  const todayMuscleTabs = document.querySelectorAll('.today-muscle-tabs .tab-chip');
  const routinePickerList = document.getElementById('routine-picker-list');
  const selectedExCount = document.getElementById('selected-exercise-count');
  const btnLaunchRoutine = document.getElementById('btn-launch-routine');

  // Library Elements
  const filterChips = document.querySelectorAll('.filter-chip');
  const subFilterContainer = document.getElementById('sub-filter-container');
  const exerciseCardsContainer = document.getElementById('exercise-cards-container');

  // Minimalist Exercise Modal Elements
  const videoModal = document.getElementById('video-modal');
  const modalVideoTitle = document.getElementById('modal-video-title');
  const modalEnglishTitle = document.getElementById('modal-english-title');
  const modalPhysiqueImg = document.getElementById('modal-physique-img');
  const modalMuscleTargetTh = document.getElementById('modal-muscle-target-th');
  const modalTiktokLink = document.getElementById('modal-tiktok-link');
  const modalVideoBtnText = document.getElementById('modal-video-btn-text');
  const modalCueSetup = document.getElementById('modal-cue-setup');
  const modalCueExec = document.getElementById('modal-cue-exec');
  const modalCueMistake = document.getElementById('modal-cue-mistake');
  const modalCueBreath = document.getElementById('modal-cue-breath');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalAddRoutine = document.getElementById('btn-modal-add-routine');
  let currentModalExercise = null;

  // History Elements
  const statTotalSets = document.getElementById('stat-total-sets');
  const statTotalTime = document.getElementById('stat-total-time');
  const logList = document.getElementById('log-list');
  const btnClearHistory = document.getElementById('btn-clear-history');

  // Circular Progress Calculations
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;

  // --- INITIALIZE ---
  initApp();

  function initApp() {
    loadSettingsAndHistory();
    checkNotificationPermission();
    updateUI();
    startMasterTimer();

    setupNavigation();
    setupRecoveryAdvisor();
    setupRoutineBuilder();
    setupExerciseLibrary();
    setupVideoModal();
    setupHorizontalMouseScroll();
  }

  // Smooth Mouse Wheel Horizontal Scrolling for Filter and Tab Chips
  function setupHorizontalMouseScroll() {
    const scrollContainers = [
      document.querySelector('.today-muscle-tabs'),
      document.querySelector('.filter-scroll-container'),
      document.getElementById('sub-filter-container')
    ];

    scrollContainers.forEach(container => {
      if (!container) return;
      container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    });
  }

  // --- TAB NAVIGATION ---
  function setupNavigation() {
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetViewId = tab.dataset.view;
        switchView(targetViewId);
      });
    });
  }

  function switchView(viewId) {
    navTabs.forEach(t => {
      if (t.dataset.view === viewId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    viewContents.forEach(view => {
      if (view.id === viewId) {
        view.classList.remove('hidden');
        view.classList.add('active');
      } else {
        view.classList.add('hidden');
        view.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- RECOVERY ADVISOR ---
  function setupRecoveryAdvisor() {
    muscleSelectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const muscle = btn.dataset.muscle;
        yesterdayMuscle = muscle;
        updateRecoveryButtonsUI(muscle);
        calculateRecoveryAdvice(muscle);
        saveSettings();
      });
    });

    updateRecoveryButtonsUI(yesterdayMuscle);
    calculateRecoveryAdvice(yesterdayMuscle);
  }

  function updateRecoveryButtonsUI(selectedMuscle) {
    muscleSelectBtns.forEach(btn => {
      if (btn.dataset.muscle === selectedMuscle) {
        if (selectedMuscle === 'rest') {
          btn.classList.add('selected-rest');
        } else {
          btn.classList.add('selected');
        }
      } else {
        btn.classList.remove('selected');
        btn.classList.remove('selected-rest');
      }
    });
  }

  function calculateRecoveryAdvice(muscle) {
    switch (muscle) {
      case 'chest':
        recoveryStatusIcon.textContent = '🛡️';
        recoveryStatusTitle.textContent = 'กล้ามเนื้อ อก (บน/กลาง/ล่าง) กำลังพักฟื้น!';
        recoveryStatusDesc.innerHTML = `
          🔴 <strong>ควรงดซ้ำ:</strong> อกทุกส่วน (บน, กลาง, ล่าง) และแขนหลัง (ต้องการพัก 48 ชม.)<br>
          🟢 <strong>แนะนำเล่นวันนี้:</strong> <strong>หลัง (Back)</strong> หรือ <strong>ขา & ก้น (Legs)</strong>
        `;
        autoSelectTodayMuscle('back');
        break;

      case 'back':
        recoveryStatusIcon.textContent = '🦅';
        recoveryStatusTitle.textContent = 'กล้ามเนื้อ หลัง (ปีก/ความหนา) กำลังพักฟื้น!';
        recoveryStatusDesc.innerHTML = `
          🔴 <strong>ควรงดซ้ำ:</strong> ปีกหลัง, หลังส่วนกลาง และแขนหน้า (Biceps) (ต้องการพัก 48 ชม.)<br>
          🟢 <strong>แนะนำเล่นวันนี้:</strong> <strong>อก (Chest)</strong> หรือ <strong>ขา & ก้น (Legs)</strong>
        `;
        autoSelectTodayMuscle('chest');
        break;

      case 'legs':
        recoveryStatusIcon.textContent = '🦵';
        recoveryStatusTitle.textContent = 'กล้ามเนื้อ ขา & ก้น (Legs) ต้องการพักฟื้น 72 ชม.!';
        recoveryStatusDesc.innerHTML = `
          🔴 <strong>ควรงดซ้ำ:</strong> ต้นขาหน้า, ต้นขาหลัง และก้น<br>
          🟢 <strong>แนะนำเล่นวันนี้:</strong> <strong>ส่วนบน (Upper Body)</strong> เช่น อก (Chest) หรือ หลัง (Back)
        `;
        autoSelectTodayMuscle('chest');
        break;

      case 'shoulders':
        recoveryStatusIcon.textContent = '🥋';
        recoveryStatusTitle.textContent = 'หัวไหล่ (หน้า/ข้าง/หลัง) กำลังซ่อมแซมเส้นใย!';
        recoveryStatusDesc.innerHTML = `
          🔴 <strong>ควรงดซ้ำ:</strong> ท่า Overheads หรือเพรสหนักๆ<br>
          🟢 <strong>แนะนำเล่นวันนี้:</strong> <strong>ขา (Legs)</strong> หรือ <strong>หลัง (Back)</strong>
        `;
        autoSelectTodayMuscle('legs');
        break;

      case 'arms':
        recoveryStatusIcon.textContent = '💪';
        recoveryStatusTitle.textContent = 'แขนหน้า & แขนหลัง กำลังพักฟื้น';
        recoveryStatusDesc.innerHTML = `
          🔴 <strong>ควรงดซ้ำ:</strong> Biceps Curls และ Triceps Pushdowns<br>
          🟢 <strong>แนะนำเล่นวันนี้:</strong> <strong>ขา (Legs)</strong> หรือ <strong>แกนกลางลำตัว (Core)</strong>
        `;
        autoSelectTodayMuscle('legs');
        break;

      case 'core':
      case 'rest':
      default:
        recoveryStatusIcon.textContent = '⚡';
        recoveryStatusTitle.textContent = 'พักผ่อนเต็มที่! ร่างกายพร้อมลุย 100%';
        recoveryStatusDesc.innerHTML = `
          🟢 <strong>กล้ามเนื้อพร้อมเต็มที่:</strong> สามารถเลือกเล่น <strong>อก (Chest)</strong> หรือ <strong>ขา (Legs)</strong> ได้เต็มกำลัง!
        `;
        autoSelectTodayMuscle('chest');
        break;
    }
  }

  function autoSelectTodayMuscle(targetMuscle) {
    todayMuscleTabs.forEach(chip => {
      if (chip.dataset.target === targetMuscle) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    activeRoutineMuscle = targetMuscle;
    renderRoutinePicker(targetMuscle);
  }

  // --- ROUTINE BUILDER WITH SUB-CATEGORIES ---
  function setupRoutineBuilder() {
    todayMuscleTabs.forEach(chip => {
      chip.addEventListener('click', () => {
        todayMuscleTabs.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeRoutineMuscle = chip.dataset.target;
        renderRoutinePicker(activeRoutineMuscle);
      });
    });

    btnLaunchRoutine.addEventListener('click', launchActiveRoutine);
    btnNextExercise.addEventListener('click', goToNextRoutineExercise);
  }

  function renderRoutinePicker(muscle) {
    routinePickerList.innerHTML = '';
    const categoryInfo = EXERCISE_CATEGORIES[muscle];
    const subCategories = categoryInfo ? categoryInfo.subCategories : [];

    if (subCategories.length === 0) {
      const allMuscleExs = EXERCISE_DATABASE.filter(ex => ex.muscle === muscle);
      renderExerciseSubGroup(routinePickerList, 'รายการท่าฝึก', allMuscleExs);
    } else {
      subCategories.forEach(sub => {
        const subExercises = EXERCISE_DATABASE.filter(ex => ex.muscle === muscle && ex.subCategory === sub.id);
        if (subExercises.length > 0) {
          renderExerciseSubGroup(routinePickerList, sub.nameTh, subExercises);
        }
      });
    }

    updateRoutineSummary();
  }

  function renderExerciseSubGroup(container, title, exercises) {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'routine-subcat-group';
    
    const header = document.createElement('div');
    header.className = 'subcat-header';
    header.textContent = title;
    groupDiv.appendChild(header);

    exercises.forEach(ex => {
      const isChecked = selectedRoutineExerciseIds.has(ex.id);
      const item = document.createElement('div');
      item.className = `routine-item ${isChecked ? 'checked' : ''}`;
      item.innerHTML = `
        <div class="routine-item-left">
          <input type="checkbox" class="routine-checkbox" data-id="${ex.id}" ${isChecked ? 'checked' : ''}>
          <div class="routine-thumb-wrapper">
            <img src="${ex.photoUrl}" alt="${ex.name}" class="routine-thumb-img">
            <span class="routine-red-dot" title="สีแดงแสดงจุดกล้ามเนื้อ">🔴</span>
          </div>
          <div class="routine-info">
            <strong class="routine-title-th">${ex.nameTh}</strong>
            <span class="routine-target-th">🎯 ชี้เป้า: <strong>${ex.muscleHighlightTh || ex.targetMuscles}</strong></span>
            <span class="routine-pose-th">🏃 ${ex.actionPoseTh || ex.equipment}</span>
          </div>
        </div>
        <button class="btn-preview-video" data-id="${ex.id}" title="ดูรูปชี้เป้า & คลิปสอน TikTok">🎬</button>
      `;

      const chk = item.querySelector('.routine-checkbox');
      chk.addEventListener('change', (e) => {
        e.stopPropagation();
        toggleExerciseSelection(ex.id, chk.checked, item);
      });

      item.addEventListener('click', () => {
        chk.checked = !chk.checked;
        toggleExerciseSelection(ex.id, chk.checked, item);
      });

      item.querySelector('.btn-preview-video').addEventListener('click', (e) => {
        e.stopPropagation();
        openVideoModal(ex);
      });

      groupDiv.appendChild(item);
    });

    container.appendChild(groupDiv);
  }

  function toggleExerciseSelection(exId, isSelected, itemElement) {
    if (isSelected) {
      selectedRoutineExerciseIds.add(exId);
      itemElement.classList.add('checked');
    } else {
      selectedRoutineExerciseIds.delete(exId);
      itemElement.classList.remove('checked');
    }
    updateRoutineSummary();
  }

  function updateRoutineSummary() {
    const count = selectedRoutineExerciseIds.size;
    selectedExCount.textContent = count;
    btnLaunchRoutine.disabled = count === 0;
  }

  function launchActiveRoutine() {
    if (selectedRoutineExerciseIds.size === 0) return;

    activeRoutine = [];
    selectedRoutineExerciseIds.forEach(id => {
      const ex = EXERCISE_DATABASE.find(e => e.id === id);
      if (ex) activeRoutine.push(ex);
    });

    currentRoutineIndex = 0;
    currentSet = 1;
    setWorkoutSeconds = 0;
    mode = 'WORKOUT';

    updateActiveExerciseBanner();
    switchView('view-timer');
    playBeepSound(990, 0.25);
  }

  function updateActiveExerciseBanner() {
    if (activeRoutine.length > 0 && currentRoutineIndex < activeRoutine.length) {
      const currentEx = activeRoutine[currentRoutineIndex];
      activeExerciseBanner.classList.remove('hidden');
      if (activeExThumb && currentEx.photoUrl) {
        activeExThumb.src = currentEx.photoUrl;
      }
      activeExName.textContent = `${currentEx.nameTh} (${currentRoutineIndex + 1}/${activeRoutine.length})`;
      if (activeExMuscle) {
        activeExMuscle.textContent = `🔴 ส่วนที่ได้: ${currentEx.muscleHighlightTh || currentEx.targetMuscles}`;
      }
      btnNextExercise.classList.remove('hidden');
    } else {
      activeExerciseBanner.classList.add('hidden');
      btnNextExercise.classList.add('hidden');
    }
  }

  function goToNextRoutineExercise() {
    if (activeRoutine.length === 0) return;

    if (currentRoutineIndex < activeRoutine.length - 1) {
      currentRoutineIndex++;
      currentSet = 1;
      setWorkoutSeconds = 0;
      updateActiveExerciseBanner();
      updateUI();
      playBeepSound(1100, 0.2);
    } else {
      alert('🎉 ยินดีด้วยครับ! คุณฝึกครบทุกท่าในคอร์สวันนี้เรียบร้อยแล้ว!');
      activeRoutine = [];
      updateActiveExerciseBanner();
    }
  }

  // --- EXERCISE LIBRARY & SUB-FILTERS ---
  function setupExerciseLibrary() {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentLibraryMainFilter = chip.dataset.filter;
        currentLibrarySubFilter = 'all';
        renderSubFilterChips(currentLibraryMainFilter);
        renderExerciseLibrary();
      });
    });

    renderSubFilterChips('chest');
    renderExerciseLibrary();
  }

  function renderSubFilterChips(mainMuscle) {
    subFilterContainer.innerHTML = '';
    if (mainMuscle === 'all') return;

    const cat = EXERCISE_CATEGORIES[mainMuscle];
    if (!cat || !cat.subCategories) return;

    // "ทั้งหมด" chip
    const allChip = document.createElement('button');
    allChip.className = `sub-chip ${currentLibrarySubFilter === 'all' ? 'active' : ''}`;
    allChip.textContent = `ทั้งหมดใน${cat.nameTh}`;
    allChip.addEventListener('click', () => {
      currentLibrarySubFilter = 'all';
      updateSubFilterActiveState(allChip);
      renderExerciseLibrary();
    });
    subFilterContainer.appendChild(allChip);

    // Sub-category chips
    cat.subCategories.forEach(sub => {
      const chip = document.createElement('button');
      chip.className = `sub-chip ${currentLibrarySubFilter === sub.id ? 'active' : ''}`;
      chip.textContent = sub.nameTh;
      chip.addEventListener('click', () => {
        currentLibrarySubFilter = sub.id;
        updateSubFilterActiveState(chip);
        renderExerciseLibrary();
      });
      subFilterContainer.appendChild(chip);
    });
  }

  function updateSubFilterActiveState(activeChip) {
    subFilterContainer.querySelectorAll('.sub-chip').forEach(c => c.classList.remove('active'));
    activeChip.classList.add('active');
  }

  function renderExerciseLibrary() {
    exerciseCardsContainer.innerHTML = '';

    let list = EXERCISE_DATABASE;
    if (currentLibraryMainFilter !== 'all') {
      list = list.filter(ex => ex.muscle === currentLibraryMainFilter);
    }
    if (currentLibrarySubFilter !== 'all') {
      list = list.filter(ex => ex.subCategory === currentLibrarySubFilter);
    }

    list.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'ex-card';
      card.innerHTML = `
        <div class="ex-card-thumb">
          <img src="${ex.photoUrl}" alt="${ex.name}" class="ex-photo-img" loading="lazy">
          <span class="ex-minimal-badge">${ex.subCategoryNameTh || ex.muscle}</span>
          <div class="ex-thumb-caption">
            <span class="dot-red">🔴</span>
            <span>สีแดง = ${ex.muscleHighlightTh || ex.targetMuscles}</span>
          </div>
        </div>

        <div class="ex-card-body">
          <div class="ex-header-row">
            <div class="ex-title-wrap">
              <h3 class="ex-card-title">${ex.nameTh}</h3>
              <span class="ex-english-title">${ex.name}</span>
            </div>
            <span class="ex-difficulty-badge">${ex.difficulty}</span>
          </div>

          <div class="ex-info-pills">
            <span class="info-pill">🏋️ ${ex.equipment}</span>
            <span class="info-pill creator-pill">🎵 ${ex.tiktokGuide.creatorName}</span>
          </div>

          <div class="ex-coach-cue-minimal">
            <span class="cue-icon">💡</span>
            <span class="cue-text">${ex.coachTips.setup}</span>
          </div>

          <div class="ex-card-actions">
            <button class="btn-card-video" data-id="${ex.id}">🎬 ดูคลิปสอน</button>
            <button class="btn-card-add" data-id="${ex.id}">➕ ใส่คอร์ส</button>
          </div>
        </div>
      `;

      card.querySelector('.btn-card-video').addEventListener('click', () => {
        openVideoModal(ex);
      });

      card.querySelector('.btn-card-add').addEventListener('click', (e) => {
        selectedRoutineExerciseIds.add(ex.id);
        updateRoutineSummary();
        e.target.innerHTML = '✅ เพิ่มแล้ว';
        e.target.style.background = '#059669';
        setTimeout(() => {
          e.target.innerHTML = '➕ ใส่คอร์ส';
          e.target.style.background = '';
        }, 1200);
      });

      exerciseCardsContainer.appendChild(card);
    });
  }

  // --- MINIMALIST EXERCISE MODAL CONTROLLER ---
  function setupVideoModal() {
    btnCloseModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });

    if (btnModalAddRoutine) {
      btnModalAddRoutine.addEventListener('click', () => {
        if (!currentModalExercise) return;
        selectedRoutineExerciseIds.add(currentModalExercise.id);
        updateRoutineSummary();
        btnModalAddRoutine.textContent = '✅ เพิ่มในคอร์สแล้ว';
        btnModalAddRoutine.style.background = '#059669';
        setTimeout(() => {
          btnModalAddRoutine.textContent = '➕ เพิ่มท่านี้ในคอร์สวันนี้';
          btnModalAddRoutine.style.background = '';
        }, 1200);
      });
    }
  }

  function openVideoModal(ex) {
    currentModalExercise = ex;

    modalVideoTitle.textContent = ex.nameTh;
    if (modalEnglishTitle) {
      modalEnglishTitle.textContent = `${ex.name} • ${ex.subCategoryNameTh || ex.muscle}`;
    }

    modalPhysiqueImg.src = ex.photoUrl;

    if (modalMuscleTargetTh) {
      modalMuscleTargetTh.textContent = ex.muscleHighlightTh || ex.targetMuscles;
    }

    if (modalTiktokLink) {
      modalTiktokLink.href = ex.tiktokGuide.tiktokSearchUrl || '#';
    }
    if (modalVideoBtnText) {
      modalVideoBtnText.textContent = `ดูคลิปสอน (${ex.tiktokGuide.creatorName} • ${ex.tiktokGuide.viewsText})`;
    }

    // Thai Coach Tips
    modalCueSetup.textContent = ex.coachTips.setup;
    modalCueExec.textContent = ex.coachTips.execution;
    modalCueMistake.textContent = ex.coachTips.commonMistakes;
    modalCueBreath.textContent = ex.coachTips.breathing;

    videoModal.classList.remove('hidden');
  }

  function closeVideoModal() {
    videoModal.classList.add('hidden');
  }

  // --- MASTER TIMER ENGINE ---
  function startMasterTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!isTimerRunning) return;

      totalWorkoutSeconds++;

      if (mode === 'WORKOUT') {
        setWorkoutSeconds++;
      } else if (mode === 'REST') {
        restRemainingSeconds--;
        
        if (restRemainingSeconds > 0 && restRemainingSeconds <= 3) {
          playBeepSound(600, 0.15);
        }

        if (restRemainingSeconds <= 0) {
          finishRestMode();
        }
      }
      
      updateUI();
    }, 1000);
    isTimerRunning = true;
  }

  // --- AUDIO SYNTH HELPER ---
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playBeepSound(frequency = 800, duration = 0.2) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  function playRestEndChime() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.frequency.setValueAtTime(1320, now + 0.25);
      gain2.gain.setValueAtTime(0.5, now + 0.25);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.25);
      osc2.stop(now + 0.7);

    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  // --- NOTIFICATION & VIBRATION ---
  function sendRestEndNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const exTitle = activeRoutine.length > 0 ? ` [${activeRoutine[currentRoutineIndex].nameTh}]` : '';
        new Notification('🏋️‍♂️ หมดเวลาพักเซ็ตแล้ว!', {
          body: `พร้อมสำหรับ SET ${currentSet}${exTitle} หรือยัง? กดเล่นต่อได้เลย!`,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>',
          tag: 'gympulse-rest-done',
          renotify: true
        });
      } catch (err) {
        console.warn('Notification trigger error:', err);
      }
    }

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([200, 100, 200, 100, 400]);
      } catch (err) {
        console.warn('Vibration error:', err);
      }
    }
  }

  function checkNotificationPermission() {
    if (!('Notification' in window)) {
      notiIndicator.textContent = '❌';
      return;
    }

    if (Notification.permission === 'granted') {
      notiIndicator.textContent = '🔔';
      notiBanner.classList.add('hidden');
      btnNotification.classList.add('active');
    } else if (Notification.permission === 'denied') {
      notiIndicator.textContent = '🔕';
      notiBanner.classList.add('hidden');
      btnNotification.classList.remove('active');
    } else {
      notiIndicator.textContent = '🔔';
      notiBanner.classList.remove('hidden');
      btnNotification.classList.remove('active');
    }
  }

  // --- SCREEN WAKE LOCK API ---
  async function toggleWakeLock() {
    if (!('wakeLock' in navigator)) {
      alert('เบราว์เซอร์นี้ไม่รองรับ Screen Wake Lock API');
      return;
    }

    try {
      if (!wakeLockActive) {
        wakeLockSentinel = await navigator.wakeLock.request('screen');
        wakeLockActive = true;
        btnWakelock.classList.add('active');
        wakelockIcon.textContent = '💡';
        wakeLockSentinel.addEventListener('release', () => {
          wakeLockActive = false;
          btnWakelock.classList.remove('active');
        });
      } else {
        if (wakeLockSentinel) {
          await wakeLockSentinel.release();
          wakeLockSentinel = null;
        }
        wakeLockActive = false;
        btnWakelock.classList.remove('active');
      }
    } catch (err) {
      console.warn('Wake Lock error:', err);
    }
  }

  // --- ACTION HANDLERS ---
  function handlePrimaryAction() {
    getAudioContext();

    if (mode === 'WORKOUT') {
      logCurrentSet();
      mode = 'REST';
      restRemainingSeconds = restTotalSeconds;
      activeRestControls.classList.remove('hidden');
      playBeepSound(750, 0.2);
    } else {
      finishRestMode(true);
    }
    updateUI();
  }

  function finishRestMode(userInitiated = false) {
    mode = 'WORKOUT';
    setWorkoutSeconds = 0;
    activeRestControls.classList.add('hidden');

    if (!userInitiated) {
      playRestEndChime();
      sendRestEndNotification();
    } else {
      playBeepSound(900, 0.15);
    }

    currentSet++;
    updateUI();
  }

  function logCurrentSet() {
    const timestamp = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    const exName = activeRoutine.length > 0 ? activeRoutine[currentRoutineIndex].nameTh : 'General Set';
    const logItem = {
      setNumber: currentSet,
      exercise: exName,
      setDuration: setWorkoutSeconds,
      timestamp: timestamp
    };
    historyLogs.unshift(logItem);
    saveHistory();
  }

  // --- UI UPDATE FUNCTION ---
  function updateUI() {
    setCounter.innerHTML = `<span class="badge-icon">🔥</span> <span class="set-text">SET ${currentSet}</span>`;
    if (mode === 'WORKOUT') {
      modeBadge.className = 'badge badge-workout';
      modeBadge.innerHTML = '<span class="badge-icon">🏋️‍♂️</span> <span class="badge-text">กำลังเล่นเซ็ต (Workout)</span>';
      mainTimerLabel.textContent = 'เวลาในเซ็ตนี้';
      mainTimerDisplay.textContent = formatTime(setWorkoutSeconds);
      
      btnPrimaryAction.className = 'btn btn-rest-trigger';
      btnPrimaryAction.innerHTML = `<span class="btn-main-icon">🛑</span> <span class="btn-text">ยกเสร็จแล้ว - พักเซ็ต (${restTotalSeconds}s)</span>`;
      
      progressCircle.style.stroke = 'var(--primary-workout)';
      const setTimeProgress = (setWorkoutSeconds % 60) / 60;
      setProgressOffset(1 - setTimeProgress);
    } else {
      modeBadge.className = 'badge badge-rest';
      modeBadge.innerHTML = '<span class="badge-icon">☕</span> <span class="badge-text">กำลังพักเซ็ต (Resting)</span>';
      mainTimerLabel.textContent = 'เวลาพักที่เหลือ';
      mainTimerDisplay.textContent = formatTime(restRemainingSeconds);
      
      btnPrimaryAction.className = 'btn btn-rest-trigger is-resting';
      btnPrimaryAction.innerHTML = `<span class="btn-main-icon">🚀</span> <span class="btn-text">พร้อมยกเซ็ตถัดไป! (เริ่มเลย)</span>`;

      progressCircle.style.stroke = 'var(--primary-rest)';
      const restRatio = Math.max(0, restRemainingSeconds / restTotalSeconds);
      setProgressOffset(restRatio);
    }

    subTimerDisplay.textContent = `⏱️ เวลารวม: ${formatTime(totalWorkoutSeconds)}`;
    
    if (isTimerRunning) {
      btnToggleWorkout.innerHTML = '<span>⏸️</span> พักจับเวลา';
    } else {
      btnToggleWorkout.innerHTML = '<span>▶️</span> จับเวลาต่อ';
    }

    statTotalSets.textContent = historyLogs.length;
    statTotalTime.textContent = formatTime(totalWorkoutSeconds);
    renderLogList();
  }

  function setProgressOffset(ratio) {
    const offset = circumference - (ratio * circumference);
    progressCircle.style.strokeDashoffset = offset;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function renderLogList() {
    if (historyLogs.length === 0) {
      logList.innerHTML = '<li class="empty-log">ยังไม่มีประวัติการพักเซ็ต</li>';
      return;
    }

    logList.innerHTML = historyLogs.map(log => `
      <li>
        <span><strong>${log.exercise || 'SET'}</strong> #${log.setNumber} (${log.timestamp})</span>
        <span>เวลาเล่น: ${formatTime(log.setDuration)}</span>
      </li>
    `).join('');
  }

  // --- LOCALSTORAGE ---
  function saveHistory() {
    try {
      localStorage.setItem('gympulse_logs', JSON.stringify(historyLogs));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem('gympulse_rest_duration', restTotalSeconds);
      localStorage.setItem('gympulse_yesterday_muscle', yesterdayMuscle);
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  function loadSettingsAndHistory() {
    try {
      const savedLogs = localStorage.getItem('gympulse_logs');
      if (savedLogs) historyLogs = JSON.parse(savedLogs);

      const savedRest = localStorage.getItem('gympulse_rest_duration');
      if (savedRest) {
        restTotalSeconds = parseInt(savedRest, 10);
        updatePresetActiveState(restTotalSeconds);
        customSecondsInput.value = restTotalSeconds;
      }

      const savedYesterday = localStorage.getItem('gympulse_yesterday_muscle');
      if (savedYesterday) {
        yesterdayMuscle = savedYesterday;
      }
    } catch (e) {
      console.warn('Storage load failed:', e);
    }
  }

  function updatePresetActiveState(seconds) {
    presetButtons.forEach(btn => {
      const sec = parseInt(btn.dataset.seconds, 10);
      if (sec === seconds) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- BUTTON LISTENERS ---
  btnPrimaryAction.addEventListener('click', handlePrimaryAction);

  btnToggleWorkout.addEventListener('click', () => {
    isTimerRunning = !isTimerRunning;
    updateUI();
  });

  btnResetWorkout.addEventListener('click', () => {
    if (confirm('คุณต้องการรีเซ็ตเวลาและจำนวนเซ็ตใหม่ทั้งหมดใช่หรือไม่?')) {
      totalWorkoutSeconds = 0;
      setWorkoutSeconds = 0;
      currentSet = 1;
      mode = 'WORKOUT';
      activeRestControls.classList.add('hidden');
      activeRoutine = [];
      updateActiveExerciseBanner();
      historyLogs = [];
      saveHistory();
      updateUI();
    }
  });

  presetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.btn-preset');
      if (!target) return;
      restTotalSeconds = parseInt(target.dataset.seconds, 10);
      customSecondsInput.value = restTotalSeconds;
      updatePresetActiveState(restTotalSeconds);
      if (mode === 'REST') {
        restRemainingSeconds = restTotalSeconds;
      }
      saveSettings();
      updateUI();
    });
  });

  btnApplyCustom.addEventListener('click', () => {
    const val = parseInt(customSecondsInput.value, 10);
    if (val && val >= 5 && val <= 600) {
      restTotalSeconds = val;
      updatePresetActiveState(val);
      if (mode === 'REST') {
        restRemainingSeconds = restTotalSeconds;
      }
      saveSettings();
      updateUI();
    } else {
      alert('กรุณากรอกเวลาพักระหว่าง 5 ถึง 600 วินาที');
    }
  });

  btnAdd15.addEventListener('click', () => {
    if (mode === 'REST') {
      restRemainingSeconds += 15;
      restTotalSeconds += 15;
      updateUI();
    }
  });

  btnAdd30.addEventListener('click', () => {
    if (mode === 'REST') {
      restRemainingSeconds += 30;
      restTotalSeconds += 30;
      updateUI();
    }
  });

  btnSkipRest.addEventListener('click', () => {
    if (mode === 'REST') {
      finishRestMode(true);
    }
  });

  btnRequestNoti.addEventListener('click', () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(() => {
        checkNotificationPermission();
      });
    }
  });

  btnNotification.addEventListener('click', () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then(() => {
        checkNotificationPermission();
      });
    } else {
      alert('เปิดใช้งานการแจ้งเตือนแล้ว');
    }
  });

  btnSound.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      btnSound.classList.add('active');
      soundIcon.textContent = '🔊';
      playBeepSound(880, 0.1);
    } else {
      btnSound.classList.remove('active');
      soundIcon.textContent = '🔇';
    }
  });

  btnWakelock.addEventListener('click', toggleWakeLock);

  btnClearHistory.addEventListener('click', () => {
    if (confirm('ต้องการล้างประวัติการออกกำลังกายใช่หรือไม่?')) {
      historyLogs = [];
      saveHistory();
      updateUI();
    }
  });
});
