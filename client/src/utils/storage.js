/**
 * localStorage utilities for BrightUp
 * Handles custom units, progress, and session data
 */

// Custom units
export function saveCustomUnit(unit) {
  const units = getCustomUnits();
  const existing = units.findIndex(u => u.id === unit.id);
  
  if (existing >= 0) {
    units[existing] = unit;
  } else {
    units.push(unit);
  }
  
  localStorage.setItem('brightup_custom_units', JSON.stringify(units));
}

export function getCustomUnits() {
  const stored = localStorage.getItem('brightup_custom_units');
  return stored ? JSON.parse(stored) : [];
}

export function deleteCustomUnit(id) {
  const units = getCustomUnits().filter(u => u.id !== id);
  localStorage.setItem('brightup_custom_units', JSON.stringify(units));
}

// Progress tracking
export function getProgress() {
  const stored = localStorage.getItem('brightup_progress');
  return stored ? JSON.parse(stored) : {};
}

export function saveProgress(unitId, termId, correct) {
  const progress = getProgress();
  
  if (!progress[unitId]) {
    progress[unitId] = {};
  }
  
  if (!progress[unitId][termId]) {
    progress[unitId][termId] = { correct: 0, total: 0, lastPracticed: null };
  }
  
  progress[unitId][termId].total += 1;
  if (correct) {
    progress[unitId][termId].correct += 1;
  }
  progress[unitId][termId].lastPracticed = new Date().toISOString();
  
  localStorage.setItem('brightup_progress', JSON.stringify(progress));
}

// Miss tracking (for revision queue)
export function getMisses() {
  const stored = localStorage.getItem('brightup_misses');
  return stored ? JSON.parse(stored) : {};
}

export function recordMiss(unitId, term) {
  const misses = getMisses();
  const key = `${unitId}:${term}`;
  
  if (!misses[key]) {
    misses[key] = { count: 0, lastMissed: null };
  }
  
  misses[key].count += 1;
  misses[key].lastMissed = new Date().toISOString();
  
  localStorage.setItem('brightup_misses', JSON.stringify(misses));
}

export function clearMiss(unitId, term) {
  const misses = getMisses();
  const key = `${unitId}:${term}`;
  delete misses[key];
  localStorage.setItem('brightup_misses', JSON.stringify(misses));
}

// Session state (in case of browser close)
export function saveSessionState(state) {
  sessionStorage.setItem('brightup_session', JSON.stringify(state));
}

export function getSessionState() {
  const stored = sessionStorage.getItem('brightup_session');
  return stored ? JSON.parse(stored) : null;
}

export function clearSessionState() {
  sessionStorage.removeItem('brightup_session');
}
