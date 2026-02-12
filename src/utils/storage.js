// ========================================
// localStorage ヘルパー関数
// ========================================

const STORAGE_KEYS = {
  CATEGORIES: 'ag_categories',
  LOGS: 'ag_logs',
  GOALS: 'ag_goals',
  SKILLS: 'ag_skills',
  SETTINGS: 'ag_settings',
};

/**
 * localStorageからデータを取得
 */
export function getStorageData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return null;
  }
}

/**
 * localStorageにデータを保存
 */
export function setStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
    return false;
  }
}

/**
 * localStorageからデータを削除
 */
export function removeStorageData(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
    return false;
  }
}

/**
 * 全てのアプリデータを取得
 */
export function getAllData() {
  return {
    categories: getStorageData(STORAGE_KEYS.CATEGORIES) || [],
    logs: getStorageData(STORAGE_KEYS.LOGS) || [],
    goals: getStorageData(STORAGE_KEYS.GOALS) || [],
    skills: getStorageData(STORAGE_KEYS.SKILLS) || [],
  };
}

/**
 * 全てのアプリデータをクリア
 */
export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach((key) => removeStorageData(key));
}

export { STORAGE_KEYS };
